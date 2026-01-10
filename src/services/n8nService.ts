/**
 * n8n Service - API client for n8n webhook communication
 * Handles campaign data submission to AI agent orchestration workflow
 */

interface SolanaRawResponse {
    json?: {
        choices?: Array<{
            message?: {
                content: string;
            };
        }>;
    };
    message?: string;
    campaignId?: string;
}

export interface CampaignData {
    name: string;
    budget: string;
    objective: 'traffic' | 'conversions' | 'awareness' | string;
    description?: string;
    metadata?: Record<string, unknown>;
}

export interface N8nResponse {
    success: boolean;
    data?: {
        campaignId?: string;
        aiRecommendations?: {
            biddingStrategy?: string;
            targetAudience?: string;
            optimizations?: string[];
        };
        message?: string;
    };
    error?: string;
}

class N8nService {
    private webhookUrl: string;
    private timeout: number;
    private enabled: boolean;

    constructor() {
        // Use environment variables with fallback to localhost
        this.webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/virtuads-campaign';
        this.timeout = 30000; // 30 seconds
        this.enabled = import.meta.env.VITE_N8N_ENABLED !== 'false';
    }

    /**
     * Submit campaign data to n8n workflow for AI processing
     */
    async submitCampaign(campaignData: CampaignData): Promise<N8nResponse> {
        if (!this.enabled) {
            console.warn('n8n integration is disabled');
            return this.getMockResponse();
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            console.log(`[n8n] Sending campaign to ${this.webhookUrl}`, campaignData);

            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...campaignData,
                    timestamp: new Date().toISOString(),
                    source: 'virtuads-dashboard',
                }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('[n8n] Response received:', data);

            return {
                success: true,
                data: this.parseN8nResponse(data),
            };
        } catch (error) {
            console.error('[n8n] Error submitting campaign:', error);

            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    return {
                        success: false,
                        error: 'La solicitud excedió el tiempo de espera. Por favor, intenta nuevamente.',
                    };
                }

                if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                    return {
                        success: false,
                        error: 'Error al conectar con el servidor n8n. Asegúrate de que esté corriendo en el puerto 5678.',
                    };
                }

                return {
                    success: false,
                    error: `Error: ${error.message}`,
                };
            }

            return {
                success: false,
                error: 'Error desconocido al procesar la solicitud.',
            };
        }
    }

    /**
     * Parse n8n workflow response into our expected format
     */
    private parseN8nResponse(data: unknown): N8nResponse['data'] {
        // Handle different response formats from n8n
        let responseData = data as SolanaRawResponse;
        if (Array.isArray(data)) {
            responseData = data[0] as SolanaRawResponse;
        }

        // Extract AI recommendations from OpenAI response
        const aiMessage = responseData.json?.choices?.[0]?.message?.content || responseData.message || '';

        return {
            campaignId: responseData.campaignId || `camp_${Date.now()}`,
            aiRecommendations: {
                biddingStrategy: this.extractBiddingStrategy(aiMessage),
                targetAudience: this.extractTargetAudience(aiMessage),
                optimizations: this.extractOptimizations(aiMessage),
            },
            message: aiMessage,
        };
    }

    private extractBiddingStrategy(message: string): string {
        if (message.includes('bidding strategy:')) {
            return message.split('bidding strategy:')[1].split('\n')[0].trim();
        }
        return 'Optimizar para conversiones';
    }

    private extractTargetAudience(message: string): string {
        if (message.includes('target audience:')) {
            return message.split('target audience:')[1].split('\n')[0].trim();
        }
        return 'Entusiastas de Web3 y Gaming';
    }

    private extractOptimizations(message: string): string[] {
        if (message.includes('optimizations:')) {
            return message.split('optimizations:')[1].split('\n').slice(0, 3).map(s => s.replace(/^- /, '').trim()).filter(s => s !== '');
        }
        return ['Ajustar frecuencia de anuncios', 'Optimizar creatividades'];
    }

    /**
     * Fallback mock response when integration is disabled
     */
    private getMockResponse(): N8nResponse {
        return {
            success: true,
            data: {
                campaignId: `mock_${Date.now()}`,
                aiRecommendations: {
                    biddingStrategy: 'Maximizar clicks',
                    targetAudience: 'Jugadores interesados en NFTs',
                    optimizations: ['Cambiar títulos', 'Probar nuevos colores'],
                },
                message: 'Campulación de IA: Este es un mensaje de prueba cuando n8n está desactivado.',
            },
        };
    }
}

export const n8nService = new N8nService();

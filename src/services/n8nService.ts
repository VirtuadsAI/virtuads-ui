/**
 * n8n Service - API client for n8n webhook communication
 * Handles campaign data submission to AI agent orchestration workflow
 */

export interface CampaignData {
    name: string;
    budget: string;
    objective: 'traffic' | 'conversions' | 'awareness';
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
            return this.getMockResponse(campaignData);
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
                    campaign: campaignData,
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
    private parseN8nResponse(data: any): N8nResponse['data'] {
        // Handle different response formats from n8n
        if (Array.isArray(data)) {
            data = data[0];
        }

        // Extract AI recommendations from OpenAI response
        const aiMessage = data?.json?.choices?.[0]?.message?.content || data?.message || '';

        return {
            campaignId: data?.campaignId || `camp_${Date.now()}`,
            aiRecommendations: {
                biddingStrategy: this.extractBiddingStrategy(aiMessage),
                targetAudience: this.extractTargetAudience(aiMessage),
                optimizations: this.extractOptimizations(aiMessage),
            },
            message: aiMessage,
        };
    }

    /**
     * Extract bidding strategy from AI response text
     */
    private extractBiddingStrategy(message: string): string {
        // Simple extraction - in production, use more sophisticated parsing
        if (message.toLowerCase().includes('cpm')) {
            return 'CPM (Cost per Mille)';
        } else if (message.toLowerCase().includes('cpc')) {
            return 'CPC (Cost per Click)';
        } else if (message.toLowerCase().includes('cpa')) {
            return 'CPA (Cost per Action)';
        }
        return 'CPM Optimizado';
    }

    /**
     * Extract target audience from AI response text
     */
    private extractTargetAudience(message: string): string {
        // Simple extraction - can be enhanced with NLP
        if (message.toLowerCase().includes('gamer') || message.toLowerCase().includes('p2e')) {
            return 'Gamers P2E';
        } else if (message.toLowerCase().includes('metaverse') || message.toLowerCase().includes('metaverso')) {
            return 'Usuarios de Metaversos';
        }
        return 'Audiencia General Web3';
    }

    /**
     * Extract optimization suggestions from AI response text
     */
    private extractOptimizations(message: string): string[] {
        const optimizations: string[] = [];

        if (message.toLowerCase().includes('horario') || message.toLowerCase().includes('time')) {
            optimizations.push('Optimización de horarios de mayor actividad');
        }
        if (message.toLowerCase().includes('creativ')) {
            optimizations.push('Mejora de creatividades para mayor engagement');
        }
        if (message.toLowerCase().includes('segment')) {
            optimizations.push('Segmentación avanzada de audiencia');
        }
        if (optimizations.length === 0) {
            optimizations.push('Optimización continua basada en métricas en tiempo real');
        }

        return optimizations;
    }

    /**
     * Generate mock response for testing when n8n is disabled
     */
    private getMockResponse(campaignData: CampaignData): Promise<N8nResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: {
                        campaignId: `mock_${Date.now()}`,
                        aiRecommendations: {
                            biddingStrategy: 'CPM Optimizado con ajuste dinámico',
                            targetAudience: 'Usuarios Web3 activos en metaversos',
                            optimizations: [
                                'Horarios optimizados: 18:00-23:00 UTC-5',
                                'Formatos recomendados: NFT Ads interactivos',
                                'Presupuesto distribuido en 70% metaversos, 30% P2E',
                            ],
                        },
                        message: `Análisis completado para "${campaignData.name}". Estrategia de puja optimizada para maximizar ROI en XRPL.`,
                    },
                });
            }, 2000);
        });
    }

    /**
     * Health check for n8n service
     */
    async healthCheck(): Promise<boolean> {
        try {
            const response = await fetch(this.webhookUrl.replace('/webhook/virtuads-campaign', '/healthz'), {
                method: 'GET',
                signal: AbortSignal.timeout(5000),
            });
            return response.ok;
        } catch {
            return false;
        }
    }
}

// Export singleton instance
export const n8nService = new N8nService();

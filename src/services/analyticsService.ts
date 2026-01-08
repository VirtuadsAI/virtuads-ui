/**
 * Analytics Service - Captura y reporte de impresiones de anuncios
 * Prepara los datos para ser registrados on-chain
 */

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface AdImpression {
    nftokenId: string;
    campaignId?: string;
    viewerAddress?: string;
    timestamp: number;
    platform: string;
    location?: string;
}

export interface CampaignStats {
    totalImpressions: number;
    onChainVerified: number;
    lastTxHash?: string;
    lastVerificationDate?: string;
}

// ============================================================================
// Configuration
// ============================================================================

// URL del backend de VirtuAds (donde se procesan los batches)
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001/api';

// ============================================================================
// Analytics Service Class
// ============================================================================

class AnalyticsService {
    private queue: AdImpression[] = [];
    private flushInterval: number = 5000; // 5 segundos
    private isProcessing: boolean = false;

    constructor() {
        // Iniciar ciclo de reporte automático
        if (typeof window !== 'undefined') {
            setInterval(() => this.flush(), this.flushInterval);
        }
    }

    /**
     * Registra una impresión de un NFT Ad
     */
    async recordImpression(params: {
        nftokenId: string;
        campaignId?: string;
        viewerAddress?: string;
    }): Promise<void> {
        const impression: AdImpression = {
            nftokenId: params.nftokenId,
            campaignId: params.campaignId,
            viewerAddress: params.viewerAddress,
            timestamp: Date.now(),
            platform: 'web-dashboard', // O el metaverso correspondiente
            location: 'virtuads-ui'
        };

        this.queue.push(impression);
        console.log(`[Analytics] Impression queued for NFT: ${params.nftokenId}`);

        // Si la cola es muy grande, procesar inmediatamente
        if (this.queue.length >= 50) {
            this.flush();
        }
    }

    /**
     * Envía las impresiones acumuladas al backend para batching
     */
    private async flush(): Promise<void> {
        if (this.isProcessing || this.queue.length === 0) return;

        this.isProcessing = true;
        const currentBatch = [...this.queue];
        this.queue = [];

        try {
            console.log(`[Analytics] Flushing ${currentBatch.length} impressions to backend...`);

            // Simulación de envío al backend (Phase 4 Backend)
            const response = await fetch(`${BACKEND_API_URL}/impressions/batch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ impressions: currentBatch })
            });

            if (!response.ok) {
                // Si falla el backend, re-encolamos para reintento
                this.queue = [...currentBatch, ...this.queue];
                console.warn('[Analytics] Backend unavailable, re-queuing impressions');
            } else {
                console.log('[Analytics] Batch successfully reported');
            }

        } catch (error) {
            console.warn('[Analytics] Network error reporting impressions, re-queuing');
            this.queue = [...currentBatch, ...this.queue];
        } finally {
            this.isProcessing = false;
        }
    }

    /**
     * Obtiene estadísticas verificadas on-chain
     */
    async getCampaignStats(nftokenId: string): Promise<CampaignStats> {
        try {
            const response = await fetch(`${BACKEND_API_URL}/analytics/${nftokenId}`);
            if (response.ok) {
                return await response.json();
            }
        } catch (e) {
            console.warn('[Analytics] Fixed mock stats returned (backend offline)');
        }

        // Mock data para desarrollo
        return {
            totalImpressions: Math.floor(Math.random() * 1000) + 50,
            onChainVerified: Math.floor(Math.random() * 800) + 20,
            lastTxHash: 'A1B2C3D4E5F67890',
            lastVerificationDate: new Date().toISOString()
        };
    }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();

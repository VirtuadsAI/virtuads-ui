/**
 * Analytics Service - Captura y reporte de impresiones de anuncios
 * Prepara los datos para ser registrados on-chain
 */

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface AdImpression {
    // This file is using "nftokenId" but the backend `db.ts` expects `nftId`.
    // For now, we will align with the frontend's usage and assume a backend adaptation
    // or a future refactor will align them. Let's keep the existing property names.
    nftId: string;
    timestamp: number;
    adCreativeId: string;
    placement: string;
    campaignId?: string;
    viewerAddress?: string;
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

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001/api';
const LOCAL_STORAGE_KEY = 'virtuads_analytics_queue';

// ============================================================================
// Analytics Service Class
// ============================================================================

class AnalyticsService {
    private flushInterval: number = 10000; // 10 segundos
    private isProcessing: boolean = false;

    constructor() {
        if (typeof window !== 'undefined') {
            // Automatically flush the queue periodically
            setInterval(() => this.flush(), this.flushInterval);

            // Attempt to flush before the user leaves the page
            window.addEventListener('beforeunload', () => this.flush(true));
        }
    }

    private getQueue(): AdImpression[] {
        try {
            const storedQueue = localStorage.getItem(LOCAL_STORAGE_KEY);
            return storedQueue ? JSON.parse(storedQueue) : [];
        } catch (error) {
            console.error("[Analytics] Error reading queue from localStorage:", error);
            return [];
        }
    }

    private saveQueue(queue: AdImpression[]): void {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(queue));
        } catch (error) {
            console.error("[Analytics] Error saving queue to localStorage:", error);
        }
    }

    /**
     * Registra una impresión de un NFT Ad de forma persistente.
     */
    async recordImpression(params: {
        nftId: string;
        adCreativeId: string;
        placement: string;
        campaignId?: string;
        viewerAddress?: string;
    }): Promise<void> {
        const impression: AdImpression = {
            ...params,
            timestamp: Date.now(),
        };

        const queue = this.getQueue();
        queue.push(impression);
        this.saveQueue(queue);

        console.log(`[Analytics] Impression queued for NFT: ${params.nftId}`);

        // If the queue grows large, trigger an immediate flush
        if (queue.length >= 50) {
            this.flush();
        }
    }

    /**
     * Envía las impresiones acumuladas al backend para batching.
     */
    private async flush(isUnloading = false): Promise<void> {
        if (this.isProcessing) return;

        const batchToProcess = this.getQueue();
        if (batchToProcess.length === 0) return;

        this.isProcessing = true;
        // Clear the queue immediately to prevent race conditions
        this.saveQueue([]);

        try {
            console.log(`[Analytics] Flushing ${batchToProcess.length} impressions to backend...`);

            const body = JSON.stringify({ impressions: batchToProcess });

            // Use sendBeacon if available and unloading, for better reliability
            if (isUnloading && navigator.sendBeacon) {
                navigator.sendBeacon(`${BACKEND_API_URL}/impressions/batch`, body);
                console.log('[Analytics] Sent batch via Beacon API.');
                this.isProcessing = false; // Beacon is fire-and-forget
                return;
            }

            const response = await fetch(`${BACKEND_API_URL}/impressions/batch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body
            });

            if (!response.ok) {
                throw new Error(`Backend responded with status ${response.status}`);
            }

            console.log('[Analytics] Batch successfully reported via Fetch.');

        } catch (error) {
            console.warn('[Analytics] Network error reporting impressions, re-queuing failed batch.', error);
            // If it fails, put the batch back into storage, merging with any new items.
            const currentQueue = this.getQueue();
            this.saveQueue([...batchToProcess, ...currentQueue]);
        } finally {
            this.isProcessing = false;
        }
    }

    /**
     * Obtiene estadísticas verificadas on-chain (Still Mocked)
     */
    async getCampaignStats(nftId: string): Promise<CampaignStats> {
        try {
            const response = await fetch(`${BACKEND_API_URL}/analytics/${nftId}`);
            if (response.ok) {
                return await response.json();
            }
        } catch {
            console.warn('[Analytics] Fixed mock stats returned (backend offline)');
        }

        return {
            totalImpressions: Math.floor(Math.random() * 1000) + 50,
            onChainVerified: Math.floor(Math.random() * 800) + 20,
            lastTxHash: 'A1B2C3D4E5F67890',
            lastVerificationDate: new Date().toISOString()
        };
    }
}

export const analyticsService = new AnalyticsService();

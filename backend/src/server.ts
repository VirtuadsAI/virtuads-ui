import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { xrplOperator } from './services/xrplOperator';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory store for demo (In production, use Redis/PostgreSQL)
let impressionBuffer: any[] = [];
const BATCH_SIZE = 50;

/**
 * Route: Batch Impression Reporting
 * Receives impressions from the frontend
 */
app.post('/api/impressions/batch', async (req, res) => {
    const { impressions } = req.body;

    if (!Array.isArray(impressions)) {
        return res.status(400).json({ error: 'Invalid impressions data' });
    }

    console.log(`[Backend] Received batch of ${impressions.length} impressions`);

    // Add to buffer
    impressionBuffer.push(...impressions);

    // If buffer exceeds BATCH_SIZE, trigger on-chain recording
    if (impressionBuffer.length >= BATCH_SIZE) {
        processBatch();
    }

    res.status(200).json({ status: 'success', received: impressions.length });
});

/**
 * Route: Analytics Query
 */
app.get('/api/analytics/:nftId', (req, res) => {
    const { nftId } = req.params;

    // Mock analytics data
    res.json({
        nftId,
        totalImpressions: Math.floor(Math.random() * 500) + 100,
        onChainVerified: Math.floor(Math.random() * 400) + 50,
        lastTxHash: 'MOCK_TX_' + Math.random().toString(16).substring(2, 10).toUpperCase()
    });
});

/**
 * Process buffer and record on XRPL
 */
async function processBatch() {
    const batchToProcess = [...impressionBuffer];
    impressionBuffer = [];

    console.log(`[Backend] Processing ${batchToProcess.length} impressions for on-chain recording...`);

    try {
        // Record on XRPL (Phase 4 Logic)
        const result = await xrplOperator.recordImpressionsOnChain(batchToProcess);

        if (result.success) {
            console.log(`[Backend] Successfully recorded on XRPL. Hash: ${result.txHash}`);
        } else {
            console.error(`[Backend] XRPL recording failed: ${result.error}`);
            // Recue for retry in production
        }
    } catch (e) {
        console.error('[Backend] Process batch error:', e);
    }
}

// Start server
app.listen(PORT, () => {
    console.log(`[VirtuAds Backend] Running at http://localhost:${PORT}`);
    console.log(`[VirtuAds Backend] Operator Address: ${process.env.OPERATOR_ADDRESS || 'Not set'}`);
});

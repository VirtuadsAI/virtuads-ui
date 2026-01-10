import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { xrplOperator } from './services/xrplOperator';
import { dbService, Impression } from './services/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const BATCH_SIZE = 50; // How many impressions to process at once
const BATCH_INTERVAL_MS = 30000; // Process the queue every 30 seconds

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Route: XRPL Operator Status
 */
app.get('/api/xrpl/status', async (req, res) => {
    try {
        const info = await xrplOperator.getStatus();
        res.json({
            status: 'success',
            ...info
        });
    } catch {
        res.status(500).json({ status: 'error', message: 'Failed to fetch XRPL status' });
    }
});

/**
 * Route: Batch Impression Reporting
 * Receives impressions from the frontend and stores them in the database.
 */
app.post('/api/impressions/batch', async (req, res) => {
    const { impressions } = req.body;

    if (!Array.isArray(impressions)) {
        return res.status(400).json({ error: 'Invalid impressions data' });
    }

    console.log(`[Backend] Received batch of ${impressions.length} impressions`);

    try {
        for (const impression of impressions) {
            // Basic validation, can be improved with a library like Zod
            if (impression.nftId && impression.timestamp && impression.adCreativeId && impression.placement) {
                await dbService.addImpression(impression);
            }
        }
        res.status(200).json({ status: 'success', received: impressions.length });
    } catch (error) {
        console.error('[Backend] Error saving impressions to database:', error);
        res.status(500).json({ status: 'error', message: 'Failed to save impressions' });
    }
});

/**
 * Route: Analytics Query (Still Mocked)
 */
app.get('/api/analytics/:nftId', (req, res) => {
    const { nftId } = req.params;

    // This remains mocked as per the original codebase.
    // A future task would be to build a real analytics query from the DB.
    res.json({
        nftId,
        totalImpressions: Math.floor(Math.random() * 500) + 100,
        onChainVerified: Math.floor(Math.random() * 400) + 50,
        lastTxHash: 'MOCK_TX_' + Math.random().toString(16).substring(2, 10).toUpperCase()
    });
});

/**
 * Fetches a batch from the DB, records it on XRPL, and deletes upon success.
 */
async function processBatch() {
    console.log(`[Backend] Checking for impressions to process...`);

    let batchToProcess: Impression[] = [];

    try {
        batchToProcess = await dbService.getImpressions(BATCH_SIZE);

        if (batchToProcess.length === 0) {
            console.log(`[Backend] No impressions to process.`);
            return;
        }

        console.log(`[Backend] Processing ${batchToProcess.length} impressions for on-chain recording...`);

        const result = await xrplOperator.recordImpressionsOnChain(batchToProcess);

        if (result.success) {
            console.log(`[Backend] Successfully recorded on XRPL. Hash: ${result.txHash}`);
            // Get the IDs of the processed impressions
            const processedIds = batchToProcess.map(imp => imp.id).filter(id => id !== undefined) as number[];
            await dbService.deleteImpressions(processedIds);
        } else {
            console.error(`[Backend] XRPL recording failed: ${result.error}. Batch will be retried on next interval.`);
        }
    } catch {
        console.error('[Backend] Process batch error');
    }
}

// Start server and batch processing
app.listen(PORT, () => {
    console.log(`[VirtuAds Backend] Running at http://localhost:${PORT}`);
    console.log(`[VirtuAds Backend] Operator Address: ${process.env.OPERATOR_ADDRESS || 'Not set'}`);

    // Periodically process the batch
    setInterval(processBatch, BATCH_INTERVAL_MS);
    console.log(`[VirtuAds Backend] Batch processing initiated. Will run every ${BATCH_INTERVAL_MS / 1000} seconds.`);
});

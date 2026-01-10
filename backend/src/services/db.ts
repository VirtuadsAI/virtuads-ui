
import sqlite3 from 'sqlite3';
import path from 'path';

// Define the path for the database file
const DB_PATH = path.resolve(__dirname, '..', 'analytics.db');

export interface Impression {
    id?: number;
    nftId: string;
    timestamp: number;
    adCreativeId: string;
    placement: string;
}

class Database {
    private db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database(DB_PATH, (err) => {
            if (err) {
                console.error('Error opening database', err.message);
            } else {
                console.log('Connected to the SQLite database.');
                this.init();
            }
        });
    }

    private init(): void {
        const sql = `
            CREATE TABLE IF NOT EXISTS impressions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nftId TEXT NOT NULL,
                timestamp INTEGER NOT NULL,
                adCreativeId TEXT NOT NULL,
                placement TEXT NOT NULL
            );
        `;
        this.db.run(sql, (err) => {
            if (err) {
                console.error('Error creating table', err.message);
            } else {
                console.log('Impressions table is ready.');
            }
        });
    }

    public addImpression(impression: Omit<Impression, 'id'>): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO impressions (nftId, timestamp, adCreativeId, placement) VALUES (?, ?, ?, ?)`;
            this.db.run(sql, [impression.nftId, impression.timestamp, impression.adCreativeId, impression.placement], (err) => {
                if (err) {
                    console.error('Error adding impression', err.message);
                    return reject(err);
                }
                resolve();
            });
        });
    }

    public getImpressions(limit: number): Promise<Impression[]> {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM impressions ORDER BY id ASC LIMIT ?`;
            this.db.all(sql, [limit], (err, rows) => {
                if (err) {
                    console.error('Error getting impressions', err.message);
                    return reject(err);
                }
                resolve(rows as Impression[]);
            });
        });
    }

    public deleteImpressions(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => {
            if (ids.length === 0) {
                return resolve();
            }
            const placeholders = ids.map(() => '?').join(',');
            const sql = `DELETE FROM impressions WHERE id IN (${placeholders})`;
            this.db.run(sql, ids, function (err) {
                if (err) {
                    console.error('Error deleting impressions', err.message);
                    return reject(err);
                }
                console.log(`Deleted ${this.changes} impression(s).`);
                resolve();
            });
        });
    }
}

export const dbService = new Database();

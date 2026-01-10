/**
 * Star Atlas Galaxy API Service
 * Fetches ship data and metadata from Star Atlas ecosystem
 */

const GALAXY_API_BASE = 'https://galaxy.staratlas.com';

export interface StarAtlasShip {
    _id: string;
    name: string;
    symbol: string;
    description?: string;
    image?: string;
    attributes?: {
        itemType?: string;
        class?: string;
        manufacturer?: string;
        unitLength?: number;
        spec?: string;
    };
    primarySales?: {
        listTimestamp?: number;
        unlistTimestamp?: number;
        price?: number;
        currencySymbol?: string;
    }[];
    airdrops?: unknown[];
    media?: {
        gallery?: string[];
        sketchfab?: string;
    };
}

export interface StarAtlasResponse {
    success: boolean;
    data?: StarAtlasShip[];
    error?: string;
}

class StarAtlasService {
    private shipCache: StarAtlasShip[] | null = null;
    private lastFetch: number = 0;
    private CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

    /**
     * Fetch all ships from Galaxy API
     */
    async fetchAllShips(): Promise<StarAtlasResponse> {
        try {
            // Check cache first
            if (this.shipCache && Date.now() - this.lastFetch < this.CACHE_DURATION) {
                console.log('[StarAtlas] Using cached ship data');
                return { success: true, data: this.shipCache };
            }

            console.log('[StarAtlas] Fetching ships from Galaxy API...');
            const response = await fetch(`${GALAXY_API_BASE}/nfts`);

            if (!response.ok) {
                throw new Error(`Galaxy API returned ${response.status}`);
            }

            const ships: StarAtlasShip[] = await response.json();

            // Update cache
            this.shipCache = ships;
            this.lastFetch = Date.now();

            console.log(`[StarAtlas] Fetched ${ships.length} ships`);
            return { success: true, data: ships };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            console.error('[StarAtlas] Error fetching ships:', message);
            return { success: false, error: message };
        }
    }

    /**
     * Get ships filtered by type
     */
    async getShipsByType(itemType: string): Promise<StarAtlasResponse> {
        const result = await this.fetchAllShips();

        if (!result.success || !result.data) {
            return result;
        }

        const filtered = result.data.filter(ship =>
            ship.attributes?.itemType?.toLowerCase().includes(itemType.toLowerCase())
        );

        return { success: true, data: filtered };
    }

    /**
     * Get ships filtered by class
     */
    async getShipsByClass(shipClass: string): Promise<StarAtlasResponse> {
        const result = await this.fetchAllShips();

        if (!result.success || !result.data) {
            return result;
        }

        const filtered = result.data.filter(ship =>
            ship.attributes?.class?.toLowerCase().includes(shipClass.toLowerCase())
        );

        return { success: true, data: filtered };
    }

    /**
     * Get ships filtered by manufacturer
     */
    async getShipsByManufacturer(manufacturer: string): Promise<StarAtlasResponse> {
        const result = await this.fetchAllShips();

        if (!result.success || !result.data) {
            return result;
        }

        const filtered = result.data.filter(ship =>
            ship.attributes?.manufacturer?.toLowerCase().includes(manufacturer.toLowerCase())
        );

        return { success: true, data: filtered };
    }

    /**
     * Get random ships for display (demo purposes)
     */
    async getRandomShips(count: number = 6): Promise<StarAtlasResponse> {
        const result = await this.fetchAllShips();

        if (!result.success || !result.data) {
            return result;
        }

        // Filter only ships (not resources or components)
        const shipsOnly = result.data.filter(item =>
            item.attributes?.itemType === 'ship'
        );

        // Shuffle and take random selection
        const shuffled = [...shipsOnly].sort(() => Math.random() - 0.5);
        const random = shuffled.slice(0, count);

        return { success: true, data: random };
    }

    /**
     * Get ship by ID
     */
    async getShipById(id: string): Promise<StarAtlasShip | null> {
        const result = await this.fetchAllShips();

        if (!result.success || !result.data) {
            return null;
        }

        return result.data.find(ship => ship._id === id) || null;
    }

    /**
     * Clear cache (useful for testing)
     */
    clearCache(): void {
        this.shipCache = null;
        this.lastFetch = 0;
        console.log('[StarAtlas] Cache cleared');
    }
}

export const starAtlasService = new StarAtlasService();

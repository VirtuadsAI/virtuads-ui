/**
 * Decentraland Service - API client for Decentraland Peer Nodes
 * Fetches profile and scene data to verify metaverse presence
 */

export interface DCLProfile {
    name: string;
    avatarUrl: string;
    description?: string;
    hasDecentralandName: boolean;
}

class DecentralandService {
    private baseUrl: string = 'https://peer.decentraland.org';

    /**
     * Fetches a Decentraland profile by wallet address
     */
    async getProfile(address: string): Promise<DCLProfile | null> {
        try {
            console.log(`[DCL] Fetching profile for ${address}...`);
            const response = await fetch(`${this.baseUrl}/lambdas/profiles/${address.toLowerCase()}`);

            if (!response.ok) return null;

            const data = await response.json();
            if (!data || data.length === 0) return null;

            const profile = data[0].avatars[0];
            return {
                name: profile.name,
                avatarUrl: profile.avatar.snapshots.face256,
                description: profile.description,
                hasDecentralandName: profile.hasClaimedName
            };
        } catch (error) {
            console.warn('[DCL] Error fetching profile:', error);
            return null;
        }
    }

    /**
     * Gets public scene data near a coordinate (Mock or Peer API)
     */
    async getSceneStats() {
        // In a real implementation, this would query scene deployments or catalysts
        return {
            activeUsers: Math.floor(Math.random() * 500) + 100,
            totalScenes: 42,
            hottestSpot: 'Genesis Plaza'
        };
    }
}

export const decentralandService = new DecentralandService();

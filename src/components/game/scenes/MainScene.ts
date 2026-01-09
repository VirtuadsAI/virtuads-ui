import Phaser from 'phaser';
import { n8nService } from '../../../services/n8nService';
import { analyticsService } from '../../../services/analyticsService';

export default class MainScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private coins!: Phaser.Physics.Arcade.Group;
    private adBillboard!: Phaser.GameObjects.Rectangle;
    private adText!: Phaser.GameObjects.Text;
    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text;
    private lastAdUpdate: number = 0;

    constructor() {
        super('MainScene');
    }

    preload() {
        // Basic assets using placeholders since we are in a local dev environment
        this.load.image('coin', 'https://labs.phaser.io/assets/sprites/coin.png');
        this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
    }

    create() {
        // Simple World
        this.add.grid(400, 300, 800, 600, 32, 32, 0x051505, 1, 0x0a2a0a);

        // Score
        this.scoreText = this.add.text(16, 16, 'XRP Rewards: 0', {
            fontSize: '24px',
            fontFamily: 'monospace',
            color: '#00ff88'
        });

        // Ad Billboard Section
        this.adBillboard = this.add.rectangle(400, 100, 600, 120, 0x001100, 0.8)
            .setStrokeStyle(2, 0x00ff88);

        this.adText = this.add.text(400, 100, 'Loading VirtuAds Campaign...', {
            fontSize: '18px',
            fontFamily: 'monospace',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 550 }
        }).setOrigin(0.5);

        // Player
        this.player = this.physics.add.sprite(400, 450, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setTint(0x00ff88);

        // Coins
        this.coins = this.physics.add.group({
            key: 'coin',
            repeat: 5,
            setXY: { x: 100, y: 300, stepX: 120 }
        });

        this.coins.children.iterate((child: any) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.setCollideWorldBounds(true);
        });

        // Physics
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, undefined, this);

        // Initial Ad Load
        this.updateAd();
    }

    update(time: number) {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200);
        } else {
            this.player.setVelocityY(0);
        }

        // Periodically update the ad (every 10 seconds for demo)
        if (time > this.lastAdUpdate + 10000) {
            this.updateAd();
            this.lastAdUpdate = time;
        }
    }

    private async updateAd() {
        try {
            // Mocking a campaign fetch for the game context
            const response = await n8nService.submitCampaign({
                name: "In-Game Ad Request",
                budget: "0",
                objective: "awareness"
            });

            if (response.success && response.data) {
                const recommendation = response.data.message || "VirtuAds AI: No targeted ads found.";
                this.adText.setText(`[AD] ${recommendation}`);

                // PHASE 4: Record Impression
                analyticsService.recordImpression({
                    nftokenId: "GAME_DASHBOARD_1",
                    campaignId: response.data.campaignId
                });
            }
        } catch (error) {
            this.adText.setText("[AD] Connecting to VirtuAds Network...");
        }
    }

    private collectCoin(player: any, coin: any) {
        coin.disableBody(true, true);
        this.score += 0.5;
        this.scoreText.setText(`XRP Rewards: ${this.score}`);

        // Re-spawn coin
        setTimeout(() => {
            coin.enableBody(true, Phaser.Math.Between(50, 750), Phaser.Math.Between(150, 550), true, true);
        }, 2000);
    }
}

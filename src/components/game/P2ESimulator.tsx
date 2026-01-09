import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import MainScene from './scenes/MainScene';

const P2ESimulator: React.FC = () => {
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const gameInstanceRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        if (!gameContainerRef.current) return;

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: gameContainerRef.current,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0, x: 0 },
                    debug: false
                }
            },
            scene: [MainScene],
            backgroundColor: '#050505'
        };

        gameInstanceRef.current = new Phaser.Game(config);

        return () => {
            if (gameInstanceRef.current) {
                gameInstanceRef.current.destroy(true);
                gameInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
                <h3 className="text-xl font-bold text-brand-green mb-2">Simulador P2E - VirtuAds AI</h3>
                <p className="text-brand-gray text-sm">
                    Usa las flechas del teclado para moverte y recolectar recompensas.
                    <br />
                    Observa cómo los anuncios en el visor superior se sincronizan con la API de IA.
                </p>
            </div>

            <div
                ref={gameContainerRef}
                className="rounded-3xl border-4 border-brand-green/20 overflow-hidden shadow-[0_0_50px_rgba(0,255,136,0.1)]"
            />

            <div className="mt-6 flex gap-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-brand-green rounded-full shadow-[0_0_10px_#00ff88]"></div>
                    <span className="text-white">API CONNECTED</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
                    <span className="text-white">XRPL TESTNET LIVE</span>
                </div>
            </div>
        </div>
    );
};

export default P2ESimulator;

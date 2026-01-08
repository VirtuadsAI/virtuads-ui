/**
 * 🚀 SCRIPT DE AYUDA PARA ACTUALIZACIÓN DE LINKEDIN - VIRTUADSAI
 * 
 * Instrucciones:
 * 1. Asegúrate de estar en la vista de "Administrador" de la página de LinkedIn de VirtuAdsAI.
 * 2. Presiona F12 (o Click Derecho -> Inspeccionar) para abrir las Developer Tools.
 * 3. Ve a la pestaña "Console" (Consola).
 * 4. Copia TODO este código y pégalo en la consola.
 * 5. Presiona ENTER.
 */

(function () {
    console.clear();
    const styleTitle = "color: #00A699; font-size: 16px; font-weight: bold; padding: 10px 0;";
    const styleLabel = "color: #2D3748; font-weight: bold; font-size: 12px; margin-top: 10px;";
    const styleContent = "color: #4A5568; background: #F7FAFC; padding: 10px; border-left: 4px solid #00A699; margin-bottom: 20px; white-space: pre-wrap;";

    const data = {
        tagline: "Primera plataforma Web3 de publicidad descentralizada con IA y Blockchain (XRPL)",
        website: "https://virtuads.ai",
        about: `VirtuAdsAI es la primera plataforma publicitaria descentralizada diseñada para democratizar el mercado global de publicidad digital ($600B+).

Conectamos anunciantes, desarrolladores de metaversos/juegos Play-to-Earn y usuarios finales mediante una infraestructura transparente, equitativa y eficiente construida sobre Web3.

🚨 NUESTRA TECNOLOGÍA:
🔹 Blockchain XRPL: Pagos programables instantáneos en stablecoins y CBDCs.
🔹 Inteligencia Artificial: Agentes autónomos para optimización de campañas y auditoría de contenido.
🔹 Chainlink CCIP: Interoperabilidad multi-cadena y oráculos seguros.
🔹 Privacy-First: Integración con Brave/BAT y ZK-Proofs para proteger al usuario.

🎮 PARA DESARROLLADORES P2E:
Ofrecemos un SDK nativo para Unity/Unreal Engine que permite monetizar juegos y metaversos con anuncios no intrusivos (NFT Ads), garantizando un revenue share justo del 22% y pagos inmediatos.

Nuestra Misión: Romper el monopolio centralizado de la publicidad digital y devolver el valor a quienes realmente lo generan.`,
        specialties: "Publicidad Descentralizada, Web3 Marketing, Blockchain, Artificial Intelligence, XRPL, Metaverse Monetization, Play-to-Earn, Smart Contracts"
    };

    console.log("%c🚀 DATOS PARA ACTUALIZAR VIRTUADSAI", styleTitle);

    console.log("%c▼ TAGLINE (Eslogan)", styleLabel);
    console.log(`%c${data.tagline}`, styleContent);

    console.log("%c▼ SITIO WEB", styleLabel);
    console.log(`%c${data.website}`, styleContent);

    console.log("%c▼ DESCRIPCIÓN (About)", styleLabel);
    console.log(`%c${data.about}`, styleContent);

    console.log("%c▼ ESPECIALIDADES", styleLabel);
    console.log(`%c${data.specialties}`, styleContent);

    // Intentar copiar la descripción al portapapeles automáticamente porque es lo más largo
    try {
        navigator.clipboard.writeText(data.about).then(() => {
            console.log("%c✅ La DESCRIPCIÓN ha sido copiada a tu portapapeles automáticamente.", "color: green; font-weight: bold; font-size: 14px;");
            alert("He copiado la Descripción (About) a tu portapapeles.\n\nPuedes pegarla directamente.\n\nRevisa la consola (F12) para ver el resto de los datos (Tagline, Website, etc).");
        });
    } catch (e) {
        console.warn("No se pudo copiar automáticamente al portapapeles. Por favor copia el texto de la consola manualmente.");
    }
})();

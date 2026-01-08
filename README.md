# 🌐 VirtuAdsAI - Publicidad Web3 Descentralizada

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/react-%5E18.0.0-61DAFB.svg)
![Vite](https://img.shields.io/badge/vite-%5E5.0.0-646CFF.svg)
![XRPL](https://img.shields.io/badge/XRPL-Integrated-black.svg)

**VirtuAdsAI** es la primera plataforma publicitaria descentralizada que conecta anunciantes, desarrolladores de metaversos/juegos P2E y usuarios finales mediante tecnología Blockchain (XRPL) e Inteligencia Artificial.

Nuestra misión es democratizar la publicidad digital, ofreciendo transparencia total, pagos programables en stablecoins/CBDCs y un reparto de ingresos justo.

---

## 🚀 Características Principales

* **🔗 Trazabilidad On-Chain**: Todas las impresiones y conversiones se registran en la blockchain para una transparencia inmutable.
* **🤖 Agentes IA**: Optimización automática de campañas, generación de creatividades y auditoría de contenido impulsada por IA.
* **💸 Pagos Programables (XRPL)**: Liquidación instantánea en stablecoins (USDC, USDT) y CBDCs (Bre·B, RLUSD).
* **🎮 Metaverso & P2E Ready**: SDK nativo para integrar anuncios (NFT Ads) en Unity y Unreal Engine.
* **🛡️ Privacy-First**: Integración con Brave y tecnologías Zero-Knowledge Proofs para proteger los datos del usuario.
* **🌍 Multilenguaje**: Soporte nativo para Español e Inglés.

---

## 🛠️ Stack Tecnológico

Este proyecto utiliza tecnologías modernas para garantizar rendimiento y escalabilidad:

* **Frontend**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
* **Animaciones**: Lucide React
* **Routing**: React Router DOM 6
* **Gestión de Estado**: React Context API
* **Internacionalización**: i18next
* **Blockchain**: XRPL.js
* **Orquestación**: n8n (para flujos de trabajo de IA)

---

## 🏁 Comenzando

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### Prerrequisitos

* Node.js (v18 o superior)
* npm o yarn

### Instalación

1. **Clonar el repositorio**

    ```bash
    git clone https://github.com/JsMelix/virtuads-ui.git
    cd virtuads-ui
    ```

2. **Instalar dependencias**

    ```bash
    npm install
    ```

3. **Configurar variables de entorno**
    Copia el archivo de ejemplo y configura tus claves (si es necesario para funcionalidades avanzadas).

    ```bash
    cp .env.example .env
    ```

4. **Iniciar servidor de desarrollo**

    ```bash
    npm run dev
    ```

    La aplicación estará disponible en `http://localhost:5173`.

---

## 📂 Estructura del Proyecto

```
src/
├── assets/         # Imágenes y recursos estáticos
├── components/     # Componentes React reutilizables
│   ├── layout/     # Header, Footer, etc.
│   ├── sections/   # Secciones de las páginas (Hero, Features, etc.)
│   └── ui/         # Componentes UI básicos (Botones, Inputs, Modales)
├── context/        # Contextos globales (Wallet, Estado)
├── hooks/          # Custom Hooks
├── locales/        # Archivos de traducción (es.json, en.json)
├── pages/          # Páginas principales (Home, Developers, Dashboard)
├── services/       # Servicios de API y Blockchain
└── types/          # Definiciones de tipos TypeScript
```

---

## 🗺️ Roadmap

* [x] **Fase 1**: Lanzamiento de Landing Page y Whitepaper.
* [x] **Fase 1**: Integración básica de UI y sistema de diseño.
* [ ] **Fase 2**: Conexión con Wallet XRPL (Testnet).
* [ ] **Fase 2**: Integración de Agentes IA vía n8n.
* [ ] **Fase 3**: Lanzamiento del Dashboard para Anunciantes.

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, lee nuestros "Términos y Condiciones" para desarrolladores antes de enviar un Pull Request.

1. Haz un Fork del proyecto.
2. Crea tu rama de funcionalidad (`git checkout -b feature/AmazingFeature`).
3. Haz Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4. Haz Push a la rama (`git push origin feature/AmazingFeature`).
5. Abre un Pull Request.

---

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

---

<p align="center">
  Hecho con ❤️ por el equipo de VirtuAdsAI
</p>

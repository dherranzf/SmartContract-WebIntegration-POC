#  PoC Ether.JS — Mint Frontend and Smart Contract Integration

A technology-focused proof-of-concept demonstrating a compact, production-minded integration between a React (Vite) frontend and an ERC20-compatible minting contract. This repo highlights why specific technologies were chosen — React for component-driven UI, Vite for fast iterative development, ethers.js for robust and portable contract interaction, MetaMask for standard wallet integration, and Solidity for on-chain logic.

## 📑 Table of contents
- [⚙️ Features](#-features)
- [📐 Architecture and design](#-architecture-and-design)
- [🎨 Technology stack](#-technology-stack)
- [🗂️ Project structure](#-project-structure)
- [📖 Usage and running locally](#-usage-and-running-locally)
- [🔮 Future improvements](#-future-improvements)
- [📜 License](#-license)

## ⚙️ Features
- Modern UI for minting tokens.
- MetaMask connection and account detection.
- Automatic switch to the configured chain (VITE_BASE_CHAIN_ID) and ability to add the chain if missing.
- Token balance reading from the contract with formatted display.
- Modular services: walletService, networkService, mintService, tokenService.

## 📐 Architecture and design
1. Separation of concerns: network, wallet, token and mint logic are implemented in independent services under src/services.
2. Reactive UI: React components (MainMint) consume state and asynchronous services.

### Main flow
- User connects their wallet → switch to configured network → read token balance → mint tokens using mintService.

## 🎨 Technology stack
- React + Vite
  - Component-driven UI library that simplifies state management and reactive rendering. Chosen for fast development and ease of composing the mint UI.
  - Development build tool with extremely fast hot module replacement (HMR) and a minimal configuration surface. Ideal for prototyping and iterative frontend work.
- JavaScript
  - Primary language for the frontend. Familiar, lightweight and supported by the entire web ecosystem. JSX enables a concise component syntax in React.
- ethers.js
  - Lightweight, well-maintained Ethereum library used for provider abstraction, signing transactions and contract interaction. The code includes compatibility with ethers v5 and v6 helper APIs to increase portability.
- MetaMask (window.ethereum)
  - Ubiquitous browser wallet provider for end-user key management. Using MetaMask keeps the demo aligned with how typical web3 users interact with dApps.
- Modern CSS and lightweight components
  - Simple, fast styling approach used for the demo UI. The styles aim for a modern, low-cost visual design without a heavy UI framework.
- Solidity (contracts)
  - Language for on-chain smart contracts (ERC20-compatible mint contract). Solidity is the standard for Ethereum-compatible chains and is referenced here as the contract implementation target.
- Node.js + npm
  - Tooling runtime to install dependencies and run the Vite dev server. Standard for modern JavaScript projects.
- .env (Vite env variables)
  - Stores runtime configuration such as VITE_CONTRACT_ADDRESS and VITE_BASE_CHAIN_ID so the app can be deployed to different environments without code changes.

## 🗂️ Project structure
```
src/
├── components/
│   └── MainMint.jsx          # Main UI
├── services/
│   ├── walletService.js     # Wallet connection and account management
│   ├── networkService.js    # Network switching / adding chain
│   ├── mintService.js       # Mint logic (ethers + contract)
│   └── tokenService.js      # Balance reading and formatting
├── resources/
│   └── contractABI.js       # Contract ABI used in the demo
├── App.jsx
├── main.jsx
├── styles/
│   └── main.css
└── index.css
```

## 📖 Usage and running locally
1. Clone the repository and enter the project folder:

   git clone <repo-url>
   cd Solidity-WebIntegration-POC

2. Install dependencies:

   npm install

3. Create a .env file at the project root with these variables (an example .env is included in the demo):

   VITE_CONTRACT_ADDRESS=0x...   # contract address to use
   VITE_BASE_CHAIN_ID=0x2105     # chainId in hex format (e.g. Base)

4. Start the dev server:

   npm run dev

5. Open the app in the browser (Vite will show the URL). Connect MetaMask and use the "Mint Token" button to test the functionality.

Notes:
- If MetaMask does not detect the configured network, the app will request a chain switch or addition.
- On-chain operations require gas funds on the selected network.

## 🧪 Testing and debugging
- Check the browser console for connection or transaction errors.
- Ensure VITE_CONTRACT_ADDRESS points to a contract that implements the functions used (balanceOf, decimals, mint).

## 🔮 Future improvements
- Support for multiple networks via a UI selector.
- Improved error handling and transaction feedback (toasts, transaction list/state).
- Backend integration to store events and enable historical queries.

## 📜 License
This project is licensed under the GPL-3.0 License. See the `LICENSE` file for details.
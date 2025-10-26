import React, { useState } from 'react'
import { CONTRACT_ABI } from './resources/contractABI'
import { connectWallet } from './services/walletService'
import { mintToken } from './services/mintService'
import MainMint from './components/MainMint'
import './styles/main.css'

function App() {
    // Load Vite environment variables at runtime
    const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
    const BASE_CHAIN_ID = import.meta.env.VITE_BASE_CHAIN_ID;

    const [account, setAccount] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isMinting, setIsMinting] = useState(false);

    // If critical env vars are missing, render an explanatory message instead of crashing
    if (!CONTRACT_ADDRESS || !BASE_CHAIN_ID) {
        console.error('Env variables not found: VITE_CONTRACT_ADDRESS or VITE_BASE_CHAIN_ID');
        return (
            <div style={{ padding: 20 }}>
                Missing environment variables: VITE_CONTRACT_ADDRESS or VITE_BASE_CHAIN_ID. Check your .env file and restart the dev server.
            </div>
        );
    }

    const handleConnectWallet = async () => {
        await connectWallet(setAccount, setIsConnected, BASE_CHAIN_ID);
    };

    const handleMintToken = async () => {
        await mintToken(isConnected, setIsMinting, CONTRACT_ADDRESS, BASE_CHAIN_ID);
    };

    return (
      <MainMint
        account={account}
        isConnected={isConnected}
        isMinting={isMinting}
        handleConnectWallet={handleConnectWallet}
        handleMintToken={handleMintToken}
      />
    );
}

export default App

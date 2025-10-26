import React, { useState } from 'react'
import { CONTRACT_ABI } from './resources/contractABI'
import { connectWallet } from './services/walletService'
import { mintToken } from './services/mintService'
import MainMint from './components/MainMint'
import './styles/main.css'

//Contract Configuration
if (!CONTRACT_ADDRESS || !BASE_CHAIN_ID) {
  throw new Error('Env variables not find: VITE_CONTRACT_ADDRESS o VITE_BASE_CHAIN_ID');
}

function App() {
    const [account, setAccount] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isMinting, setIsMinting] = useState(false);

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

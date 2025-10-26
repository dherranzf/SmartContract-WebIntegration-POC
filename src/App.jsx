import React, { useState, useEffect } from 'react'
import { getTokenCount } from './services/tokenService'
import { connectWallet } from './services/walletService'
import { mintToken } from './services/mintService'
import MainMint from './components/MainMint'
import './styles/main.css'
import { ethers } from 'ethers'

function App() {
    // Load Vite environment variables at runtime
    const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
    const BASE_CHAIN_ID = import.meta.env.VITE_BASE_CHAIN_ID;

    const [account, setAccount] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isMinting, setIsMinting] = useState(false);
    const [tokenCount, setTokenCount] = useState(null);

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

    useEffect(() => {
        let mounted = true;
        if (isConnected && account) {
            const load = async () => {
                try {
                    const balance = await getTokenCount(account, CONTRACT_ADDRESS);
                    if (!mounted) return;
                    setTokenCount(balance !== null ? balance : '0');
                } catch (err) {
                    console.error('Error loading token count', err);
                    if (mounted) setTokenCount('0');
                }
            };

            load();

            // Optionally listen to account changes from wallet
            if (window.ethereum && window.ethereum.on) {
                const handleAccountsChanged = (accounts) => {
                    if (accounts && accounts.length) {
                        setAccount(accounts[0]);
                    } else {
                        setAccount('');
                        setIsConnected(false);
                        setTokenCount(null);
                    }
                };

                window.ethereum.on('accountsChanged', handleAccountsChanged);
                return () => {
                    mounted = false;
                    if (window.ethereum.removeListener) {
                        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                    }
                };
            }
        }
    }, [isConnected, account]);

    return (
      <MainMint
        account={account}
        isConnected={isConnected}
        isMinting={isMinting}
        tokenCount={tokenCount}
        handleConnectWallet={handleConnectWallet}
        handleMintToken={handleMintToken}
        contractAddress={CONTRACT_ADDRESS}
      />
    );
}

export default App

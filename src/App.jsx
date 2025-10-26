import React, { useState } from 'react'
import { ethers } from 'ethers'
import { CONTRACT_ABI } from './resources/contractABI'

//Contract Configuration
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const BASE_CHAIN_ID = import.meta.env.VITE_BASE_CHAIN_ID;

function App() {
    const [account, setAccount] = useState('');
    const [isConnected, setisConnected] = useState(false);
    const [isMinting, setIsMinting] = useState(false);

  // Connect to MetaMask
    const connectWallet = async () => {
        if (!window.ethereum) {
        alert('Please install MetaMask!')
        return
        }

        try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = accounts[0]
        
        // Switch to Base Network
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })

        if (chainId !== BASE_CHAIN_ID) {
            try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: BASE_CHAIN_ID }],
            })
            } catch (switchError) {
            if (switchError.code === 4902) {
                // Chain not added, request to add it
                await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: BASE_CHAIN_ID,
                    chainName: 'Base Network',
                    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                    rpcUrls: ['https://base-rpc.network/'],
                    blockExplorerUrls: ['https://basescan.org/']
                }]
                })
            }
            }
        }
        setAccount(account)
        setIsConnected(true)
    
        } catch (error) {
        console.error('Connection error:', error)
        alert('Failed to connect')
        }
    }

     // Mint token
    const mintToken = async () => {
        if (!isConnected) return
        
        setIsMinting(true)
        
        try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
        
        const tx = await contract.mintBAC()
        await tx.wait()
        
        alert('Token minted!')
        
        
        } catch (error) {
        console.error('Mint error:', error)
        alert('Minting failed')
        } finally {
        setIsMinting(false)
        }
    }

    return (
    <div className="container">
      <h1>Blockchain Accelerator</h1>
      
      {!isConnected ? (
        <button onClick={connectWallet}>
          Connect MetaMask
        </button>
      ) : (
        <div>
          <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>

          <button 
            onClick={mintToken} 
            disabled={isMinting}
          >
            {isMinting ? 'Minting...' : 'Mint Token'}
          </button>
        </div>
      )}
    </div>
  )

}


export default App

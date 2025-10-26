// New wallet service moved from src/walletUtils.js
import { switchToBaseNetwork } from './networkService';

export async function connectWallet(setAccount, setIsConnected, BASE_CHAIN_ID) {
    if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
    }
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        await switchToBaseNetwork(BASE_CHAIN_ID);
        setAccount(account);
        setIsConnected(true);
        return account;
    } catch (error) {
        console.error('Connection error:', error);
        alert(`Failed to connect: ${error.message || error}`);
        throw error;
    }
}

import { ethers } from 'ethers';
import { CONTRACT_ABI } from './resources/contractABI';
import { switchToBaseNetwork } from './networkUtils';

export async function mintToken(isConnected, setIsMinting, CONTRACT_ADDRESS, BASE_CHAIN_ID) {
    if (!isConnected) return;
    await switchToBaseNetwork(BASE_CHAIN_ID);
    setIsMinting(true);
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const tx = await contract.mintBAC();
        await tx.wait();
        alert('Token minted!');
    } catch (error) {
        console.error('Mint error:', error);
        alert('Minting failed');
    } finally {
        setIsMinting(false);
    }
}

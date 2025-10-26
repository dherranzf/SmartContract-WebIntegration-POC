import { ethers } from 'ethers';
import { CONTRACT_ABI } from '../resources/contractABI';
import { switchToBaseNetwork } from './networkService';

export async function mintToken(isConnected, setIsMinting, CONTRACT_ADDRESS, BASE_CHAIN_ID) {
    if (!isConnected) return;
    if (!window.ethereum) throw new Error('MetaMask not found');
    await switchToBaseNetwork(BASE_CHAIN_ID);
    setIsMinting(true);
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const wallet = await signer.getAddress();
        if (!wallet) throw new Error('Unable to get wallet address from signer');
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        // Read ERC20 decimals and compute scaled amount for minting
        const decimalsRaw = await contract.decimals();
        const decimals = typeof decimalsRaw === 'bigint' ? Number(decimalsRaw) : Number(decimalsRaw);
        const scalingFactor = BigInt(10) ** BigInt(decimals);
        // Default token amount is 100 tokens, scaled by decimals for uint256 parameter
        const mintAmount = BigInt(100) * scalingFactor;
        const tx = await contract.mint(wallet, mintAmount);
        await tx.wait();
        alert(`Token(s) minted: ${mintAmount} to ${wallet}`);
        return tx;
    } catch (error) {
        console.error('Mint error:', error);
        alert('Minting failed');
        throw error;
    } finally {
        setIsMinting(false);
    }
}

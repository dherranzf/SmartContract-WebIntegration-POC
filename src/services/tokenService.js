import { ethers } from 'ethers';
import { CONTRACT_ABI } from '../resources/contractABI';
import { switchToBaseNetwork } from './networkService';

export async function mintBAC(CONTRACT_ADDRESS, BASE_CHAIN_ID) {
    if (!window.ethereum) throw new Error('MetaMask not found');
    await switchToBaseNetwork(BASE_CHAIN_ID);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const tx = await contract.mintBAC();
    await tx.wait();
    return tx;
}

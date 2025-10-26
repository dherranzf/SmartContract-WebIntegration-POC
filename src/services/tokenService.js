import { ethers } from 'ethers';
import { CONTRACT_ABI } from '../resources/contractABI';
import { switchToBaseNetwork } from '../networkUtils';

export async function mintBAC(CONTRACT_ADDRESS, BASE_CHAIN_ID) {
    await switchToBaseNetwork(BASE_CHAIN_ID);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const tx = await contract.mintBAC();
    await tx.wait();
    return tx;
}

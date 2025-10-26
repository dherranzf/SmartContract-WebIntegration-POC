// New network service moved from src/networkUtils.js
export async function switchToBaseNetwork(BASE_CHAIN_ID) {
    if (!window.ethereum) throw new Error('MetaMask not found');
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== BASE_CHAIN_ID) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: BASE_CHAIN_ID }],
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                // Chain not added, request to add it
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: BASE_CHAIN_ID,
                        chainName: 'Base Network',
                        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                        rpcUrls: ['https://mainnet.base.org/'],
                        blockExplorerUrls: ['https://basescan.org/']
                    }]
                });
            } else {
                throw switchError;
            }
        }
    }
}

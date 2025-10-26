export async function connectWallet(setAccount, setIsConnected, BASE_CHAIN_ID) {
    if (!window.ethereum) {
        alert('Please install MetaMask!')
        return
    }
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = accounts[0]
        await import('./networkUtils').then(({ switchToBaseNetwork }) => switchToBaseNetwork(BASE_CHAIN_ID));
        setAccount(account)
        setIsConnected(true)
    } catch (error) {
        console.error('Connection error:', error);
        alert(`Failed to connect: ${error.message || error}`);
    }
}
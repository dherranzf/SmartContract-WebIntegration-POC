import React from 'react';

export default function MainMint({ account, isConnected, isMinting, tokenCount, handleConnectWallet, handleMintToken, contractAddress }) {
    const shortAccount = account ? `${account.slice(0,6)}...${account.slice(-4)}` : '';

    return (
        <div className="app-shell">
            <div className="glass-card">
                <header className="card-header">
                    <h1 className="title">CriptoMoonWolf</h1>
                    <div className="header-actions">
                        <div className={`status-pill ${isConnected ? 'connected' : 'disconnected'}`}>
                            {isConnected ? 'Wallet Connected' : 'Wallet Disconnected'}
                        </div>
                        <button className="btn small" onClick={handleConnectWallet}>
                            {isConnected ? shortAccount : 'Connect Wallet'}
                        </button>
                    </div>
                </header>

                <main className="card-body">
                    <section className="panel left">
                        <div className="balance">
                            <div className="balance-label">Your Tokens</div>
                            <div className="balance-value">{isConnected ? (tokenCount !== null ? tokenCount : '—') : 'Connect to view'}</div>
                        </div>

                        <div className="mint-actions">
                            <button className={`btn primary ${isMinting ? 'loading' : ''}`} onClick={handleMintToken} disabled={!isConnected || isMinting}>
                                {isMinting ? 'Minting...' : 'Mint Token'}
                            </button>
                            <div className="hint">Network-aware mint. Make sure your wallet is on the right network.</div>
                        </div>
                    </section>

                    <section className="panel right">
                        <div className="card-metrics">
                            <div className="metric">
                                <div className="metric-title">Network</div>
                                <div className="metric-value">{isConnected ? 'Mainnet/Testnet' : '—'}</div>
                            </div>

                            <div className="metric">
                                <div className="metric-title">Gas</div>
                                <div className="metric-value">Dynamic</div>
                            </div>

                            <div className="metric">
                                <div className="metric-title">Status</div>
                                <div className="metric-value">{isMinting ? 'Minting' : (isConnected ? 'Idle' : 'Disconnected')}</div>
                            </div>
                        </div>

                    </section>
                </main>

                <footer className="card-footer">
                    <div className="footer-left">Contract: <span className="mono">{contractAddress || import.meta.env.VITE_CONTRACT_ADDRESS || 'env hidden'}</span></div>
                    <div className="footer-right">Made for demo — modern dark UI</div>
                </footer>
            </div>
        </div>
    )
}

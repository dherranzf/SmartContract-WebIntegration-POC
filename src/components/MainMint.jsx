import React from 'react';

function MainMint({ account, isConnected, isMinting, handleConnectWallet, handleMintToken }) {
  return (
    <div className="container">
      <h1>CriptoMoonToken MINT</h1>
      {!isConnected ? (
        <button onClick={handleConnectWallet} disabled={isMinting || isConnected}>
          Connect MetaMask
        </button>
      ) : (
        <div>
          <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
          <button 
            onClick={handleMintToken} 
            disabled={isMinting}
          >
            {isMinting ? 'Minting...' : 'Mint Token'}
          </button>
        </div>
      )}
    </div>
  );
}

export default MainMint;

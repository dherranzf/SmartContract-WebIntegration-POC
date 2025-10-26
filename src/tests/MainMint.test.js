// Example test for MainMint component
import React from 'react';
import { render, screen } from '@testing-library/react';
import MainMint from '../components/MainMint';

test('renders connect button when not connected', () => {
  render(<MainMint account="" isConnected={false} isMinting={false} handleConnectWallet={() => {}} handleMintToken={() => {}} />);
  expect(screen.getByText(/Connect MetaMask/i)).toBeInTheDocument();
});

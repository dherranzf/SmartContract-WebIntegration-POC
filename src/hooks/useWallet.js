import { useState } from 'react';

export function useWallet() {
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  return { account, setAccount, isConnected, setIsConnected };
}

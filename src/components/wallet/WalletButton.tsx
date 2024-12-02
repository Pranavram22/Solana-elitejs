import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Wallet } from 'lucide-react';

const WalletButton = () => {
  const { publicKey } = useWallet();

  return (
    <div className="relative group">
      <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 !rounded-lg !h-10 !px-4 !py-2">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4" />
          {publicKey ? 'Connected' : 'Connect Wallet'}
        </div>
      </WalletMultiButton>
    </div>
  );
};

export default WalletButton;
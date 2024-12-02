import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { DOCUMENT_PROGRAM_ID } from '../config/solana';

export const useSolanaDocument = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const verifyDocument = async (documentHash: string) => {
    if (!publicKey) throw new Error('Wallet not connected');

    try {
      const instruction = new TransactionInstruction({
        keys: [
          {
            pubkey: publicKey,
            isSigner: true,
            isWritable: true,
          },
        ],
        programId: DOCUMENT_PROGRAM_ID,
        data: Buffer.from(documentHash),
      });

      const transaction = new Transaction().add(instruction);
      const signature = await sendTransaction(transaction, connection);
      
      await connection.confirmTransaction(signature);
      return signature;
    } catch (error) {
      console.error('Error verifying document:', error);
      throw error;
    }
  };

  const getDocumentVerifications = async (documentHash: string) => {
    if (!publicKey) return [];

    try {
      const signatures = await connection.getSignaturesForAddress(
        new PublicKey(DOCUMENT_PROGRAM_ID)
      );
      
      return signatures.map(sig => ({
        signature: sig.signature,
        timestamp: new Date(sig.blockTime! * 1000),
        verified: true,
      }));
    } catch (error) {
      console.error('Error fetching verifications:', error);
      return [];
    }
  };

  return {
    verifyDocument,
    getDocumentVerifications,
    isWalletConnected: !!publicKey,
    walletAddress: publicKey?.toString(),
  };
};
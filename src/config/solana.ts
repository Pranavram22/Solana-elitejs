import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

export const SOLANA_NETWORK = 'devnet';
export const SOLANA_RPC_ENDPOINT = clusterApiUrl(SOLANA_NETWORK);
export const connection = new Connection(SOLANA_RPC_ENDPOINT);

// Document verification program ID (replace with your actual program ID)
export const DOCUMENT_PROGRAM_ID = new PublicKey('11111111111111111111111111111111');

export const SOL_EXPLORER_URL = 'https://explorer.solana.com';
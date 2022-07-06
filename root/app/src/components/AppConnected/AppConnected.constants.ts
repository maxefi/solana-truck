import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

/* 
 * View list of available wallets at
 * https://github.com/solana-labs/wallet-adapter#wallets
 * */
export const wallets: PhantomWalletAdapter[] = [
  new PhantomWalletAdapter(),
];
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { localNetwork } from './App.constants';

const wallets: PhantomWalletAdapter[] = [
  /* 
   * View list of available wallets at
   * https://github.com/solana-labs/wallet-adapter#wallets
   * */
  new PhantomWalletAdapter(),
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/*
      * Wallet configuration as specified here: https://github.com/solana-labs/wallet-adapter#setup
      * */}
    <ConnectionProvider endpoint={localNetwork}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

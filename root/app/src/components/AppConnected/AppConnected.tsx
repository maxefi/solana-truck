import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { devNetwork } from '../../constants';
import { wallets } from './AppConnected.constants';
import { App } from '../App';

/*
 * Wallet configuration as specified here: https://github.com/solana-labs/wallet-adapter#setup
 * */
const AppConnected = () => {
  return (
    <ConnectionProvider endpoint={devNetwork}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default AppConnected;
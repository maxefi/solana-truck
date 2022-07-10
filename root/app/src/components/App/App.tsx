import { ReactElement, useState, useCallback, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { AppStyled, AppWalletButtonWrapper } from './App.styles';
import { Account } from '../../interfaces';
import { Counter } from '../Counter';
import { AppStoreProvider } from './AppStore/AppStore';
import { DEFAULT_APP_STORE } from './AppStore/AppStore.constants';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Idl, Program, Wallet } from '@project-serum/anchor';

import idl from '../../idl.json';
import { devNetwork } from '../../constants';
import { opts } from './App.constants';
import { BaseAccount, ProgramIdl, Provider } from './App.interface';
import { Loader } from '../Loader';
import { Messages } from '../Messages';

require('@solana/wallet-adapter-react-ui/styles.css');

const App = (): ReactElement => {
  const wallet = useWallet();

  const [error, setError] = useState<string>('');

  const [baseAccount, setBaseAccount] = useState<BaseAccount>(null);
  const [provider, setProvider] = useState<Provider>(null);
  const [program, setProgram] = useState<ProgramIdl>(null);

  const isLoading = !baseAccount || !provider || !program;

  useEffect(() => {
    const connection = new Connection(devNetwork, opts.preflightCommitment);
    const provider = new AnchorProvider(connection, wallet as unknown as Wallet, opts);

    setBaseAccount(Keypair.generate());
    setProvider(provider);
    setProgram(new Program(
      idl as Idl,
      new PublicKey(idl.metadata.address),
      provider
    ));
  }, [wallet]);

  const getAccountHandler = useCallback(async (): Promise<Nullable<Account>> => {
    if (!baseAccount || !program) {
      return null;
    }

    return await program.account.baseAccount.fetch(baseAccount.publicKey) as unknown as Account;
  }, [baseAccount, program]);

  const setErrorHandler = useCallback((error: string) => setError(error), []);

  if (!wallet?.connected) {
    return (
      <AppWalletButtonWrapper>
        <WalletMultiButton />
      </AppWalletButtonWrapper>
    )
  }

  return (
    <AppStoreProvider store={{ ...DEFAULT_APP_STORE, baseAccount, program, provider }}>
      {isLoading ? (
        <Loader />
      ) : (
        <AppStyled>
          <Counter getAccount={getAccountHandler} setError={setErrorHandler} />
          <Messages getAccount={getAccountHandler} setError={setErrorHandler} />
          {error && <div><code>{error}</code></div>}
        </AppStyled>
      )}
    </AppStoreProvider>
  );
}

export default App;

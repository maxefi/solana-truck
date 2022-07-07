import { ReactElement, useState, Fragment } from 'react';
import { SystemProgram } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { AppStyled, AppWalletButtonWrapper } from './App.styles';
import { Account } from './App.interface';
import { useAppConfig } from './App.hooks';

require('@solana/wallet-adapter-react-ui/styles.css');

const App = (): ReactElement => {
  const { wallet, baseAccount, provider, program } = useAppConfig();

  const [count, setCount] = useState<Nullable<string>>(null);
  const [error, setError] = useState<string>('');

  async function getAccount(): Promise<Account> {
    return await program.account.baseAccount.fetch(baseAccount.publicKey) as unknown as Account;;
  }

  async function createCounter(): Promise<void> {
    try {
      await program.rpc.create({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });

      const account = await getAccount();
        
      setCount(account.count.toString());
    } catch (error) {
      console.log("Transaction error while CREATING counter: ", error);
      setError(error as string);
    }
  }

  async function incrementCounter(): Promise<void> {
    try {
      await program.rpc.increment({
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      });
  
      const account = await getAccount();
    
      setCount(account.count.toString());
    } catch (error) {
      console.log("Transaction error while INCREMENTING counter: ", error);
      setError(error as string);
    }
  }

  async function decrementCounter(): Promise<void> {
    try {
      await program.rpc.decrement({
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      });
  
      const account = await getAccount();
  
      setCount(account.count.toString());
    } catch (error) {
      console.log("Transaction error while INCREMENTING counter: ", error);
      setError(error as string);
    }
  }

  function renderCounter(): ReactElement {
    if (count) {
      return (
        <Fragment>
          <h2>{count}</h2>
          <button onClick={incrementCounter}>Increment counter</button>
          <button onClick={decrementCounter}>Decrement counter</button>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <h3>Please create the counter.</h3>
        <button onClick={createCounter}>Create counter</button>
      </Fragment>
    );
  }

  if (!wallet.connected) {
    return (
      <AppWalletButtonWrapper>
        <WalletMultiButton />
      </AppWalletButtonWrapper>
    )
  }

  return (
    <AppStyled>
      {renderCounter()}
      {error && <code>{error}</code>}
    </AppStyled>
  );
}

export default App;

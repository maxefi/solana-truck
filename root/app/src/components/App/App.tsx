import { ReactElement, useState, Fragment } from 'react';
import { SystemProgram } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { AppStyled, AppWalletButtonWrapper, AppCounterCountStyled } from './App.styles';
import { Account } from './App.interface';
import { useAppConfig } from './App.hooks';
import { Loader } from '../Loader';

require('@solana/wallet-adapter-react-ui/styles.css');

const App = (): ReactElement => {
  const { wallet, baseAccount, provider, program } = useAppConfig();

  const [count, setCount] = useState<Nullable<string>>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // TODO: fix type
  async function getAccount(): Nullable<Promise<Account>> {
    if (!baseAccount) {
      return null;
    }

    return await program.account.baseAccount.fetch(baseAccount.publicKey) as unknown as Account;
  }

  async function createCounter(): Promise<void> {
    try {
      if (baseAccount) {
        setIsLoading(true);

        await program.rpc.create({
          accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [baseAccount],
        });
  
        const account = await getAccount();
          
        if (account) {
          setCount(account.count.toString());
        }
      }
      // TODO: fix error type
    } catch (error) {
      console.log("Transaction error while CREATING counter: ", error);
      setError(error.error.errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function incrementCounter(): Promise<void> {
    try {
      if (baseAccount) {
        setIsLoading(true);

        await program.rpc.increment({
          accounts: {
            baseAccount: baseAccount.publicKey,
          },
        });
    
        const account = await getAccount();
      
        if (account) {
          setCount(account.count.toString());
        }      }
      // TODO: fix error type
    } catch (error) {
      console.log("Transaction error while INCREMENTING counter: ", error);
      setError(error.error.errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function decrementCounter(): Promise<void> {
    try {
      if (baseAccount) {
        setIsLoading(true);

        await program.rpc.decrement({
          accounts: {
            baseAccount: baseAccount.publicKey,
          },
        });
    
        const account = await getAccount();
    
        if (account) {
          setCount(account.count.toString());
        }
      }
      // TODO: fix error type
    } catch (error) {
      console.log("Transaction error while INCREMENTING counter: ", error);
      setError(error.error.errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  function renderCounter(): ReactElement {
    if (count) {
      return (
        <Fragment>
          <AppCounterCountStyled>
            {count}
            {isLoading && <Loader />}
          </AppCounterCountStyled>
          <button onClick={incrementCounter}>Increment counter</button>
          <button onClick={decrementCounter}>Decrement counter</button>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <h3>
          Please create the counter 
          {isLoading && <Loader />}
        </h3>
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
      {error && <div><code>{error}</code></div>}
    </AppStyled>
  );
}

export default App;

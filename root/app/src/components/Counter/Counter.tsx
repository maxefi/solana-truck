import { ReactElement, useState, Fragment, memo } from 'react';
import { SystemProgram } from '@solana/web3.js';

import { CounterCountStyled } from './Counter.styles';
import { Loader } from '../Loader';
import { CounterProps } from './Counter.interface';
import { useAppStore } from '../App/AppStore/AppStore';
import { ErrorRpc } from '../../interfaces';

require('@solana/wallet-adapter-react-ui/styles.css');

const Counter = ({ getAccount, setError }: CounterProps): ReactElement => {
  const { baseAccount, provider, program } = useAppStore();

  const [count, setCount] = useState<Nullable<string>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isConfigured = baseAccount && program && provider;

  async function createHandler(): Promise<void> {
    try {
      if (isConfigured) {
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
    } catch (error) {
      console.log("Transaction error while CREATING counter: ", error);
      setError((error as ErrorRpc).error.errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function incrementHandler(): Promise<void> {
    try {
      if (isConfigured) {
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
      setError((error as ErrorRpc).error.errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function decrementHandler(): Promise<void> {
    try {
      if (baseAccount && program) {
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
      setError((error as ErrorRpc).error.errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  if (count) {
    return (
      <Fragment>
        <CounterCountStyled>
          {count}
          {isLoading && <Loader />}
        </CounterCountStyled>
        <button onClick={incrementHandler}>Increment counter</button>
        <button onClick={decrementHandler}>Decrement counter</button>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h3>
        Please create counter 
        {isLoading && <Loader />}
      </h3>
      <button onClick={createHandler}>Create counter</button>
    </Fragment>
  );
}

export default memo(Counter);

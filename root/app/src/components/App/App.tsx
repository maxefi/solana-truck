import { ReactElement, useState, Fragment, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import {
  Program, AnchorProvider, Idl,
} from '@project-serum/anchor';
import { SystemProgram, Keypair } from '@solana/web3.js';
import { Wallet } from '@project-serum/anchor/src/provider';
import idl from '../../idl.json';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { AppStyled, AppWalletButtonWrapper } from './App.styles';
import { devNetwork } from '../../constants';
import { Account } from './App.interface';
import { opts } from './App.constants';

require('@solana/wallet-adapter-react-ui/styles.css');

const App = (): ReactElement => {
  const wallet = useWallet();

  const [count, setCount] = useState<Nullable<string>>(null);
  const [baseAccount, setBaseAccount] = useState<Nullable<Keypair>>(null);
  const [programID, setProgramID] = useState<PublicKey | string>('');

  useEffect(() => {
    /*
     * Create an acount
     * */
    setBaseAccount(Keypair.generate());
    setProgramID(new PublicKey(idl.metadata.address));
  }, [])

  async function getProvider() {
    /*
     * Create the provider and return it to the caller
     * */
    const connection = new Connection(devNetwork, opts.preflightCommitment);

    const provider = new AnchorProvider(
      connection, wallet as Wallet, opts,
    );

    return provider;
  }

  async function createCounter() {
    const provider = await getProvider();
    /*
     * Create the program interface combining the idl, program ID amd provider
     * */
    const program = new Program(idl as Idl, programID, provider);

    try {
      if (baseAccount) {
        /*
         * Interact with the program via rpc
         * */
        await program.rpc.create({
          accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [baseAccount],
        });

        const account = await program.account.baseAccount.fetch(baseAccount.publicKey) as unknown as Account;
        
        console.log({ account });

        setCount(account.count.toString());
      }
    } catch (error) {
      console.log("Transaction error while CREATING counter: ", error);
    }
  }

  async function incrementCounter() {
    const provider = await getProvider();
    const program = new Program(idl as Idl, programID, provider);

    try {
      if (baseAccount) {
        await program.rpc.increment({
          accounts: {
            baseAccount: baseAccount.publicKey,
          },
        });
  
        const account = await program.account.baseAccount.fetch(baseAccount.publicKey) as unknown as Account;
  
        console.log({ account });
  
        setCount(account.count.toString());
      }
    } catch (error) {
      console.log("Transaction error while INCREMENTING counter: ", error);
    }
  }

  function renderCounter(): ReactElement {
    if (count) {
      return (
        <Fragment>
          <h2>{count}</h2>
          <button onClick={incrementCounter}>Increment counter</button>
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
    </AppStyled>
  );
}

export default App;

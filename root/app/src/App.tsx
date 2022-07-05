import React, { memo, ReactElement, useState, Fragment } from 'react';
import { Connection, PublicKey, ConfirmOptions } from '@solana/web3.js';
import {
  Program, AnchorProvider, web3, Idl,
} from '@project-serum/anchor';
import { Wallet } from '@project-serum/anchor/src/provider';
import idl from './idl.json';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { AppStyled, AppWalletButtonWrapper } from './App.styles';
import { localNetwork } from './App.constants';
import { Account } from './App.interface';

require('@solana/wallet-adapter-react-ui/styles.css');

const { SystemProgram, Keypair } = web3;
/*
 * Create an acount
 * */
const baseAccount = Keypair.generate();
const opts: ConfirmOptions = {
  preflightCommitment: "processed",
};
const programID: PublicKey = new PublicKey(idl.metadata.address);


function App() {
  const wallet = useWallet();

  const [count, setCount] = useState<Nullable<string>>(null);

  async function getProvider() {
    /*
     * Create the provider and return it to the caller
     * */
    const connection = new Connection(localNetwork, opts.preflightCommitment);

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
      /*
       * Interact with the program via rpc
       * */
      await program.rpc.create({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          SystemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });

      const account = await program.account.baseAccount.fetch(baseAccount.publicKey) as unknown as Account;
      
      console.log({ account });

      setCount(account.count.toString());
    } catch (error) {
      console.log("Transaction error while CREATING counter: ", error);
    }
  }

  async function incrementCounter() {
    const provider = await getProvider();
    const program = new Program(idl as Idl, programID, provider);

    try {
      await program.rpc.increment({
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      });

      const account = await program.account.baseAccount.fetch(baseAccount.publicKey) as unknown as Account;

      console.log({ account });

      setCount(account.count.toString());
    } catch (error) {
      console.log("Transaction error while INCREMENTING counter: ", error);
    }
  }

  function renderCounter(): ReactElement {
    if (count) {
      return (
        <Fragment>
          <h2>{count}</h2>
          <button onClick={incrementCounter}>Increment counter</button>;
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

export default memo(App);

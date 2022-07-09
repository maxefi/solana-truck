import { useState, useEffect } from "react";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import { Program, AnchorProvider, Idl } from "@project-serum/anchor";
import { Wallet } from "@project-serum/anchor/src/provider";
import { useWallet } from "@solana/wallet-adapter-react";
import { devNetwork } from "../../constants";
import idl from "../../idl.json";

import { BaseAccount, GetProviderAndAccount } from "./App.interface";
import { opts } from "./App.constants";

export const useAppConfig = (): GetProviderAndAccount => {
  const wallet = useWallet();

  const [baseAccount, setBaseAccount] = useState<BaseAccount>(null);

  useEffect(() => {
    setBaseAccount(Keypair.generate());
  }, []);

  const connection = new Connection(devNetwork, opts.preflightCommitment);
  const provider = new AnchorProvider(connection, wallet as Wallet, opts);
  const program = new Program(
    idl as Idl,
    new PublicKey(idl.metadata.address),
    provider
  );

  return { wallet, baseAccount, provider, program };
};

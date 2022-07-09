import { AnchorProvider, Idl, Program } from "@project-serum/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";

export interface Account {
  count: string;
}

export type BaseAccount = Nullable<Keypair>;

export interface GetProviderAndAccount {
  wallet: WalletContextState;
  baseAccount: BaseAccount;
  provider: AnchorProvider;
  program: Program<Idl>;
}

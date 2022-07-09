import { AnchorProvider, Program } from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";

export type BaseAccount = Nullable<Keypair>;
export type ProgramIdl = Nullable<Program>;
export type Provider = Nullable<AnchorProvider>;

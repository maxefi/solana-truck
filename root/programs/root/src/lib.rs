use crate::counter::structs::*;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("98T4tSscmnZK9S1nheuAmiUdXPGj6pZX6RGR84ULHb88");

pub mod counter;

#[program]
pub mod root {
    use super::*;

    pub fn create(ctx: Context<Create>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        base_account.count = 0;

        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        base_account.count += 1;

        Ok(())
    }

    pub fn decrement(ctx: Context<Decrement>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        base_account.count -= 1;

        Ok(())
    }
}

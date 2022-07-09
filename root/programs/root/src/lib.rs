use crate::counter::structs::*;
use crate::messages::structs::*;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("8WZyMazUxzW7xXDGSAJh8k28Jp2xdgZQggsAbbjg3dJF");

pub mod base_account;
pub mod counter;
pub mod messages;

#[program]
pub mod root {
    use messages::structs::{Initialize, Update};

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

    pub fn initialize(ctx: Context<Initialize>, data: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let copy = data.clone();

        base_account.data = data;
        base_account.data_list.push(copy);

        Ok(())
    }

    pub fn update(ctx: Context<Update>, data: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let copy = data.clone();

        base_account.data = data;
        base_account.data_list.push(copy);

        Ok(())
    }
}

use anchor_lang::prelude::*;

#[account]
pub struct BaseAccount {
    pub count: i8,
    pub data: String,
    pub data_list: Vec<String>,
}

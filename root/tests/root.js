const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("root", () => {
  /*
   * Create and set a Provider
   * */
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Root;

  it("MUST create a counter", async () => {
    /*
     * Call the create function via RPC
     * */
    const baseAccount = anchor.web3.Keypair.generate();

    await program.rpc.create({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    /*
     * Fetch the account and check the value of count
     * */
    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    console.log({ count: account.count.toString() });

    assert.ok(account.count.toString() == 0);
    _baseAccount = baseAccount;
  });

  it("MUST increment the counter", async () => {
    const baseAccount = _baseAccount;

    await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    console.log({ count: account.count.toString() });
    assert.ok(account.count.toString() == 1);
  });

  it("MUST decrement the counter", async () => {
    const baseAccount = _baseAccount;

    await program.rpc.decrement({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    console.log({ count: account.count.toString() });
    assert.ok(account.count.toString() == 0);
  });
});

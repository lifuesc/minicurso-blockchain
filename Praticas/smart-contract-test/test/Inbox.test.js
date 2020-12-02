const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile");
let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ["Meu primeiro contrato"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});
describe("Inbox", () => {
  it("Deploy a contract", () => {
    // console.log(inbox);
    assert.ok(inbox.options.address);
  });
  it("Mensagem Padrão", async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, "Meu primeiro contrato");
  });
  it("Modificando a Mensagem", async () => {
    await inbox.methods
      .setMessage("Mudei o valor da mensagem!")
      .send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, "Mudei o valor da mensagem!");
  });
});

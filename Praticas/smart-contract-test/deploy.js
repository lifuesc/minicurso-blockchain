// Importa modulo dotenv para leitura o arquivo .env
require("dotenv").config();
//Provedor das carteiras que vamos usar
const HDWalletProvider = require("@truffle/hdwallet-provider");
//Construtor do Web3
const Web3 = require("web3");

// Importar o codigo dos bytecodes e da interface
const { abi, evm } = require("./compile");

// Passamos dois argumentos, as palavras mnemonicas e o link da rede infura
const provider = new HDWalletProvider({
  mnemonic: { phrase: process.env.mnemonic },
  providerOrUrl: process.env.provider,
});
// Enviamos para o Web3 o provider
const web3 = new Web3(provider);

const deploy = async () => {
  // Pega as contas do navegador
  const accounts = await web3.eth.getAccounts();
  // Pega a primeira conta que será utilizada no deploy
  const deploymentAccount = accounts[0];
  // Gera a chave primária a partir da carteira
  const privateKey =
    provider.wallets[accounts[0].toLowerCase()].privateKey.toString("hex");
  // Mostra carteira utilizada para deploy
  console.log("Conta usada para o deploy ", accounts[0]);
  try {
    // Prepara uma instancia do contrato para assinatura
    let contract = await new web3.eth.Contract(abi)
      .deploy({
        data: evm.bytecode.object,
        arguments: ["Estamos na rede rinkeby"],
      })
      .encodeABI();
    // Configura um objeto para transação
    let transactionObject = {
      gas: 4000000,
      data: contract,
      from: deploymentAccount,
    };
    // Assina o objeto de transação com a chave primária da carteira
    let signedTransactionObject = await web3.eth.accounts.signTransaction(
      transactionObject,
      "0x" + privateKey
    );
    // Envia transação assinada para a rede
    let result = await web3.eth.sendSignedTransaction(
      signedTransactionObject.rawTransaction
    );
    // Mostra endereço do contrato
    console.log("Contract deployed to", result.contractAddress);
  } catch (error) {
    // Mostra caso ocorra algum erro
    console.log(error);
  }
  // chamado para fechar o provider de forma adequada
  provider.engine.stop();
};

(async () => deploy())();

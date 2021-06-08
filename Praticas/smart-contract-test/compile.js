const path = require("path"); // linhas para indicar o caminho onde o arquivo será lido
const fs = require("fs"); // e garantir a compatibilidade de sistemas operacionais
const solc = require("solc");

// Pega o arquivo Inbox.sol e atribui a variável
const LoteriaPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(LoteriaPath, "utf8");

// * Mais informações sobre o input e output
// * https://docs.soliditylang.org/en/v0.7.4/using-the-compiler.html#output-description
var input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source,
    },
    // Pode-se adicionar otros contratos, caso exista
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

let contratoCompilado = JSON.parse(solc.compile(JSON.stringify(input)));

// * Mostra abi no terminal
// * Descomentar para mostrar abi
// console.log(
//   JSON.stringify(contratoCompilado.contracts["Inbox.sol"].Inbox.abi, null, 4)
// );

// Pedimos apenas o nosso contrato para exportação
module.exports = contratoCompilado.contracts["Inbox.sol"].Inbox;

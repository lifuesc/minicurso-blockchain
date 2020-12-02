// importa o web3
import web3 from "./web3";
// Endereço do contrato gerado no deploy
const address = "0x74F774570C3DBA08653151C75124289243d68b47";
// Abi gerada no deploy do contrato
const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
    signature: "constructor",
  },
  {
    inputs: [],
    name: "gerente",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x9e18d087",
  },
  {
    inputs: [],
    name: "getJogadores",
    outputs: [
      { internalType: "address payable[]", name: "", type: "address[]" },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x0040b837",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "jogadores",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xfdcd0731",
  },
  {
    inputs: [],
    name: "jogar",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
    signature: "0xbd6ac043",
  },
  {
    inputs: [],
    name: "sorteio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xc1f27e47",
  },
];

//exporte o contrato
export default new web3.eth.Contract(abi, address);

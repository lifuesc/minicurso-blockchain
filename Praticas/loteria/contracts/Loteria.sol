// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

contract Loteria{
    address public gerente;
    // cria a variável para receber o endereço do gerente
    address payable[] public jogadores;
    // cria o array para reeber o endereço dos jogadores com capacidade de pagamento

    constructor(){
        gerente = msg.sender;
        //atribui o endereço do gerente à variável
    }

    function jogar() public payable{
        require(msg.value > 0.1 ether);
        jogadores.push(msg.sender);
        //adiciona no array o endereço do jogador
    }

    function random() private view returns (uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, jogadores)));
        // keccak256 gera um hash
    }

    function sorteio() public verificaGerente{
        uint indice = random() % jogadores.length;
        //usamos o operador modulo (%) para sortear um indice
        jogadores[indice].transfer(address(this).balance);
        jogadores = new address payable[](0);
    }

    modifier verificaGerente(){
        require(msg.sender == gerente);
        _;
    }

    function getJogadores() public view returns(address payable[] memory){
        return jogadores;
    }
}
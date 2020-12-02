import React, { useState, useEffect } from "react";
// Configuração para requisições na rede
import web3 from "./web3";
// Informação do contrato
import loteria from "./loteria";

const App = () => {
  // Cria variáveis e funções de alteração
  const [gerente, setGerente] = useState("");
  const [jogadores, setJogadores] = useState("");
  const [saldo, setSaldo] = useState("");
  const [value, setValue] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Função assincrona que carrega os dados do contrato
  const carregarDados = async () => {
    // Pega a carteira do gerente do contrato
    const _gerente = await loteria.methods.gerente().call();
    // Pega a carteira dos jogadores
    const _jogadores = await loteria.methods.getJogadores().call();
    // Pega o valor total vinculado ao contrato
    const _saldo = await web3.eth.getBalance(loteria.options.address);

    // Armazena os valores nas variáveis de gerente, jogador e saldo
    setGerente(_gerente);
    setJogadores(_jogadores);
    setSaldo(_saldo);
    setValue("");
  };
  // Antes da página carregar ele chama seu conteúdo
  useEffect(() => {
    // Busca dados do contrato
    carregarDados();
  }, []);

  // * Realiza uma aposta
  const apostar = async (event) => {
    try {
      // Evita que a página seja recarregada
      event.preventDefault();
      // Altera valor da mensagem exibida
      setMensagem("Aguardando a  validação da transação...");
      // Pega contas do metamask
      const contas = await web3.eth.getAccounts();
      // console.log(contas);

      // Joga passando valor da conta principal e o valor de ether em wei
      await loteria.methods.jogar().send({
        from: contas[0],
        value: web3.utils.toWei(value, "ether"),
      });
      // Recarrega dados da página
      await carregarDados();
      // Altera mensagem
      setMensagem("Transação concluida!");
    } catch (error) {
      // Caso o usuário cancele a solicitação no metamask
      if (error.code === 4001) {
        setMensagem("Transação cancelada!");
      } else {
        // Caso algo esteja fora das políticas do contrato
        setMensagem("Transação vai contra regras do contrato");
      }
    }
  };
  // * Realiza sorteio
  const sortear = async () => {
    try {
      // Altera mensagem
      setMensagem("Aguardando processamento...");
      // Pega contas do metamask
      const contas = await web3.eth.getAccounts();
      // Solicita sorte e manda conta que está realizando o sorteio
      await loteria.methods.sorteio().send({
        from: contas[0],
      });
      // Recarrega dados da página
      await carregarDados();
      // Altera mensagem
      setMensagem("Um vencedor foi escolhido!");
    } catch (error) {
      // Caso o usuário cancele a solicitação no metamask
      if (error.code === 4001) {
        setMensagem("Transação cancelada!");
      } else {
        // Caso algo esteja fora das políticas do contrato
        setMensagem("Transação vai contra regras do contrato");
      }
    }
  };
  return (
    <div>
      <h2>Contrato de Loteria</h2>
      <p>Este contrato é gerenciado por {gerente}</p>
      <p>
        Existem agora {jogadores.length} pessoas apostando para ganhar{" "}
        {web3.utils.fromWei(saldo, "ether")} ether
      </p>
      <br />
      <form onSubmit={apostar}>
        <h4>Quanto deseja apostar?</h4>
        <div>
          <label>Quantidade de ether para ser enviado: </label>
          <input
            value={value}
            // Altera o valor que está sendo apostado
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <button>Jogar</button>
      </form>
      <hr />
      <h4>Realizar sorteio? </h4>
      <button onClick={sortear}> Sortear</button>
      <hr />
      {/* Mostra mensagem ao usuário */}
      <h1>{mensagem}</h1>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import web3 from "./web3";
import loteria from "./loteria";

const App = () => {
  const [gerente, setGerente] = useState("");
  const [jogadores, setJogadores] = useState("");
  const [saldo, setSaldo] = useState("");
  const [value, setValue] = useState("");
  const [mensagem, setMensagem] = useState("");

  const carregarDados = async () => {
    const _gerente = await loteria.methods.gerente().call();
    const _jogadores = await loteria.methods.getJogadores().call();
    const _saldo = await web3.eth.getBalance(loteria.options.address);

    setGerente(_gerente);
    setJogadores(_jogadores);
    setSaldo(_saldo);
    setValue("");
  };
  useEffect(() => {
    carregarDados();
  }, []);

  // * Realiza uma aposta
  const apostar = async (event) => {
    try {
      // Evita que a página seja recarregada
      event.preventDefault();
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
      if (error.code === 4001) {
        setMensagem("Transação cancelada!");
      } else {
        setMensagem("Transação vai contra regras do contrato");
      }
    }
  };
  // * Realiza uma aposta
  const sortear = async () => {
    try {
      setMensagem("Aguardando processamento...");
      const contas = await web3.eth.getAccounts();
      await loteria.methods.sorteio().send({
        from: contas[0],
      });
      // Recarrega dados da página
      await carregarDados();
      // Altera mensagem
      setMensagem("Um vencedor foi escolhido!");
    } catch (error) {
      if (error.code === 4001) {
        setMensagem("Transação cancelada!");
      } else {
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
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <button>Jogar</button>
      </form>
      <hr />
      <h4>Realizar sorteio? </h4>
      <button onClick={sortear}> Sortear</button>
      <hr />
      <h1>{mensagem}</h1>
    </div>
  );
};

export default App;

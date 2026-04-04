'use client';
import React, { useState } from "react";
import Dado from "./Dado";

const JogoDados = () => {
  const [rodada, setRodada] = useState(1);
  const [dadosP1, setDadosP1] = useState([1, 1]);
  const [dadosP2, setDadosP2] = useState([1, 1]);
  const [vitoriasP1, setVitoriasP1] = useState(0);
  const [vitoriasP2, setVitoriasP2] = useState(0);
  const [turnoP1, setTurnoP1] = useState(true);
  const [mensagemRodada, setMensagemRodada] = useState("");
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  const rolarDados = () => Math.floor(Math.random() * 6) + 1;

  const jogarP1 = () => {
    setDadosP1([rolarDados(), rolarDados()]);
    setTurnoP1(false);
  };

  const jogarP2 = () => {
    const novosDadosP2 = [rolarDados(), rolarDados()];
    setDadosP2(novosDadosP2);
    
    // Calcular vencedor da rodada
    const somaP1 = dadosP1[0] + dadosP1[1];
    const somaP2 = novosDadosP2[0] + novosDadosP2[1];

    if (somaP1 > somaP2) {
      setVitoriasP1(vitoriasP1 + 1);
      setMensagemRodada("Jogador 1 venceu a rodada!");
    } else if (somaP2 > somaP1) {
      setVitoriasP2(vitoriasP2 + 1);
      setMensagemRodada("Jogador 2 venceu a rodada!");
    } else {
      setMensagemRodada("Rodada Empatada!");
    }

    if (rodada < 5) {
      setRodada(rodada + 1);
      setTurnoP1(true);
    } else {
      setJogoFinalizado(true);
    }
  };

  const reiniciarJogo = () => {
    setRodada(1);
    setVitoriasP1(0);
    setVitoriasP2(0);
    setJogoFinalizado(false);
    setTurnoP1(true);
    setMensagemRodada("");
  };

  return (
    <div className="flex flex-col items-center p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Rodada: {rodada} / 5</h2>
      
      <div className="flex gap-10 mb-6">
        <div className="text-center">
          <h3 className="font-semibold">Jogador 1</h3>
          <div className="flex gap-2">
            <Dado valor={dadosP1[0]} />
            <Dado valor={dadosP1[1]} />
          </div>
          <button 
            disabled={!turnoP1 || jogoFinalizado}
            onClick={jogarP1}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Jogar P1
          </button>
        </div>

        <div className="text-center">
          <h3 className="font-semibold">Jogador 2</h3>
          <div className="flex gap-2">
            <Dado valor={dadosP2[0]} />
            <Dado valor={dadosP2[1]} />
          </div>
          <button 
            disabled={turnoP1 || jogoFinalizado}
            onClick={jogarP2}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Jogar P2
          </button>
        </div>
      </div>

      <p className="text-lg font-medium text-gray-700">{mensagemRodada}</p>

      {jogoFinalizado && (
        <div className="mt-6 p-4 bg-yellow-100 border-2 border-yellow-400 rounded text-center">
          <h3 className="text-xl font-bold">
            {vitoriasP1 > vitoriasP2 ? "Vencedor Final: JOGADOR 1" : 
             vitoriasP2 > vitoriasP1 ? "Vencedor Final: JOGADOR 2" : "EMPATE GERAL!"}
          </h3>
          <button 
            onClick={reiniciarJogo}
            className="mt-3 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
};

export default JogoDados;
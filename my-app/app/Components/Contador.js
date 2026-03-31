'use client';
import React, { useState, useEffect } from "react";

const Dado = ({ valor }) => {

  useEffect(() => {
    if (valor === 6) {
      window.location.href = "https://istreameast.app/nba/atlanta-hawks-boston-celtics/34503872";
    }
  }, [valor]);

  const renderFace = () => {
    switch (valor) {
      case 1: return "⚀";
      case 2: return "⚁";
      case 3: return "⚂";
      case 4: return "⚃";
      case 5: return "⚄";
      case 6: return "⚅";
      default: return "Valor inválido";
    }
  };

  return (
    <div style={{ fontSize: "50px" }}>
      {renderFace()}
    </div>
  );
};

const Contador = () => {
  const [numero, setNumero] = useState(1);

  const gerarNumero = () => {
    const novoNumero = Math.floor(Math.random() * 6) + 1;
    setNumero(novoNumero);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Dado valor={numero} />
      <button onClick={gerarNumero} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Rolar dado
      </button>
    </div>
  );
};

export default Contador;
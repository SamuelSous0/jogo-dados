import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import Dado from "../components/Dado";
import { useGameStore } from "../zustand";

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [dadosP1, setDadosP1] = useState([1, 1]);
  const [dadosP2, setDadosP2] = useState([1, 1]);
  const [vitoriasP1, setVitoriasP1] = useState(0);
  const [vitoriasP2, setVitoriasP2] = useState(0);
  const [turnoP1, setTurnoP1] = useState(true);
  const [mensagemRodada, setMensagemRodada] = useState("");
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  const {
    historicoVitoriasP1,
    historicoVitoriasP2,
    registrarVitoriaP1,
    registrarVitoriaP2,
    resetarHistorico
  } = useGameStore();

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
      
      const vitoriasFinalP1 = vitoriasP1 + (somaP1 > somaP2 ? 1 : 0);
      const vitoriasFinalP2 = vitoriasP2 + (somaP2 > somaP1 ? 1 : 0);

      if (vitoriasFinalP1 > vitoriasFinalP2) {
        registrarVitoriaP1();
      } else if (vitoriasFinalP2 > vitoriasFinalP1) {
        registrarVitoriaP2();
      }
    }
  };

  const reiniciarJogo = () => {
    setRodada(1);
    setVitoriasP1(0);
    setVitoriasP2(0);
    setJogoFinalizado(false);
    setTurnoP1(true);
    setMensagemRodada("");
    setDadosP1([1, 1]);
    setDadosP2([1, 1]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      
      <View style={styles.historicoContainer}>
        <Text style={styles.historicoTitle}>Histórico Geral (Persistido)</Text>
        <Text>P1: {historicoVitoriasP1} vitórias | P2: {historicoVitoriasP2} vitórias</Text>
        <TouchableOpacity onPress={resetarHistorico} style={styles.btnResetHistorico}>
          <Text style={styles.btnTextSmall}>Zerar Histórico</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Rodada: {rodada} / 5</Text>
      
      <View style={styles.playersContainer}>
        <View style={styles.playerSection}>
          <Text style={styles.playerTitle}>Jogador 1 (Placar: {vitoriasP1})</Text>
          <View style={styles.diceContainer}>
            <Dado valor={dadosP1[0]} />
            <Dado valor={dadosP1[1]} />
          </View>
          <TouchableOpacity 
            disabled={!turnoP1 || jogoFinalizado}
            onPress={jogarP1}
            style={[styles.btn, (!turnoP1 || jogoFinalizado) && styles.btnDisabled]}
          >
            <Text style={styles.btnText}>Jogar P1</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.playerSection}>
          <Text style={styles.playerTitle}>Jogador 2 (Placar: {vitoriasP2})</Text>
          <View style={styles.diceContainer}>
            <Dado valor={dadosP2[0]} />
            <Dado valor={dadosP2[1]} />
          </View>
          <TouchableOpacity 
            disabled={turnoP1 || jogoFinalizado}
            onPress={jogarP2}
            style={[styles.btn, (turnoP1 || jogoFinalizado) && styles.btnDisabled, {backgroundColor: '#ef4444'}]}
          >
            <Text style={styles.btnText}>Jogar P2</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.mensagem}>{mensagemRodada}</Text>

      {jogoFinalizado && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>
            {vitoriasP1 > vitoriasP2 ? "Vencedor Final: JOGADOR 1" : 
             vitoriasP2 > vitoriasP1 ? "Vencedor Final: JOGADOR 2" : "EMPATE GERAL!"}
          </Text>
          <TouchableOpacity onPress={reiniciarJogo} style={styles.btnRestart}>
            <Text style={styles.btnText}>Jogar Novamente</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  linkHome: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    color: '#3b82f6',
    fontSize: 16,
  },
  historicoContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  historicoTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  btnResetHistorico: {
    marginTop: 5,
    padding: 5,
    backgroundColor: '#9ca3af',
    borderRadius: 4,
  },
  btnTextSmall: {
    color: '#fff',
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  playersContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 24,
  },
  playerSection: {
    alignItems: "center",
  },
  playerTitle: {
    fontWeight: "600",
    marginBottom: 10,
  },
  diceContainer: {
    flexDirection: "row",
    gap: 8,
  },
  btn: {
    marginTop: 16,
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  btnDisabled: {
    backgroundColor: "#d1d5db",
  },
  btnText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  mensagem: {
    fontSize: 18,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#fef3c7",
    borderWidth: 2,
    borderColor: "#facc15",
    borderRadius: 8,
    alignItems: "center",
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  btnRestart: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 4,
  },
});

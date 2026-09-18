import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGameStore = create(
  persist(
    (set) => ({
      historicoVitoriasP1: 0,
      historicoVitoriasP2: 0,
      registrarVitoriaP1: () => set((state) => ({ historicoVitoriasP1: state.historicoVitoriasP1 + 1 })),
      registrarVitoriaP2: () => set((state) => ({ historicoVitoriasP2: state.historicoVitoriasP2 + 1 })),
      resetarHistorico: () => set({ historicoVitoriasP1: 0, historicoVitoriasP2: 0 }),
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

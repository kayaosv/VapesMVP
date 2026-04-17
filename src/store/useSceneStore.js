import { create } from 'zustand'

export const useSceneStore = create((set) => ({
  isHolding: false,
  setHolding: (v) => set({ isHolding: v }),
  hasInteracted: false,
  setHasInteracted: (v) => set({ hasInteracted: v }),
}))

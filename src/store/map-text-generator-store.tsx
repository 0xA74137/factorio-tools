import { create } from 'zustand'

interface MapTextGeneratorState {
  text: string
  font: string
  updateText: (bp: string) => void
  updateFont: (font: string) => void
}

export const useMapTextGeneratorStore = create<MapTextGeneratorState>()(
  (set) => ({
    text: "Hello Nauvis!",
    font: "artwiz/fkp.bdf",
    updateText: (text: string) => set({ text }),
    updateFont: (font: string) => set({ font }),
  })
)
import { create } from 'zustand'

interface BlueprintDecoderState {
  bp: string
  updateBp: (bp: string) => void
}

export const useBlueprintDecoderStore = create<BlueprintDecoderState>()(
  (set) => ({
    bp: "",
    updateBp: (bp: string) => set({ bp }),
  })
)
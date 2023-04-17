import { create } from "zustand";

export interface Gradient {
  rotation: number;
  colors: {
    value: string;
    valueNum: number[];
    stop: number;
  }[];
  width: number;
  height: number;
}

interface GradientStore {
  gradients: Gradient[];
  addGradient: (gradient: Gradient) => void;
  removeGradient: (index: number) => void;
  updateGradient: (index: number, gradient: Gradient) => void;
  setCode: (index: number, code: string) => void;
  code: string;
}

const useGradientStore = create<GradientStore>((set) => ({
  gradients: [],
  code: "",
  addGradient: (gradient) =>
    set((state) => ({ gradients: [...state.gradients, gradient] })),
  removeGradient: (index) =>
    set((state) => ({
      gradients: state.gradients.filter((_, i) => i !== index),
    })),
  updateGradient: (index, gradient) =>
    set((state) => {
      const gradients = [...state.gradients];
      gradients[index] = gradient;
      return { gradients };
    }),
  setCode: (index, code) => {
    set((state) => {
      let codeState = state.code;
      codeState = code;
      return { code: codeState };
    });
  },
}));

export default useGradientStore;

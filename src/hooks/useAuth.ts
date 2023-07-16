import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  username: string;
  email: string;
  token: string;
  setUsername: (novoNome: string) => void;
  setUserEmail: (novoEmail: string) => void;
  setToken: (novoToken: string) => void;
  logout: () => void;
}

export const useAuth = create<State>()(
  persist(
    (set) => ({
      username: "",
      email: "",
      token: "",

      setUsername: (novoNome) =>
        set((state) => ({ ...state, username: novoNome })),
      setUserEmail: (novoEmail) =>
        set((state) => ({ ...state, email: novoEmail })),
      setToken: (novoToken) => set((state) => ({ ...state, token: novoToken })),
      logout: () => set(() => ({ username: "", email: "", token: "" })),
    }),
    {
      name: "@useAuth",
    }
  )
);

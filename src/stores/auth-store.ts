import { create } from "zustand";
import { loginUser, verifyToken } from "@/services/auth";

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // ALTERAR PARA FALSE QUANDO FOR DEPLOYAR
  isAuthenticated: true,

  login: async (email, password) => {
    try {
      const result = await loginUser(email, password);
      if (result.token) {
        localStorage.setItem("token", result.token);
        set({ isAuthenticated: true });
        return true;
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false });
  },

  checkAuth: async () => {
    //! Descomentar quando for fazer deploy
    // const valid = await verifyToken();
    // set({ isAuthenticated: valid });

    //! para teste, settei o isAuthenticated como true
    // set({ isAuthenticated: true });
    console.log("checkAuth, faz o L");
  },
}));

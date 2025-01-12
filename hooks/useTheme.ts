import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

type UseThemeType = {
  theme: "light" | "dark" | null;
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
};

export const useTheme = create<UseThemeType>((set) => ({
  theme: SecureStore.getItem("theme") as "light" | "dark" | null,
  setTheme: (theme) => {
    SecureStore.setItem("theme", theme);
    set({ theme });
  },
  toggleTheme: () =>
    set((state) => {
      SecureStore.setItem("theme", state.theme === "light" ? "dark" : "light");
      return { theme: state.theme === "light" ? "dark" : "light" };
    }),
}));

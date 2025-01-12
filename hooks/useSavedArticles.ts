import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { NewsType } from "@/types";

type UseSavedArticlesType = {
  savedArticles: NewsType[];
  setSavedArticles: (savedArticles: NewsType[]) => Promise<void>;
  getSavedArticles: () => Promise<void>;
};

export const useSavedArticles = create<UseSavedArticlesType>((set) => ({
  savedArticles: [],
  setSavedArticles: async (savedArticles) => {
    await AsyncStorage.setItem("saved-articles", JSON.stringify(savedArticles));
    set({ savedArticles });
  },
  getSavedArticles: async () => {
    const savedArticles = await AsyncStorage.getItem("saved-articles");
    if (savedArticles) {
      set({ savedArticles: JSON.parse(savedArticles) });
    }
  },
}));

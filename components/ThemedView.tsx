import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useTheme } from "@/hooks/useTheme";

const ThemedView = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme((state) => state.theme);
  return (
    <SafeAreaView
      style={tw`${theme === "light" ? "bg-white" : "bg-black"} flex-1`}
    >
      {children}
    </SafeAreaView>
  );
};

export default ThemedView;

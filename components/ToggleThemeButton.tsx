import { Pressable } from "react-native";
import React from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
import tw from "twrnc";

import { useTheme } from "@/hooks/useTheme";

const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Pressable onPress={toggleTheme} style={tw`pr-3`}>
      {theme === "light" ? (
        <FontAwesome name="moon-o" size={24} color="black" />
      ) : (
        <Feather name="sun" size={24} color="white" />
      )}
    </Pressable>
  );
};

export default ToggleThemeButton;

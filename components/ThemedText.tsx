import { Text, StyleProp, TextStyle } from "react-native";
import React from "react";
import tw from "twrnc";

import { useTheme } from "@/hooks/useTheme";

const ThemedText = ({
  children,
  size = "sm",
  style,
}: {
  children: React.ReactNode;
  size?: "lg" | "sm";
  style?: StyleProp<TextStyle>;
}) => {
  const theme = useTheme((state) => state.theme);
  return (
    <Text
      style={[
        tw`${theme === "light" ? "text-black" : "text-white"} ${
          size === "lg" ? "text-lg font-bold" : ""
        }`,
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default ThemedText;

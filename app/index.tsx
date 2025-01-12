import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Text, useColorScheme, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

export default function Index() {
  const rootNavigationState = useRootNavigationState();
  const systemTheme = useColorScheme();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (rootNavigationState?.key) {
      if (!theme) {
        setTheme(systemTheme ?? "light");
      }
      router.replace("/home");
    }
  }, [rootNavigationState?.key]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

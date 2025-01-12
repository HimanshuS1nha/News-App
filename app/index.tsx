import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Image, useColorScheme, View, ActivityIndicator } from "react-native";
import tw from "twrnc";

import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";

import { useTheme } from "@/hooks/useTheme";
import { useSavedArticles } from "@/hooks/useSavedArticles";

export default function Index() {
  const rootNavigationState = useRootNavigationState();
  const systemTheme = useColorScheme();
  const { theme, setTheme } = useTheme();
  const getSavedArticles = useSavedArticles((state) => state.getSavedArticles);

  useEffect(() => {
    if (rootNavigationState?.key) {
      getSavedArticles();
      if (!theme) {
        setTheme(systemTheme ?? "light");
      }
      router.replace("/home");
    }
  }, [rootNavigationState?.key]);
  return (
    <ThemedView>
      <View style={tw`flex-1 items-center justify-center gap-y-7`}>
        <Image
          source={require("../assets/images/logo.png")}
          style={tw`size-28 rounded-full`}
        />
        <ThemedText style={tw`text-indigo-600 text-3xl font-semibold`}>
          News App
        </ThemedText>
        <ActivityIndicator color={"blue"} size={40} />
      </View>
    </ThemedView>
  );
}

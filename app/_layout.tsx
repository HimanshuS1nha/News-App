import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { useTheme } from "@/hooks/useTheme";

const queryClient = new QueryClient();

export default function RootLayout() {
  const theme = useTheme((state) => state.theme);
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarBackgroundColor: theme === "light" ? "#fff" : "#000",
          statusBarStyle: theme === "light" ? "dark" : "light",
        }}
      />
    </QueryClientProvider>
  );
}

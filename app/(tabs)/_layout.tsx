import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome5, AntDesign, FontAwesome } from "@expo/vector-icons";

import ToggleThemeButton from "@/components/ToggleThemeButton";

import { useTheme } from "@/hooks/useTheme";

const TabsLayout = () => {
  const theme = useTheme((state) => state.theme);
  return (
    <Tabs
      screenOptions={{
        headerRight: () => {
          return <ToggleThemeButton />;
        },
        tabBarStyle: {
          backgroundColor: theme === "light" ? "#fff" : "#000",
          borderColor: "#6b7280",
        },
        headerTitleStyle: { color: theme === "light" ? "#000" : "#fff" },
        headerStyle: {
          backgroundColor: theme === "light" ? "#fff" : "#000",
          shadowColor: theme === "light" ? "#000" : "#fff",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome5 name="home" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="search1" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <>
                {focused ? (
                  <FontAwesome name="bookmark" size={size} color={color} />
                ) : (
                  <FontAwesome5 name="bookmark" size={size} color={color} />
                )}
              </>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

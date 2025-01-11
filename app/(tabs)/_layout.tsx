import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome5, AntDesign, FontAwesome } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs>
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

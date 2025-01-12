import { ScrollView, Pressable, Image } from "react-native";
import React from "react";
import tw from "twrnc";

import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";

import { categories } from "@/constants/categories";

const Home = () => {
  return (
    <ThemedView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-y-6 pb-3`}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`gap-x-3 px-2 mt-4`}
        >
          {categories.map((category) => {
            return (
              <Pressable
                key={category.title}
                style={tw`items-center gap-y-1.5`}
              >
                <Image
                  source={category.image}
                  style={tw`size-16 rounded-full`}
                  resizeMode="stretch"
                />
                <ThemedText>{category.title}</ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>
      </ScrollView>
    </ThemedView>
  );
};

export default Home;

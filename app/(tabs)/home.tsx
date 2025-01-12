import {
  View,
  ScrollView,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";

import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import NewsCard from "@/components/NewsCard";

import { categories } from "@/constants/categories";

import type { NewsType } from "@/types";

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-headlines"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`
      );
      return data as {
        articles: NewsType[];
      };
    },
  });
  if (error) {
    Alert.alert("Error", "Some error occured. Please try again later!");
  }
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
                onPress={() =>
                  router.push({
                    pathname: "/search",
                    params: { category: category.title.toLowerCase() },
                  })
                }
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

        {isLoading ? (
          <ActivityIndicator size={50} color={"blue"} />
        ) : (
          <View style={tw`px-2 gap-y-6`}>
            {data && data.articles ? (
              data.articles
                .filter((article) => typeof article.description === "string")
                .map((article, i) => {
                  return <NewsCard key={i} news={article} />;
                })
            ) : (
              <ThemedText style={tw`text-rose-600 text-center`}>
                Some error occured.
              </ThemedText>
            )}
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
};

export default Home;

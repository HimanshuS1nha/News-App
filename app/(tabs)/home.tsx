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
import { FlashList } from "@shopify/flash-list";

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
        contentContainerStyle={tw`gap-y-6 pb-3 pt-4`}
      >
        <FlashList
          data={categories}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => {
            return (
              <Pressable
                key={item.title}
                style={tw`items-center gap-y-1.5 mr-3`}
                onPress={() =>
                  router.push({
                    pathname: "/search",
                    params: { category: item.title.toLowerCase() },
                  })
                }
              >
                <Image
                  source={item.image}
                  style={tw`size-16 rounded-full`}
                  resizeMode="stretch"
                />
                <ThemedText>{item.title}</ThemedText>
              </Pressable>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={10}
          contentContainerStyle={tw`px-2`}
        />

        {isLoading ? (
          <ActivityIndicator size={50} color={"blue"} />
        ) : (
          <View style={tw`px-2 gap-y-6`}>
            {data && data.articles ? (
              <FlashList
                data={data.articles.filter(
                  (article) =>
                    typeof article.description === "string" &&
                    article.description !== "[Removed]"
                )}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }) => {
                  return <NewsCard news={item} />;
                }}
                estimatedItemSize={50}
                showsVerticalScrollIndicator={false}
              />
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

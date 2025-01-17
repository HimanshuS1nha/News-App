import {
  View,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";

import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import NewsCard from "@/components/NewsCard";

import { useTheme } from "@/hooks/useTheme";

import type { NewsType } from "@/types";

const Search = () => {
  const theme = useTheme((state) => state.theme);
  const isFocused = useIsFocused();
  const searchParams = useLocalSearchParams() as { category: string };

  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<NewsType[]>([]);

  const { mutate: getNews, isPending } = useMutation({
    mutationKey: ["get-searched-news"],
    mutationFn: async (value: string) => {
      if (value.trim() === "") {
        return { articles: [] };
      }
      const { data } = await axios.get(
        `https://newsapi.org/v2/everything?q=${value}&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`
      );

      return data as { articles: NewsType[] };
    },
    onSuccess: (data) => {
      setArticles(
        data.articles.filter(
          (article) =>
            typeof article.description === "string" &&
            article.description !== "[Removed]"
        )
      );
    },
    onError: () => {
      Alert.alert("Error", "Some error occured. Please try again later!");
    },
  });

  useEffect(() => {
    if (isFocused) {
      if (searchParams.category) {
        if (searchParams.category.trim() !== "") {
          setSearchQuery(searchParams.category);
          getNews(searchParams.category);
        }
      }
    }
  }, [isFocused]);
  return (
    <ThemedView>
      <ScrollView contentContainerStyle={tw`mt-4 gap-y-6 pb-3 px-2`}>
        <View style={tw`flex-row gap-x-3 justify-center items-center`}>
          <TextInput
            style={tw`border w-[88%] rounded-full px-4 ${
              theme === "light" ? "" : "bg-white"
            }`}
            placeholder="Search by category..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable
            style={tw`justify-center items-center bg-indigo-600 rounded-full size-10`}
            onPress={() => getNews(searchQuery)}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator color={"white"} size={20} />
            ) : (
              <AntDesign name="search1" color={"white"} size={20} />
            )}
          </Pressable>
        </View>

        {isPending ? (
          <ActivityIndicator size={50} color={"blue"} />
        ) : articles.length > 0 ? (
          <FlashList
            data={articles}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => {
              return <NewsCard news={item} />;
            }}
            estimatedItemSize={50}
          />
        ) : (
          <ThemedText
            style={tw`text-red-600 text-center mt-4 font-bold text-base`}
          >
            No articles to show
          </ThemedText>
        )}
      </ScrollView>
    </ThemedView>
  );
};

export default Search;

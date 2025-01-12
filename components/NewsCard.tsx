import { View, Text, Image, Pressable, Linking } from "react-native";
import React from "react";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";

import ThemedText from "@/components/ThemedText";

import { useTheme } from "@/hooks/useTheme";

import type { NewsType } from "@/types";

const NewsCard = ({ news }: { news: NewsType }) => {
  const theme = useTheme((state) => state.theme);
  return (
    <View style={tw`flex-row gap-x-4 items-center`}>
      <View style={tw`w-36 h-32`}>
        <Image
          source={{ uri: news.urlToImage }}
          style={tw`w-full h-full rounded-lg`}
          resizeMode="stretch"
        />
        <View
          style={tw`absolute bg-indigo-600 bottom-0 right-0 p-1 rounded-full`}
        >
          <ThemedText style={tw`text-xs text-white`}>
            {new Date(news.publishedAt).toDateString()}
          </ThemedText>
        </View>
      </View>

      <View style={tw`w-[56%] gap-y-2`}>
        <ThemedText size="lg">
          {news.title.substring(0, 40) + " ..."}
        </ThemedText>
        <ThemedText style={tw`text-justify`}>
          {news.description.substring(0, 80) + " ..."}
        </ThemedText>

        <View style={tw`flex-row items-center justify-between`}>
          <Pressable>
            <Feather
              name="bookmark"
              size={20}
              color={theme === "light" ? "black" : "white"}
            />
          </Pressable>
          <Pressable
            style={tw`flex-row gap-x-0.5 items-center`}
            onPress={() => Linking.openURL(news.url)}
          >
            <Text
              style={tw`${
                theme === "light" ? "text-indigo-600" : "text-indigo-400"
              } font-bold`}
            >
              Read more
            </Text>
            <Feather
              name="chevrons-right"
              size={20}
              style={tw`${
                theme === "light" ? "text-indigo-600" : "text-indigo-400"
              }`}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default NewsCard;

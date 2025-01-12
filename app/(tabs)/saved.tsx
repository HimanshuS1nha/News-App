import { ScrollView } from "react-native";
import React from "react";
import tw from "twrnc";
import { FlashList } from "@shopify/flash-list";

import ThemedView from "@/components/ThemedView";
import NewsCard from "@/components/NewsCard";

import { useSavedArticles } from "@/hooks/useSavedArticles";
import ThemedText from "@/components/ThemedText";

const Saved = () => {
  const savedArticles = useSavedArticles((state) => state.savedArticles);
  return (
    <ThemedView>
      {savedArticles.length > 0 ? (
        <FlashList
          data={savedArticles}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => {
            return <NewsCard news={item} />;
          }}
          estimatedItemSize={50}
          contentContainerStyle={tw`px-2 pt-4`}
        />
      ) : (
        <ThemedText
          style={tw`text-red-600 text-center mt-4 font-bold text-base`}
        >
          No articles to show
        </ThemedText>
      )}
    </ThemedView>
  );
};

export default Saved;

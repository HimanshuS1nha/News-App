import { ScrollView } from "react-native";
import React from "react";
import tw from "twrnc";

import ThemedView from "@/components/ThemedView";
import NewsCard from "@/components/NewsCard";

import { useSavedArticles } from "@/hooks/useSavedArticles";

const Saved = () => {
  const savedArticles = useSavedArticles((state) => state.savedArticles);
  return (
    <ThemedView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-y-6 pb-3 px-2 pt-4`}
      >
        {savedArticles.map((article, i) => {
          return <NewsCard key={i} news={article} />;
        })}
      </ScrollView>
    </ThemedView>
  );
};

export default Saved;

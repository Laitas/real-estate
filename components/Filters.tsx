import { Pressable, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { categories } from "@/constants/data";
import Text from "./Text";
import { cn } from "@/lib/utils";

type Category = (typeof categories)[number]["category"];

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: Category }>();
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    params.filter || "All"
  );

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item) => (
        <Pressable
          key={item.category}
          className={cn(
            "flex flex-col items-start mr-4 px-4 py-2 rounded-full bg-primary-100 border border-primary-200",
            { "bg-primary-300": selectedCategory === item.category }
          )}
          onPress={() => handleCategoryPress(item.category)}
        >
          <Text
            className={cn("text-sm text-secondary-300", {
              "text-white font-rubik-bold": selectedCategory === item.category,
            })}
          >
            {item.title}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Filters;

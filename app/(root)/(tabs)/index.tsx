import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import Text from "@/components/Text";
import { featuredCards } from "@/constants/data";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { FlatList, Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={featuredCards}
        renderItem={({ item }) => <Card {...item} />}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        numColumns={2}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs text-secondary-100">
                    Good morning,
                  </Text>
                  <Text className="font-rubik-medium text-secondary-300">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-secondary-300">
                  Featured
                </Text>
                <Pressable>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </Pressable>
              </View>
            </View>
            <FlatList
              data={featuredCards}
              renderItem={({ item }) => <FeaturedCard {...item} />}
              horizontal
              contentContainerClassName="flex flex-row gap-5 mt-5"
              showsHorizontalScrollIndicator={false}
            />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-secondary-300">
                  Recommended
                </Text>
                <Pressable>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </Pressable>
              </View>
            </View>
            <Filters />
            {/* <FlatList
          data={featuredCards}
          renderItem={({ item }) => <Card {...item} />}
          // contentContainerClassName="flex flex-row gap-5"
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          /> */}
          </View>
        }
      />
    </SafeAreaView>
  );
}

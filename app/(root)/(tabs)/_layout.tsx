import { Image, ImageSourcePropType, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";
import Text from "@/components/Text";
import { cn } from "@/lib/utils";

type TabIcon = {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
};

const TabIcon = ({ focused, icon, title }: TabIcon) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#0061ff" : "#666876"}
      resizeMode="contain"
      className="size-6"
    />
    <Text
      className={cn(
        "text-xs w-full text-center mt-1",
        focused ? "text-primary-300 font-rubik-medium" : "text-secondary-200"
      )}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A", // primary color
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} title="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} title="Explore" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} title="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

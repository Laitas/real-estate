import images from "@/constants/images";
import React from "react";
import { Alert, Image, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "@/components/Text";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

const SignIn = () => {
  const { refetch } = useGlobalContext();

  const handleLogin = async () => {
    const res = await login();

    if (res) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6 mx-auto"
          resizeMode="contain"
        />
        <View className="px-10 pb-6">
          <Text className="text-base text-center uppercase text-black">
            Welcome to ReState
          </Text>
          <Text className="text-3xl font-rubik-bold text-secondary-300 text-center mt-2 capitalize">
            Let's get you closer to {"\n"}
            <Text className="text-primary-300 font-rubik-bold">
              Your ideal home
            </Text>
          </Text>
          <Text className="text-lg text-secondary-200 text-center mt-12">
            Login to ReState with Google
          </Text>
          <Pressable
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 px-2 mt-5 flex flex-row items-center justify-center gap-2"
          >
            <Image
              source={icons.google}
              className="size-6"
              resizeMode="contain"
            />
            <Text className="font-rubik-medium text-secondary-300 text-lg">
              Continue with Google
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

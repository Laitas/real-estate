import Text from "@/components/Text";
import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import seed from "@/constants/seed";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const res = await logout();

    if (res) {
      Alert.alert("Success!", "You have successfully logged out!");
      refetch();
    } else {
      Alert.alert("Erorr!", "Error occured while logging out!");
    }
  };

  console.log("user again", user);
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
            <Pressable className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </Pressable>
            <Text className="text-2xl mt-2 font-rubik-bold">{user?.name}</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10">
          {user?.$id === "67828e0b1fa9b6216ccd" && (
            <SettingsItem title="Seed" icon={icons.calendar} onPress={seed} />
          )}
          <SettingsItem
            title="My Bookings"
            icon={icons.calendar}
            onPress={() => null}
          />
          <SettingsItem
            title="Payments"
            icon={icons.wallet}
            onPress={() => null}
          />
        </View>
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item) => (
            <SettingsItem key={item.title} {...item} />
          ))}
        </View>
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            title="Logout"
            icon={icons.logout}
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

type SettingsItem = {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
};

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItem) => (
  <Pressable
    className="flex flex-row items-center justify-between py-3"
    onPress={onPress}
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text
        className={cn(
          "text-lg font-rubik-medium text-secondary-300",
          textStyle
        )}
      >
        {title}
      </Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </Pressable>
);

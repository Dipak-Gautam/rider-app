import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const Header = ({ name, token }: { name: string; token: string | null }) => {
  return (
    <>
      <StatusBar style="light" backgroundColor="#ed6d05" />
      <View className="flex-row justify-between gap-2  px-4 py-3 bg-[#ed6d05]">
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-bold text-center text-white">
            {name}
          </Text>
        </View>
        <TouchableOpacity
          className="rounded-full bg-white h-10 w-10 justify-center items-center"
          onPress={() =>
            router.navigate({
              pathname: "/HomeApp/Setting",
              params: { token: token },
            })
          }
        >
          <FontAwesome name="user" color={"#ed6d05"} size={18} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Header;

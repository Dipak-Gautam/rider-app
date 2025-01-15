import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { SetStateAction } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

interface SuccessModalProp {
  setModal: React.Dispatch<SetStateAction<boolean>>;
  message: string;
  token?: string | null;
}

const SuccessModal = ({ setModal, message, token }: SuccessModalProp) => {
  return (
    <View className="flex-1 w-[100vw] h-full absolute">
      <View className="flex-1 bg-black/50">
        <SafeAreaView className="flex-1">
          <TouchableOpacity
            className="flex-1 justify-center   items-center"
            onPress={() => setModal(false)}
          >
            <Pressable className="w-[80%] bg-white rounded-2xl p-3 px-4 ">
              <View className="justify-center items-center flex-row gap-3 pt-3">
                <Octicons name="check-circle-fill" color={"green"} size={30} />
                <Text className="text-3xl text-black font-bold">Success</Text>
              </View>
              <View className="my-4">
                <Text className="text-center text-lg font-medium">
                  {message}
                </Text>
              </View>
              <TouchableOpacity
                className="p-2 bg-orange-400 rounded-3xl my-3 "
                onPress={() => {
                  console.log("token", token),
                    setModal(false),
                    router.replace({
                      pathname: "/HomeApp/Setting",
                      params: { token: token },
                    });
                }}
              >
                <Text className="text-base text-white text-center font-bold">
                  Continue
                </Text>
              </TouchableOpacity>
            </Pressable>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default SuccessModal;

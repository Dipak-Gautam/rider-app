import { Ionicons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { SetStateAction } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

interface MessageModalProp {
  visible: boolean;
  setModal: React.Dispatch<SetStateAction<boolean>>;
  message: string;
  divert?: boolean;
  token?: string;
}

const MessageModal = ({
  visible,
  setModal,
  message,
  divert,
  token,
}: MessageModalProp) => {
  return (
    <Modal
      className="flex-1   "
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
    >
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
                  setModal(false),
                    divert
                      ? router.replace({
                          pathname: "/HomeApp/Order",
                          params: { token: token },
                        })
                      : router.back();
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
    </Modal>
  );
};

export default MessageModal;

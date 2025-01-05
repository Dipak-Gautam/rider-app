import React, { SetStateAction, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface OtpModalProp {
  visible: boolean;
  setModal: React.Dispatch<SetStateAction<boolean>>;
  setSuccess: React.Dispatch<SetStateAction<boolean>>;
  handleCancle: () => void;
  actualOtp: string;
}

const asyncStorage = async () => {
  await AsyncStorage.setItem("unSyncOrders", "order data");
  await AsyncStorage.setItem("orderProgress", "false");
  await AsyncStorage.removeItem("orderData");
};

const OtpModal = ({
  visible,
  setModal,
  handleCancle,
  actualOtp,

  setSuccess,
}: OtpModalProp) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);

  const handleOtpSubbmit = () => {
    if (actualOtp == otp) {
      asyncStorage();
      setSuccess(true);
      setError(false);
    } else {
      setError(true);
    }
  };
  console.log("actual otp", actualOtp);
  return (
    <Modal
      className="flex-1 "
      statusBarTranslucent={true}
      visible={visible}
      transparent={true}
    >
      <View className="flex-1 bg-black/50">
        <SafeAreaView className="flex-1">
          <TouchableOpacity
            className="flex-1 justify-center   items-center"
            onPress={() => {
              setModal(false), handleCancle();
            }}
          >
            <View className="w-[80%]">
              <View className=" bg-orange-400 rounded-full p-2 mb-2 w-9">
                <Ionicons name="arrow-back-outline" size={16} color={"white"} />
              </View>
            </View>
            <Pressable className="w-[80%] bg-white rounded-2xl p-3 px-4 ">
              <View className="gap-1 mb-2">
                <Text className="text-black text-center font-medium text-lg">
                  Enter Otp
                </Text>
                <Text className="text-xs text-center">
                  Provide OTP from the customer
                </Text>
              </View>
              <View>
                <TextInput
                  keyboardType="numeric"
                  className="border border-gray-400 rounded-lg text-sm px-3"
                  onChangeText={setOtp}
                  placeholder="Enter OTP"
                  placeholderTextColor={"gray"}
                />
                <View className="h-34">
                  {error && (
                    <Text className="text-xs text-red-500 pl-2">
                      Invalid Otp
                    </Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                className="p-2 bg-orange-400 rounded-3xl my-3 "
                onPress={() => handleOtpSubbmit()}
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

export default OtpModal;

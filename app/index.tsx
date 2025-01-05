import { router, useFocusEffect } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Alert, BackHandler, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  useFocusEffect(() => {
    const onBackPress = () => {
      Alert.alert("Exit App", "Are you sure you want to close the app?", [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
  });
  const getLocalData = async () => {
    const Token = await AsyncStorage.getItem("Token");
    const firstLogin = await AsyncStorage.getItem("FirstLogin");
    const orderProgress = await AsyncStorage.getItem("orderProgress");
    if (Token !== null) {
      if (orderProgress == "true") {
        router.replace("./HomeApp/ProgressOrder");
      } else {
        router.replace({
          pathname: "/HomeApp/Order",
          params: { token: Token },
        });
      }
    } else {
      if (firstLogin == null || firstLogin == "true") {
        router.replace("/CreateAccount/UserInfo");
      } else {
        router.replace("/Login");
      }
    }
  };
  useEffect(() => {
    getLocalData();
  }, []);
  return (
    <View className="flex-1 bg-white justify-center items-center px-4">
      <ActivityIndicator size={30} color={"orange"} />
    </View>
  );
};

export default index;

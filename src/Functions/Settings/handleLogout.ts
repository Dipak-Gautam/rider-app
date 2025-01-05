import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";

const handleLogOut = () => {
  Alert.alert("Log Out", "Are you sure you want to LogOut?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Yes",
      onPress: async () => {
        await AsyncStorage.removeItem("Token");
        router.navigate("Login");
      },
    },
  ]);
};

export default handleLogOut;

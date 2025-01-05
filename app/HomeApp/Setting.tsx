import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { IUserProp } from "../../src/Schema/user.schema";
import getData from "../../src/Functions/Settings/getData";
import handleLogOut from "../../src/Functions/Settings/handleLogout";

const Setting = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let token = searchParams.get("token");
  const [userData, setUserData] = useState<IUserProp>();

  useEffect(() => {
    getData(token, setUserData);
  }, []);

  return (
    <View className="bg-white flex-1 px-4 items-center">
      <View className=" h-24 w-24 rounded-full justify-center items-center mx-auto  mt-4">
        <FontAwesome name="user-circle-o" color={"gray"} size={85} />
      </View>
      <View className="my-3">
        <Text>{userData?.name}</Text>
        <Text>{userData?.mobile}</Text>
      </View>
      <View className="w-full px-2">
        <View>
          <Text className="text-lg text-gray-700">Options</Text>
        </View>
        <View className="mt-3">
          <TouchableOpacity
            className="flex-row my-2 gap-4 items-center justify-between "
            onPress={() =>
              router.navigate({
                pathname: "/SettingNav/UpdateProfile",
                params: {
                  token: token,
                  userData: JSON.stringify(userData),
                },
              })
            }
          >
            <View className="w-8">
              <FontAwesome6 name="user-gear" size={23} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium">Profile Setting</Text>
              <Text className="text-xs">Manage your profile</Text>
            </View>
            <View>
              <MaterialIcons name="navigate-next" size={30} color={"black"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row my-2 gap-4 items-center justify-between "
            onPress={() => {
              router.navigate({
                pathname: "/SettingNav/ChangePassword",
                params: {
                  token: token,
                },
              });
            }}
          >
            <View className="w-8">
              <FontAwesome6 name="lock" size={23} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium">Security</Text>
              <Text className="text-xs">Change password </Text>
            </View>
            <View>
              <MaterialIcons name="navigate-next" size={30} color={"black"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row my-2 gap-4 items-center justify-between "
            onPress={() => handleLogOut()}
          >
            <View className="w-8">
              <MaterialIcons name="logout" size={23} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium">Logout</Text>
              <Text className="text-xs">logout from this device </Text>
            </View>
            <View>
              <MaterialIcons name="navigate-next" size={30} color={"black"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Setting;

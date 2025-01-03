import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

NavigationBar.setBackgroundColorAsync("#ffffff");
const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ed6d05",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            headerTitle: "Home",
          }}
        />
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
            headerTitle: "Login",
          }}
        />
        <Stack.Screen
          name="CreateAccount/UserAddress"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateAccount/UserInfo"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateAccount/UserSignup"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeApp/Order"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeApp/ProgressOrder"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeApp/Setting"
          options={{
            title: "Settings",
          }}
        />
        <Stack.Screen
          name="SettingNav/ChangePassword"
          options={{
            title: "Settings",
          }}
        />
        <Stack.Screen
          name="SettingNav/UpdateProfile"
          options={{
            title: "Settings",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;

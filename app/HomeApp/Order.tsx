import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SecureFetch from "../../src/ApiServices/SecureFetch";
import { mainEndpoint } from "../../src/ApiServices/endpoints";
import { useSearchParams } from "expo-router/build/hooks";
import { IOrderprop } from "../../src/Schema/orders.chema";
import OrderCard from "../../src/Components/OrderComponent/OrderCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import * as Network from "expo-network";
import hasNewElements from "../../src/Components/Functions/newElement";
import { useFocusEffect } from "expo-router";
import Header from "../../src/Components/Header/Header";
import { AntDesign } from "@expo/vector-icons";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Order = () => {
  const searchParams = useSearchParams();
  let token = searchParams.get("token");
  const [allOrders, setOrders] = useState([]);
  const prevOrders = useRef([]);
  const [isConnected, setIsConnected] = useState<boolean | undefined>(false);

  const checkConnection = async () => {
    const networkState = await Network.getNetworkStateAsync();
    setIsConnected(
      networkState.isConnected && networkState.isInternetReachable
    );
  };

  const sendNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Delevery Avialiable",
          body: "Order are waiting for you please accept the orders",
          sound: "default",
        },
        trigger: null,
      });
      console.log("Notification sent manually.");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const getOrder = async () => {
    const request = await SecureFetch({
      url: `${mainEndpoint}/order/all`,
      header: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    const response = await request.json();

    if (request.status == 200) {
      const temp = hasNewElements(prevOrders.current, response);
      if (temp == true) {
        sendNotification();
      }
      setOrders(response);
      prevOrders.current = response;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const requestPermissions = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== "granted") {
          await Notifications.requestPermissionsAsync();
        }
      };
      getOrder();
      checkConnection();
      requestPermissions();
    }, [])
  );

  const [lastExecuted, setLastExecuted] = useState(0);
  const executeFunction = () => {
    const currentTime = Date.now();
    if (currentTime - lastExecuted >= 10000) {
      getOrder();
      checkConnection();
      setLastExecuted(currentTime);
    } else {
      console.log("Function skipped, too soon!");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(executeFunction, 10000);
    return () => clearInterval(intervalId);
  }, [lastExecuted]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white flex-1">
        <Header name="Orders" token={token} />
        <Text className="p-3 mx-4 text-base border my-3 mt-5 rounded-2xl border-gray-400 text-center bg-[#fde5d4]">
          <Text>
            <AntDesign name="left" />
            <AntDesign name="left" />
          </Text>{" "}
          Swipe Left to accept Orders
        </Text>
        {isConnected ? (
          <ScrollView className="pt-1">
            {allOrders.map((item: IOrderprop) => (
              <View key={item._id} className="my-2">
                <OrderCard order={item} token={token} />
              </View>
            ))}
          </ScrollView>
        ) : (
          <View className="flex-1 justify-center  items-center">
            <Text>No internet connection</Text>
          </View>
        )}

        <View className="p-4"></View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Order;

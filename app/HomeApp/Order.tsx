import React, { useEffect, useRef, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SecureFetch from "../../src/ApiServices/SecureFetch";
import { mainEndpoint } from "../../src/ApiServices/endpoints";
import { useSearchParams } from "expo-router/build/hooks";
import { IOrderprop } from "../../src/Schema/orders.chema";
import OrderCard from "../../src/Components/OrderComponent/OrderCard";
import * as Notifications from "expo-notifications";
import hasNewElements from "../../src/Components/Functions/newElement";
import { router, useFocusEffect } from "expo-router";
import Header from "../../src/Components/Header/Header";
import { AntDesign } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import sendNotification from "../../src/Functions/OrderFunctions/SendNotification";
import * as Network from "expo-network";
import getOrder from "../../src/Functions/OrderFunctions/getOrder";
import handleAccept from "../../src/Functions/OrderFunctions/handleAccept";

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
  const [lock, setLock] = useState(false);

  const checkConnection = async () => {
    const networkState = await Network.getNetworkStateAsync();
    setIsConnected(
      networkState.isConnected && networkState.isInternetReachable
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const requestPermissions = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== "granted") {
          await Notifications.requestPermissionsAsync();
        }
      };
      getOrder(token, prevOrders, setOrders);
      checkConnection();
      requestPermissions();
    }, [])
  );

  const [lastExecuted, setLastExecuted] = useState(0);
  const executeFunction = () => {
    const currentTime = Date.now();
    if (currentTime - lastExecuted >= 10000) {
      getOrder(token, prevOrders, setOrders);
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
        <SwipeListView
          data={allOrders}
          keyExtractor={(item: IOrderprop) => item._id}
          renderItem={({ item }) => (
            <View key={item._id} className="my-2">
              <OrderCard order={item} />
            </View>
          )}
          renderHiddenItem={() => (
            <View className="bg-white h-full justify-center items-end px-5">
              <View className="flex-row gap-3 mr-5">
                <Text className="text-lg ">Accepting</Text>
                <ActivityIndicator color={"orange"} size={25} />
              </View>
            </View>
          )}
          leftOpenValue={0}
          rightOpenValue={-150}
          disableRightSwipe
          disableLeftSwipe={lock}
          onSwipeValueChange={({ key, value }) => {
            if (value < -150 && !lock) {
              const item = allOrders.find(
                (order: IOrderprop) => order._id === key
              );
              if (item) {
                handleAccept(key, item, setLock, token);
              }
            }
          }}
        />
      ) : (
        <View className="flex-1 justify-center  items-center">
          <Text>No internet connection</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Order;

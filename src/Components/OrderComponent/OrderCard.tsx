import React, { useState } from "react";
import { Text, View, Animated, Image } from "react-native";
import {
  PanGestureHandler,
  HandlerStateChangeEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { IOrderprop } from "../../Schema/orders.chema";
import { router } from "expo-router";
import SecureFetch from "../../ApiServices/SecureFetch";
import { mainEndpoint } from "../../ApiServices/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import catogeryAssets from "../../../assets/Location/catogeryAsset";

interface OrderCardProp {
  order: IOrderprop;
  token: string | null;
}
const SWIPE_THRESHOLD = -40;

const OrderCard = ({ order, token }: OrderCardProp) => {
  const handelAccept = async () => {
    const formData = {
      id: order._id,
    };
    const request = await SecureFetch({
      url: `${mainEndpoint}/order/delete`,
      header: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
      body: JSON.stringify(formData),
    });
    if (request.status == 200) {
      await AsyncStorage.setItem("orderProgress", "true");
      await AsyncStorage.setItem("orderData", JSON.stringify(order));

      router.replace({
        pathname: "/HomeApp/ProgressOrder",
        params: { orderData: JSON.stringify(order) },
      });
    }
  };
  const [translateX] = useState(new Animated.Value(0));
  const [swiped, setSwiped] = useState(false);
  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );
  const handleGestureEnd = (
    event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>
  ) => {
    const { translationX } = event.nativeEvent;
    if (translationX < SWIPE_THRESHOLD && !swiped) {
      setSwiped(true);
      handelAccept();
      resetPosition();
    } else {
      resetPosition();
    }
  };
  const resetPosition = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSwiped(false));
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      // @ts-ignore
      onEnded={handleGestureEnd}
    >
      <Animated.View
        className="border border-gray-300 rounded-xl shadow-2xl p-2 px-3 mx-5 bg-white gap-1"
        style={{
          transform: [{ translateX }],
        }}
      >
        <View className="flex-row gap-2 my-1">
          <View className="mr-3">
            <Image source={catogeryAssets.pickLoc} className="h-10 w-10" />
          </View>
          <Text className="text-sm font-medium">Pick Up :</Text>
          <View className=" ">
            <View className="flex-row gap-2">
              <Text className="text-sm ">{order.pickup.city},</Text>
              <Text className="text-sm ">{order.pickup.address},</Text>
            </View>
            {order.pickup.deliveryInstructions && (
              <View>
                <Text className="text-sm ">
                  {order.pickup.deliveryInstructions}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View className="flex-1 border-b border-dashed my-1"></View>

        <View className="flex-row gap-2 my-1">
          <View className="mr-3">
            <Image source={catogeryAssets.dropLoc} className="h-10 w-10" />
          </View>
          <Text className="text-sm font-medium">Drop Off :</Text>
          <View className=" ">
            <View className="flex-row gap-2">
              <Text className="text-sm ">{order.dropLocation.city},</Text>
              <Text className="text-sm ">{order.dropLocation.address},</Text>
            </View>
            {order.dropLocation.deliveryInstructions && (
              <View>
                <Text className="text-sm ">
                  {order.dropLocation.deliveryInstructions}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Animated.View>

      {/* <View className="border border-slate-300 mx-4 p-2 px-4 rounded-2xl">
        <Text className="text-blact font-bold">{order.customerName}</Text>
        <Text className="text-sm mt-1 ">
          {order.dropLocation.deliveryInstructions}
        </Text>
      </View> */}
    </PanGestureHandler>
  );
};

export default OrderCard;

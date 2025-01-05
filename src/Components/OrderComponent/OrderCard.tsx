import React from "react";
import { Text, View, Image } from "react-native";

import { IOrderprop } from "../../Schema/orders.chema";

import catogeryAssets from "../../../assets/Location/catogeryAsset";

interface OrderCardProp {
  order: IOrderprop;
}

const OrderCard = ({ order }: OrderCardProp) => {
  return (
    <View className="border border-gray-300 rounded-xl shadow-2xl p-2 px-3 mx-5 bg-white gap-1">
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
    </View>
  );
};

export default OrderCard;

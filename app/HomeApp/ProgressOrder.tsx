import { useSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IOrderprop } from "../../src/Schema/orders.chema";
import SwipeButton from "rn-swipe-button";
import OtpModal from "../../src/Components/Modal/OtpModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../src/Components/Header/Header";
import MessageModal from "../../src/Components/Modal/MessageModal";
import catogeryAssets from "../../assets/Location/catogeryAsset";

const ProgessOrder = () => {
  const Token = useRef("");
  const [orderDetails, setOrderDetails] = useState<IOrderprop | null>(null);
  const [message, setMessage] = useState("Slide for PickUp");
  const [dis, setDis] = useState(0);
  let forceResetLastButton: any = null;
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCancle = () => {
    forceResetLastButton && forceResetLastButton();
  };

  const getToken = async () => {
    let temp = await AsyncStorage.getItem("Token");
    if (temp) Token.current = temp;
  };
  const getOrderDetails = async () => {
    let tempData = await AsyncStorage.getItem("orderData");
    if (tempData == null) return;
    setOrderDetails(JSON.parse(tempData));
  };
  useEffect(() => {
    getToken();
    getOrderDetails();
  }, []);

  return (
    <>
      {orderDetails ? (
        <SafeAreaView className="bg-white  flex-1 ">
          <View className="flex-1">
            <Header name="Order Details" token={Token.current} />
            <View className="px-5  p-3 pb-0 gap-1">
              <View className="flex-row gap-2">
                <Text className="text-base">Customer Name :</Text>
                <Text>{orderDetails.customerName}</Text>
              </View>
              <View className="flex-row gap-2">
                <Text className="text-base">Phone Number :</Text>
                <Text>{orderDetails.phoneNumber}</Text>
              </View>
              <View className="flex-row gap-2">
                <Text className="text-base">Payment Method :</Text>
                <Text>{orderDetails.paymentMethod}</Text>
              </View>
              <View className="flex-row">
                <Text className="text-base">Total :</Text>
                <Text className="text-base font-semibold">
                  {" "}
                  $ {orderDetails.price}
                </Text>
              </View>
              <View className="mt-2 max-h-[60%] ">
                <Text className="text-lg font-medium underline text-black   w-full">
                  Order Items
                </Text>
                <FlatList
                  data={orderDetails.items}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View className="flex-row items-center px-4">
                      <Text className="text-black text-lg mr-2">•</Text>
                      <Text className="text-sm text-gray-800">{item}</Text>
                    </View>
                  )}
                />
              </View>
            </View>
            <View className="border-b border-dashed my-2"></View>
            <View className="flex-row gap-4 px-5 my-1">
              <View className="">
                <Image source={catogeryAssets.pickLoc} className="h-14 w-14" />
              </View>
              <View>
                <Text className="text-base font-medium">Pick UP :</Text>
                <View>
                  <View className="flex-row gap-2">
                    <Text className="text-base ">
                      {orderDetails.pickup.city},
                    </Text>
                    <Text className="text-base ">
                      {orderDetails.pickup.address},
                    </Text>
                  </View>
                  {orderDetails.pickup.deliveryInstructions && (
                    <View>
                      <Text className="text-base ">
                        {orderDetails.pickup.deliveryInstructions}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View className="border-b border-dashed my-2"></View>
            <View className="flex-row gap-4 px-5 my-1">
              <View>
                <Image source={catogeryAssets.dropLoc} className="h-14 w-14" />
              </View>
              <View>
                <Text className="text-base font-medium">Drop off :</Text>
                <View>
                  <View className="flex-row gap-2">
                    <Text className="text-base ">
                      {orderDetails.dropLocation.city},
                    </Text>
                    <Text className="text-base ">
                      {orderDetails.dropLocation.address},
                    </Text>
                  </View>
                  {orderDetails.dropLocation.deliveryInstructions && (
                    <View>
                      <Text className="text-base ">
                        {orderDetails.dropLocation.deliveryInstructions}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View className="bg-[#fde5d4]  pt-5 rounded-3xl rounded-b p-3">
            <SwipeButton
              disabled={dis == 1 && true}
              disableResetOnTap
              onSwipeSuccess={() => {
                setMessage("Ordered Picked Up"), setDis(1);
              }}
              railBackgroundColor="#9fc7e8"
              railStyles={{
                backgroundColor: "#3e3a3a57",
                borderColor: "#3e3a3a57",
              }}
              thumbIconBackgroundColor="#f89a4e"
              title={message}
            />

            <SwipeButton
              disabled={dis == 0 && true}
              disableResetOnTap
              forceReset={(reset: any) => {
                forceResetLastButton = reset;
              }}
              onSwipeSuccess={() => setModal(true)}
              railBackgroundColor="#9fc7e8"
              railStyles={{
                backgroundColor: "#3e3a3a57",
                borderColor: "#3e3a3a57",
              }}
              thumbIconBackgroundColor="#f89a4e"
              title="Slide to Deliver"
            />
          </View>
          <OtpModal
            visible={modal}
            setModal={setModal}
            handleCancle={handleCancle}
            actualOtp={orderDetails.otpCode}
            setSuccess={setSuccess}
          />
          <MessageModal
            message="Order delevery successfull"
            visible={success}
            setModal={setSuccess}
            divert={true}
            token={Token.current}
          />
        </SafeAreaView>
      ) : (
        <View className="flex-1 bg-white justify-center items-center">
          <ActivityIndicator color={"orange"} size={30} />
        </View>
      )}
    </>
  );
};

export default ProgessOrder;

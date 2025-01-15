import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInputControllers from "../../src/Components/Controllers/TextInputControllers";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

const UserAddressSchema = z.object({
  city: z.string().min(2, "Name must beat at least 2 character long"),
  state: z.string(),
  zipCode: z.string(),
  deliveryInstructions: z.string().optional(),
  address: z.string().min(2, "Please provide a valid address"),
});

type UserAddressSchema = z.infer<typeof UserAddressSchema>;

const UserAddress = () => {
  const searchParams = useSearchParams();
  let userInfo = searchParams.get("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
  }

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserAddressSchema>({
    resolver: zodResolver(UserAddressSchema),
  });
  const onSubbmit: SubmitHandler<UserAddressSchema> = async (data) => {
    await new Promise<void>((resolve) => {
      setInterval(resolve, 1000);
    });
    let combinedData = {
      userInfo: userInfo,
      userAddress: data,
    };
    router.navigate({
      pathname: "/CreateAccount/UserSignup",
      params: { combinedData: JSON.stringify(combinedData) },
    });
  };
  return (
    <SafeAreaView className="flex-1  px-8 bg-white">
      <View className="flex-1 justify-center  gap-10">
        <View>
          <Text className="text-5xl mb-2 text-indigo-400 font-medium">
            Create Account
          </Text>
        </View>
        <View className="">
          <View className="flex-row w-[100%] justify-between">
            <View className="w-[40%]">
              <TextInputControllers
                control={control}
                name="state"
                placeholder="Enter State"
                errors={errors}
              />
            </View>

            <View className="w-[50%]">
              <TextInputControllers
                control={control}
                name="zipCode"
                placeholder="Enter Zip/Postal Code"
                errors={errors}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <TextInputControllers
            control={control}
            name="city"
            placeholder="Enter your City"
            errors={errors}
          />
          <TextInputControllers
            control={control}
            name="address"
            placeholder="Enter your address"
            errors={errors}
          />
          <Controller
            name="deliveryInstructions"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-b p-2 rounded-lg text-base text-black"
                placeholder="Provide a delevery instruction"
                placeholderTextColor="gray"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline={true}
              />
            )}
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSubbmit)}
          disabled={isSubmitting}
        >
          <Text
            className={`w-full p-2 text-center rounded-xl ${
              isSubmitting ? "bg-[#7d6b46]" : "bg-[#ffb727]"
            }  text-white font-semibold mt-4`}
          >
            {isSubmitting ? <Text>Submitting</Text> : <Text>Next</Text>}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserAddress;

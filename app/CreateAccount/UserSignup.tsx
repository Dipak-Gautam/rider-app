import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInputControllers from "../../src/Components/Controllers/TextInputControllers";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { userEndPoint } from "../../src/ApiServices/endpoints";
import SecureFetch from "../../src/ApiServices/SecureFetch";

const UserSignupSchema = z
  .object({
    email: string().email("Please enter valid email"),
    password: string().min(8, "password must me 8 character long"),
    confirmPassword: string().min(
      8,
      "password and confirm password did not match"
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password must match",
  });

type UserSignupSchema = z.infer<typeof UserSignupSchema>;

const asyncStorage = async (token: string) => {
  await AsyncStorage.setItem("Token", token);
  await AsyncStorage.setItem("FirstLogin", "false");
};

const UserSignup = () => {
  const searchParams = useSearchParams();
  const userInfo = searchParams.get("combinedData");
  let userData;
  if (userInfo) {
    userData = JSON.parse(userInfo);
  } else {
    return;
  }

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserSignupSchema>({
    resolver: zodResolver(UserSignupSchema),
  });
  const onSubbmit: SubmitHandler<UserSignupSchema> = async (data) => {
    const formData = {
      name: userData.userInfo.name,
      mobile: userData.userInfo.phoneNumber,
      email: data.email,
      address: userData.userAddress.address,
      city: userData.userAddress.city,
      state: userData.userAddress.state,
      zipCode: userData.userAddress.zipCode,
      deliveryInstructions: userData.userAddress.deliveryInstruction,
      password: data.password,
      role: "rider",
    };
    console.log("form data", formData);
    const request = await SecureFetch({
      url: `${userEndPoint}/signup`,
      header: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(formData),
    });
    const response = await request.json();

    if (request.status == 200) {
      asyncStorage(response.token);
      router.replace({
        pathname: "/HomeApp/Order",
        params: { token: response.token },
      });
    } else {
      setError("root", {
        message: "Internal server error. Please try again later",
      });
    }
  };
  return (
    <SafeAreaView className="flex-1  px-8 bg-white">
      <View className="flex-1 justify-center  gap-10">
        <View>
          <Text className="text-5xl mb-2 text-indigo-400 font-medium">
            Sign up
          </Text>
        </View>
        <View className="">
          <TextInputControllers
            control={control}
            name="email"
            placeholder="Enter email"
            errors={errors}
          />
          <TextInputControllers
            control={control}
            name="password"
            placeholder="Enter Password"
            errors={errors}
          />
          <TextInputControllers
            control={control}
            name="confirmPassword"
            placeholder="Confirm Password"
            errors={errors}
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
            {isSubmitting ? <Text>Submitting</Text> : <Text>Sign In</Text>}
          </Text>
        </TouchableOpacity>

        <View className="justify-center  items-center">
          <Text className="text-red-400 text-sm ml-2 text-center">
            {errors.root?.message}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserSignup;

import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInputControllers from "../../src/Components/Controllers/TextInputControllers";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { router } from "expo-router";

const UserInfoSchema = z.object({
  name: z.string().min(2, "Name must beat at least 2 character long"),
  phoneNumber: z.string().min(10, "Please provide a valid Number"),
});

type UserInfoSchema = z.infer<typeof UserInfoSchema>;

const UserInfo = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserInfoSchema>({
    resolver: zodResolver(UserInfoSchema),
  });
  const onSubbmit: SubmitHandler<UserInfoSchema> = async (data) => {
    await new Promise<void>((resolve) => {
      setInterval(resolve, 500);
    });
    router.push({
      pathname: "/CreateAccount/UserAddress",
      params: { userInfo: JSON.stringify(data) },
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
          <TextInputControllers
            control={control}
            name="name"
            placeholder="Enter your Full Name"
            errors={errors}
          />
          <TextInputControllers
            control={control}
            name="phoneNumber"
            placeholder="Enter your Phone Number"
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
            {isSubmitting ? <Text>Submitting</Text> : <Text>Next</Text>}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="mb-8 w-32 mx-auto"
        onPress={() => router.navigate("Login")}
      >
        <Text className="underline text-center text-gray-700">Sign In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserInfo;

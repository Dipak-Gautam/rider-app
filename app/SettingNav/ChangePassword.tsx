import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { userEndPoint } from "../../src/ApiServices/endpoints";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInputControllers from "../../src/Components/Controllers/TextInputControllers";
import { useSearchParams } from "expo-router/build/hooks";
import SecureFetch from "../../src/ApiServices/SecureFetch";
import MessageModal from "../../src/Components/Modal/MessageModal";
import SuccessModal from "../../src/Components/Modal/SuccessModal";

const changePasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password must match",
  });
type changePasswordSchema = z.infer<typeof changePasswordSchema>;

const ChangePassword = () => {
  const [visible, setModal] = useState(false);
  const searchParams = useSearchParams();
  let token = searchParams.get("token");
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<changePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubbmit: SubmitHandler<changePasswordSchema> = async (data) => {
    const formdata = {
      currentPassword: data.password,
      newPassword: data.newPassword,
    };
    console.log("formdata", formdata);
    const request = await SecureFetch({
      url: `${userEndPoint}/profile/password`,
      header: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(formdata),
    });
    const response = await request.json();
    if (request.status == 200) {
      setModal(true);
    } else {
      setError("root", { message: "Internal server error" });
    }
  };
  return (
    <>
      <SafeAreaView className="flex flex-1  px-8 bg-white">
        <View className="gap-8 w-full">
          <View>
            <Text className="text-black text-xl font-semibold">
              ChangePassword
            </Text>
          </View>

          <View>
            <TextInputControllers
              control={control}
              errors={errors}
              name="password"
              placeholder="Current Password"
            />
            <TextInputControllers
              control={control}
              errors={errors}
              name="newPassword"
              placeholder="New Password"
            />
            <TextInputControllers
              control={control}
              errors={errors}
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit(onSubbmit)}
            disabled={isSubmitting}
          >
            <Text
              className={`w-full p-2 text-center rounded-xl ${
                isSubmitting ? "bg-[#896f3d]" : "bg-[#ffb727]"
              }  text-white font-semibold mt-4`}
            >
              {isSubmitting ? (
                <Text>Submitting...</Text>
              ) : (
                <Text>Continue</Text>
              )}
            </Text>
          </TouchableOpacity>
          <View className="justify-center  items-center">
            <Text className="text-red-400 text-sm ml-2 text-center">
              {errors.root?.message}
            </Text>
          </View>
        </View>
      </SafeAreaView>
      {visible && (
        <SuccessModal
          setModal={setModal}
          message="Password changed sucessfully"
        />
      )}
    </>
  );
};

export default ChangePassword;

import React from "react";

import { Control, Controller, FieldValues } from "react-hook-form";
import { Text, TextInputProps, View } from "react-native";
import { FloatingLabelInput } from "react-native-floating-label-input";
interface TextInputControllersProp extends TextInputProps {
  control: Control<any>;
  errors: FieldValues;
  name: string;
  placeholder: string;
}

const TextInputControllers = ({
  control,
  errors,
  name,
  placeholder,
  ...prop
}: TextInputControllersProp) => {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FloatingLabelInput
            label={placeholder}
            className="border-b p-1 rounded-lg text-base text-black translate-y-3 my-1"
            placeholder={placeholder}
            placeholderTextColor="gray"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            {...prop}
            containerStyles={{
              borderBlockColor: "white",
            }}
            inputStyles={{
              color: "black",
            }}
            labelStyles={{
              fontSize: 20,
            }}
          />
        )}
      />
      <View className="h-4">
        {errors[name] && (
          <Text className="text-red-400 text-xs translate-y-2 ml-2 ">
            {errors[name].message}
          </Text>
        )}
      </View>
    </View>
  );
};

export default TextInputControllers;

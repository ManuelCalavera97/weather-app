import { isAxiosError } from "axios";
import React from "react";
import { Text, View } from "react-native";

type ErrorDisplayProps = {
  error: string | unknown;
};

const ErrorDisplay = (props: ErrorDisplayProps) => {
  let errorMessage = "Something went wrong, please try again later";

  if (typeof props.error === "string") {
    errorMessage = props.error;
  }

  if (isAxiosError(props.error)) {
    errorMessage = props.error.message;
  }

  if (!props.error) {
    return null;
  }
  return (
    <View className="px-4 py-2 bg-red-50 rounded-md shadow-sm">
      <Text>{errorMessage}</Text>
    </View>
  );
};

export default ErrorDisplay;

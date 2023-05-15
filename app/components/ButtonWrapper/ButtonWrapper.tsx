import React, { PropsWithChildren } from "react";

import { GestureResponderEvent, TouchableOpacity } from "react-native";

type ButtonWrapperProps = {
  onPress: (event: GestureResponderEvent) => void;
  wrapperClass?: string;
  disabled?: boolean;
};

const ButtonWrapper = (props: PropsWithChildren<ButtonWrapperProps>) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      className={props.wrapperClass}
      disabled={props.disabled}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default ButtonWrapper;

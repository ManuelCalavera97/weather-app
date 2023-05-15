import SwitchSelector from "react-native-switch-selector";

import React from "react";

import { SafeAreaView } from "react-native";

import { TimePeriod } from "../../types/time";

type DaySelectorProps = {
  setTimePeriod: (timePeriod: TimePeriod) => void;
  timePeriod: TimePeriod;
  disabled?: boolean;
};

const DaySelector = (props: DaySelectorProps) => {
  const options = [
    { label: "Today", value: TimePeriod.TODAY },
    { label: "Week", value: TimePeriod.WEEK },
    { label: "Half a month", value: TimePeriod.HALF_MONTH },
  ];
  return (
    <SafeAreaView className="flex items-center shadow-md">
      <SwitchSelector
        initial={props.timePeriod}
        value={props.timePeriod}
        options={options}
        onPress={props.setTimePeriod}
        hasPadding
        valuePadding={4}
        selectedColor="#FFF"
        textColor="#0f172a"
        buttonColor={props.disabled ? "#cbd5e1" : "#3b82f6"}
        borderColor={props.disabled ? "#f1f5f9" : "#FFF"}
        backgroundColor={props.disabled ? "#f1f5f9" : "#FFF"}
        disabled={props.disabled}
      />
    </SafeAreaView>
  );
};

export default DaySelector;

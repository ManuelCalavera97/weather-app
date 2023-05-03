import React, { useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ButtonWrapper from "./ButtonWrapper";
import { CalendarIcon } from "react-native-heroicons/outline";
import { Picker } from "@react-native-picker/picker";
import { TimePeriod } from "../types/time";

type DaySelectorProps = {
  setTimePeriod: (timePeriod: TimePeriod) => void;
  timePeriod: TimePeriod;
};

const DaySelector = (props: DaySelectorProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="flex items-center">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="mt-20 mx-5 flex-1 items-center justify-center">
          <View className="mt-auto mb-20 bg-white rounded-2xl p-5 items-center shadow-md z-30 w-full">
            <Picker
              style={{
                width: "100%",
              }}
              selectedValue={props.timePeriod}
              onValueChange={(itemValue) => props.setTimePeriod(itemValue)}
            >
              {Object.values(TimePeriod).map((value, index) => (
                <Picker.Item label={value} value={index} />
              ))}
            </Picker>
            <Pressable
              className="px-4 py-2"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="text-lg text-blue-500">Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ButtonWrapper
        wrapperClass={`bg-white border border-slate-100 rounded-full py-2 px-2 shadow-sm`}
        onPress={() => setModalVisible(true)}
      >
        <CalendarIcon />
      </ButtonWrapper>
    </SafeAreaView>
  );
};

export default DaySelector;

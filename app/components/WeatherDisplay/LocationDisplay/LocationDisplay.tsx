import React from "react";

import { Text, View } from "react-native";

import { simpleWeather } from "@customTypes/weather";

import mapDayWeatherCode from "@helpers/mapWeatherIcons";

type LocationDisplayProps = {
  locationName?: string;
  simpleWeather: simpleWeather;
};

const LocationDisplay = (props: LocationDisplayProps) => {
  const weatherCodeProps = mapDayWeatherCode(
    props.simpleWeather.currentWeatherCode
  );

  return (
    <View className="flex flex-1 flex-row items-center justify-between rounded-md bg-white px-4 py-2 shadow-sm mb-4">
      <View className="flex flex-1 items-baseline">
        <Text
          className={`text-left text-lg font-medium leading-6 ${
            props.locationName ? "text-slate-900" : "text-red-800"
          }`}
        >
          {props.locationName ?? "Location name not found"}
        </Text>
        <Text className="text-center font-medium text-slate-600">
          {weatherCodeProps.label}
        </Text>
        <Text className="text-center font-medium text-slate-600">
          {props.simpleWeather.currentWeatherTemp}°C
        </Text>
      </View>
      <View className="mt-1">{weatherCodeProps.icon}</View>
    </View>
  );
};

export default LocationDisplay;

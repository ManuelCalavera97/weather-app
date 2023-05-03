import React from "react";
import mapDayWeather from "../helpers/mapWeatherIcons";
import { Text, View } from "react-native";

type WeatherDisplayProps = {
  temperature: number;
  weatherCode: number;
  locationName: string;
};

const WeatherDisplay = (props: WeatherDisplayProps) => {
  return (
    <View className="flex gap-1 justify-center items-center">
      <Text className="font-medium text-xl text-center text-slate-900">
        {props.locationName}
      </Text>
      <View className="pt-4">{mapDayWeather(props.weatherCode)}</View>
      <Text className="font-semibold text-6xl text-center text-slate-900">
        {props.temperature}°C
      </Text>
    </View>
  );
};

export default WeatherDisplay;

import React from "react";

import { View } from "react-native";

import { TimePeriod } from "@customTypes/time";
import { weather } from "@customTypes/weather";

import LocationDisplay from "./LocationDisplay/LocationDisplay";
import TempGraph from "./TempGraph/TempGraph";

type WeatherDisplayProps = {
  locationName?: string;
  timePeriod: TimePeriod;
  weather: weather;
};

const WeatherDisplay = (props: WeatherDisplayProps) => {
  const { locationName, timePeriod, weather } = props;
  return (
    <View className="flex w-full items-stretch justify-center">
      <LocationDisplay
        locationName={locationName}
        simpleWeather={weather.simpleWeather}
      />
      <TempGraph timePeriod={timePeriod} weather={weather} />
    </View>
  );
};

export default WeatherDisplay;

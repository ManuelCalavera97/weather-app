import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import SearchBar from "../components/SearchBar";
import { location } from "../types/location";
import { useQuery } from "@tanstack/react-query";
import { getLocByPos } from "../services/places";
import WeatherDisplay from "../components/WeatherDisplay";
import { getWeather } from "../services/weather";
import DaySelector from "../components/DaySelector";
import { TimePeriod } from "../types/time";

const Main = () => {
  const [location, setLocation] = useState<location>({ isLoading: false });
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(TimePeriod.TODAY);

  const locationInfo = useQuery({
    queryKey: ["location", location?.pos?.lat, location?.pos?.lng],
    queryFn: () => getLocByPos(location.pos),
    enabled: !!location?.pos,
  });
  const weatherInfo = useQuery({
    queryKey: ["weather", location?.pos?.lat, location?.pos?.lng, timePeriod],
    queryFn: () => getWeather(location.pos),
    enabled: !!location?.pos,
  });
  const formattedLocation = locationInfo?.data?.results[0]?.formatted_address;
  const loading =
    (locationInfo.isLoading && locationInfo.fetchStatus !== "idle") ||
    (weatherInfo.isLoading && weatherInfo.fetchStatus !== "idle") ||
    location.isLoading;
  console.log(location?.pos, weatherInfo);

  return (
    <View className="flex-1 self-stretch relative">
      <View className="absoulte top-0 left-0 right-0 z-10 flex-1 flex">
        <SearchBar onLocationChange={setLocation} location={location} />
      </View>
      <View className="absolute top-0 left-0 right-0 h-full">
        <View className="flex-1 flex items-center justify-center">
          {loading && <ActivityIndicator size="large" />}
          {formattedLocation && weatherInfo.data && (
            <WeatherDisplay
              temperature={weatherInfo.data.current_weather.temperature}
              weatherCode={weatherInfo.data.current_weather.weathercode}
              locationName={formattedLocation}
            ></WeatherDisplay>
          )}
        </View>
      </View>
      <View className="w-full z-20">
        <DaySelector setTimePeriod={setTimePeriod} timePeriod={timePeriod} />
      </View>
    </View>
  );
};

export default Main;

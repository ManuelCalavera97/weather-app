import { useQuery } from "@tanstack/react-query";

import React, { useState } from "react";

import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

import DaySelector from "../components/DaySelector/DaySelector";
import ErrorDisplay from "../components/ErrorDisplay/ErrorDisplay";
import SearchBar from "../components/SearchBar/SearchBar";
import WeatherDisplay from "../components/WeatherDisplay/WeatherDisplay";
import { mapWeatherData } from "../helpers/mapWeatherData";
import { getLocByPos } from "../services/places";
import { getWeather } from "../services/weather";
import { location } from "../types/location";
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
    queryFn: () => getWeather(location.pos, timePeriod),
    enabled: !!location?.pos,
  });

  const mappedWeatherData =
    weatherInfo.data && mapWeatherData(weatherInfo.data, timePeriod);
  const formattedLocation = locationInfo?.data?.results[0]?.formatted_address;
  const loading =
    (locationInfo.isLoading &&
      locationInfo.fetchStatus !== "idle" &&
      !locationInfo.data) ||
    (weatherInfo.isLoading &&
      weatherInfo.fetchStatus !== "idle" &&
      !weatherInfo.data) ||
    location.isLoading;
  const error = location.error || locationInfo.error || weatherInfo.error;

  return (
    <SafeAreaView className="relative flex-1 self-stretch">
      <View className="absolute top-0 z-10 w-full px-10">
        <SearchBar onLocationChange={setLocation} location={location} />
      </View>
      {loading && <ActivityIndicator size="large" className="h-full" />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-8 mt-16 flex flex-1 items-center justify-center px-4">
          <ErrorDisplay error={error} />
          {mappedWeatherData && (
            <WeatherDisplay
              locationName={formattedLocation}
              timePeriod={timePeriod}
              {...mappedWeatherData}
            />
          )}
        </View>
      </ScrollView>
      <View className="absoulte bottom-0 z-10 mt-auto w-full px-10">
        <DaySelector
          setTimePeriod={setTimePeriod}
          timePeriod={timePeriod}
          disabled={!weatherInfo.data}
        />
      </View>
    </SafeAreaView>
  );
};

export default Main;

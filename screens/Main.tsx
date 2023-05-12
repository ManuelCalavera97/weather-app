import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import SearchBar from "../components/SearchBar";
import { location } from "../types/location";
import { useQuery } from "@tanstack/react-query";
import { getLocByPos } from "../services/places";
import WeatherDisplay from "../components/WeatherDisplay";
import { getWeather } from "../services/weather";
import DaySelector from "../components/DaySelector";
import { TimePeriod } from "../types/time";
import { mapWeatherData } from "../helpers/mapWeatherData";
import ErrorDisplay from "../components/ErrorDisplay";

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
    <SafeAreaView className="flex-1 self-stretch relative">
      <View className="absolute top-0 w-full z-10 px-10">
        <SearchBar onLocationChange={setLocation} location={location} />
      </View>
      {loading && <ActivityIndicator size="large" className="h-full" />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 flex items-center justify-center mt-16 mb-8 px-4">
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
      <View className="absoulte bottom-0 w-full mt-auto z-10 px-10">
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

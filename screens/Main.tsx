import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import SearchBar from "../components/SearchBar";
import { location } from "../types/location";
import { useQuery } from "@tanstack/react-query";
import { getLocByPos } from "../services/places";

const Main = () => {
  const [location, setLocation] = useState<location>({ isLoading: false });
  const locationInfo = useQuery({
    queryKey: ["location", location?.pos?.lat, location?.pos?.lng],
    queryFn: () => getLocByPos(location.pos),
    enabled: !!location?.pos,
  });
  const formattedLocation = locationInfo?.data?.results[0]?.formatted_address;
  const loading = locationInfo.isLoading || location.isLoading;

  return (
    <View className="flex-1 self-stretch relative">
      <View className="absoulte top-0 left-0 right-0 z-10 h-full flex">
        <SearchBar onLocationChange={setLocation} location={location} />
      </View>
      <View className="absolute top-0 left-0 right-0 h-full">
        <View className="flex-1 flex items-center justify-center">
          {loading && <ActivityIndicator />}
          {formattedLocation && <Text>{formattedLocation}</Text>}
        </View>
      </View>
    </View>
  );
};

export default Main;

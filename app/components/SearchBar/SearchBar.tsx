import React from "react";

import { View } from "react-native";

import { location } from "../../types/location";
import GeoButton from "./GeoButton/GeoButton";
import GoogleSearch from "./GoogleSearch/GoogleSearch";

type SearchBarProps = {
  onLocationChange: (location: location) => void;
  location: location;
};

const SearchBar = (props: SearchBarProps) => {
  return (
    <View className="flex flex-1 flex-row justify-center gap-3">
      <View className="flex-1 shadow-md">
        <GoogleSearch {...props} />
      </View>
      <View className="self-start">
        <GeoButton {...props} />
      </View>
    </View>
  );
};

export default SearchBar;

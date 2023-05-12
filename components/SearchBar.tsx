import React from "react";
import * as Location from "expo-location";
import { View } from "react-native";
import ButtonWrapper from "./ButtonWrapper";
import { MapPinIcon } from "react-native-heroicons/outline";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { location } from "../types/location";

type SearchBarProps = {
  onLocationChange: (location: location) => void;
  location: location;
};

const SearchBar = (props: SearchBarProps) => {
  const getGeoLocation = async () => {
    props.onLocationChange({ isLoading: true, error: undefined });
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      props.onLocationChange({
        isLoading: false,
        error: "Geolocation was not allowed, please use the location search",
      });
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      props.onLocationChange({
        isLoading: false,
        error: undefined,
        pos: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
    } catch {
      props.onLocationChange({
        isLoading: false,
        error:
          "Something went wrong, please try again or use location search field",
      });
    }
  };

  return (
    <View className="flex-1 flex justify-center flex-row gap-3">
      <View className="flex-1 shadow-md">
        <GooglePlacesAutocomplete
          placeholder="Search your city"
          onPress={(_, details = null) => {
            props.onLocationChange({
              isLoading: false,
              error: undefined,
              pos: {
                lat: details.geometry.location.lat,
                lng: details.geometry.location.lng,
              },
            });
          }}
          onNotFound={() => {
            props.onLocationChange({
              isLoading: false,
              error:
                "Geoposition could not be determined, please try another query",
            });
          }}
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3",
          ]}
          fetchDetails={true}
          query={{
            key: Constants.expoConfig.extra.googlePlacesKey,
            type: "(cities)",
          }}
          styles={{
            textInput: {
              paddingLeft: 15,
              borderRadius: 100,
              backgroundColor: props.location.isLoading ? "#f1f5f9" : "#FFFFFF",
            },
            poweredContainer: {
              borderBottomRightRadius: "100%",
              borderBottomLeftRadius: "100%",
              paddingEnd: 30,
            },
          }}
          textInputProps={{
            editable: !props.location.isLoading,
          }}
        />
      </View>
      <View className="self-start">
        <ButtonWrapper
          wrapperClass={`${
            props.location.isLoading ? "bg-slate-100" : "bg-white"
          } border border-slate-100 rounded-full py-2 px-2 shadow-md`}
          onPress={getGeoLocation}
          disabled={props.location.isLoading}
        >
          <MapPinIcon />
        </ButtonWrapper>
      </View>
    </View>
  );
};

export default SearchBar;

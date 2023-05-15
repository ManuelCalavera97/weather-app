import * as Location from "expo-location";
import { MapPinIcon } from "react-native-heroicons/outline";

import React from "react";

import ButtonWrapper from "@components/ButtonWrapper/ButtonWrapper";

import { location } from "@customTypes/location";

type GeoButtonProps = {
  onLocationChange: (location: location) => void;
  location: location;
};

const GeoButton = (props: GeoButtonProps) => {
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
    <ButtonWrapper
      wrapperClass={`${
        props.location.isLoading ? "bg-slate-100" : "bg-white"
      } border border-slate-100 rounded-full py-2 px-2 shadow-md`}
      onPress={getGeoLocation}
      disabled={props.location.isLoading}
    >
      <MapPinIcon />
    </ButtonWrapper>
  );
};

export default GeoButton;

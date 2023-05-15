import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import React from "react";

import { location } from "../../../types/location";

type GoogleSearchProps = {
  onLocationChange: (location: location) => void;
  location: location;
};

const GoogleSearch = (props: GoogleSearchProps) => {
  return (
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
  );
};

export default GoogleSearch;

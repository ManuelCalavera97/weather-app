import axios from "axios";
import Constants from "expo-constants";

import { geoPos } from "@customTypes/location";

export const getLocByPos = async (pos: geoPos) => {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&sensor=true&result_type=locality&result_type=sublocality&result_type=administrative_area_level_3&result_type=political&key=${Constants.expoConfig.extra.googlePlacesKey}`
  );
  return data;
};

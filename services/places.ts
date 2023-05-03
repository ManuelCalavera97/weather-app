import axios from "axios";
import { geoPos } from "../types/location";
import Constants from "expo-constants";

export const getLocByPos = async (pos: geoPos) => {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&sensor=true&result_type=locality&key=${Constants.expoConfig.extra.googlePlacesKey}`
  );
  return data;
};

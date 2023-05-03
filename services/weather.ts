import axios from "axios";
import { geoPos } from "../types/location";

export const getWeather = async (pos: geoPos) => {
  const { data } = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${pos.lat}&longitude=${pos.lng}&current_weather=true`
  );
  return data;
};

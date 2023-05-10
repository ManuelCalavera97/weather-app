import axios from "axios";
import { geoPos } from "../types/location";
import { TimePeriod } from "../types/time";

export const getWeather = async (pos: geoPos, timePeriod: TimePeriod) => {
  const timeParams =
    timePeriod === TimePeriod.TODAY
      ? "&hourly=temperature_2m&forecast_days=1"
      : `&daily=temperature_2m_max&daily=temperature_2m_min&forecast_days=16&timezone=GMT`;
  const { data } = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${pos.lat}&longitude=${pos.lng}&current_weather=true${timeParams}`
  );
  return data;
};

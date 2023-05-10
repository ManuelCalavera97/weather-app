import { TimePeriod } from "../types/time";
import { weather } from "../types/weather";

export const mapWeatherData = (
  weatherData,
  timePeriod: TimePeriod
): weather => {
  let weather: weather = {
    currentWeatherCode: weatherData.current_weather.weathercode,
    currentWeatherTemp: weatherData.current_weather.temperature,
    isDaily: false,
  };
  if (weatherData?.daily) {
    weather.isDaily = true;
    if (timePeriod === TimePeriod.HALF_MONTH) {
      weather.dailyMin = weatherData.daily.temperature_2m_min;
      weather.dailyMax = weatherData.daily.temperature_2m_max;
      weather.dailyTime = weatherData.daily.time;
    } else {
      weather.dailyMin = weatherData.daily.temperature_2m_min.slice(0, 7);
      weather.dailyMax = weatherData.daily.temperature_2m_max.slice(0, 7);
      weather.dailyTime = weatherData.daily.time.slice(0, 7);
    }
  } else if (weatherData?.hourly) {
    weather.hourly = weatherData.hourly.temperature_2m;
  }
  return weather;
};

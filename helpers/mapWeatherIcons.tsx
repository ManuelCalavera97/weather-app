import React, { ReactElement } from "react";
import {
  DayCloudy,
  DayFog,
  DayHail,
  DayRain,
  DayRainMix,
  DayRainWind,
  DaySnow,
  DaySnowWind,
  DayStormShowers,
  DaySunny,
  DayThunderstorm,
  Thermometer,
} from "../assets/WeatherIcons";

const mapDayWeatherCode = (
  weatherCode: number
): { icon: ReactElement; label: string } => {
  switch (weatherCode) {
    case 0:
      return {
        icon: <DaySunny width={70} height={55} />,
        label: "Clear sky",
      };
    case 1:
    case 2:
    case 3:
      return {
        icon: <DayCloudy width={70} height={55} />,
        label: "Partly cloudy",
      };
    case 45:
    case 48:
      return {
        icon: <DayFog width={70} height={55} />,
        label: "Fog",
      };
    case 51:
    case 53:
    case 55:
      return {
        icon: <DayRainMix width={70} height={55} />,
        label: "Drizzle",
      };
    case 56:
    case 57:
      return {
        icon: <DayHail width={70} height={55} />,
        label: "Freezing Drizzle",
      };
    case 61:
    case 63:
    case 65:
      return {
        icon: <DayRain width={70} height={55} />,
        label: "Rain",
      };
    case 66:
    case 67:
      return {
        icon: <DayRainWind width={70} height={55} />,
        label: "Freezing Rain",
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        icon: <DaySnow width={70} height={55} />,
        label: "Snow fall",
      };
    case 80:
    case 81:
    case 82:
      return {
        icon: <DayStormShowers width={70} height={55} />,
        label: "Rain showers",
      };
    case 85:
    case 86:
      return {
        icon: <DaySnowWind width={70} height={55} />,
        label: "Snow showers",
      };
    case 95:
    case 96:
    case 99:
      return {
        icon: <DayThunderstorm width={70} height={55} />,
        label: "Thunderstorm",
      };
    default:
      return {
        icon: <Thermometer width={70} height={55} />,
        label: "Weather status not avaliable",
      };
  }
};

export default mapDayWeatherCode;

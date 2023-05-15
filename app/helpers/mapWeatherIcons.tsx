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
} from "@assets/WeatherIcons";

const mapDayWeatherCode = (
  weatherCode: number
): { icon: ReactElement; label: string } => {
  const iconProps = {
    width: 70,
    height: 55,
    fill: "black",
  };
  switch (weatherCode) {
    case 0:
      return {
        icon: <DaySunny {...iconProps} />,
        label: "Clear sky",
      };
    case 1:
    case 2:
    case 3:
      return {
        icon: <DayCloudy {...iconProps} />,
        label: "Partly cloudy",
      };
    case 45:
    case 48:
      return {
        icon: <DayFog {...iconProps} />,
        label: "Fog",
      };
    case 51:
    case 53:
    case 55:
      return {
        icon: <DayRainMix {...iconProps} />,
        label: "Drizzle",
      };
    case 56:
    case 57:
      return {
        icon: <DayHail {...iconProps} />,
        label: "Freezing Drizzle",
      };
    case 61:
    case 63:
    case 65:
      return {
        icon: <DayRain {...iconProps} />,
        label: "Rain",
      };
    case 66:
    case 67:
      return {
        icon: <DayRainWind {...iconProps} />,
        label: "Freezing Rain",
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        icon: <DaySnow {...iconProps} />,
        label: "Snow fall",
      };
    case 80:
    case 81:
    case 82:
      return {
        icon: <DayStormShowers {...iconProps} />,
        label: "Rain showers",
      };
    case 85:
    case 86:
      return {
        icon: <DaySnowWind {...iconProps} />,
        label: "Snow showers",
      };
    case 95:
    case 96:
    case 99:
      return {
        icon: <DayThunderstorm {...iconProps} />,
        label: "Thunderstorm",
      };
    default:
      return {
        icon: <Thermometer {...iconProps} />,
        label: "Weather status not avaliable",
      };
  }
};

export default mapDayWeatherCode;

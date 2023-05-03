import React from "react";
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

const mapDayWeather = (weatherCode: number) => {
  switch (weatherCode) {
    case 0:
      return <DaySunny width={220} height={120} />;
    case 1:
    case 2:
    case 3:
      return <DayCloudy width={220} height={120} />;
    case 45:
    case 48:
      return <DayFog width={220} height={120} />;
    case 51:
    case 53:
    case 55:
      return <DayRainMix width={220} height={120} />;
    case 56:
    case 57:
      return <DayHail width={220} height={120} />;
    case 61:
    case 63:
    case 65:
      return <DayRain width={220} height={120} />;
    case 66:
    case 67:
      return <DayRainWind width={220} height={120} />;
    case 71:
    case 73:
    case 75:
    case 77:
      return <DaySnow width={220} height={120} />;
    case 80:
    case 81:
    case 82:
      return <DayStormShowers width={220} height={120} />;
    case 85:
    case 86:
      return <DaySnowWind width={220} height={120} />;
    case 95:
    case 96:
    case 99:
      return <DayThunderstorm width={220} height={120} />;
    default:
      return <Thermometer width={220} height={120} />;
  }
};

export default mapDayWeather;

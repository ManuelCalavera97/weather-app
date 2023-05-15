export type simpleWeather = {
  currentWeatherCode: number;
  currentWeatherTemp: number;
};

export type weather = {
  simpleWeather: simpleWeather;
  isDaily: boolean;
  dailyMin?: number[];
  dailyMax?: number[];
  dailyTime?: string[];
  hourly?: number[];
};

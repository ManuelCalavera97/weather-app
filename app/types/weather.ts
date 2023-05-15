export type weather = {
  currentWeatherCode: number;
  currentWeatherTemp: number;
  isDaily: boolean;
  dailyMin?: number[];
  dailyMax?: number[];
  dailyTime?: string[];
  hourly?: number[];
};

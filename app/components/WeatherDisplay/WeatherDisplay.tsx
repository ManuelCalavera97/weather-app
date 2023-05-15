import { LineChart } from "react-native-chart-kit";

import React from "react";

import { ScrollView, Text, View } from "react-native";
import { Dimensions } from "react-native";

import mapDayWeatherCode from "../../helpers/mapWeatherIcons";
import { TimePeriod } from "../../types/time";
import { weather } from "../../types/weather";

type WeatherDisplayProps = {
  locationName?: string;
  timePeriod: TimePeriod;
} & weather;

const chartConfig = {
  backgroundGradientFrom: "#FFF",
  backgroundGradientTo: "#FFF",
  color: (opacity = 1) => `rgba(17, 24, 39, ${opacity})`,
  barPercentage: 0.5,
};

const mapTimePeriodProps = (props: WeatherDisplayProps) => {
  switch (props.timePeriod) {
    case TimePeriod.TODAY:
      return {
        title: "From noon to dusk",
        labels: props.hourly.map(
          (_, index) => `${index < 9 ? `0${index}` : index}:00`
        ),
      };
    case TimePeriod.WEEK:
      return {
        title: `From today up to ${new Intl.DateTimeFormat("en-US", {
          weekday: "long",
        }).format(new Date(props.dailyTime[props.dailyTime.length - 1]))}`,
        labels: props.dailyTime.map((value) => {
          const date = new Date(value);
          return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
            date
          );
        }),
      };
    case TimePeriod.HALF_MONTH:
      return {
        title: `From today up to ${new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }).format(new Date(props.dailyTime[props.dailyTime.length - 1]))}`,
        labels: props.dailyTime.map((value) => {
          const date = new Date(value);
          return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "short",
          }).format(date);
        }),
      };
  }
};

const WeatherDisplay = (props: WeatherDisplayProps) => {
  const screenWidth = Dimensions.get("window").width;
  const weatherCodeProps = mapDayWeatherCode(props.currentWeatherCode);
  const weatherLabels = mapTimePeriodProps(props);
  const data = {
    labels: weatherLabels.labels,
    datasets: props.isDaily
      ? [
          {
            data: props.dailyMax,
          },
          {
            data: props.dailyMin,
          },
        ]
      : [
          {
            data: props.hourly,
          },
        ],
  };

  return (
    <View className="flex w-full items-stretch justify-center gap-6">
      <View className="flex flex-1 flex-row items-center justify-between rounded-md bg-white px-4 py-2 shadow-sm">
        <View className="flex flex-1 items-baseline">
          <Text
            className={`text-left text-lg font-medium leading-6 ${
              props.locationName ? "text-slate-900" : "text-red-800"
            }`}
          >
            {props.locationName ?? "Location name not found"}
          </Text>
          <Text className="text-center font-medium text-slate-600">
            {weatherCodeProps.label}
          </Text>
          <Text className="text-center font-medium text-slate-600">
            {props.currentWeatherTemp}°C
          </Text>
        </View>
        <View className="mt-1">{weatherCodeProps.icon}</View>
      </View>
      <View className="h-min flex-1 rounded-md bg-white shadow-sm">
        <View className="px-4 py-2 text-slate-900">
          <Text>{weatherLabels.title}</Text>
        </View>
        <View className="mv-1 h-0.5 bg-slate-200" />
        <ScrollView
          horizontal={true}
          stickyHeaderIndices={[1]}
          className="py-4"
        >
          <LineChart
            data={data}
            width={screenWidth * 2}
            height={345}
            chartConfig={chartConfig}
            verticalLabelRotation={65}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default WeatherDisplay;

import { LineChart } from "react-native-chart-kit";

import React from "react";

import { ScrollView, Text, View } from "react-native";
import { Dimensions } from "react-native";

import { TimePeriod } from "@customTypes/time";
import { weather } from "@customTypes/weather";

type TempGraphProps = {
  locationName?: string;
  timePeriod: TimePeriod;
  weather: weather;
};

const chartConfig = {
  backgroundGradientFrom: "#FFF",
  backgroundGradientTo: "#FFF",
  color: (opacity = 1) => `rgba(17, 24, 39, ${opacity})`,
  barPercentage: 0.5,
};

const mapTimePeriodProps = (props: TempGraphProps) => {
  const { weather, timePeriod } = props;
  switch (timePeriod) {
    case TimePeriod.TODAY:
      return {
        title: "From noon to dusk",
        labels: weather.hourly.map(
          (_, index) => `${index < 9 ? `0${index}` : index}:00`
        ),
      };
    case TimePeriod.WEEK:
      return {
        title: `From today up to ${new Intl.DateTimeFormat("en-US", {
          weekday: "long",
        }).format(new Date(weather.dailyTime[weather.dailyTime.length - 1]))}`,
        labels: weather.dailyTime.map((value) => {
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
        }).format(new Date(weather.dailyTime[weather.dailyTime.length - 1]))}`,
        labels: weather.dailyTime.map((value) => {
          const date = new Date(value);
          return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "short",
          }).format(date);
        }),
      };
  }
};

const TempGraph = (props: TempGraphProps) => {
  const { weather } = props;
  const screenWidth = Dimensions.get("window").width;
  const weatherLabels = mapTimePeriodProps(props);
  const data = {
    labels: weatherLabels.labels,
    datasets: weather.isDaily
      ? [
          {
            data: weather.dailyMax,
          },
          {
            data: weather.dailyMin,
          },
        ]
      : [
          {
            data: weather.hourly,
          },
        ],
  };

  return (
    <View className="h-min flex-1 rounded-md bg-white shadow-sm mb-4">
      <View className="px-4 py-2 text-slate-900">
        <Text>{weatherLabels.title}</Text>
      </View>
      <View className="mv-1 h-0.5 bg-slate-200" />
      <ScrollView horizontal={true} stickyHeaderIndices={[1]} className="py-4">
        <LineChart
          data={data}
          width={screenWidth * 2}
          height={345}
          chartConfig={chartConfig}
          verticalLabelRotation={65}
        />
      </ScrollView>
    </View>
  );
};

export default TempGraph;

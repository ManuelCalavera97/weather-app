module.exports = {
  expo: {
    name: "WeatherApp",
    slug: "WeatherApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./app/assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./app/assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./app/assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./app/assets/favicon.png",
    },
    plugins: [
      [
        "expo-location",
        {
          locationWhenInUsePermission: "Allow WeatherApp to use your location.",
        },
      ],
    ],
    extra: {
      googlePlacesKey: process.env.GOOGLE_PLACES_KEY,
    },
  },
};

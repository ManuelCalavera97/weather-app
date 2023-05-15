import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

import { View } from "react-native";

import Main from "@screens/Main";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View
        style={{
          paddingTop: Constants.statusBarHeight + 10,
        }}
        className="h-full fixed items-center justify-center bg-slate-50 pb-4"
      >
        <Main></Main>
        <StatusBar style="auto" />
      </View>
    </QueryClientProvider>
  );
}

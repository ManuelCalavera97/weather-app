import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, View } from "react-native";

import Main from "./screens/Main";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View
        style={styles.container}
        className="flex-1 items-center justify-center bg-slate-50"
      >
        <Main></Main>
        <StatusBar style="auto" />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
  },
});

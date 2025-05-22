import { useAuthStore } from "@/store/useAuthStore";
import { theme } from "@/theme";
import { useCallback, useEffect } from "react";
import { AppState, AppStateStatus, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import AuthScreen from "./AuthScreen";
import { CustomStatusBar } from "@/components/CustomStatusBar";

export default function Home() {
  const { isAuthenticated, reset } = useAuthStore();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    if (nextAppState === "active") {
      reset();
    }
  }, []);

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <>
      <CustomStatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.primary}
      />
      <View style={styles.container}>
        <Text style={styles.title}>✅ Unlocked</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
  },
  title: {
    marginBottom: 16,
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.primary,
  },
  button: {
    marginTop: 20,
    width: "80%",
  },
});

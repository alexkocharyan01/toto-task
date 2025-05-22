import { theme } from "@/theme";
import { StatusBar, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

export default function Home() {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Hello Material Theme</Text>
        <Button mode="contained" onPress={() => {}}>
          Click Me
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  title: {
    marginBottom: 16,
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.primary,
  },
});

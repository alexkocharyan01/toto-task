import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { theme } from "../theme";

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Slot /> 
    </PaperProvider>
  );
}

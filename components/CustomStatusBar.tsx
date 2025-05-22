import { StatusBar, StatusBarProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomStatusBarProps extends StatusBarProps {
  backgroundColor: string;
}

export const CustomStatusBar = ({
  backgroundColor,
  ...props
}: CustomStatusBarProps) => (
  <SafeAreaView edges={["top"]} style={{ backgroundColor }}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </SafeAreaView>
);

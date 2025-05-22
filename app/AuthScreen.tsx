import { CustomStatusBar } from "@/components/CustomStatusBar";
import { FaceIDIcon } from "@/icons/FaceID";
import { LogoIcon } from "@/icons/Logo";
import { useAuthStore } from "@/store/useAuthStore";
import { theme } from "@/theme";
import * as LocalAuthentication from "expo-local-authentication";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function AuthScreen() {
  const setAuthenticated = useAuthStore((store) => store.setAuthenticated);

  const handleFaceID = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert(
          "Biometrics not available",
          "Your device doesn't support Face ID or you haven't set it up yet."
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access the app",
        fallbackLabel: "Use Passcode",
        disableDeviceFallback: false,
      });

      if (result.success) {
        setAuthenticated(true);
      } else {
        Alert.alert("Authentication failed", "Please try again");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during authentication");
      console.error(error);
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <View style={styles.container}>
        <Button mode="contained" style={styles.button} onPress={handleFaceID}>
          <View style={{ alignItems: "center" }}>
            <FaceIDIcon />
            <Text style={styles.title}>Face ID</Text>
          </View>
        </Button>

        <View>
          <LogoIcon />
        </View>

        <View>
          <Text style={styles.footerText}>
            ©2025 Nurselink Inc. All rights reserved.
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 24,
    backgroundColor: theme.colors.primary,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.51)",
    justifyContent: "center",
    alignItems: "center",
    width: 155,
    height: 157,
    borderRadius: 12,
  },
  title: {
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 22,
    marginTop: 12,
  },
  footerText: {
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.surface,
  },
});

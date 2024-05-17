import { Slot } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";

// const getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem("my-key");
//     if (value !== null) {
//       // value previously stored
//     }
//   } catch (e) {
//     // error reading value
//   }
// };

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [fontsLoaded, fontError] = useFonts({
    "RobotoSlab-Black": require("../assets/fonts/RobotoSlab-Black.ttf"),
    "RobotoSlab-Bold": require("../assets/fonts/RobotoSlab-Bold.ttf"),
    "RobotoSlab-ExtraBold": require("../assets/fonts/RobotoSlab-ExtraBold.ttf"),
    "RobotoSlab-ExtraLight": require("../assets/fonts/RobotoSlab-ExtraLight.ttf"),
    "RobotoSlab-Light": require("../assets/fonts/RobotoSlab-Light.ttf"),
    "RobotoSlab-Medium": require("../assets/fonts/RobotoSlab-Medium.ttf"),
    "RobotoSlab-Regular": require("../assets/fonts/RobotoSlab-Regular.ttf"),
    "RobotoSlab-SemiBold": require("../assets/fonts/RobotoSlab-SemiBold.ttf"),
    "RobotoSlab-Thin": require("../assets/fonts/RobotoSlab-Thin.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        paddingTop: 40,
        paddingBottom: 40,
        backgroundColor: "rgba(194, 97, 252, 0.15)",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          fontFamily: "RobotoSlab-Regular",
        }}
      >
        Plates
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
        }}
      >
        <Link style={styles.link} href="/calculator">
          Calculator
        </Link>
        <Link style={styles.link} href="/builder">
          Builder
        </Link>
      </View>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    fontSize: 24,
    padding: 4,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
  },
});

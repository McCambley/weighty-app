import { Slot } from "expo-router";
import { View, StyleSheet, Dimensions } from "react-native";
import { Link, usePathname } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

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
  const width = Dimensions.get("window").width; //full width
  const height = Dimensions.get("window").height; //full height
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
  const path = usePathname();
  console.log(path);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={[styles.container, { minHeight: height, minWidth: width }]}>
      <ThemedText style={styles.title} type="title">
        Plates
      </ThemedText>
      <View style={styles.navigation}>
        <Link
          style={[
            styles.link,
            path === "/calculator" || path === "/" ? styles.activeLink : null,
          ]}
          href="/calculator"
        >
          <ThemedText>Calculator</ThemedText>
        </Link>
        <Link
          style={[styles.link, path === "/builder" && styles.activeLink]}
          href="/builder"
        >
          <ThemedText>Builder</ThemedText>
        </Link>
      </View>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  link: {
    fontSize: 24,
    padding: 4,
    paddingHorizontal: 8,
  },
  activeLink: {
    borderBottomColor: Colors.dark.white,
    borderBottomWidth: 1,
  },
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 64,
    paddingBottom: 40,
    backgroundColor: Colors.dark.black,
  },
  navigation: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
});

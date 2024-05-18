import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { useState, useEffect } from "react";

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

const getData = async (key: string) => {
  try {
    await AsyncStorage.getItem(key);
  } catch (e) {
    console.error(e);
  }
};

export function useTheme() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<"light" | "dark">(
    typeof colorScheme === "string" ? colorScheme : "light"
  );

  //   async function getThemeFrom

  useEffect(() => {
    storeData("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

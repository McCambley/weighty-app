import { Text, type TextProps, StyleSheet } from "react-native";
import { colors } from "@/styles/styles";

import { useThemeColor } from "@/hooks/useThemeColor";
const scale = 1.5;

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "white");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16 * scale,
    lineHeight: 24 * scale,
    fontFamily: "RobotoSlab-Regular",
  },
  defaultSemiBold: {
    fontSize: 16 * scale,
    lineHeight: 24 * scale,
    fontFamily: "RobotoSlab-SemiBold",
  },
  title: {
    fontSize: 32 * scale,
    lineHeight: 32 * scale,
    fontFamily: "RobotoSlab-Bold",
  },
  subtitle: {
    fontSize: 20 * scale,
    fontFamily: "RobotoSlab-SemiBold",
  },
  link: {
    lineHeight: 30 * scale,
    fontSize: 16 * scale,
    color: "#0a7ea4",
    fontFamily: "RobotoSlab-Regular",
  },
});

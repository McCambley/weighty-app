import { Slot } from "expo-router";
import { Text, View } from "react-native";
import { Link } from "expo-router";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
      }}
    >
      <Text style={{ fontSize: 32, fontWeight: "bold" }}>Plates</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
        }}
      >
        <Link style={{ fontSize: 24 }} href="/calculator">
          Calculator
        </Link>
        <Link style={{ fontSize: 24 }} href="/builder">
          Builder
        </Link>
      </View>
      <Slot />
    </View>
  );
}

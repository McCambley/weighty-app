import { Slot } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
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
        paddingTop: 40,
        paddingBottom: 40,
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

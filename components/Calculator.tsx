import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

type PlateValue = 45 | 35 | 25 | 10 | 5 | 2.5;
type PlateTotal = { weight: number; count: number };
const plateOptions: PlateValue[] = [45, 35, 25, 10, 5, 2.5];

export default function Calculator(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [barWeight, setBarWeight] = useState<number>(45);
  const [weightTotals, setWeightTotals] = useState<PlateTotal[]>([]);
  console.log(weightTotals);
  useEffect(() => {
    calculatePlates();
  }, [inputValue, barWeight]);

  function handleInputChange(text: string): void {
    if (!isNaN(Number(text))) {
      setInputValue(text);
    }
  }

  function calculatePlates() {
    // Create placeholder to store calculated values
    const totals: PlateTotal[] = [];
    if (!inputValue) return;
    // Copy the input weight
    let remainingWeight = Math.max(parseInt(inputValue) - barWeight, 0) / 2;
    // For each weight in descending order
    for (let i = 0; i < plateOptions.length; i++) {
      // See how many of each weight can go into the input amount
      const count = Math.floor(remainingWeight / plateOptions[i]);
      if (count) {
        // Store that value
        totals.push({ count, weight: plateOptions[i] });
        // Calculate the remainder
        remainingWeight = remainingWeight % (count * plateOptions[i]);
      }
    }
    setWeightTotals(totals);
  }
  return (
    <View style={styles.container}>
      <ThemedText style={{ fontSize: 16 }}>Plates</ThemedText>
      <ThemedText style={{ fontSize: 16, fontFamily: "RobotoSlab-Bold" }}>
        Bar Weight
      </ThemedText>
      <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: barWeight === 45 ? Colors.dark.light : "" },
          ]}
          onPress={() => setBarWeight(45)}
        >
          <ThemedText>45</ThemedText>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: barWeight === 20 ? Colors.dark.light : "" },
          ]}
          onPress={() => setBarWeight(20)}
        >
          <ThemedText>20</ThemedText>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: barWeight === 0 ? Colors.dark.light : "" },
          ]}
          onPress={() => setBarWeight(0)}
        >
          <ThemedText>0</ThemedText>
        </Pressable>
      </View>
      <ThemedText style={{ fontSize: 16 }}>Target Weight</ThemedText>
      <TextInput
        inputMode="numeric"
        style={styles.textInput}
        placeholder="hello"
        value={inputValue}
        onChangeText={handleInputChange}
      />
      {weightTotals.map((weight) => {
        return (
          <ThemedText key={weight.weight}>
            {weight.weight}: {weight.count}
          </ThemedText>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 10,
  },
  buttonSelected: {
    borderWidth: 1,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 10,
    backgroundColor: Colors.dark.dark,
  },
  textInput: {
    borderWidth: 1,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 10,
    fontFamily: "RobotoSlab-Regular",
  },
});

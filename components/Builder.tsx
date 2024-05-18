import { useState } from "react";
import { ThemedText } from "./ThemedText";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

type PlateValue = 45 | 35 | 25 | 10 | 5 | 2.5;
type PlateTotal = { weight: number; count: number };
const plateOptions: PlateValue[] = [45, 35, 25, 10, 5, 2.5];

export default function Builder() {
  const [barWeight, setBarWeight] = useState(plateOptions[0]);
  const [plates, setPlates] = useState<number[]>([]);

  const total = barWeight + plates.reduce((p, c) => p + c * 2, 0);

  const handleButtonPress = (weight: number) => (e: GestureResponderEvent) => {
    setPlates((previousState) => {
      return [...previousState, weight];
    });
  };

  const clearValues = () => {
    return setPlates([]);
  };

  return (
    <>
      <ThemedText style={{}}>{total}</ThemedText>
      <Picker
        style={styles.dropdown}
        selectedValue={barWeight}
        onValueChange={(itemValue, itemIndex) => setBarWeight(itemValue)}
      >
        <Picker.Item label="45 lbs." value={45} />
        <Picker.Item label="20 lbs." value={20} />
        <Picker.Item label="0 lbs." value={0} />
      </Picker>
      <View style={styles.buttons}>
        {plateOptions.map((plate) => {
          return (
            <Pressable
              style={styles.button}
              key={plate}
              onPress={handleButtonPress(plate)}
            >
              <ThemedText style={styles.buttonText}>{plate}</ThemedText>
            </Pressable>
          );
        })}
      </View>
      <Pressable style={styles.clearButton}>
        <ThemedText style={styles.buttonText} onPress={clearValues}>
          Clear
        </ThemedText>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "red",
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
    width: 64,
  },
  buttonText: {
    textAlign: "center",
  },
  buttons: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
    maxWidth: 64 * 3 + 16,
    flexDirection: "row",
    paddingTop: 16,
    // borderWidth: 1,
  },
  clearButton: {
    padding: 4,
    width: 100,
    borderWidth: 1,

    borderRadius: 10,
  },
});

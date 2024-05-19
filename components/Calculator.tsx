import {
  View,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

type PlateValue = 45 | 35 | 25 | 10 | 5 | 2.5;
type PlateTotal = { weight: PlateValue; count: number };
const plateOptions: PlateValue[] = [45, 35, 25, 10, 5, 2.5];

export default function Calculator(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [barWeight, setBarWeight] = useState<number>(45);
  const [weightTotals, setWeightTotals] = useState<PlateTotal[]>([]);
  // Step 3: Create an Animated.Value for each weight
  const flatWeights: PlateTotal[] = weightTotals.flatMap((weight) =>
    new Array(weight.count).fill(weight)
  );
  const animatedValues = flatWeights.map(() => new Animated.Value(0));
  useEffect(() => {
    calculatePlates();
  }, [inputValue, barWeight]);

  // Step 4: Animate the values
  animatedValues.forEach((value, index) => {
    const toValue = Math.max(
      (plateOptions.length - plateOptions.indexOf(flatWeights[index].weight)) *
        20,
      32
    );
    Animated.sequence([
      Animated.delay(25 * index),
      Animated.spring(value, {
        toValue,
        bounciness: 20,
        speed: 20,
        useNativeDriver: false,
      }),
    ]).start();
  });

  function handleInputChange(text: string): void {
    if (!isNaN(Number(text))) {
      if (!(Number(text) >= 10000)) {
        setInputValue(text);
      } else {
        alert("Chill!");
      }
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
      <ThemedText style={styles.pageTitle}>Bar Weight (lbs.)</ThemedText>
      <View style={styles.buttonGrid}>
        <Pressable
          style={[styles.button, barWeight === 45 && styles.buttonSelected]}
          onPress={() => setBarWeight(45)}
        >
          <ThemedText style={barWeight === 45 && styles.buttonSelectedText}>
            45
          </ThemedText>
        </Pressable>
        <Pressable
          style={[styles.button, barWeight === 20 && styles.buttonSelected]}
          onPress={() => setBarWeight(20)}
        >
          <ThemedText style={barWeight === 20 && styles.buttonSelectedText}>
            20
          </ThemedText>
        </Pressable>
        <Pressable
          style={[styles.button, barWeight === 0 && styles.buttonSelected]}
          onPress={() => setBarWeight(0)}
        >
          <ThemedText style={barWeight === 0 && styles.buttonSelectedText}>
            0
          </ThemedText>
        </Pressable>
      </View>
      <ThemedText style={{ paddingBottom: 16 }}>
        Target Weight (lbs.)
      </ThemedText>
      <TextInput
        inputMode="numeric"
        style={styles.textInput}
        placeholder="Enter target weight"
        value={inputValue}
        onChangeText={handleInputChange}
        placeholderTextColor={Colors.dark.light}
      />
      <ScrollView
        horizontal
        style={{ maxWidth: width }}
        contentContainerStyle={styles.plateGrid}
      >
        {weightTotals
          .flatMap((weight, _) => new Array(weight.count).fill(weight))
          .map((weight: PlateTotal, index: number) => {
            return (
              <Animated.Text
                style={[
                  styles.plate,
                  {
                    color: Colors.dark.light,
                    height: animatedValues[index],
                    // width: animatedValues[index],
                    opacity: animatedValues[index],
                  },
                ]}
                key={index}
              >
                {weight.weight}
              </Animated.Text>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 16,
    fontFamily: "RobotoSlab-Bold",
    paddingBottom: 16,
  },
  buttonGrid: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    paddingBottom: 16,
  },
  button: {
    borderWidth: 1,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 10,
    borderColor: Colors.dark.light,
  },
  buttonSelected: {
    backgroundColor: Colors.dark.light,
  },
  buttonSelectedText: {
    color: Colors.dark.dark,
  },
  textInput: {
    borderWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 10,
    borderColor: Colors.dark.light,
    fontFamily: "RobotoSlab-Regular",
    color: Colors.dark.white,
    width: 200,
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  plateGrid: {
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 16,
    alignSelf: "stretch",
    minHeight: 120,
  },
  plate: {
    borderWidth: 1,
    borderRadius: 10,
    width: 32,
    minWidth: 32,
    borderColor: Colors.dark.light,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 16,
    overflow: "hidden",
  },
});

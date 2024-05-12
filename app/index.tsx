import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

export default function Index() {
  const [state, setState] = useState("hello");
  const [barWeight, setBarWeight] = useState(45);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 16 }}>Plates</Text>
      <Text style={{ fontSize: 16 }}>Bar Weight</Text>
      <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: barWeight === 45 ? "red" : "white" },
          ]}
          onPress={() => setBarWeight(45)}
        >
          <Text>45</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: barWeight === 20 ? "red" : "white" },
          ]}
          onPress={() => setBarWeight(20)}
        >
          <Text>20</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: barWeight === 0 ? "red" : "white" },
          ]}
          onPress={() => setBarWeight(0)}
        >
          <Text>0</Text>
        </Pressable>
      </View>
      <Text style={{ fontSize: 16 }}>Target Weight</Text>
      <TextInput
        style={{
          borderWidth: 1,
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 16,
          paddingRight: 16,
          borderRadius: 10,
        }}
        placeholder="hello"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "red",
  },
});

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Value from "@/components/Value";
import RingProgress from "@/components/RingProgress";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.values}>
        {/* <RingProgress progress={x walked/ y total daily} /> */}
        <Value label="Streak" value="x days" />
        <Value label="Daily Goals" value="x walked/y total" />
        <Value label="Weekly Goals" value="x km walked/ y total" />
        {/* Add badges here. get pictures of 5 badges and a db if they have it or not and show it based on that */}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    padding: 12,
  },
  values: {
    flexDirection: "row",
    gap: 25,
    flexWrap: "wrap",
  },
});

import { ScrollView, StyleSheet, View } from "react-native";
import { IPath } from "@/hooks/usePath";
import { Button, Text } from "react-native-paper";
import TimePassed from "../TimePassed";

export default function PathMetrics({ hook }: { hook: IPath }) {
  return (
    <ScrollView>
      {hook.status === "ready" && (
        <View style={styles.startContainer}>
          <Button
            style={styles.actionButton}
            mode="contained"
            onPress={hook.start}
          >
            Start
          </Button>
        </View>
      )}
      {(hook.status === "tracking" || hook.status === "finished") && (
        <View style={styles.wrapper}>
          <View style={styles.item}>
            <Text variant="titleMedium">Distance</Text>
            <Text variant="bodyMedium">
              {(hook.userMetrics.distance / 1000).toFixed(2)}km
            </Text>
          </View>
          <View style={styles.item}>
            <Text variant="titleMedium">Time</Text>
            <TimePassed
              start={hook.userMetrics.start}
              ended={hook.userMetrics.end}
            />
          </View>
          <View style={styles.item}>
            <Text variant="titleMedium">Steps</Text>
            <Text variant="bodyMedium">
              {(hook.userMetrics.distance / 0.762).toFixed(0)}
            </Text>
          </View>
          <View style={styles.item}>
            <Text variant="titleMedium">Avg. Speed</Text>
            <Text variant="bodyMedium">
              {Math.ceil(hook.userMetrics.speed_ms * 3.6).toFixed(1)} km/h
            </Text>
          </View>
          {hook.status === "tracking" && (
            <View style={styles.itemFull}>
              <Button
                style={styles.actionButton}
                mode="contained"
                onPress={hook.finish}
              >
                Finish
              </Button>
            </View>
          )}
          {hook.status === "finished" && (
            <View style={styles.itemFull}>
              <Button
                style={styles.actionButton}
                mode="contained"
                onPress={() => console.log("Saved!")}
              >
                Save
              </Button>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  startContainer: {
    paddingVertical: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",

    minHeight: 600,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: 100,
  },
  itemFull: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    height: 100,
  },
  actionButton: {
    fontSize: 32,
    width: 150,
  },
});

import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import usePath from "@/hooks/usePath";
import Map from "@/components/Path/Map";
import PathMetrics from "@/components/Path/Metrics";

// + ask for location permission
// + fetch trackId from params
// Display current location & track overlay if any trackId is provided
// Display content button inside the path screen

export default function PathScreen() {
  const route = useRoute();
  const [trackId, setTrackId] = useState<number>(-1);

  const pathHook = usePath();

  return (
    <View style={styles.container}>
      <Map trackId={trackId} hook={pathHook} />
      <PathMetrics hook={pathHook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
});

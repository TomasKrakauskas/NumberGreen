import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import usePath from "@/hooks/usePath";
import Map from "@/components/Path/Map";
import PathMetrics from "@/components/Path/Metrics";
import { Path, getPath } from "@/helpers/db/tracks";
import { useLocalSearchParams } from "expo-router";

// + ask for location permission
// + fetch trackId from params
// Display current location & track overlay if any trackId is provided
// Display content button inside the path screen

export default function PathScreen() {
  const route = useRoute();
  const { trackId } = useLocalSearchParams<{
    trackId: string;
  }>();
  const [path, setPath] = useState<Path[]>([]);

  const pathHook = usePath();

  useEffect(() => {
    const fetch = async () => {
      const [error, _path] = await getPath(trackId as string);

      if (error) console.error(error);
      else if (_path) setPath(_path);
    };

    if (trackId) {
      fetch();
    }
  }, [trackId]);

  return (
    <View style={styles.container}>
      <Map trackId={trackId} hook={pathHook} />
      <PathMetrics trackId={trackId} hook={pathHook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
  },
});

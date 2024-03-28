import { IPath } from "@/hooks/usePath";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from "react-native-maps";
import customMapStyle from "./mapStyle.json";

export default function Map({
  trackId,
  hook,
}: {
  trackId: number;
  hook: IPath;
}) {
  const { isAllowed, status, userLocation, path } = hook;

  return (
    <>
      {!isAllowed && <Text>Not Allowed</Text>}
      {!isAllowed && status === "preparing" && <Text>Loading</Text>}
      {isAllowed && status !== "preparing" && (
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={customMapStyle}
          style={styles.map}
          initialRegion={{
            // Set initial region to the first point in your route or a default location
            latitude: userLocation!.latitude,
            longitude: userLocation!.longitude,
            latitudeDelta: 0.0057625,
            longitudeDelta: 0.00263125,
          }}
        >
          <Marker coordinate={userLocation as LatLng} />
          <Polyline
            coordinates={path}
            lineCap="round"
            geodesic={true}
            strokeColor="#00BFFF" // path color
            strokeWidth={8}
            //tappable={true}
            //onPress={() => {}}
          />
        </MapView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 350,
  },
});

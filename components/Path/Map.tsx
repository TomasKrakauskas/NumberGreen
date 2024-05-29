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
import { useEffect, useState } from "react";
import { Path, getPath } from "@/helpers/db/tracks";

export default function Map({
  trackId,
  hook,
}: {
  trackId: string | undefined;
  hook: IPath;
}) {
  const { isAllowed, status, userLocation, path } = hook;

  const [guidePath, setGuidePath] = useState<Path[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const [error, _path] = await getPath(trackId as string);

      if (error) console.error(error);
      else if (_path) setGuidePath(_path);
    };

    // fetch track only if an id is provided
    if (trackId) fetch();
  }, [trackId]);

  return (
    <>
      {!isAllowed && <Text>Not Allowed</Text>}
      {!isAllowed && status === "preparing" && <Text>Loading</Text>}
      {isAllowed && status !== "preparing" && (
        <MapView
          // provider={PROVIDER_GOOGLE} // removed due to expo being a real pain on ios post EXPO 51
          customMapStyle={customMapStyle}
          style={styles.map}
          initialRegion={{
            // Set initial region to the first point in your route or a default location
            latitude: userLocation!.latitude,
            longitude: userLocation!.longitude,
            latitudeDelta: 0.0057625, // TODO dynamically change based on distance from track
            longitudeDelta: 0.00263125, // TODO dynamically change based on distance from track
          }}
        >
          <Marker coordinate={userLocation as LatLng} />
          {guidePath.length > 0 && (
            <Polyline
              coordinates={guidePath}
              lineCap="round"
              geodesic={true}
              strokeColor="#00B359" // path color
              strokeWidth={4}
              //tappable={true}
              //onPress={() => {}}
            />
          )}
          <Polyline
            coordinates={path}
            lineCap="round"
            geodesic={true}
            strokeColor="#00BFFF" // path color
            strokeWidth={4}
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

import { StyleSheet } from "react-native";
import MapView, { LatLng, Polyline } from "react-native-maps";
import * as Location from "expo-location";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { requestPermissions } from "../../helpers/location";

export default function PathScreen() {
  const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);
  const [path, setPath] = useState<Location.LocationObjectCoords[]>([]);
  const [initialLocation, setInitialLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    let locationSubscription: any;

    async function startLocationTracking() {
      const isAllowed = await requestPermissions();

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 5,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          if (!initialLocation) setInitialLocation({ latitude, longitude });
          setPath((prevState) => [...prevState, location.coords]);
          setRouteCoordinates((prevState) => [
            ...prevState,
            { latitude, longitude },
          ]);
        }
      );
    }

    startLocationTracking();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {initialLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            // Set initial region to the first point in your route or a default location
            latitude: initialLocation.latitude,
            longitude: initialLocation.longitude,
            latitudeDelta: 0.0057625,
            longitudeDelta: 0.00263125,
          }}
        >
          <Polyline
            coordinates={routeCoordinates}
            lineCap="round"
            geodesic={true}
            strokeColor="#00BFFF" // path color
            strokeWidth={8}
            //tappable={true}
            //onPress={() => {}}
          />
        </MapView>
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

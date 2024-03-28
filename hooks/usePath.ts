import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import * as Location from "expo-location";
import { requestPermissions } from "../helpers/location";
import { getDistance } from "geolib";
import { getUnixTimeStamp } from "@/helpers/util";

export type PathStatus = "preparing" | "ready" | "tracking" | "finished";

// request user permission to access location
// track current user's location and diplay on the map
// when user presses start - display the path and start tracking metrics
// wehn user presses stop - display the path and metrics, but stop tracking

export interface IPath {
  isAllowed: boolean;
  status: PathStatus;

  userLocation: LatLng | null;
  userMetrics: IUserPathMetrics;

  path: Location.LocationObjectCoords[];

  start: () => Promise<void>;
  finish: () => void;
}
export interface IUserPathMetrics {
  start: number; // timestamp
  end: number; // timestamp
  distance: number;
  speed_ms: number;
  stepsTaken: number;
}
export default function usePath(): IPath {
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [status, setStatus] = useState<PathStatus>("preparing");

  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [userMetrics, setUserMetrics] = useState<IUserPathMetrics>({
    start: -1,
    end: -1,
    distance: 0,
    speed_ms: 0,
    stepsTaken: 0,
  });

  const [path, setPath] = useState<Location.LocationObjectCoords[]>([]);
  const [locationSubscription, setLocationSubscription] =
    useState<Location.LocationSubscription>();

  // request permissions to access locations, unbind location service when unmounted
  useEffect(() => {
    const request = async () => {
      const response = await requestPermissions();
      setIsAllowed(response);
    };

    request();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  // track user's current location to display on the map
  useEffect(() => {
    let currentLocationSubscription: Location.LocationSubscription = {
      remove() {},
    };

    // tracks current user position
    const trackCurrentLocation = async () => {
      currentLocationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 15_000, //ms
        },
        (location) => {
          setUserLocation({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          });
        }
      );
    };

    // user has given permission, start tracking user's location
    switch (status) {
      case "preparing":
        trackCurrentLocation();
      default:
        currentLocationSubscription.remove();
    }

    return () => {
      if (currentLocationSubscription) {
        currentLocationSubscription.remove(); // This stops the location updates
      }
    };
  }, [isAllowed, status]);

  useEffect(() => {
    if (userLocation && status === "preparing") setStatus("ready");
  }, [userLocation]);

  const onCoordChange = (current: Location.LocationObjectCoords) => {
    setPath((prevPath) => {
      if (prevPath.length > 0) {
        setUserMetrics((prevMetrics) => {
          const last = prevPath[prevPath.length - 1];

          const now = getUnixTimeStamp(new Date());
          const distance = getDistance(last, current);

          const totalDistance = prevMetrics.distance + distance; // total distance walked
          const timeElapsed = now - prevMetrics.start; // seconds passed

          let speed_ms = 0;
          if (timeElapsed !== 0) speed_ms = totalDistance / timeElapsed; // speed in m/s

          return { ...prevMetrics, distance: totalDistance, speed_ms };
        });
      }

      setUserLocation({
        latitude: current.latitude,
        longitude: current.longitude,
      });
      return [...prevPath, current];
    });
  };

  const start = async (): Promise<void> => {
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 5,
      },
      (location) => {
        onCoordChange(location.coords);
      }
    );
    setLocationSubscription(subscription);
    setStatus("tracking");
    setUserMetrics({
      ...userMetrics,
      start: getUnixTimeStamp(new Date()),
    });
  };
  const finish = (): void => {
    if (locationSubscription) locationSubscription.remove();
    setStatus("finished");
    setUserMetrics({
      ...userMetrics,
      end: getUnixTimeStamp(new Date()),
    });
  };

  return {
    isAllowed,
    status,

    userLocation,
    userMetrics,

    path,

    start,
    finish,
  };
}

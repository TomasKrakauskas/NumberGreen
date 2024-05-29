import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import * as Location from "expo-location";
import {
  requestBackgroundPermissions,
  requestPermissions,
} from "../helpers/location";
import { getDistance } from "geolib";
import { getUnixTimeStamp } from "@/helpers/util";
import { createTrack } from "@/helpers/db/tracks";
import { createPerformance } from "@/helpers/db/track_performance";
import { auth } from "@/firebaseConfig";

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
  save: (trackId: string | undefined) => Promise<void>;
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
    // request background permission
    const response = await requestBackgroundPermissions();

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 5,
      },
      (location) => {
        if (location.coords.accuracy !== null && location.coords.accuracy < 50)
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

  const save = async (trackId: string | undefined): Promise<void> => {
    // verify user is connected
    const user = auth.currentUser;
    if (!user?.uid) {
      console.error("No user logged in!");
      return;
    }
    const userId = user?.uid;

    // minimize path data for storage
    const _path = path.map((item) => ({
      latitude: item.latitude,
      longitude: item.longitude,
      altitude: item.altitude,
    }));

    // construct performance object
    const performance = {
      ...userMetrics,
      path: _path,
    };

    // create new track and performance
    if (!trackId) {
      // construct track object
      const track = {
        markers: [] as { latitude: number; longitude: number; name: string }[],
        polyline: _path,
        trackName: "",
        image: "",
        description: "",
        distance: userMetrics.distance,
        steps: userMetrics.stepsTaken,
      };
      const [error, response] = await createTrack(userId, track, performance);
      if (error) console.error(error);
      else if (response)
        console.log({
          response,
        });
    }
    // save only performance
    else {
      const [error, performanceId] = await createPerformance(
        userId,
        trackId,
        performance
      );
      if (error) console.error(error);
      else if (performanceId)
        console.log({
          performanceId,
        });
    }

    return;
  };

  return {
    isAllowed,
    status,

    userLocation,
    userMetrics,

    path,

    start,
    finish,
    save,
  };
}

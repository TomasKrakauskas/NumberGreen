import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  MTrackPerformance,
  createPerformance,
  getUserPerformancesOfTrack,
} from "./performance";

export interface MTrack {
  id: string;
  creatorId: string;

  private: boolean;
  name: string;
  image: string;
  description: string;
  distance: number;
  path: Path[];
}
export interface Path {
  latitude: number;
  longitude: number;
  altitude: number | null;
}

/**
 * CREATE
 */

/** Create a new track and log performance for said track */
export const createTrack = (
  userId: string,
  track: {
    markers: { latitude: number; longitude: number; name: string }[];
    polyline: {
      latitude: number;
      longitude: number;
      altitude: number | null;
    }[];
    trackName: string;
    image: string;
    description: string;
    distance: number;
    steps: number;
  },
  performance: Omit<MTrackPerformance, "id" | "creatorId" | "trackId">
): Promise<
  [string | null, { trackId: string; performanceId: string } | null]
> => {
  return new Promise(async (resolve) => {
    try {
      const firestore = getFirestore();

      const _track = {
        ...track,
        creatorId: userId,
        private: true,
      };

      // create track & get id
      const { id: trackId } = await addDoc(
        collection(firestore, "tracks_data"),
        _track
      );

      const [error, performanceId] = await createPerformance(
        userId,
        trackId,
        performance
      );

      if (error || !performanceId) return resolve([error, null]);

      return resolve([
        null,
        {
          trackId,
          performanceId,
        },
      ]);
    } catch (e) {
      console.error(
        `Something went wrong when creating the track! Exited with error: ${e}`
      );
      return resolve(["Something went wrong!", null]);
    }
  });
};

/**
 * READ
 */

/** Get one track specified by it's id */
export const getPath = (
  trackId: string
): Promise<[string | null, Path[] | null]> => {
  return new Promise(async (resolve) => {
    try {
      const firestore = getFirestore();

      const ref = doc(firestore, "tracks_data", trackId);
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        const { markers, polyline, trackName } = snapshot.data();

        return resolve([null, polyline as Path[]]);
      } else return resolve(["No item found!", null]);
    } catch (e) {
      console.error(e);
      return resolve(["Something went wrong!", null]);
    }
  });
};

/** Get all tracks saved/walked by user */
export const getUserTracks = (
  userId: string
): Promise<[string | null, MTrack[] | null]> => {
  return new Promise(async (resolve) => {
    try {
      const firestore = getFirestore();

      const q = query(
        collection(firestore, "tracks_data"),
        where("creatorId", "==", userId)
      );

      const tracks: MTrack[] = [];

      const snapshot = await getDocs(q);
      snapshot.forEach((item) => {
        const foo = item.data() as MTrack;

        tracks.push({
          ...foo,
          id: item.id,
        });
      });

      return resolve([null, tracks]);
    } catch (e) {
      console.error(e);
      return resolve(["Something went wrong!", null]);
    }
  });
};

/** Get all public tracks */
export const getPublicTracks = (): Promise<
  [string | null, MTrack[] | null]
> => {
  return new Promise(async (resolve) => {
    try {
      const firestore = getFirestore();

      const ref = doc(firestore, "track_map", "tracks");
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        const trackList = snapshot.data() as Record<string, string>;

        const names = Object.keys(trackList);
        const tracks = names.map(
          (name) =>
            ({
              id: trackList[name],
              creatorId: "",

              private: false,
              name: name,
              image: "",
              description: "",
              distance: 0,
              path: [],
            } as MTrack)
        );

        return resolve([null, tracks]);
      }

      return resolve(["Not found!", []]);
    } catch (e) {
      console.error(e);
      return resolve(["Something went wrong!", null]);
    }
  });
};

/**
 * UPDATE
 */

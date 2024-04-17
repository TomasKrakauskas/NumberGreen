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
  path: {
    latitude: number;
    longitude: number;
    altitude: number | null;
  }[];
}

/**
 * CREATE
 */

/** Create a new track and log performance for said track */
export const createTrack = (
  userId: string,
  track: MTrack,
  performance: MTrackPerformance
): Promise<
  [string | null, { trackId: string; performanceId: string } | null]
> => {
  return new Promise(async (resolve) => {
    try {
      const firestore = getFirestore();

      const _track: Omit<MTrack, "id"> = {
        creatorId: userId,

        private: true,
        name: track.name,
        image: track.image,
        description: track.description,
        distance: track.distance,
        path: track.path,
      };

      // create track
      const { id: trackId } = await addDoc(
        collection(firestore, "track"),
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
      console.error(e);
      return resolve(["Something went wrong!", null]);
    }
  });
};

/**
 * READ
 */

/** Get one track specified by it's id */
export const getTrack = (
  trackId: string
): Promise<[string | null, MTrack | null]> => {
  return new Promise(async (resolve) => {
    try {
      const firestore = getFirestore();

      const ref = doc(firestore, "tracks", trackId);
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) return resolve([null, snapshot.data() as MTrack]);
      else return resolve(["No item found!", null]);
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
        collection(firestore, "tracks"),
        where("creatorId", "==", userId)
      );
      const snapshot = await getDocs(q);
      const tracks: MTrack[] = [];
      snapshot.forEach((item) => tracks.push(item as unknown as MTrack));

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

      const q = query(
        collection(firestore, "tracks"),
        where("private", "==", false)
      );

      const snapshot = await getDocs(q);
      const tracks: MTrack[] = [];
      snapshot.forEach((item) => tracks.push(item as unknown as MTrack));
    } catch (e) {
      console.error(e);
      return resolve(["Something went wrong!", null]);
    }
  });
};

/**
 * UPDATE
 */

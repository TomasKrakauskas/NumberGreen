import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export interface MTrackPerformance {
  id: string;
  trackId: string;
  creatorId: string;
  start: number;
  end: number;
  distance: number;
  speed_ms: number;
  stepsTaken: number;
  path: {
    latitude: number;
    longitude: number;
    altitude: number | null;
  }[];
}
/**
 * CREATE
 */

/** Create a performance for a track */
export const createPerformance = (
  userId: string,
  trackId: string,
  performance: Omit<MTrackPerformance, "id" | "creatorId" | "trackId">
): Promise<[string | null, string | null]> => {
  return new Promise(async (resolve) => {
    try {
      const firestore = getFirestore();

      const _performance = {
        ...performance,
        trackId,
        creatorId: userId,
      };

      console.log({
        userId,
        trackId,
        performance,
        _performance,
      });

      // create performance
      const { id: performanceId } = await addDoc(
        collection(firestore, "track_performance"),
        _performance
      );

      if (!performanceId)
        return resolve(["Unable to create performance", null]);

      return resolve([null, performanceId]);
    } catch (e) {
      console.error(
        `Something went wrong when creating the track performance! Exited with error: ${e}`
      );
      return resolve(["Something went wrong!", null]);
    }
  });
};

/**
 * READ
 */
/** Get all user performances of one track*/
export const getUserPerformancesOfTrack = (
  userId: string,
  trackId: string
): Promise<[string | null, MTrackPerformance[] | null]> => {
  return new Promise(async (resolve) => {
    try {
      const firestore = getFirestore();

      const q = query(
        collection(firestore, "performance"),
        where("creatorId", "==", userId),
        where("trackId", "==", trackId)
      );
      const snapshot = await getDocs(q);
      const tracks: MTrackPerformance[] = [];
      snapshot.forEach((item) =>
        tracks.push(item as unknown as MTrackPerformance)
      );

      return resolve([null, tracks]);
    } catch (e) {
      console.error(e);
      return resolve(["Something went wrong!", null]);
    }
  });
};

/**
 * UPDATE
 */

/**
 * DELETE
 */

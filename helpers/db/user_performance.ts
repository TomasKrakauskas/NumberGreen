import { doc, getDoc, getFirestore } from "firebase/firestore";

export interface UserPerformance {}

export const getUserPerformance = (
  userId: string
): Promise<[string | null, UserPerformance | null]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const firestore = getFirestore();

      const ref = doc(firestore, "performance", userId);
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        const performance = snapshot.data();

        return resolve([null, performance]);
      } else return resolve(["No item found!", null]);
    } catch (e) {
      console.error(e);
      return reject(e);
    }
  });
};

export const updateUserPerformance = (
  userId: string,
  performance: Performance
) => {
  return new Promise(async (resolve, reject) => {
    try {
      return resolve(null);
    } catch (e) {
      console.error(e);
      return reject(e);
    }
  });
};

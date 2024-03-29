import * as Location from "expo-location";

export const requestPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return false;
    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
export const requestBackgroundPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Background Permission to access location was denied");
      return false;
    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

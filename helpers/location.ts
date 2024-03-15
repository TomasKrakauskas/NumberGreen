import * as Location from "expo-location";

export const requestPermissions = async (): Promise<boolean> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.error("Permission to access location was denied");
    return false;
  }
  return true;
};

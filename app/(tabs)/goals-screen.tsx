import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Value from "@/components/Value";
import RingProgress from "@/components/RingProgress";
import { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import  firestore from "@react-native-firebase/firestore";
import { Image } from "react-native";

export default function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const subscriber = firestore()
        .collection("goals")
        .doc(user.uid)
        .onSnapshot(
          (documentSnapshot) => {
            if (documentSnapshot.exists) {
              console.log("User data:", documentSnapshot.data());
              //@ts-ignore
              setUserData(documentSnapshot.data());
            } else {
              console.log("Document does not exist");
            }
          },
          (error) => {
            console.log(error);
          }
        );

      return () => subscriber();
    } else {
      console.log("No user logged in");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <RingProgress progress={0.8} />

        <Value label="Streak" value={(userData as any)?.streak} />
        <Value label="Daily Goals" value={(userData as any)?.daily_km} />
        <Value label="Weekly Goals" value="x km walked/ y total" />
{ /* @ts-ignore */ }

        {(userData as any)?.badges &&
          (userData as any).badges.map((badge: any, index: number) => (
            <View
              key={index}
              style={{ alignItems: "center", marginBottom: 20 }}
            >
              <Image
                source={{ uri: badge.badge_link }}
                style={{ width: 100, height: 100, marginBottom: 5 }}
                resizeMode="contain"
              />
              <Text>{badge.badge_name}</Text>
            </View>
          ))}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    padding: 12,
  },
  values: {
    flexDirection: "row",
    gap: 25,
    flexWrap: "wrap",
  },
});

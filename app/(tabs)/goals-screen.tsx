import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Value from "@/components/Value";
import RingProgress from "@/components/RingProgress";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { Image } from "react-native";

interface Badge {
  badge_link: string;
  badge_name: string;
  has_badge: boolean;
}

interface UserData {
  badges: Badge[];
  daily_km: string;
  streak: string;
  user_id: string;
  weekly_km: string;
}

export default function App() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const unsubscribe = onSnapshot(
        doc(db, "goals", user.uid),
        (documentSnapshot) => {
          if (documentSnapshot.exists()) {
            console.log("User data:", documentSnapshot.data());
            setUserData(documentSnapshot.data() as UserData);
          } else {
            console.log("Document does not exist");
          }
        },
        (error) => {
          console.log(error);
        }
      );
      return unsubscribe;
    } else {
      console.log("No user logged in");
      return;
    }
  }, []);

  return (
    <View style={styles.container}>
      {/** Need to get how much they've walked today and add calculate the value below for the ring */}
      <RingProgress progress={0.8} />

      <View style={styles.values}>
        <Value label="Streak" value={userData?.streak || ""} />
        <Value label="Daily Goals" value={userData?.daily_km || ""} />
        <Value label="Weekly Goals" value={userData?.weekly_km || ""} />
      </View>

      <View style={styles.badgesContainer}>
        {userData?.badges &&
          userData.badges.map((badge, index) => (
            <View
              key={index}
              style={{ alignItems: "center", marginBottom: 20 }}
            >
              <Image
                source={{ uri: badge.badge_link }}
                style={{ width: 100, height: 100, marginBottom: 5 }}
                resizeMode="contain"
              />
              <Text style={{ color: "#FFFFFF" }}>{badge.badge_name}</Text>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  values: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  badgeStyle: {
    alignItems: "center",
    marginBottom: 20,
  },
  badgesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 50,
  },
});

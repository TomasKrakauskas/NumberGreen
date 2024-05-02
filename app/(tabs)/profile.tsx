import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../../firebaseConfig";
import { Button } from "react-native-paper";

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const firestore = getFirestore();
          const profileRef = doc(firestore, "profile", user.uid);
          const profileSnapshot = await getDoc(profileRef);
          if (profileSnapshot.exists()) {
            setProfileData(profileSnapshot.data());
          } else {
            console.log("Profile document does not exist");
          }
        } else {
          console.log("User is not authenticated");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();

    return () => {
      setProfileData(null);
    };
  }, []);

  if (!profileData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <View style={styles.topArea}>
            {profileData &&
            profileData.user_image &&
            isValidUrl(profileData.user_image) ? (
              <Image
                source={{ uri: profileData.user_image }}
                style={styles.profileIcon}
              />
            ) : (
              <View style={styles.profileIcon}>
                <FontAwesome name="user-circle" size={128} color="black" />
              </View>
            )}
            <View style={styles.usernameContainer}>
              <Text style={styles.nickname}>{profileData.username}</Text>
            </View>
          </View>
          <View style={styles.settingContainer2}>
            <Button
              mode="contained-tonal"
              textColor="#333333"
              compact
              style={styles.editButton2}
            >
              Edit
            </Button>
            <Button mode="contained" compact style={styles.logoutButton2}>
              Logout
            </Button>
          </View>
          <View style={styles.metricsContainer}>
            <Text style={styles.metricsTitle}>Metrics</Text>
            <View style={styles.oneRawMetrics}>
              <View style={styles.stepsContainer}>
                <Text style={styles.metricText}>Total Steps:</Text>
                <Text style={styles.metricItemText}>
                  {profileData.metrics.total_steps}
                </Text>
              </View>
              <View style={styles.routeContainer}>
                <Text style={styles.metricText}>Longest Route:</Text>
                <Text style={styles.metricItemText}>
                  {profileData.metrics.longest_route}
                  <Text> km</Text>
                </Text>
              </View>
            </View>
            <View style={styles.paceContainer}>
              <Text style={styles.metricText}>Fastest Pace:</Text>
              <Text style={styles.metricItemText}>
                {profileData.metrics.fastest_pace}
                <Text> km/h</Text>
              </Text>
            </View>
          </View>
          <View style={styles.oneRawMetrics}>
            <Text style={styles.goalsText}>Achievements</Text>
            <Text style={styles.viewAllText}>View All</Text>
          </View>
          <View style={styles.badgesContainer}>
            <ScrollView
              style={styles.scrollViewBadges}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {profileData.badges.map((badge: any, index: number) => (
                <View
                  key={index}
                  style={[styles.badge, { backgroundColor: "#F2F2F2" }]}
                >
                  <Image
                    source={{ uri: badge.badge_link }}
                    style={styles.badgeIcon}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  scrollView: {
    backgroundColor: "#f2f2f2",
    flex: 1,
  },
  scrollViewBadges: {
    backgroundColor: "#f2f2f2",
  },
  contentContainer: {
    backgroundColor: "#f2f2f2",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topArea: {
    backgroundColor: "#ffffff",
    width: "100%",
    alignItems: "center",
    paddingBottom: 32,
  },
  profileIcon: {
    marginTop: 32,
    marginBottom: 10,
    width: 128,
    height: 128,
    borderRadius: 77.5,
  },
  usernameContainer: {
    alignItems: "center",
  },
  nickname: {
    fontSize: 20,
    fontWeight: "bold",
  },
  settingContainer2: {
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    marginTop: 32,
    marginLeft: 32,
    marginRight: 32,
  },
  editButton2: {
    backgroundColor: "#e2e2e2",
    color: "#FFFFFF",
    borderRadius: 6,
    paddingLeft: 8,
    paddingRight: 8,
    gap: 8,
    fontSize: 12,
    marginLeft: 172,
  },
  logoutButton2: {
    backgroundColor: "#ef5350",
    color: "#000000",
    borderRadius: 6,
    paddingLeft: 8,
    paddingRight: 8,
    gap: 8,
    fontSize: 12,
    marginLeft: 16,
  },
  oneRawMetrics: {
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
  },
  metricsContainer: {
    backgroundColor: "#f2f2f2",
    marginTop: 16,
    alignSelf: "flex-start",
    marginLeft: 32,
  },
  metricsTitle: {
    backgroundColor: "#f2f2f2",
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  stepsContainer: {
    marginTop: 16,
    width: 155,
    borderRadius: 6,
    height: 70,
    backgroundColor: "#dde5ed",
  },
  routeContainer: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 32,
    width: 155,
    borderRadius: 6,
    height: 70,
    backgroundColor: "#dde5ed",
  },
  paceContainer: {
    marginTop: 16,
    width: 155,
    borderRadius: 6,
    height: 70,
    backgroundColor: "#dde5ed",
  },
  metricText: {
    backgroundColor: "#dde5ed",
    color: "#343434",
    fontSize: 10,
    marginLeft: 16,
    marginTop: 16,
  },
  metricItemText: {
    backgroundColor: "#dde5ed",
    color: "#343434",
    fontSize: 10,
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  goalsText: {
    backgroundColor: "#f2f2f2",
    color: "#343434",
    marginTop: 16,
    fontSize: 20,
    marginLeft: 32,
    marginRight: 168,
    alignSelf: "flex-start",
    fontWeight: "600",
  },
  viewAllText: {
    backgroundColor: "#f2f2f2",
    color: "#a1a1a1",
    marginTop: 19,
    fontSize: 12,
    marginRight: 32,
    fontWeight: "400",
    textDecorationLine: "underline",
  },
  badgesContainer: {
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginEnd: 16,
    height: 64,
    marginLeft: 32,
    marginTop: 16,
  },
  badge: {
    backgroundColor: "#F2F2F2",
    height: 64,
    marginRight: 16,
  },
  badgeIcon: {
    width: 64,
    height: 64,
    borderRadius: 77.5,
  },
  boldText: {
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;

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

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [showTick, setShowTick] = useState(false); // Initially set to false for normal mode
  const [newUsername, setNewUsername] = useState(""); // State to track the new username input

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

  const handleSettingsClick = () => {
    // Toggle showTick state
    setShowTick((prev) => !prev);
  };

  const handleChangeUsername = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const trimmedUsername = newUsername.trim();
        if (trimmedUsername !== "") {
          const firestore = getFirestore();
          const profileRef = doc(firestore, "profile", user.uid);
          await updateDoc(profileRef, { username: trimmedUsername });
          // Update profile data in state
          setProfileData((prevProfileData: any) => ({
            ...prevProfileData,
            username: trimmedUsername,
          }));
          // Reset newUsername input field
          setNewUsername("");
        }
        // Switch back to normal mode after username update or if newUsername is empty
        setShowTick(false);
      }
    } catch (error) {
      console.error("Error updating username:", error);
      Alert.alert(
        "Error",
        "Failed to update username. Please try again later."
      );
    }
  };

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
                <FontAwesome name="user-circle" size={155} color="black" />
              </View>
            )}
            <View style={styles.usernameContainer}>
              {showTick ? (
                <TextInput
                  style={styles.nicknameInput}
                  value={newUsername}
                  onChangeText={setNewUsername}
                  placeholder="Enter new username"
                />
              ) : (
                <Text style={styles.nickname}>{profileData.username}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={styles.settingsContainer}
            onPress={showTick ? handleChangeUsername : handleSettingsClick}
          >
            {/* Conditionally render settings or tick icon based on showTick state */}
            {showTick ? (
              <FontAwesome name="check-circle" size={30} color="black" />
            ) : (
              <FontAwesome name="cog" size={30} color="black" />
            )}
          </TouchableOpacity>
          <View style={styles.metricsContainer}>
            <Text style={styles.metricText}>
              Total steps:{" "}
              <Text style={styles.boldText}>
                {profileData.metrics.total_steps}
              </Text>
            </Text>
            <Text style={styles.metricText}>
              Longest route:{" "}
              <Text style={styles.boldText}>
                {profileData.metrics.longest_route}
              </Text>{" "}
              steps
            </Text>
            <Text style={styles.metricText}>
              Fastest pace:{" "}
              <Text style={styles.boldText}>
                {profileData.metrics.fastest_pace}
              </Text>{" "}
              km/h
            </Text>
            <Text style={styles.metricText}>
              Average pace:{" "}
              <Text style={styles.boldText}>
                {profileData.metrics.average_pace}
              </Text>{" "}
              km/h
            </Text>
          </View>
          {profileData.badges.length > 0 && (
            <View>
              <Text style={styles.goalsText}>Goals beaten</Text>
              <View style={styles.badgesContainer}>
                {profileData.badges.map((badge: string, index: number) => (
                  <View
                    key={index}
                    style={[styles.badge, { backgroundColor: "#FF5733" }]}
                  >
                    <Text style={styles.badgeText}>{badge}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
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
    backgroundColor: "#fff", // Added background color to fix the white background
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topArea: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    alignItems: "center",
    paddingBottom: 30,
  },
  profileIcon: {
    backgroundColor: "#f2f2f2",
    marginTop: 60,
    marginBottom: 24,
    width: 155,
    height: 155,
    borderRadius: 77.5,
  },
  usernameContainer: {
    alignItems: "center",
  },
  nickname: {
    backgroundColor: "#f2f2f2",
    fontSize: 28,
    fontWeight: "bold",
  },
  nicknameInput: {
    backgroundColor: "#f2f2f2",
    fontSize: 28,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 5,
  },
  settingsContainer: {
    position: "absolute",
    backgroundColor: "#f2f2f2",
    top: 0,
    right: 0,
    padding: 15,
  },
  metricsContainer: {
    marginTop: 30,
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 20,
  },
  metricText: {
    color: "#001b3A",
    fontSize: 18,
    paddingVertical: 7,
  },
  goalsText: {
    color: "#00224b",
    marginTop: 13,
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
  },
  badgesContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  badge: {
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    width: 300,
    height: 60,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontWeight: "bold",
    fontSize: 16,
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

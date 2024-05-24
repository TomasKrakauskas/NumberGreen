import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "@/firebaseConfig";
import { Button } from "react-native-paper";
import createUserFirestoreDocs from "@/helpers/createUserDocs";
=======
import { Dropdown } from "react-native-element-dropdown";
import { passwordValidator } from "@/helpers/passwordValidator";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

const data = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

type RootStackParamList = {
  AchievementsScreen: undefined;
};

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [value, setValue] = useState("Easy");
  const [isFocus, setIsFocus] = useState(false);
  const [username, setUsername] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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

  const logOutUser = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const editProfile = async () => {
    if (difficulty === "") setDifficulty(profileData.difficulty);
    if (username === "") setUsername(profileData.username);
    setEditMode(!editMode);
  };

  const changePassword = async () => {
    setPasswordMode(!passwordMode);
  };

  const closeEditMode = () => {
    setEditMode(false);
  };

  const closePasswordMode = () => {
    setPasswordMode(false);
  };

  const editPassword = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const firestore = getFirestore();
        const profileRef = doc(firestore, "profile", user.uid);
        setPasswordMode(false);
      } else {
        console.log("User is not authenticated");
      }
    } catch (error) {
      console.error("Error saving password:", error);
    }
    /*
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "User not signed in");
      return;
    }
    const credential = auth.EmailAuthProvider.credential(
      user.email || "",
      oldPassword
    );

    // Re-authenticate user
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        // User re-authenticated, now change password
        return user.(newPassword);
      })
      .then(() => {
        // Password updated successfully
        Alert.alert("Success", "Password changed successfully");
        setOldPassword("");
        setNewPassword("");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });*/
  };

  const saveProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const firestore = getFirestore();
        const profileRef = doc(firestore, "profile", user.uid);
        await updateDoc(profileRef, {
          username: username,
          difficulty: difficulty,
        });
        setEditMode(false);
        setProfileData({ ...profileData, username: username });
      } else {
        console.log("User is not authenticated");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
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
                <FontAwesome name="user-circle" size={128} color="black" />
              </View>
            )}
            <View style={styles.usernameContainer}>
              <Text style={styles.nickname}>{profileData.username}</Text>
            </View>
          </View>
          <View style={styles.settingContainer2}>
            <Button
              mode="contained"
              compact
              style={styles.logoutButton2}
              onPress={logOutUser}
            >
              Logout
            </Button>
            <Button
              mode="contained-tonal"
              textColor="#333333"
              compact
              style={styles.editButton2}
              onPress={editProfile}
            >
              Edit
            </Button>
            <Button
              mode="contained-tonal"
              textColor="#333333"
              compact
              style={styles.changePassword2}
              onPress={changePassword}
            >
              Change password
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
            <Text
              style={styles.viewAllText}
              onPress={() => navigation.navigate("AchievementsScreen")}
            >
              View All
            </Text>
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

      {editMode && (
        <View style={styles.editModeOverlay}>
          <View style={styles.editModeView}>
            <Button style={styles.closeButton} onPress={closeEditMode}>
              <FontAwesome name="close" size={22} color="black" />
            </Button>
            <Text style={styles.editProfileTitle}>Edit Profile</Text>
            {profileData &&
            profileData.user_image &&
            isValidUrl(profileData.user_image) ? (
              <Image
                source={{ uri: profileData.user_image }}
                style={styles.editProfileIcon}
              />
            ) : (
              <View style={styles.editProfileIcon}>
                <FontAwesome name="user-circle" size={100} color="black" />
              </View>
            )}
            <Text style={styles.editTextFeilds}>Email</Text>
            <TextInput style={styles.editTextInputs} placeholder="Email" />
            <Text style={styles.editTextFeilds}>Username</Text>
            <TextInput
              style={styles.editTextInputs}
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.editTextFeilds}>Difficulty</Text>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={data}
              labelField="label"
              valueField="value"
              value={difficulty}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setDifficulty(item.value);
                setIsFocus(false);
              }}
            />
            <View
              style={{
                marginTop: 24,
                borderColor: "#efefef",
                width: 240,
                borderWidth: 1,
              }}
            />
            <Button
              style={styles.saveEditProfileButton}
              textColor="#343434"
              compact
              onPress={saveProfile}
            >
              Save
            </Button>
          </View>
        </View>
      )}

      {passwordMode && (
        <View style={styles.editModeOverlay}>
          <View style={styles.editModeView}>
            <Button style={styles.closeButton} onPress={closePasswordMode}>
              <FontAwesome name="close" size={22} color="black" />
            </Button>
            <Text style={styles.editProfileTitle}>Change Password</Text>
            <Text style={styles.editTextFeilds}>Old Password</Text>
            <TextInput
              onChangeText={setOldPassword}
              style={styles.editTextInputs}
            />
            <Text style={styles.editTextFeilds}>New Password</Text>
            <TextInput
              onChangeText={setNewPassword}
              style={styles.editTextInputs}
            />
            <View
              style={{
                marginTop: 24,
                borderColor: "#efefef",
                width: 240,
                borderWidth: 1,
              }}
            />
            <Button
              style={styles.saveEditProfileButton}
              textColor="#343434"
              compact
              onPress={editPassword}
            >
              Save
            </Button>
          </View>
        </View>
      )}
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
  logoutButton2: {
    backgroundColor: "#ef5350",
    color: "#000000",
    borderRadius: 6,
    paddingLeft: 8,
    paddingRight: 8,
    gap: 8,
    fontSize: 12,
  },
  editButton2: {
    backgroundColor: "#e2e2e2",
    color: "#FFFFFF",
    borderRadius: 6,
    paddingLeft: 8,
    paddingRight: 8,
    gap: 8,
    fontSize: 12,
    marginLeft: 44,
  },
  changePassword2: {
    backgroundColor: "#e2e2e2",
    color: "#FFFFFF",
    borderRadius: 6,
    paddingLeft: 8,
    paddingRight: 8,
    gap: 8,
    fontSize: 12,
    marginLeft: 8,
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
    marginTop: 30,
    fontSize: 20,
    marginLeft: 32,
    marginRight: 168,
    alignSelf: "flex-start",
    fontWeight: "600",
  },
  viewAllText: {
    backgroundColor: "#f2f2f2",
    color: "#a1a1a1",
    marginTop: 35,
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
  editModeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    zIndex: 1,
  },
  editModeView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "80%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    zIndex: 2,
  },
  closeButton: {
    position: "absolute",
    marginTop: 15,
    right: 5,
  },
  editProfileTitle: {
    marginTop: 10,
    marginBottom: 24,
    fontWeight: "600",
    fontSize: 20,
  },
  editProfileIcon: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 77.5,
  },
  editTextFeilds: {
    width: 240,
    height: 16,
    marginTop: 12,
    fontWeight: "400",
    fontSize: 12,
    color: "#a3a3a3",
  },
  editTextInputs: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#f2f2f2",
    width: 240,
    height: 32,
    marginTop: 4,
    fontWeight: "400",
    fontSize: 12,
    color: "#a3a3a3",
  },
  editDifficultyInputs: {
    borderRadius: 6,
    backgroundColor: "#f2f2f2",
    width: 240,
    height: 32,
    marginTop: 4,
    fontWeight: "400",
    fontSize: 12,
    color: "#a3a3a3",
    alignSelf: "center",
  },
  saveEditProfileButton: {
    marginTop: 28,
    backgroundColor: "#f2f2f2",
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 6,
    fontWeight: "400",
    fontSize: 12,
  },
  changePasswordText: {
    width: 140,
    marginTop: 28,
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    paddingLeft: 4,
    paddingTop: 8,
    paddingRight: 4,
    paddingBottom: 8,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 12,
    borderRadius: 6,
  },
  dropdown: {
    marginTop: 4,
    height: 32,
    borderRadius: 6,
    padding: 6,
    width: 240,
    backgroundColor: "#f2f2f2",
    fontWeight: "400",
    fontSize: 12,
    color: "#a3a3a3",
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontWeight: "400",
    fontSize: 12,
    color: "#a3a3a3",
  },
  placeholderStyle: {
    fontWeight: "400",
    fontSize: 12,
    color: "#a3a3a3",
  },
  selectedTextStyle: {
    fontWeight: "400",
    fontSize: 12,
    color: "#a3a3a3",
  },
  inputSearchStyle: {
    height: 40,
    fontWeight: "400",
    fontSize: 12,
    color: "#a3a3a3",
  },
});

export default ProfileScreen;

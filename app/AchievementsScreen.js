import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { Text, View } from "@/components/Themed";
import { useNavigation } from "@react-navigation/native";
import { auth } from "@/firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";

const AchievementsScreen = () => {
  const [profileData, setProfileData] = useState(null);
  const navigation = useNavigation();

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
            console.log({
              DATA: profileSnapshot.data(),
            });
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

  // Sample data for achievements

  const handleBack = () => {
    navigation.goBack();
  };

  const renderAchievement = ({ item }) => (
    <View style={styles.achievementContainer}>
      <View style={styles.achievementContent}>
        <Image
          source={{ uri: item.badge_link }}
          style={styles.achievementImage}
        />
        <View style={styles.textContainer}>
          <View style={styles.nameProgressContainer}>
            <Text style={styles.achievementName}>{item.badge_name} </Text>
            <Text style={styles.progressText}>{item.current_progress}%</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={{
                  ...styles.progressBar,
                  width: `${item.current_progress}%`,
                }}
              />
            </View>
          </View>
          <Text style={styles.achievementDescription}>{item.description}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.mainText}>Achievements</Text>
      </View>
      <FlatList
        data={profileData ? profileData.badges : []}
        renderItem={renderAchievement}
        keyExtractor={(item) => item.badge_link}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.achievementsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topArea: {
    backgroundColor: "#e6eaf1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 13,
    marginBottom: 10,
  },
  backButton: {
    marginBottom: 17,
    marginLeft: 25,
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  mainText: {
    marginTop: 50,
    fontSize: 28,
    fontWeight: "600",
    color: "#343434",
  },
  achievementsList: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  achievementContainer: {
    backgroundColor: "#ffffff",
    marginRight: 16,
  },
  achievementContent: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
  },
  achievementImage: {
    backgroundColor: "#ffffff",
    width: 64,
    height: 64,
    borderRadius: 64,
    marginTop: 25,
    marginRight: 10,
    marginStart: 5,
  },
  textContainer: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  achievementName: {
    backgroundColor: "#ffffff",
    marginTop: 25,
    fontSize: 14,
    fontWeight: "600",
  },
  nameProgressContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
  },
  progressContainer: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  progressBarBackground: {
    backgroundColor: "#ffffff",
    flex: 1,
    height: 10,
    borderRadius: 8,
    backgroundColor: "#d9d9d9", // Gray color
    overflow: "hidden",
    position: "relative",
  },
  progressBar: {
    backgroundColor: "#ffffff",
    height: 11,
    backgroundColor: "#003f88", // Blue color
    borderRadius: 6,
    position: "absolute",
    left: 0,
    top: 0,
  },
  progressText: {
    backgroundColor: "#ffffff",
    fontSize: 10,
    fontWeight: "400",
    color: "#a4a4a4",
    marginTop: 28,
    marginLeft: "auto",
  },
  achievementDescription: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    fontSize: 10,
    fontWeight: "400",
    color: "#8d8d8d",
  },
});

export default AchievementsScreen;

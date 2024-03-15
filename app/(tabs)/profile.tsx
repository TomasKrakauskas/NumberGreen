import React from "react";
import { StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.profileIcon}>
          <FontAwesome name="user-circle" size={155} color="black" />
        </View>
        <Text style={styles.nickname}>Username</Text>
      </View>
      <View style={styles.settingsContainer}>
        <FontAwesome name="cog" size={30} color="black" />
      </View>
      <View style={styles.metricsContainer}>
        <Text style={styles.metricText}>
          Total steps: <Text style={styles.boldText}>1000</Text>
        </Text>
        <Text style={styles.metricText}>
          Longest route: <Text style={styles.boldText}>1000</Text> steps
        </Text>
        <Text style={styles.metricText}>
          Fastest pace: <Text style={styles.boldText}>1000</Text> km/h
        </Text>
      </View>
      <Text style={styles.goalsText}>Goals beaten</Text>

      <View style={styles.badgesContainer}>
        <View style={[styles.badge, { backgroundColor: "#FF5733" }]}>
          <Text style={styles.badgeText}>Wow, you are adopted!</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: "#C70039" }]}>
          <Text style={styles.badgeText}>You are actually not a loser!</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: "#900C3F" }]}>
          <Text style={styles.badgeText}>You are the best nerd here!</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  nickname: {
    fontSize: 28,
    fontWeight: "bold",
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
});

export default ProfileScreen;

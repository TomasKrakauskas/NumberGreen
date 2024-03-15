import React from "react";
import { StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="user-circle" size={80} color="black" />
        <FontAwesome
          name="cog"
          size={30}
          color="black"
          style={styles.settingsIcon}
        />{" "}
        <Text style={styles.nickname}>Your Nickname</Text>
      </View>
      <Text style={styles.sectionTitle}>Information</Text>
      <Text>Total number of steps: 1000</Text>
    </View>
  );
};

const TabTwoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ProfileScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  nickname: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  settingsIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default TabTwoScreen;

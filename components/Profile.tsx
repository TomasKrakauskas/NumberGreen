import React from "react";
import { StyleSheet } from "react-native";

import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

import Colors from "@/constants/Colors";

interface ProfileProps {
  username: string;
}

// Define the component
const Profile: React.FC<ProfileProps> = ({ username }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Username: {username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Profile;

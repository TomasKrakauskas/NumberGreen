import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const AchievementsScreen = () => {
  const navigation = useNavigation();
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.mainText}>Achievements</Text>
      </View>
      {/* Your content below the top area */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topArea: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
  backButton: {
    marginRight: 16,
  },
  mainText: {
    fontSize: 25,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default AchievementsScreen;

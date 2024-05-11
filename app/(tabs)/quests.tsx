//a page that shows all possible quests, you can click on a quest to see more detials, and start it

import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Link } from "expo-router";
import { useNavigation } from "expo-router";
import { useRoute } from "expo-router";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { Quest } from "@/types";
import { getQuests } from "@/api/quests";
import { startQuest } from "@/api/quests";

function Quest({ quest }: { quest: Quest }) {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("quest", { id: quest.id });
      }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
        },
        styles.quest,
      ]}
    >
      <Text style={styles.title}>{quest.title}</Text>
      <Text style={styles.description}>{quest.description}</Text>
    </Pressable>
  );
}

export default function Quests() {
  const colorScheme = useColorScheme();
  const { data: quests } = useQuery("quests", getQuests);

  return (
    <View style={styles.container}>
      {quests?.map((quest) => (
        <Quest key={quest.id} quest={quest} />
      ))}
    </View>
  );
}
import { ScrollView, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { Button, Card, Divider, Text } from "react-native-paper";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function TrackScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const newTrack = () => navigation.navigate("path");
  const viewTrack = (id: number) =>
    navigation.navigate("path", { trackId: id });

  return (
    <ScrollView style={styles.container}>
      <Button mode="contained" onPress={newTrack}>
        New Track
      </Button>

      <View style={styles.track}>
        <Text variant="headlineMedium">Walked Tracks</Text>
        <View style={styles.trackWrapper}>
          {[0, 1, 2].map((index) => (
            <TrackCard
              key={index}
              title={`Track ${index + 1}`}
              distance={0.7}
              image={`https://picsum.photos/${465 + index}`}
              onPress={() => viewTrack(index)}
            />
          ))}
        </View>
      </View>

      <View style={styles.track}>
        <Text variant="headlineMedium">Find new tracks</Text>
        <View style={styles.trackWrapper}>
          {[0, 1, 2].map((index) => (
            <TrackCard
              key={index}
              title={`Track ${index + 1}`}
              distance={0.7}
              image={`https://picsum.photos/${701 + index}`}
              onPress={() => viewTrack(index)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
interface TrackCardProps {
  title: string;
  distance: number;
  image: string;
  onPress: () => void;
}
const TrackCard = ({ title, distance, image, onPress }: TrackCardProps) => {
  return (
    <Card style={styles.trackCard} mode="contained" onPress={onPress}>
      <Card.Cover style={styles.trackCardCover} source={{ uri: image }} />
      <Text variant="titleMedium">{title}</Text>
      <Text variant="bodyMedium">Distance: {distance}km</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    overflow: "scroll",
  },
  track: {
    marginBottom: 32,

    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  trackWrapper: {
    padding: 8,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 16,
  },
  trackCard: {
    marginHorizontal: "2.5%",
    padding: 8,
    width: "45%",
  },
  trackCardCover: {
    height: 128,
  },
});

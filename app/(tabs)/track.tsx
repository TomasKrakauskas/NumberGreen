import { ScrollView, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { Button, Card, Divider, Text } from "react-native-paper";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITrackState, loadTracks } from "@/store/slices/track";
import { AppDispatch, IReduxState } from "@/store/store";
import { auth } from "@/firebaseConfig";

export default function TrackScreen() {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { loading, userTracks, publicTracks } = useSelector<
    IReduxState,
    ITrackState
  >((state) => state.tracks);

  useEffect(() => {
    const user = auth.currentUser;

    if (user?.uid && loading) {
      dispatch(loadTracks(user?.uid));
    }
  }, [loading]);

  const newTrack = () => navigation.navigate("path");
  const viewTrack = (id: string) =>
    navigation.navigate("path", { trackId: id });

  return (
    <ScrollView style={styles.container}>
      <Button style={styles.newButton} mode="contained" onPress={newTrack}>
        <Text style={styles.newButtonText}>New Track</Text>
      </Button>

      <View style={styles.track}>
        <Text style={styles.headlineText} variant="headlineMedium">
          Walked Tracks
        </Text>
        <View style={styles.trackWrapper}>
          {userTracks.map((track, index) => (
            <TrackCard
              key={index}
              title={track.name}
              distance={track.distance}
              image={
                track.image
                  ? track.image
                  : `https://picsum.photos/${465 + index}`
              }
              // image={`https://picsum.photos/${465 + index}`}
              onPress={() => viewTrack(track.id)}
            />
          ))}
        </View>
      </View>

      <View style={styles.track}>
        <Text style={styles.headlineText} variant="headlineMedium">
          Find new tracks
        </Text>
        <View style={styles.trackWrapper}>
          {publicTracks.map((track, index) => (
            <TrackCard
              key={index}
              title={track.name}
              distance={track.distance}
              image={
                track.image
                  ? track.image
                  : `https://picsum.photos/${701 + index}`
              }
              // image={`https://picsum.photos/${701 + index}`}
              onPress={() => viewTrack(track.id)}
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
      <Text style={styles.trackCardTitle} variant="titleMedium">
        {title}
      </Text>
      <Text style={styles.trackCardDistance} variant="bodyMedium">
        Distance: {distance}km
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 32,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    overflow: "scroll",
    backgroundColor: "#f2f2f2",
  },
  newButton: {
    alignSelf: "center",
    backgroundColor: "rgba(0, 80, 157, 0.2)",
    borderRadius: 6,

    width: 160,
  },
  newButtonText: {
    color: "#343434",
    fontSize: 16,
    fontWeight: 500,
  },
  track: {
    marginBottom: 32,

    display: "flex",
    flexDirection: "column",
    gap: 4,
    backgroundColor: "#f2f2f2",
  },
  headlineText: {
    marginTop: 32,
    color: "#343434",
    fontSize: 20,
    paddingLeft: 16,
    fontWeight: 500,
  },
  trackWrapper: {
    padding: 8,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 16,
    backgroundColor: "#f2f2f2",
  },
  trackCard: {
    marginHorizontal: "2.5%",
    padding: 8,
    width: "45%",
    backgroundColor: "#dae2ea",
  },
  trackCardCover: {
    height: 128,
  },
  trackCardTitle: {
    color: "#343434",
    fontSize: 14,
    fontWeight: 500,
  },
  trackCardDistance: {
    color: "rgba(52, 52, 52, 0.9)",
    fontSize: 10,
    fontWeight: 500,
  },
});

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

interface Quest {
    title: string;
    description: string;
    icon: string;
    distance: number;
    onPress?: () => void; // Add the 'onPress' property to the 'Quest' interface
}

const Item: React.FC<Quest> = ({ title, description, icon, distance, onPress} ) => (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Image
                source={{ uri: icon }}
                style={{ width: 100, height: 100, marginBottom: 5 }}
                resizeMode="contain"
              />
        <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
            <Text numberOfLines={1} style={{ color: '#666' }}>{description}</Text>
        </View>
        <Text>{distance} km</Text>
    </TouchableOpacity>
);



interface ListItem {
  title: string;
  description: string;
  icon: string;
  distance: number;
}

interface ListItemsProps {
  items: ListItem[];
  naviagateToDetail: (item: ListItem) => void;
}

const ListItems: React.FC<ListItemsProps> = ({ items, naviagateToDetail }) => (
    <View>
        {items.map((item: ListItem, index: number) => (
            <Item
                key={index}
                title={item.title}
                description={item.description}
                icon={item.icon}
                distance={item.distance}
                onPress={() => naviagateToDetail(item)}
            />
        ))}
    </View>
);


const navigateToDetail = (item: any) => {
  console.log('Navigated to:', item);
  // Here you would typically use something like navigation.navigate('DetailPage', { item });
};

export default function app() {

    return(
<ListItems items={[
{ title: 'Beginnner', description: 'Take a 5 km hike', icon: "https://cdn-icons-png.flaticon.com/512/7037/7037293.png", distance: 5 },
  { title: 'Initiation', description: 'Prove you\'re worthy to join the clan', icon: "https://cdn-icons-png.flaticon.com/512/7037/7037293.png", distance: 15 },
  { title: 'Proving grounds', description: 'The next step of your journey', icon: "https://cdn-icons-png.flaticon.com/512/7037/7037293.png", distance: 10 },
  { title: 'Elder Quest', description: 'Help a newbie grow', icon: "https://cdn-icons-png.flaticon.com/512/7037/7037293.png", distance: 20 },
  { title: 'Master of fives', description: 'Organize a walkathon', icon: "https://cdn-icons-png.flaticon.com/512/7037/7037293.png", distance: 25 },
]}
naviagateToDetail={navigateToDetail}
/>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  values: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  badgeStyle: {
    alignItems: "center",
    marginBottom: 20,
  },
  badgesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 50,
  },
});
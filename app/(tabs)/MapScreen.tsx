import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, Polyline, Callout } from "react-native-maps";

interface Coordinate {
  latitude: number;
  longitude: number;
}
interface SpecificCoordinate {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}

const App = () => {
  const specificLocations: SpecificCoordinate[] = [
    {
      latitude: 54.89796545268871,
      longitude: 23.904453028964383,
      name: "THE CENTRAL BUILDING OF FORMER LITHUANIAN POST OFFICE",
      description:
        "This building is distinguished by an organic combination of nationality and modernism. The former Post Office is converted to a cultural place open to the public. In 2015, the European Commission awarded the Kaunas Central Post Office European Heritage Label.",
    },
    {
      latitude: 54.897097,
      longitude: 23.914259,
      name: "PAŽANGA COMPANY",
      description:
        "Newspaper offices, a shop and a restaurant with a rooftop terrace – this building designed by Feliksas Vizbaras was always busy during the interwar period. In the years of Soviet occupation, the interior logic was destroyed. Afterwards, the building was hosting a university, and now the empty spaces are waiting for the future advancement.",
    },
    {
      latitude: 54.89695232103762,
      longitude: 23.913765465357045,
      name: "DAIRY CENTRE",
      description:
        "The inventive simplicity and multifunctionality that were squeezed in this narrow corner lot seem to have gone ahead of their time. After the university students moved out, the Dairy Centre comes to life only during special occasions, for example, during the Design Week.",
    },
    {
      latitude: 54.89706724794377,
      longitude: 23.924984009539315,
      name: "KAUNAS DISTRICT POLICE HEADQUARTERS (FORMER KAUNAS DISTRICT MUNICIPALITY)",
      description:
        "One might say that lucky are those who never had to visit any part of this building. In the interwar period and today, the architectural rigour and solidity continue to be in touch with the building’s purpose. The best way to view it is from the other side of the Vytautas Avenue.",
    },
  ];

  const locations: Coordinate[] = [
    { latitude: 54.89796545268, longitude: 23.90445302896 },
    { latitude: 54.897773681695604, longitude: 23.904749869107157 },
    { latitude: 54.89776156158277, longitude: 23.905061943170356 },
    { latitude: 54.897749441469934, longitude: 23.905374017233555 },
    { latitude: 54.8977373213571, longitude: 23.905686091296754 },
    { latitude: 54.89772520124426, longitude: 23.905998165359954 },
    { latitude: 54.89771308113143, longitude: 23.906310239423153 },
    { latitude: 54.89770096101859, longitude: 23.906622313486352 },
    { latitude: 54.89768884090576, longitude: 23.90693438754955 },
    { latitude: 54.89767672079292, longitude: 23.90724646161275 },
    { latitude: 54.89766460068009, longitude: 23.90755853567595 },
    { latitude: 54.89765248056725, longitude: 23.90787060973915 },
    { latitude: 54.89764036045442, longitude: 23.908182683802348 },
    { latitude: 54.89762824034158, longitude: 23.908494757865547 },
    { latitude: 54.89761612022875, longitude: 23.908806831928747 },
    { latitude: 54.89760400011591, longitude: 23.909118905991946 },
    { latitude: 54.89759188000308, longitude: 23.909430980055145 },
    { latitude: 54.89757975989024, longitude: 23.909743054118344 },
    { latitude: 54.89756763977741, longitude: 23.910055128181543 },
    { latitude: 54.89755551966457, longitude: 23.910367202244743 },
    { latitude: 54.897543399551736, longitude: 23.910679276307942 },
    { latitude: 54.8975312794389, longitude: 23.91099135037114 },
    { latitude: 54.897519159326066, longitude: 23.91130342443434 },
    { latitude: 54.89750703921323, longitude: 23.91161549849754 },
    { latitude: 54.897494919100396, longitude: 23.91192757256074 },
    { latitude: 54.89748279898756, longitude: 23.912239646623938 },
    { latitude: 54.897470678874726, longitude: 23.912551720687137 },
    { latitude: 54.89745855876189, longitude: 23.912863794750336 },
    { latitude: 54.897446438649055, longitude: 23.913175868813536 },
    { latitude: 54.89743431853622, longitude: 23.913487942876735 },
    { latitude: 54.897422198423385, longitude: 23.913800016939934 },
    { latitude: 54.89741007831055, longitude: 23.914112091003133 },
    { latitude: 54.897397958197715, longitude: 23.914424165066333 },
    { latitude: 54.89738583808488, longitude: 23.91473623912953 },
    { latitude: 54.897373717972044, longitude: 23.91504831319273 },
    { latitude: 54.89736159785921, longitude: 23.91536038725593 },
    { latitude: 54.897349477746374, longitude: 23.91567246131913 },
    { latitude: 54.89733735763354, longitude: 23.91598453538233 },
    { latitude: 54.897325237520704, longitude: 23.916296609445528 },
    { latitude: 54.89731311740787, longitude: 23.916608683508727 },
    { latitude: 54.897300997295034, longitude: 23.916920757571926 },
    { latitude: 54.8972888771822, longitude: 23.917232831635125 },
    { latitude: 54.89727675706936, longitude: 23.917544905698325 },
    { latitude: 54.89726463695653, longitude: 23.917856979761524 },
    { latitude: 54.89725251684369, longitude: 23.918169053824723 },
    { latitude: 54.89724039673086, longitude: 23.918481127887922 },
    { latitude: 54.89722827661802, longitude: 23.91879320195112 },
    { latitude: 54.89721615650519, longitude: 23.91910527601432 },
    { latitude: 54.89720403639235, longitude: 23.91941735007752 },
    { latitude: 54.89719191627952, longitude: 23.91972942414072 },
    { latitude: 54.89717979616668, longitude: 23.92004149820392 },
    { latitude: 54.89716767605385, longitude: 23.920353572267118 },
    { latitude: 54.89715555594101, longitude: 23.920665646330317 },
    { latitude: 54.89733503595876, longitude: 23.920686082187835 },
    { latitude: 54.89751451597651, longitude: 23.920706518045353 },
    { latitude: 54.897506717084084, longitude: 23.92101900907218 },
    { latitude: 54.89749891819166, longitude: 23.921331500099004 },
    { latitude: 54.89749111929923, longitude: 23.92164399112583 },
    { latitude: 54.897483320406806, longitude: 23.921956482152655 },
    { latitude: 54.89747552151438, longitude: 23.92226897317948 },
    { latitude: 54.89729624446012, longitude: 23.92224371808376 },
    { latitude: 54.897116967405864, longitude: 23.922218462988038 },
    { latitude: 54.89710864286528, longitude: 23.922530909784385 },
    { latitude: 54.89710031832469, longitude: 23.92284335658073 },
    { latitude: 54.8970919937841, longitude: 23.923155803377078 },
    { latitude: 54.897083669243514, longitude: 23.923468250173425 },
    { latitude: 54.89707534470293, longitude: 23.92378069696977 },
    { latitude: 54.89706702016234, longitude: 23.924093143766118 },
    { latitude: 54.89705869562175, longitude: 23.924405590562465 },
    { latitude: 54.89706724794, longitude: 23.92498400953 },
    { latitude: 54.896870557041524, longitude: 23.924710642054507 },
    { latitude: 54.89687668188141, longitude: 23.924398042891912 },
    { latitude: 54.896882806721294, longitude: 23.924085443729318 },
    { latitude: 54.89688893156118, longitude: 23.923772844566724 },
    { latitude: 54.896895056401064, longitude: 23.92346024540413 },
    { latitude: 54.89690118124095, longitude: 23.923147646241535 },
    { latitude: 54.896907306080834, longitude: 23.92283504707894 },
    { latitude: 54.89691343092072, longitude: 23.922522447916347 },
    { latitude: 54.896919555760604, longitude: 23.922209848753752 },
    { latitude: 54.89674023820424, longitude: 23.922185479079605 },
    { latitude: 54.89656092064787, longitude: 23.922161109405458 },
    { latitude: 54.89655071549711, longitude: 23.921848835529673 },
    { latitude: 54.896540510346355, longitude: 23.921536561653888 },
    { latitude: 54.8965303051956, longitude: 23.921224287778102 },
    { latitude: 54.89652010004484, longitude: 23.920912013902317 },
    { latitude: 54.89650989489408, longitude: 23.920599740026532 },
    { latitude: 54.896689606430954, longitude: 23.92058685077004 },
    { latitude: 54.89686931796783, longitude: 23.920573961513547 },
    { latitude: 54.89704912186561, longitude: 23.920565854718095 },
    { latitude: 54.89705838250358, longitude: 23.920253487091756 },
    { latitude: 54.897067643141554, longitude: 23.919941119465417 },
    { latitude: 54.89707690377953, longitude: 23.919628751839078 },
    { latitude: 54.8970861644175, longitude: 23.91931638421274 },
    { latitude: 54.897095425055475, longitude: 23.9190040165864 },
    { latitude: 54.89710468569345, longitude: 23.91869164896006 },
    { latitude: 54.89711394633142, longitude: 23.91837928133372 },
    { latitude: 54.8971232069694, longitude: 23.91806691370738 },
    { latitude: 54.89713246760737, longitude: 23.917754546081042 },
    { latitude: 54.897141728245344, longitude: 23.917442178454703 },
    { latitude: 54.89715098888332, longitude: 23.917129810828364 },
    { latitude: 54.89716024952129, longitude: 23.916817443202024 },
    { latitude: 54.897169510159266, longitude: 23.916505075575685 },
    { latitude: 54.89717877079724, longitude: 23.916192707949346 },
    { latitude: 54.89718803143521, longitude: 23.915880340323007 },
    { latitude: 54.89719729207319, longitude: 23.915567972696667 },
    { latitude: 54.89720655271116, longitude: 23.915255605070328 },
    { latitude: 54.897215813349135, longitude: 23.91494323744399 },
    { latitude: 54.89722507398711, longitude: 23.91463086981765 },
    { latitude: 54.897097, longitude: 23.914259 },
    { latitude: 54.89724554830603, longitude: 23.914006326105525 },
    { latitude: 54.89725676198698, longitude: 23.91369415001974 },
    { latitude: 54.89726797566793, longitude: 23.913381973933955 },
    { latitude: 54.89727918934888, longitude: 23.91306979784817 },
    { latitude: 54.89729040302983, longitude: 23.912757621762385 },
    { latitude: 54.89730161671078, longitude: 23.9124454456766 },
    { latitude: 54.897312830391726, longitude: 23.912133269590814 },
    { latitude: 54.897324044072676, longitude: 23.91182109350503 },
    { latitude: 54.897335257753625, longitude: 23.911508917419244 },
    { latitude: 54.897346471434574, longitude: 23.91119674133346 },
    { latitude: 54.89735768511552, longitude: 23.910884565247674 },
    { latitude: 54.89736889879647, longitude: 23.91057238916189 },
    { latitude: 54.89738011247742, longitude: 23.910260213076103 },
    { latitude: 54.89739132615837, longitude: 23.90994803699032 },
    { latitude: 54.89740253983932, longitude: 23.909635860904533 },
    { latitude: 54.89741375352027, longitude: 23.909323684818748 },
    { latitude: 54.89742496720122, longitude: 23.909011508732963 },
    { latitude: 54.89743618088217, longitude: 23.908699332647178 },
    { latitude: 54.897447394563116, longitude: 23.908387156561393 },
    { latitude: 54.897458608244065, longitude: 23.908074980475607 },
    { latitude: 54.897469821925014, longitude: 23.907762804389822 },
    { latitude: 54.89748103560596, longitude: 23.907450628304037 },
    { latitude: 54.89749224928691, longitude: 23.907138452218252 },
    { latitude: 54.89750346296786, longitude: 23.906826276132467 },
    { latitude: 54.89751467664881, longitude: 23.90651410004668 },
    { latitude: 54.89752589032976, longitude: 23.906201923960896 },
    { latitude: 54.89753710401071, longitude: 23.90588974787511 },
    { latitude: 54.89754831769166, longitude: 23.905577571789326 },
    { latitude: 54.89755953137261, longitude: 23.90526539570354 },
    { latitude: 54.89757074505356, longitude: 23.904953219617756 },
    { latitude: 54.897581958734506, longitude: 23.90464104353197 },
    { latitude: 54.89796545268, longitude: 23.90445302896 },

    // ... Add all your coordinates here
  ];
  const [selectedMarker, setSelectedMarker] =
    React.useState<SpecificCoordinate | null>(null);

  const calculateCenter = (locations: Coordinate[]) => {
    let minLat = Infinity,
      maxLat = -Infinity;
    let minLng = Infinity,
      maxLng = -Infinity;

    for (const location of locations) {
      minLat = Math.min(minLat, location.latitude);
      maxLat = Math.max(maxLat, location.latitude);
      minLng = Math.min(minLng, location.longitude);
      maxLng = Math.max(maxLng, location.longitude);
    }

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
    };
  };

  const calculateZoomLevels = (locations: Coordinate[]) => {
    let maxDistanceLat = 0;
    let maxDistanceLng = 0;

    for (const location of locations) {
      maxDistanceLat = Math.max(
        maxDistanceLat,
        Math.abs(location.latitude - center.latitude)
      );
      maxDistanceLng = Math.max(
        maxDistanceLng,
        Math.abs(location.longitude - center.longitude)
      );
    }

    maxDistanceLat *= 1.1;
    maxDistanceLng *= 1.1;

    return {
      latitudeDelta: maxDistanceLat * 2,
      longitudeDelta: maxDistanceLng * 2,
    };
  };

  const center = calculateCenter(locations);
  const zoomLevels = calculateZoomLevels(locations);

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...center,
        ...zoomLevels,
      }}
    >
      {specificLocations.map((location, index) => (
        <Marker
          key={index}
          coordinate={location}
          title={`Location ${index + 1}`}
          onPress={() => setSelectedMarker(location)}
        >
          <Callout tooltip>
            <View style={styles.calloutContainer}>
              <Text>Latitude: {selectedMarker?.latitude}</Text>
              <Text>Longitude: {selectedMarker?.longitude}</Text>
              <Text>Name: {selectedMarker?.name}</Text>
              <Text></Text>
            </View>
          </Callout>
        </Marker>
      ))}

      {locations.map((location, index) => {
        if (index < locations.length - 1) {
          return (
            <Polyline
              key={index}
              coordinates={[location, locations[index + 1]]}
              strokeColor="blue"
              strokeWidth={3}
            />
          );
        }
      })}
    </MapView>
  );
};

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <App />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  calloutContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
});

export default MapScreen;

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CubeNavigationHorizontal from "./Test";
import { Tarot } from "./Learning/Cards/Tarot";
import { MiMapView, getVenue } from "@mappedin/react-native-sdk";

import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

// export const data = [
//   {
//     id: "1",
//     title: "Manarola, Italy",
//     description: "The Cliffs of Cinque Terre",
//     image_url:
//       "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80",
//     iconName: "location-pin",
//   },
//   {
//     id: "2",
//     title: "Venezia, Italy",
//     description: "Rialto Bridge, Venezia, Italy",
//     image_url:
//       "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=630&q=80",
//     iconName: "location-pin",
//   },
//   {
//     id: "3",
//     title: "Prague, Czechia",
//     description: "Tram in Prague",
//     image_url:
//       "https://images.unsplash.com/photo-1513805959324-96eb66ca8713?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
//     iconName: "location-pin",
//   },
// ];
const options = {
  clientId: "5eab30aa91b055001a68e996",
  clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1",
  venue: "mappedin-demo-mall",
  // perspective: "Website",
};
const App = (props: Props) => {
  let test = 0;

  return <Tarot />;
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

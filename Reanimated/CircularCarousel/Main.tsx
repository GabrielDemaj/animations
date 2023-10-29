import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { CircularCarousel } from ".";

const data = [
  require("../images/00.jpg"),
  require("../images/01.jpg"),
  require("../images/02.jpg"),
  require("../images/03.jpg"),
  require("../images/04.jpg"),
  require("../images/05.jpg"),
  require("../images/06.jpg"),
  require("../images/07.jpg"),
  require("../images/08.jpg"),
  require("../images/09.jpg"),
];

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CircularCarousel data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

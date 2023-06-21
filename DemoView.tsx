import * as React from "react";
import {
  StyleSheet,
  View,
  Image,
  Platform,
  Button,
  Animated,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
export const percentWidth = (percentage: number) => width * (percentage / 100);
export const percentHeight = (percentage: number) =>
  height * (percentage / 100);

export default function DemoView({ data: { source } }: any) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} {...{ source }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: "white",
    height: 28,
    width: 250,
    borderRadius: Platform.OS === "android" ? 0 : 10,
  },
});

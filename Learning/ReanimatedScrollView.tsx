import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Page } from "../components/Page";

type Props = {};
const WORDS = ["What's", "up", "mobile", "devs?"];

const App = (props: Props) => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal
      style={styles.container}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      pagingEnabled
    >
      {WORDS.map((title, index) => {
        return (
          <Page
            key={index.toString()}
            index={index}
            title={title}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import ScrollPage from "../components/ScrollPage";

type Props = {};
const titles = ["What's", "up", "mobile", "devs?"];

type ContextType = {
  x: number;
};
const { width: PAGE_WIDTH } = Dimensions.get("window");
const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

const App = (props: Props) => {
  const translateX = useSharedValue(0);

  const clampetTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.x = clampetTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: (event) => {
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={{ flex: 1, flexDirection: "row" }}>
          {titles.map((el, index) => {
            return (
              <ScrollPage
                translateX={clampetTranslateX}
                title={el}
                index={index}
                key={index.toString()}
              />
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

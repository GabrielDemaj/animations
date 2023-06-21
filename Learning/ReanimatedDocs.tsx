import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  Easing,
  scrollTo,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {};
const Comp = () => {
  const aref = useAnimatedRef<ScrollView>();
  const scroll = useSharedValue(0);

  useDerivedValue(() => {
    scrollTo(aref, 0, scroll.value * 100, true);
  });

  const items = Array.from(Array(10).keys());

  return (
    <View>
      <Button
        title="scroll down"
        onPress={() => {
          scroll.value = scroll.value + 1;
          if (scroll.value >= 10) scroll.value = 0;
        }}
      />
      <View style={{ width: 120, height: 200, backgroundColor: "green" }}>
        <ScrollView ref={aref} style={{ width: 120 }}>
          {items.map((_, i) => (
            <View
              key={i}
              style={{
                backgroundColor: "white",
                width: 100,
                height: 100,
                margin: 10,
              }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

function WobbleExample(props: any) {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  return (
    <>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button
        title="wobble"
        onPress={() => {
          // rotation.value = withRepeat(withTiming(10), 6, true);
          rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(10, { duration: 100 }), 6, true),
            withTiming(0, { duration: 50 })
          );
        }}
      />
    </>
  );
}

function AnimatedStyleUpdateExample(props: any) {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 2500,
    easing: Easing.out(Easing.exp),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Animated.View
        style={[
          { width: 100, height: 80, backgroundColor: "black", margin: 30 },
          style,
        ]}
      />
      <Button
        title="toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      />
    </View>
  );
}

function Box() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        // { translateX: offset.value }
        { translateX: withSpring(offset.value * 255) },
        // {
        //   translateX: withTiming(offset.value * 255, {
        //     duration: 500,
        //     easing: Easing.out(Easing.exp),
        //   }),
        // },
      ],
    };
  });
  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(offset.value * 255) }],
    };
  });

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 255, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  return (
    <>
      {/* <Animated.View style={[styles.box, animatedStyles]} /> */}
      <Animated.View style={[styles.box, defaultSpringStyles]} />
      <Animated.View style={[styles.box, customSpringStyles]} />
      {/* <Button
        onPress={() => (offset.value = withSpring(Math.random() * 255))}
        title="Move"
      /> */}
      <Button onPress={() => (offset.value = Math.random())} title="Move" />
    </>
  );
}
const App = (props: Props) => {
  return (
    <View style={styles.container}>
      {/* <Text>App</Text> */}
      {/* <Box /> */}
      {/* <AnimatedStyleUpdateExample /> */}
      {/* <WobbleExample /> */}
      <Comp />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: "#001A71",
    borderRadius: 20,
  },
});

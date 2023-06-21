import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  View,
  Button,
} from "react-native";

const { width } = Dimensions.get("window");

const perspective = width;
const angle = Math.atan(perspective / (width / 2));
const ratio = Platform.OS === "ios" ? 2 : 1.2;

export interface Props {
  children: any;
  backdropOpacity?: number;
  backgroundColor?: string;
}

export default function CubeNavigation({
  backdropOpacity = 0.8,
  backgroundColor = "white",
  children,
}: Props) {
  const x = useState(new Animated.Value(0))[0];
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function getTransformStyle(index: any) {
    const offset = index * width;
    const inputRange = [offset - width, offset + width];
    const translateX = x.interpolate({
      inputRange,
      outputRange: [width / ratio, -width / ratio],
      extrapolate: "clamp",
    });
    const rotateY = x.interpolate({
      inputRange,
      outputRange: [`${angle}rad`, `-${angle}rad`],
      extrapolate: "clamp",
    });
    const translateX1 = x.interpolate({
      inputRange,
      outputRange: [width / 2, -width / 2],
      extrapolate: "clamp",
    });
    const extra = width / ratio / Math.cos(angle / 2) - width / ratio;
    const translateX2 = x.interpolate({
      inputRange,
      outputRange: [-extra, extra],
      extrapolate: "clamp",
    });
    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { perspective },
        { translateX },
        { rotateY },
        { translateX: translateX1 },
        { translateX: translateX2 },
      ],
    };
  }

  function getBlackdropStyle(index: any) {
    const offset = index * width;
    const inputRange = [offset - width, offset, offset + width];
    const opacity = x.interpolate({
      inputRange,
      outputRange: [backdropOpacity, 0, backdropOpacity],
      extrapolate: "clamp",
    });
    return {
      backgroundColor: "black",
      ...StyleSheet.absoluteFillObject,
      opacity,
    };
  }

  const renderChildren = (child: any, i: any) => {
    return (
      <Animated.View style={getTransformStyle(i)} key={child.id || i}>
        {child}
        <Animated.View style={getBlackdropStyle(i)} />
      </Animated.View>
    );
  };

  //   console.log(currentIndex);

  const onMomentumScrollEnd = ({ nativeEvent }: any) => {
    setCurrentIndex(Math.round(nativeEvent.contentOffset.x / width));
  };
  //   useEffect(() => {
  //     setCurrentIndex(4);
  //   }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {children.map(renderChildren)}
      <Animated.ScrollView
        style={StyleSheet.absoluteFillObject}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        // snapToInterval={width}
        contentContainerStyle={{ width: width * children.length }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        decelerationRate={0.99}
        horizontal
        pagingEnabled={true}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

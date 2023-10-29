import React from "react";
import { Dimensions, Image, ImageProps, Pressable, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const { width: windowWidth } = Dimensions.get("window");

const ListItemWidth = windowWidth / 4;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type SvgType = {
  onPress: () => void;
  activeIndex: number;
  index: number;
};
const CircularImageWithAnimatedBorder: React.FC<ImageProps & SvgType> = ({
  source,
  onPress,
  activeIndex,
  index,
}) => {
  //   const radius = ListItemWidth / 2 - 6;
  //   const radius = ListItemWidth / 2;
  const strokeWidth = 6;
  const offset = 4;
  //   const radius = ListItemWidth / 2 + strokeWidth + offset;
  const radius = ListItemWidth / 2 + strokeWidth;

  //   const radius = ListItemWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const animatedStrokeValue = useSharedValue(0);
  const animationStartTime = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference - animatedStrokeValue.value,
    };
  });

  const onLongPress = () => {
    if (index === activeIndex) {
      animationStartTime.value = new Date().getTime();
      animatedStrokeValue.value = withTiming(
        circumference,
        {
          duration: 5000,
          easing: Easing.linear,
        },
        (isFinished) => {
          if (!isFinished) {
            const endTime = new Date().getTime();
            const elapsedTime = endTime - animationStartTime.value;
            console.log(
              "Animation interrupted after:",
              elapsedTime,
              "milliseconds"
            );
          }
          const finishTime = new Date().getTime();
          console.log(isFinished, finishTime - animationStartTime.value);
        }
      );
    }
  };
  const onPressOut = () => {
    if (index === activeIndex) {
      animatedStrokeValue.value = withTiming(0, {
        duration: 300,
        easing: Easing.linear,
      });
    }
  };

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <View
        style={{
          position: "relative",
          width: ListItemWidth + 2 * (strokeWidth + 2 * offset),
          height: ListItemWidth + 2 * (strokeWidth + 2 * offset),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={source}
          style={{
            position: "absolute", // To overlay on top of the SVG
            height: ListItemWidth,
            width: ListItemWidth,
            borderRadius: 200,
            zIndex: 1, // Ensure it's above the SVG
          }}
        />
        <Svg
          style={{
            position: "absolute",
            width: ListItemWidth + 2 * (strokeWidth + 2 * offset),
            height: ListItemWidth + 2 * (strokeWidth + 2 * offset),
            zIndex: 0, // Below the Image
          }}
        >
          <AnimatedCircle
            cx={(ListItemWidth + 2 * (strokeWidth + 2 * offset)) / 2}
            cy={(ListItemWidth + 2 * (strokeWidth + 2 * offset)) / 2}
            r={radius}
            fill="transparent"
            stroke="red"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference}, ${circumference}`}
            animatedProps={animatedProps}
          />
        </Svg>
      </View>
    </Pressable>
  );
};

export default CircularImageWithAnimatedBorder;

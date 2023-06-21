import { Animated, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { percentHeight, percentWidth } from "./DemoView";

export const getRootAnimatedViewStyles = (
  additionalStyles?: StyleProp<ViewStyle>
): ViewStyle => {
  const baseStyles: ViewStyle = {
    position: "absolute",
  };

  if (typeof additionalStyles === "object") {
    return { ...baseStyles, ...(additionalStyles as ViewStyle) };
  }

  return baseStyles;
};

export const getExpandedChildViewStyles = (
  windowWidth: number,
  windowHeight: number,
  addBaseStyles: boolean = false
): ViewStyle => {
  let styles: ViewStyle = {
    paddingTop: 100,
    paddingBottom: 100,
    height: windowHeight + 200,
  };

  if (addBaseStyles) {
    styles.backgroundColor = "#000";
    styles.position = "absolute";
    styles.width = windowWidth;
  }

  return styles;
};

export const getNormalChildViewStyles = (
  windowWidth: number,
  windowHeight: number,
  addBaseStyles: boolean = false
): ViewStyle => {
  let styles: ViewStyle = {
    width: windowWidth,
    height: windowHeight,
  };

  if (addBaseStyles) {
    styles.backgroundColor = "#000";
    styles.position = "absolute";
    styles.transform = [
      { translateX: -percentWidth(50) },
      { translateY: -percentHeight(50) },
    ];
  }

  return styles;
};

export const getAnimatedSlideViewStyles = (additionalTransforms: any) => {
  return {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    ...additionalTransforms,
  };
};

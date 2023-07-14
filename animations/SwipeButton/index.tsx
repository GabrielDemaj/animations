import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MockUI from "./MockUI";
import SwipeButton from "./SwipeButton";

const SwipeButtonAnimation = () => {
  const [toggleState, setToggleState] = useState(false);

  const handleToggle = (value: any) => setToggleState(value);
  return (
    <View
      style={[
        styles.root,
        { backgroundColor: toggleState ? "#222" : "#ebedee" },
      ]}
    >
      <MockUI />
      <SwipeButton onToggle={handleToggle} />
      <MockUI />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 200,
  },
});

export default SwipeButtonAnimation;

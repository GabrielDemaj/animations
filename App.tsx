// import React from "react";
// import { StyleSheet } from "react-native";

// import FruitList from "./animations/AnimatedPull";

// type Props = {};

// const options = {
//   clientId: "5eab30aa91b055001a68e996",
//   clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1",
//   venue: "mappedin-demo-mall",
//   // perspective: "Website",
// };
// const App = () => {
//   return <FruitList />;
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import FruitList from "./animations/AnimatedPull";

const App = () => {
  const [isVisible, setisVisible] = useState(true);

  const width = new Animated.Value(0);
  const height = new Animated.Value(0);

  const IMAGE =
    "https://tsc-website-production.s3.amazonaws.com/uploads/2018/05/React-Native.png";

  useEffect(() => {
    Animated.timing(width, {
      toValue: 360,
      duration: 1200,
      useNativeDriver: false,
    }).start();

    Animated.timing(height, {
      toValue: 100,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, []);

  const Hide_Splash_Screen = () => {
    setisVisible(false);
  };

  useEffect(() => {
    let myTimeout = setTimeout(() => {
      Hide_Splash_Screen();
    }, 3000);
    return () => clearTimeout(myTimeout);
  }, []);

  const Splash_Screen = () => {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={{ uri: IMAGE }}
          style={{
            width: width,
            height: height,
            position: "absolute",
          }}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <>
      {isVisible === true ? (
        Splash_Screen()
      ) : (
        <FruitList />
        // <View style={styles.container}>
        //   <Text style={styles.title}>Animated Splash Screen Example</Text>
        // </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: "800",
  },
});

export default App;

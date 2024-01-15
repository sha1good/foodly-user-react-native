import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import { COLORS, SIZES } from "../constants/theme";

const LoadingScreen = () => {
  const animation = useRef(null);
  return (
    <View style={{height: SIZES.height, justifyContent: "center", backgroundColor: '#ffffff'}}>
      <LottieView
        autoPlay
        ref={animation}
        style={{ width: SIZES.width / 2, height: SIZES.height / 2.8 }}
        source={require("../../assets/anime/delivery.json")}
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});

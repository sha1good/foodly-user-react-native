import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import NetworkImage from "./NetworkImage";
import { COLORS, SIZES } from "../constants/theme";

const Advertisemts = () => {
  return (
   
    
     <NetworkImage
        source={'https://d326fntlu7tb1e.cloudfront.net/uploads/44c585c9-669e-4ed0-8f8d-da3a5a65816d-image005.jpeg'}
        width={SIZES.width}
        height={SIZES.height / 5.8}
        radius={16}
      />
  );
};

export default Advertisemts;

const styles = StyleSheet.create({});

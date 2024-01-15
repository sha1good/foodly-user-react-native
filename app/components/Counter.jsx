import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";


const Counter = ({count, setCount}) => {
  

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
      <AntDesign
        name="minuscircleo"
        size={26}
        color={COLORS.primary}
        onPress={decrement}
      />
      <Text style={{fontFamily: 'regular', fontSize: 18, marginTop: 1}}>  {count}  </Text>

      <AntDesign
        name="pluscircleo"
        size={26}
        color={COLORS.primary}
        onPress={increment}
      />
    </View>
  );
};

export default Counter;


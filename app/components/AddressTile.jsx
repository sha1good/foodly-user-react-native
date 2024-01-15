import { StyleSheet, Text, TouchableOpacity, View, Switch } from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  Ionicons,
  SimpleLineIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";

const AddressTile = ({ onPress, item }) => {
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const handleSwitchToggle = () => {
    setIsDefaultAddress(!isDefaultAddress);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.outter}>
        <View style={styles.inner}>
          <FontAwesome name="building-o" size={22} color={COLORS.gray} />
          <View>
            <Text style={styles.text}>{item.item.addressLine1}</Text>
            <Text style={styles.text}>{item.item.postalCode}</Text>
          </View>
        </View>

        <Switch value={item.item.default} onValueChange={handleSwitchToggle} />
      </View>
    </TouchableOpacity>
  );
};

export default AddressTile;

const styles = StyleSheet.create({
  
  outter: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  inner: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    marginVertical: 6,
  },
  text: {
    marginLeft: 10,
    fontFamily: "regular",
    fontSize: 12,
    color: COLORS.gray,
  },
});

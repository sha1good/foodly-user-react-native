import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import AddressTile from "../components/AddressTile";
import { addresses } from "../constants/uidata";
import { Button } from "../components";
import { useNavigation } from "@react-navigation/native";

const bkImg =
  "https://d326fntlu7tb1e.cloudfront.net/uploads/8cd2cb78-c99c-4408-a333-91ec6c1bb9e3-restaurant_bk.png";

const ShippingAddress = () => {
const navigation = useNavigation();

  const renderItem = (item) => {
    return (
      <AddressTile
        item={item}
        onPress={() => {}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: bkImg }}
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: 0.7,
          },
        ]}
      />

      <FlatList
        data={addresses}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        style={{ marginTop: 12, marginRight: 12 }}
      />

        <View style={styles.suspendedButtonContainer}>
            <Button
            isValid={true}
            title="Add Address"
            radius={30}
            onPress={()=> navigation.navigate('add-address')}
            />
        </View>
    </View>
  );
};

export default ShippingAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  suspendedButtonContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
},
});

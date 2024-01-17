import { View, FlatList, Text, Image, StyleSheet } from "react-native";
import React from "react";
import fetchCategories from "../../hooks/categoryHook";
import HorizontalShimmer from "../../components/Shimmers/HorizontalShimmer";
import { COLORS } from "../../constants/theme";
import { AntDesign } from "@expo/vector-icons";


const bkImg =
  "https://d326fntlu7tb1e.cloudfront.net/uploads/8cd2cb78-c99c-4408-a333-91ec6c1bb9e3-restaurant_bk.png";

const MoreFoods = () => {
  const { categories, isLoading, error, refetch } = fetchCategories();

  if (isLoading === true) {
    return <HorizontalShimmer />;
  }
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ flexDirection: "row", alignContent: "space-between" }}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.text}>{item.title}</Text>
      </View>

      <AntDesign name="right" size={24} color={COLORS.gray} />
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <Image
        source={{
          uri: bkImg,
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={0}
      />
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        // Add other props as needed, like contentContainerStyle
      />
    </View>
  );
};

export default MoreFoods;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    // alignItems: "",
    justifyContent: "space-between",
    padding: 10,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: COLORS.gray2,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  
});

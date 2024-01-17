import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import fetchFoodRecommendations from "../../hooks/recommendationsByCat";
import HorizontalShimmer from "../../components/Shimmers/HorizontalShimmer";
import { COLORS } from "../../constants/theme";

const bkImg =
  "https://d326fntlu7tb1e.cloudfront.net/uploads/8cd2cb78-c99c-4408-a333-91ec6c1bb9e3-restaurant_bk.png";

const AllRestaurants = () => {
  const { recommendations, isLoading, error, refetch } =
    fetchFoodRecommendations("41007428");

  if (isLoading) {
    return <HorizontalShimmer />;
  }
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl[0] }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subTitle} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.statusContainer,
          item.isAvailable ? styles.open : styles.closed,
        ]}
      >
        <Text style={styles.statusText}>
          {item.isAvailable ? "OPEN" : "CLOSED"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri: bkImg,
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={0}
      />
      <FlatList
        data={recommendations}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default AllRestaurants;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  subTitle: {
    width: "90%",
    fontSize: 12,
    color: "gray",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
    position: "absolute",
    bottom: 0,
    right: 10,
  },
  statusContainer: {
    position: "absolute",
    top: 15,
    right: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
  open: {
    backgroundColor: COLORS.primary,
  },
  closed: {
    backgroundColor: COLORS.red,
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
  },
  // Add other styles to match the design as needed
});

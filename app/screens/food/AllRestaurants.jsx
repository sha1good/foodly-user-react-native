import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, {useContext} from "react";
import fetchFoodRecommendations from "../../hooks/recommendationsByCat";
import HorizontalShimmer from "../../components/Shimmers/HorizontalShimmer";
import { COLORS } from "../../constants/theme";
import fetchNearByRestaurants from "../../hooks/nearByRestaurants";
import { RestaurantContext } from "../../context/RestaurantContext";

const bkImg =
  "https://d326fntlu7tb1e.cloudfront.net/uploads/8cd2cb78-c99c-4408-a333-91ec6c1bb9e3-restaurant_bk.png";

const AllRestaurants = ({navigation}) => {
  const { restaurantObj, setRestaurant } = useContext(RestaurantContext);
    const {restaurants, isLoading, error, refetch} = fetchNearByRestaurants('41007428')

  if (isLoading) {
    return <HorizontalShimmer />;
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={()=> {navigation.navigate('restaurant', item), setRestaurant(item)}}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subTitle} numberOfLines={2}>
          {item.coords.address}
        </Text>
        <Text style={styles.price}>{item.time}</Text>
      </View>
      <View
        style={[
          styles.statusContainer,
          item.isAvailable ? styles.open : styles.closed,
        ]}
      >
        <Text style={styles.statusText}>
          {item.isAvailable ? "OPEN" : "CLOSED"}
        </Text>
      </View>
    </TouchableOpacity>
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
        data={restaurants}
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
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
   position: "absolute",
   right: 6,
   top: -2
  },
  statusContainer: {
    position: "absolute",
    bottom: 15,
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

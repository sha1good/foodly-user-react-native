import { StyleSheet, FlatList, View, Text } from "react-native";
import React from "react";
import { NetworkImage } from "./index";
import { COLORS, SIZES } from "../constants/theme";
import { Rating, RatingInput } from "react-native-stock-star-rating";
import FoodComponent from "./FoodComponent";
import { useNavigation } from "@react-navigation/native";
import fetchFoodRecommendations from "../hooks/recommendationsByCat";
import ReusableShimmer from "./Shimmers/ReusableShimmer";

const NewFoodList = ({code}) => {
  const navigation = useNavigation();
  const restaurantShimmer = [1,2,3,4]
  const {recommendations, isLoading, error, refetch} = fetchFoodRecommendations(code);

  if (isLoading) {
    return (
      <View style={{ marginLeft: 12, marginBottom: 10,}}>
        <FlatList
          data={restaurantShimmer} 
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 5,rowGap: 10 }}
          horizontal
          scrollEnabled
          renderItem={({ item }) => (
            <View style={{ marginRight: 15}}>
              <ReusableShimmer width={SIZES.width - 80} height={SIZES.height / 5.3} radius={16}/>
            </View>
              
            
          )}
        />
      </View>
    );
  }


  const renderFoodItem = ({ item }) => (
    <FoodComponent
      item={item}
      onPress={() => navigation.navigate("food-nav", item)}
    />
  );

  return (
    <View style={{ marginLeft: 12, marginBottom: 10 }}>
      <FlatList
        data={recommendations}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        style={{ marginTop: 5 }}
        horizontal
        scrollEnabled
        renderItem={renderFoodItem}
      />
    </View>
  );
};

export default NewFoodList;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: "medium",
    marginTop: 5,
  },

  small: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.gray,
  },
});

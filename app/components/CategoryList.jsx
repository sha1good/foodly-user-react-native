import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CategoryItem from "./CategoryItem";
import fetchCategories from "../hooks/categoryHook";
import ReusableShimmer from "./Shimmers/ReusableShimmer";

const CategoryList = ({ setSelectedCategory, setSelectedSection, setSelectedValue }) => {
  const [selected, setSelected] = useState(null);
  const restaurantShimmer = [1, 2, 3, 4, 5, 6, 7];
  const {categories, isLoading, error, refetch} = fetchCategories()

  const handleSelectCategory = (item) => {
    if (selected === item.value) {
      setSelectedCategory(null);
      setSelected(null);
      setSelectedValue(null)
      setSelectedSection(null)
    } else {
      setSelectedCategory(item._id);
      setSelectedValue(item.title)

      setSelected(item.value);
      setSelectedSection('category');
    }
  };

  if (isLoading) {
    return (
      <FlatList
        data={restaurantShimmer}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ marginTop: 5 }}
        scrollEnabled
        renderItem={({ item }) => (
          <View style={{marginLeft: 12}}>
            <ReusableShimmer
              width={80}
              height={55}
              radius={16}
              marginRight={12}
            />
          </View>
        )}
      />
    );
  }

  return (
    <FlatList
      data={categories}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ marginTop: 5 }}
      keyExtractor={(item) => item._id}
      scrollEnabled
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {handleSelectCategory(item)}}
        >
          <CategoryItem category={item} selected={selected} />
        </TouchableOpacity>
      )}
    />
  );
};

export default CategoryList;



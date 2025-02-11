import {StyleSheet, View, Text, Image } from 'react-native'
import React from 'react'
import { COLORS, SHADOWS } from '../constants/theme';


const CategoryItem = ({category, selected}) => {
  print(category.imageUrl);
  return (
    <View
      style={{
        marginLeft: 12,
        padding: 5,
        alignItems: "center",
        margin: 5,
        width: 90,
        height: 55,
        justifyContent: "center",
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: category.value === selected ? COLORS.secondary : 'transparent',
        shadowColor: SHADOWS.small
      }}
    >
      <Image source={{uri: category.imageUrl}} style={{ width: 30, height: 30 }} />
      <Text style={{ fontSize: 13, fontFamily: 'regular'}}>
        {category.title}
      </Text>
    </View>
  );
};
export default CategoryItem;



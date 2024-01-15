import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants/theme";

const ChoicesList = ({ setSelectedChoice, setSelectedSection }) => {
  const [selected, setSelected] = useState(null);

  const handleSelectChoice = (item) => {
    if (selected === item.value) {
      setSelectedChoice(null);
      setSelected(null);
      setSelectedSection(null)
    } else {
      setSelectedChoice(item.value);
      setSelected(item.value);
      setSelectedSection('restaurant');
    }
  };

  const choicesList = [
    {
      id: 1,
      name: "Pick Up",
      value: "pickup",
    },
    {
      id: 2,
      name: "4 Star",
      value: "4star",
    },
    {
      id: 3,
      name: "3 Star",
      value: "3star",
    },

    {
      id: 4,
      name: "Under 30 min",
      value: "under30",
    },

    {
      id: 5,
      name: "Recommended",
      value: "recommended",
    },
  ];
  return (
    <View>
      <Text
        style={{
          marginLeft: 16,
          marginVertical: 8,
          fontSize: 18,
          fontFamily: "bold",
        }}
      >
        Pick Restaurants
      </Text>

      <FlatList
        data={choicesList} // Make sure this data includes items for four rows with two items each
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 5 }}
        horizontal
        scrollEnabled
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor:
                item.value === selected ? COLORS.secondary : COLORS.lightWhite,
              height: 40,
              borderRadius: 12,
              marginHorizontal: 8,
              justifyContent: "center",
            }}
            onPress={() => {handleSelectChoice(item)}}
          >
            <Text
              style={{
                color:
                  item.value === selected ? COLORS.lightWhite : COLORS.gray,
                marginHorizontal: 10,
                fontSize: 13,
                fontFamily: "regular",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChoicesList;

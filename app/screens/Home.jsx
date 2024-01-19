import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../config";
import CategoryList from "../components/CategoryList";
import HomeHeader from "../components/HomeHeader";
import ChoicesList from "../components/ChoicesList";
import Heading from "../components/Heading";
import Divider from "../components/Divider";
import NearByRestaurants from "../components/NearByRestaurants";
import NewFoodList from "../components/NewFoodList";
import { SafeAreaView } from "react-native-safe-area-context";
import fetchCategortItems from "../hooks/fetchByCat";
import axios from "axios";
import HomeCategory from "../components/HomeCategory";
import { COLORS, SIZES } from "../constants/theme";
import fetchCartCount from "../hooks/cartCount";

const Home = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  


  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://foodlybackend-react-production.up.railway.app/api/foods/${selectedCategory}/41007428`
      );

      setCategory(response.data);

      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    fetchData();
  
  }, [selectedCategory, selectedSection]);

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: COLORS.primary, height: SIZES.height }}>
        <View
          style={{
            backgroundColor: COLORS.offwhite,
            height: SIZES.height - 140,
            borderBottomEndRadius: 30,
            borderBottomStartRadius: 30,
            overflow: "hidden",
          }}
        >
          <HomeHeader />

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              borderBottomEndRadius: 30,
              borderBottomStartRadius: 30,
            }}
          
          >
            <CategoryList
              setSelectedValue={setSelectedValue}
              setSelectedCategory={setSelectedCategory}
              setSelectedSection={setSelectedSection}
            />

            <ChoicesList
              setSelectedChoice={setSelectedChoice}
              setSelectedSection={setSelectedSection}
            />
            {selectedCategory !== null && selectedSection !== null ? (
              <View>
                <Heading
                  heading={`Browse ${selectedValue} Category`}
                  onPress={() => {}}
                />

                <HomeCategory category={category} isLoading={isLoading} />
              </View>
            ) : (
              <View>
                <Heading heading={"Nearby Restaurants"} onPress={() => {navigation.navigate('nearby_restaurants')}} />

                <NearByRestaurants code={"41007428"} />

                <Divider />

                <Heading heading={"Try Something New"} onPress={() => {navigation.navigate('nearby_restaurants')}} />

                <NewFoodList code={"41007428"} />

                <Divider />

                <Heading heading={"Fastest Near You"} onPress={() => {navigation.navigate('fastest')}} />
                <NewFoodList code={"41007428"} />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;



import React from "react";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Orders from "../screens/Orders";
import FoodPage from "../screens/restaurant/FoodPage";
import { useRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const FoodNavigator = () => {
  const route = useRoute();
  const item = route.params;

  const isAndroid = true;
  return (
    <Stack.Navigator
      initialRouteName="food-page"
      //   screenOptions={{
      //     gestureEnabled: true,

      //     ...(isAndroid && TransitionPresets.ModalPresentationIOS),
      //   }}
    >
      <Stack.Screen
        name="food-page"
        component={FoodPage}
        options={{ headerShown: false }}
        initialParams={{ item: item }}  // Passing item here
      />
      <Stack.Screen
        name="order-page"
        component={Orders}
        options={{ presentation: "modal", headerShown: false }}
       
      />

    </Stack.Navigator>
  );
};

export default FoodNavigator;

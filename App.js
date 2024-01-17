import { NavigationContainer } from '@react-navigation/native';
// import { MMKV } from 'react-native-mmkv'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import SignUp from './app/screens/SignUp';
import * as Location from 'expo-location';
import { firebase } from './config';
import React, { useState, useCallback, useEffect } from 'react';
import LoadingScreen from './app/components/LoadingScreen';
import { UserLocationContext } from "./app/context/UserLocationContext"
import { LoginContext } from './app/context/LoginContext';
import ResturantPage from './app/screens/restaurant/ResturantPage';
import RestaurantPage from './app/navigation/RestaurantPage';
import AddRating from './app/screens/AddRating';
import FoodNavigator from './app/navigation/FoodNavigator';
import { RestaurantContext } from './app/context/RestaurantContext';
import BottomTab from './app/navigation/BottomTab';
import { CartCountContext } from './app/context/CartCountContext';
import { UserReversedGeoCode } from './app/context/UserReversedGeoCode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from './app/screens/LoginPage';
import VerificationPage from './app/screens/VerificationPage';
import OtpScreen from './app/screens/OtpScreen';
import ShippingAddress from './app/screens/ShippingAddress';
import AddAddressess from './app/screens/addresses/AddAddresses';
import DefaultAddress from './app/screens/addresses/DefaultAddress';
import MoreFoods from './app/screens/food/MoreFoods';
import AllRestaurants from './app/screens/food/AllRestaurants';
import FastestFoods from './app/screens/food/FastestFoods';
const Stack = createNativeStackNavigator();

// const storage = new MMKV();

export default function App() {
  const [firstLaunch, setFirstLaunch] = useState(true);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [restaurantObj, setRestaurant] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [login, setLogin] = useState(null);
  const [user, setUser] = useState(null);
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const defaultAddresss = { "city": "Shanghai", "country": "China", "district": "Pudong", "isoCountryCode": "US", "name": "1 Stockton St", "postalCode": "94108", "region": "CA", "street": "Stockton St", "streetNumber": "1", "subregion": "San Francisco County", "timezone": "America/Los_Angeles" }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    (async () => {
      setAddress(defaultAddresss)
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      loginStatus();
    })();


  }, []);

  const loginStatus = async () => {
    const userToken = await AsyncStorage.getItem('token')

    if (userToken !== null) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }


  if (!fontsLoaded) {
    // Return a loading indicator or splash screen while fonts are loading or app is initializing
    return <LoadingScreen />;
  }



  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <UserReversedGeoCode.Provider value={{ address, setAddress }}>
        <RestaurantContext.Provider value={{ restaurantObj, setRestaurant }}>
          <CartCountContext.Provider value={{ cartCount, setCartCount }}>
            <LoginContext.Provider value={{ login, setLogin }}>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name='bottom-navigation'
                    component={BottomTab}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name='restaurant'
                    component={ResturantPage}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name='signUp'
                    component={SignUp}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name='login'
                    component={LoginPage}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name='rest-naviagtion'
                    component={RestaurantPage}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name='verification_page'
                    component={VerificationPage}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name='food-nav'
                    component={FoodNavigator}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name='otp-screen'
                    component={OtpScreen}
                    options={{ headerShown: true, title: 'OTP Verification', }}
                  />

                  <Stack.Screen
                    name='shipping-address'
                    component={ShippingAddress}
                    options={{ headerShown: true, title: '' }}
                  />

                  <Stack.Screen
                    name='default_add'
                    component={DefaultAddress}
                    options={{ headerShown: true, title: 'Set Default Address' }}
                  />

                  <Stack.Screen
                    name='add-address'
                    component={AddAddressess}
                    options={{ headerShown: true, title: 'Add Address', }}
                  />


                  <Stack.Screen
                    name='rating-page'
                    component={AddRating}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name='more_categories'
                    component={MoreFoods}
                    options={{ headerShown: true, title: 'Explore Foods' }}
                  />

                  <Stack.Screen
                    name='nearby_restaurants'
                    component={AllRestaurants}
                    options={{ headerShown: true, title: 'All Restaurants' }}
                  />

                  <Stack.Screen
                    name='fastest'
                    component={FastestFoods}
                    options={{ headerShown: true, title: 'All Restaurants' }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </LoginContext.Provider>
          </CartCountContext.Provider>
        </RestaurantContext.Provider>
      </UserReversedGeoCode.Provider>
    </UserLocationContext.Provider>

  );
}


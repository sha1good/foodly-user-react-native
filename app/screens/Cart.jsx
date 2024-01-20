import {
  StyleSheet,
  FlatList,
  View,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ReusableHeader from "../components/ReusableHeader";
import { BaseUrl, COLORS, SIZES } from "../constants/theme";
import CartItem from "../components/CartItem";
import { SafeAreaView } from "react-native-safe-area-context";
import fetchCart from "../hooks/fetchCart";
import { CartCountContext } from "../context/CartCountContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Cart = () => {
  const [cart, setCart] = useState(null);
  const {cartList, isCartLoading, error, refetch} = fetchCart()
  const { cartCount, setCartCount } = useContext(CartCountContext);



  const renderCartItem = ({ item }) => (
    <CartItem
      deleteItem={()=> deleteCartItem(item._id)}
      item={item}
      onPress={() => navigation.navigate("food-page")}
    />
  );

  const deleteCartItem = async (id) => {
    const token = await AsyncStorage.getItem('token')
    const accessToken = JSON.parse(token)
    try {
        const response = await axios.delete(`${BaseUrl}/api/cart/delete/${id}`, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        console.log(response.data);
        setCartCount(response.data.cartCount)
        
    } catch (error) {
        console.error('There was a problem with the axios request:', error);
    }
};

useEffect(() => {
  refetch();
}, [cartCount])


  return (

    <SafeAreaView>
      <View style={{backgroundColor: COLORS.primary, height: SIZES.height}}>
      <View style={{backgroundColor: COLORS.offwhite, height: SIZES.height-140, borderBottomEndRadius: 30, borderBottomStartRadius: 30}}>

      <ReusableHeader title={"Cart"} backbtn={false}/>
      
      <View style={{ marginLeft: 12, marginBottom: 10 }}>
        <FlatList
          data={cartList}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          style={{ marginTop: 10 }}
          scrollEnabled
          renderItem={renderCartItem}
        />
      </View>
        </View>
      </View>
    </SafeAreaView>

  );
};

export default Cart;



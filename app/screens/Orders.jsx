import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ReusableHeader from "../components/ReusableHeader";
import fetchDefaultAddress from "../hooks/fetchDefaultAdress";
import CookLoader from "../components/CookLoader";
import { COLORS, SIZES } from "../constants/theme";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";

const Orders = () => {
  const route = useRoute();
  const orderItem = route.params;

  const deliveryFee = 1.2;
  const [paymentUrl, setPaymentUrl] = useState(false);
  const [result, setResult] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const { defaultAddress, isAddressLoading, error, refetch } =
    fetchDefaultAddress();

  let orderObject;

  if (isAddressLoading) {
    return <CookLoader />;
  }

  if (defaultAddress !== null) {
    orderObject = {
      userId: defaultAddress.userId,
      orderItems: [orderItem.orderItem],
      orderTotal: orderItem.orderItem.price,
      deliveryFee: deliveryFee,
      grandTotal: orderItem.orderItem.quantity + deliveryFee,
      deliveryAddress: defaultAddress._id,
      paymentMethod: "Stripe",
      restaurantId: orderItem.restaurant,
    };
  }

  const createOrder = async (orderObject) => {
    const token = await AsyncStorage.getItem("token");
    const accessToken = JSON.parse(token);
    try {
      const response = await axios.post(
        "http://localhost:6002/api/orders",
        orderObject,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );


      if (response.status === 201) {
        setOrderId(response.data.data._id)
      }
      if(orderId !== null){
        createCheckOut();
      }
    } catch (error) {
      console.error("There was a problem with the axios request:", error);
    }
  };

  const createCheckOut = async () => {
    try {
      const response = await axios.post(
        "https://foodlypayment-production.up.railway.app/stripe/create-checkout-session",
        {
          userId: defaultAddress.userId,
          cartItems: [
            {
              name: orderItem.title,
              id: orderId,
              price: orderItem.orderItem.price,
              quantity: orderItem.orderItem.quantity,
              restaurantId: orderItem.restaurant,
            },
          ],
        }
      );

      const data = response.data;
      console.log("Session URL:", data.url);
      setPaymentUrl(data.url);

      const result = await WebBrowser.openBrowserAsync(data.url);

    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.error(`HTTP error! Status: ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response was received for the request");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
    }
  };




  return (
    <View style={{ marginTop: 20 }}>
      <ReusableHeader title={"Order Now"} backbtn={false} />

      <View>
        
          <View>
            <View
              style={{
                marginHorizontal: 10,
                marginBottom: 20,
                backgroundColor: COLORS.lightWhite,
                height: 75,
                padding: 5,
                borderRadius: 12,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{
                    uri: orderItem.imageUrl,
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 99,
                  }}
                />
                <View>
                  <Text style={styles.text}>{orderItem.title}</Text>
                  <Text
                    style={[styles.email, { width: SIZES.width * 0.75 }]}
                    numberOfLines={2}
                  >
                    {orderItem.description}
                  </Text>
                </View>
              </View>
            </View>

            <Text
              style={[
                styles.text,
                { left: 3, marginTop: 5, marginBottom: 10, fontSize: 14 },
              ]}
            >
              Address and Instructions
            </Text>

            <View
              style={{
                marginHorizontal: 10,
                backgroundColor: COLORS.lightWhite,
                height: 50,
                padding: 5,
                borderRadius: 12,
              }}
            >
              <Text style={styles.email}>
                {defaultAddress !== null
                  ? `${defaultAddress.addressLine1} ${defaultAddress.district} ${defaultAddress.city}`
                  : ""}
              </Text>

              <Text style={styles.email}>
                {defaultAddress !== null
                  ? `${defaultAddress.deliveryInstructions}`
                  : ""}
              </Text>
            </View>

            <Text
              style={[styles.text, { left: 3, marginTop: 16, fontSize: 14 }]}
            >
              Order Details
            </Text>

            <View
              style={{
                marginTop: 10,
                marginHorizontal: 10,
                backgroundColor: COLORS.lightWhite,
                height: 90,
                padding: 5,
                borderRadius: 12,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Approx Time :</Text>
                <Text style={styles.email}> 30 min</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Delivery Cost :</Text>
                <Text style={styles.email}> $ 1.05</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Total Qauntity :</Text>
                <Text
                  style={styles.email}
                >{`${orderItem.orderItem.quantity}`}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Total Cost :</Text>
                <Text style={styles.email}> $37.00</Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                marginTop: 20,
                marginHorizontal: 10,
                backgroundColor: COLORS.primary,
                borderColor: COLORS.tertiary,
                borderWidth: 0.5,
                height: 40,
                padding: 5,
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => createOrder(orderObject)}
            >
              <Text style={[styles.text, { color: COLORS.lightWhite }]}>
                Proceed to Payment
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontFamily: "medium",
    color: COLORS.gray,
  },
  email: {
    marginLeft: 10,
    fontFamily: "regular",
    color: COLORS.gray,
  },
});

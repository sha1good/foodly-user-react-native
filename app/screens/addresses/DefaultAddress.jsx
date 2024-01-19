import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const bkImg =
  "https://d326fntlu7tb1e.cloudfront.net/uploads/8cd2cb78-c99c-4408-a333-91ec6c1bb9e3-restaurant_bk.png";

const DefaultAddress = ({ route, navigation }) => {
  const item = route.params;

  const handleSubmit = async (id) => {
    const token = await AsyncStorage.getItem("token");
    const accessToken = JSON.parse(token);
    const url =  `https://foodlybackend-react-production.up.railway.app/api/address/default/${id}`
    try {
      const response = await axios.patch(
       url,
       {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        navigation.navigate('bottom-navigation');
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <View style={styles.container}>
      <Image
        source={{ uri: bkImg }}
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: 0.7,
          },
        ]}
      />
      <View style={styles.outter}>
        <View>
          {/* <Text style={styles.heading} numberOfLines={2}>Set this address as default</Text> */}

          <Text style={styles.text} numberOfLines={2}>
            {item.item.addressLine1}
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={()=> {handleSubmit(item.item._id)}}>
          <Text style={styles.buttonText}>D E F A U L T</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DefaultAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outter: {
    marginHorizontal: 12,
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  inner: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  text: {
    marginLeft: 10,
    fontFamily: "regular",
    fontSize: 12,
    color: COLORS.gray,
  },
  buttonText: {
    color: "white",
    fontSize: 16,

    fontFamily: "medium",
  },
  button: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 15,
    height: 40,
    width: "100%",
    alignItems: "center",
  },

  heading: {
    marginLeft: 10,
    fontFamily: "medium",
    fontSize: 13,
    color: COLORS.black,
    marginBottom: 10,
  },
});

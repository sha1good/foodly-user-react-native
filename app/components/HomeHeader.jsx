import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AssetImage from "../components/AssetImage";
import { COLORS, SIZES } from "../constants/theme";
import { UserReversedGeoCode } from "../context/UserReversedGeoCode";
import { UserLocationContext } from "../context/UserLocationContext";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const HomeHeader = () => {
  const [time, setTime] = useState(null);
  const { address, setAddress } = useContext(UserReversedGeoCode);
  const [defaultad, setDefault] = useState(null);
  const { location, setLocation } = useContext(UserLocationContext);
  const [logged, setLogged] = useState(false);


  useEffect(() => {
    if (location !== null) {
      reverseGeocode(location.coords.longitude, location.coords.latitude);
    }
    const greeting = getTimeOfDay();
    setTime(greeting);
    loginStatus();
  }, [location]);

  const loginStatus = async () => {
    const userToken = await AsyncStorage.getItem('token')

    if (userToken !== null) {
      setLogged(true)
      getDefault();
    } else {
      setLogged(false)
    }
  }

  const getDefault = async () => {
    const token = await AsyncStorage.getItem("token");
    const accessToken = JSON.parse(token);

    try {
      const response = await axios.get(
        `http://localhost:6002/api/address/default`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setDefault(response.data);
      } else {
        console.log(response.body);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
 

  const getTimeOfDay = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 0 && hour < 12) {
      return "☀️ ";
    } else if (hour >= 12 && hour < 17) {
      return "🌤️ ";
    } else {
      return "🌙 ";
    }
  };

  const reverseGeocode = async (longitude, latitude) => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: longitude,
      latitude: latitude,
    });
    setAddress(reverseGeocodedAddress[0]);
  };

  return (
    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
      <View style={styles.outerStyle}>
        <AssetImage
          data={require("../../assets/images/profile.jpg")}
          mode={"cover"}
          width={55}
          height={55}
          radius={99}
        />

        <View style={styles.headerText}>
          <Text style={styles.heading}>Delivering to</Text>
          {defaultad === null ? (<Text
            style={styles.location}
          >{`${address.city} ${address.name}`}</Text>) : (<Text numberOfLines={2}
            style={styles.location}
          >{defaultad.addressLine1}</Text>)}
        </View>
      </View>

      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  outerStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: "row",
  },

  headerText: {
    marginLeft: 15,
    width: "70%",
    justifyContent: "center",
  },

  heading: {
    fontFamily: "medium",
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },

  time: {
    fontFamily: "medium",
    fontSize: SIZES.xxLarge - 5,
    color: COLORS.secondary,
    marginRight: 5
  },

  location: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AssetImage from "../components/AssetImage";
import { COLORS, SIZES } from "../constants/theme";
import { UserReversedGeoCode } from "../context/UserReversedGeoCode";
import { UserLocationContext } from "../context/UserLocationContext";
import * as Location from "expo-location";

const HomeHeader = () => {
  const [time, setTime] = useState(null);
  const { address, setAddress } = useContext(UserReversedGeoCode);
  const { location, setLocation } = useContext(UserLocationContext);

  useEffect(() => {
    if (location !== null) {
      reverseGeocode(location.coords.longitude, location.coords.latitude);
    }
    const greeting = getTimeOfDay();
    setTime(greeting);
  }, [location]);

 

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
          <Text
            style={styles.location}
          >{`${address.city} ${address.name}`}</Text>
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
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
  },
});

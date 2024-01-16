import {
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Switch,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";
import PagerView from "react-native-pager-view";
import { COLORS } from "../../constants/theme";
import { Button } from "../../components";

const bkImg =
  "https://d326fntlu7tb1e.cloudfront.net/uploads/8cd2cb78-c99c-4408-a333-91ec6c1bb9e3-restaurant_bk.png";

const AddAddresses = () => {
  const [initialPage, setInitialPage] = useState(0);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const pagerRef = useRef(null);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [address, setAddress] = useState(null);
  const [postalCode, setCode] = useState();

  const reverseGeocode = async (longitude, latitude) => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: longitude,
      latitude: latitude,
    });
    setAddress(
      reverseGeocodedAddress[0].name +
        " " +
        reverseGeocodedAddress[0].city +
        " " +
        reverseGeocodedAddress[0].country
    );
    setCode(reverseGeocodedAddress[0].postalCode);
  };

  const goToNext = () => {
    pagerRef.current?.setPage(initialPage + 1);
  };

  const goToPrevious = () => {
    pagerRef.current?.setPage(0);
  };

  const handleSubmit = () => {
    // Handle the submit action
    console.log({
      postalCode,
      address,
      deliveryInstructions,
      isDefaultAddress,
    });
  };

  // const [query, setQuery] = useState('');
  // const [places, setPlaces] = useState([]);

  // const searchPlaces = async () => {
  //   if (query.length === 0) {
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=AIzaSyAYgK10l_C_HG-pSeVBVUxChyGSm6wa78Q`
  //     );
  //     const json = await response.json();
  //     setPlaces(json.predictions);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <PagerView style={styles.pagerView} initialPage={0} ref={pagerRef}>
      <View key="1" style={styles.page}>
        <View style={{ marginTop: 0, flex: 1 }}>
          <GooglePlacesAutocomplete
            placeholder={address === null ? "Search" : address}
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
              setRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}
            query={{
              key: "AIzaSyA09oOMVS63J-gyKlk0TyHQDNWuzmbig0Q",
              language: "en",
              location: `${region.latitude}, ${region.longitude}`,
            }}
            styles={{
              container: {
                flex: 0,
                position: "absolute",
                width: "95%",
                zIndex: 1,
                top: 20,
                left: 10,
                right: 10,
              },
              listView: { backgroundColor: "white" },
            }}
          />

          <TouchableOpacity style={styles.button} onPress={goToNext}>
            <Text style={styles.buttonText}>Edit and Submit</Text>
          </TouchableOpacity>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            provider="google"
          >
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
            />
            <Marker
              coordinate={pin}
              pinColor="gray"
              draggable={true}
              onDragStart={(e) => {
                reverseGeocode(
                  e.nativeEvent.coordinate.longitude,
                  e.nativeEvent.coordinate.latitude
                );
              }}
              onDragEnd={(e) => {
                setPin({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                });
              }}
            >
              <Callout>
                <Text>You're here</Text>
              </Callout>
            </Marker>
            <Circle center={pin} radius={10000} />
          </MapView>
        </View>
      </View>
      <View key="2" style={{ flex: 1 }}>
        <Image
          source={{ uri: bkImg }}
          style={[
            StyleSheet.absoluteFillObject,
            {
              opacity: 0.7,
            },
          ]}
        />

        <TextInput
          style={styles.input}
          onChangeText={setCode}
          value={postalCode}
          placeholder="Postal Code"
        />

        <TextInput
          style={styles.input}
          onChangeText={setAddress}
          value={address}
          placeholder="Address"
        />

        <TextInput
          style={styles.input}
          onChangeText={setDeliveryInstructions}
          value={deliveryInstructions}
          placeholder="Delivery Instructions"
        />

        <View style={styles.switchContainer}>
          <Text>Set this address as default</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDefaultAddress ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={setIsDefaultAddress}
            value={isDefaultAddress}
          />
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            title={"S U B M I T"}
            onPress={() => {}}
            isValid={true}
            radius={16}
          />
        </View>

        <TouchableOpacity style={styles.button1} onPress={goToPrevious}>
          <Text style={styles.buttonText}>Pick Address</Text>
        </TouchableOpacity>
      </View>
    </PagerView>
  );
};

export default AddAddresses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 30,
    flex: 0,
    position: "absolute",
    zIndex: 1,
    bottom: 30,
    right: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "medium",
  },
  button1: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 30,
    flex: 0,
    position: "absolute",
    zIndex: 1,
    bottom: 30,
    left: 12,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 0.6,
    borderBottomColor: COLORS.gray,
    padding: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
  },
});

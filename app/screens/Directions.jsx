import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from '@react-native-maps/mapview';
import Geolocation from '@react-native-community/geolocation';
import { GoogleApiKey } from '../constants/theme';

const AppMap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState([]);

  const coords = {
    latitude: 37.785925590588505,
    longitude: -122.41007428687641,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0221,
    address: "333 O'Farrell St, San Francisco, CA 94102, United States"
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        fetchDirections(latitude, longitude, coords.latitude, coords.longitude);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const fetchDirections = async (startLat, startLng, destinationLat, destinationLng) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${destinationLat},${destinationLng}&key=${GoogleApiKey}`);
      const data = await response.json();
      const points = data.routes[0].legs[0].steps.map(step => step.polyline.points);
      const result = [].concat(...points).map(point => decode(point));
      setDirections(result);
    } catch (error) {
      console.error(error);
    }
  };

  const decode = (t, e) => {
    // Decode function for the polyline string
    // Add your decoding function here
    // ... 
  };

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: coords.latitudeDelta,
        longitudeDelta: coords.longitudeDelta
      }}
    >
      <Marker
        coordinate={coords}
        title="Hilton San Francisco"
        description={coords.address}
      />
      {currentLocation && <Marker coordinate={currentLocation} title="Your location" />}
      <Polyline coordinates={directions} strokeWidth={5} strokeColor="blue" />
    </MapView>
  );
};

export default AppMap;

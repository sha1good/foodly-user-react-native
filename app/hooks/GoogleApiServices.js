import axios from "axios"
import { GoogleApiKey } from "../constants/theme";


const calculateDistanceAndTime = async (startLat, startLng, destinationLat, destinationLng, mode = 'bicycling') => {
   
    const baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?";
    const ratePerKm = 1; 

    const requestUrl = `${baseUrl}origins=${startLat},${startLng}&destinations=${destinationLat},${destinationLng}&mode=${mode}&key=${GoogleApiKey}`;

    try {
        const response = await fetch(requestUrl);
        const data = await response.json();


        // Ensure the request was successful and there are results
        if (data.status === "OK" && data.rows[0].elements[0].status === "OK") {
            const distance = data.rows[0].elements[0].distance.text;
            const duration = data.rows[0].elements[0].duration.text;

            const distanceInKm = parseFloat(distance.replace(' km', ''));
            const price = distanceInKm * ratePerKm;
            const finalPrice = `$${price.toFixed(2)}`

            return {
                distance,
                duration,
                finalPrice
            };
        } else {
            console.error("Error calculating distance and duration:", data.status);
            return null;
        }
    } catch (error) {
        console.error("Failed to calculate distance and duration:", error);
        return null;
    }
}



const calculateTime = (distance, averageSpeed) => {
    return distance / averageSpeed;
}

const calculatePrice = (distance, ratePerKm) => {
    return distance * ratePerKm;
}

const toRadians = (degree) => {
    return degree * (Math.PI / 180);
}



export default {
    calculateDistanceAndTime,
}

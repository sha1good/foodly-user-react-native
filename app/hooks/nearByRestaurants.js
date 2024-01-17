import { useState, useEffect } from "react";
import axios from "axios";

const fetchNearByRestaurants = (code) => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchData = async ()=> {
        setIsLoading(true)

        try {
            const response = await axios.get(`http://localhost:6002/api/restaurant/${code}`);

            setRestaurants(response.data)
            console.log(restaurants);
            setIsLoading(false)
        } catch (error) {
           setError(error) 
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch =() => {
        setIsLoading(true)
        fetchData();
    }


    return {restaurants, isLoading, error, refetch}
}

export default fetchNearByRestaurants
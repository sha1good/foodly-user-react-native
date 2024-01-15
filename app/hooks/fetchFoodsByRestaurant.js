import axios from "axios";
import { useState, useEffect } from "react";

const fetchFoodsByRest = (restaurantId, code) => {
    const [restaurantFoodList, setRestaurantFood] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const response = await axios.get(`http://localhost:6002/api/foods/restaurant/${restaurantId}`);

            setRestaurantFood(response.data)

            if (response.data.length === 0) {
                try {
                    const response = await axios.get(`http://localhost:6002/api/foods/recommendation/${code}`);

                    setRestaurantFood(response.data)
                    s
                    console.log(response.data);
                    setIsLoading(false)
                } catch (error) {
                    
                }
            }

            setIsLoading(false)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setIsLoading(true)
        fetchData();
    }


    return { restaurantFoodList, isLoading, error, refetch }
}

export default fetchFoodsByRest
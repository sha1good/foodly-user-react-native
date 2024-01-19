import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchCartCount = () => {
    const [count, setCount] = useState(null);
    const [isCartLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)


    const fetchData = async ()=> {
        const token = await AsyncStorage.getItem('token')
        const accessToken = JSON.parse(token)
    
        setIsLoading(true)

        try {
            const response = await axios.get(`https://foodlybackend-react-production.up.railway.app/api/cart/count`, 
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
              );

            setCount(response.data.cartCount)
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


    return {count, isCartLoading, error, refetch}
}

export default fetchCartCount
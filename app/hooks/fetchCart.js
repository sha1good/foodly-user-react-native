import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchCart = () => {
    const [cartList, setCart] = useState(null);
    const [isCartLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)


    const fetchData = async ()=> {
        const token = await AsyncStorage.getItem('token')
        const accessToken = JSON.parse(token)
        setIsLoading(true)

        try {
            const response = await axios.get(`https://foodlybackend-react-production.up.railway.app/api/cart/653168e9f94c6496dc84f3bf`,
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            setCart(response.data.cart)
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


    return {cartList, isCartLoading, error, refetch}
}

export default fetchCart
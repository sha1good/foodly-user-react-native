import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchDefaultAddress = () => {
    const [defaultAddress, setAddress] = useState(null);
    const [isAddressLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)


    const fetchData = async ()=> {
        const token = await AsyncStorage.getItem('token')
        const accessToken = JSON.parse(token)
        setIsLoading(true)

        try {
            const response = await axios.get(`http://localhost:6002/api/address/default`,
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            setAddress(response.data)
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


    return {defaultAddress, isAddressLoading, error, refetch}
}

export default fetchDefaultAddress
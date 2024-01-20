import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "../constants/theme";

const fetchProfile = () => {
    const [user, setProfile] = useState(null);
    const [isProfileLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)


    const fetchData = async ()=> {
        const token = await AsyncStorage.getItem('token')
        const accessToken = JSON.parse(token)
        setIsLoading(true)

        try {
            const response = await axios.get(`${BaseUrl}/api/users`,
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            setProfile(response.data)

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


    return {user, isProfileLoading, error, refetch}
}

export default fetchProfile
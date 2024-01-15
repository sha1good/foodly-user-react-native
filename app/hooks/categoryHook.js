import { useState, useEffect } from "react";
import axios from "axios";

const fetchCategories = () => {
    const [categories, setCategories] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)


    const fetchData = async ()=> {
        setIsLoading(true)

        try {
            const response = await axios.get(`http://localhost:6002/api/category/random`);

            setCategories(response.data)
s
            
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


    return {categories, isLoading, error, refetch}
}

export default fetchCategories
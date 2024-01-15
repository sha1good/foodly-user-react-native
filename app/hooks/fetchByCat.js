import { useState, useEffect } from "react";

const fetchCategortItems = (category, code) => {
    const [categoryItems, setCategoryItems] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const fetchData = async ()=> {
        setIsLoading(true)

        try {
            const response = await axios.get(`http://localhost:6002/api/restaurant/byId/${id}`);

            setCategoryItems(response.data)

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


    return {categoryItems, isLoading, error, refetch}
}

export default fetchCategortItems
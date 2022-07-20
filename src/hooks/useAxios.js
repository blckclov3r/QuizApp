import { useEffect, useState } from "react";
import axios from 'axios'

axios.defaults.baseURL = "https://opentdb.com/";


export const useAxios = ({url}) =>{
    const [response, setResponse] = useState(null);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(true);

    useEffect( ()=>{
        const fetchData = async ()=>{
           const res = await axios.get(url)
            .catch(err=> setError(err))
            .finally(()=>setLoading(false))
            console.log(res?.data)
            setResponse(res?.data)
        }
        fetchData();
    },[url])

    return {response,error,loading}
}
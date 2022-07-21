import { useEffect, useState } from "react";
import axios from 'axios'

axios.defaults.baseURL = "https://opentdb.com/";


export const useAxios = ({url}) =>{
    const [response, setResponse] = useState(null);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    useEffect( ()=>{
        setLoading(true)
        const fetchData = async ()=>{
        
           const res = await axios.get(url)
            .catch(err=> {
                console.log('fetchData',err)
                setError(err);
                setLoading(false)
            });

            if(res?.status === 200){
                setLoading(false)
                setResponse(res?.data)
            }
   
        }
        fetchData();
    },[url])

    return {response,error,loading}
}
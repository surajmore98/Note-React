import { useNote } from "../context/NoteContext";
import axios from "axios";

export const enableInterceptor = () => {
    const { setLoading }  = useNote();
    axios.interceptors.request.use((config) => {
        setLoading(true);
        return config;
    }, (error) => {
        setLoading(false);  
        return Promise.reject(error)
    })
    
    axios.interceptors.response.use((response) => {
        setLoading(false);    
        return response;
    }, function(error) {
        setLoading(false);
        return Promise.reject(error)
    })
}
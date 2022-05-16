import axios from "axios";
import { ResponseStatusCode } from "../utility/ResponseStatusCode";
import { toast } from 'react-toastify';

export const login = async({email, password}) => {
    try {
        const response = await axios.post("api/auth/login", {
            email: email,
            password: password
        });
        if(response.status === ResponseStatusCode.OK){
            return response.data;
        }
    } catch(e) {
        toast.error(e.response.data['errors'] || "something went wrong!!");
        console.error(e);
    }
}

export const signup = async({email, password, firstName, lastName}) => {
    try {
        const response = await axios.post("api/auth/signup", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });
        if(response.status === ResponseStatusCode.CREATED){
            return response.data;
        }
    } catch(e) {
        console.error(e);
    }
}
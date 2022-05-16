import { Navbar } from "../component/Navbar";
import React, {useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigator } from "../utility/UseNavigator";

export const Logout = () => {
    const { setAuth, setUser, auth } = useAuth();
    const { navigateToLogin } = useNavigator();

    useEffect(() => {
        if(auth && auth.isAuth) {
            setAuth({ isAuth: false, token: ""});
            setUser({ name: "", email: ""});
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }, []);
    
    return(
        <>
            <Navbar/>
            <div className="note-container bg-charcoal-white flex align-items-center justify-content-center">
                <div className="flex flex-col align-items-center">
                    <div className="header">
                        <p>You are Logged Out, Please Sign in Again.</p>
                    </div>
                    <button className="btn bg-primary btn-md white p-sm" onClick={navigateToLogin}>Sign In</button> 
                </div>
            </div>
        </>
    )
}
import React, {useState, useEffect} from "react";

const AuthContext = React.createContext();

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({isAuth: false, token: ""});
    const [user, setUser] = useState({name: "", email: ""});

    const localStorageToken = localStorage.getItem("token");
    const localStorageUser = localStorage.getItem("user");

    useEffect(() => {
        if(!auth.isAuth) {
            if(localStorageToken) {
                setAuth({isAuth: true, token: localStorageToken});
            }

            if(localStorageUser) {
                setUser({...user, name: localStorageUser});
            }
        }
    }, []);
    
    const data = { auth, setAuth, user, setUser }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
import { useAuth } from "./context/AuthContext";
import { Login } from "./page/Login";

export const RequireAuth = ({ children }) => {
    const { auth } = useAuth();
    if(auth && auth.isAuth) {
        return children;
    }
    return <Login/>;
}
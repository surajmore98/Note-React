import { useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext";

export const useNavigator = () => {
    const navigate = useNavigate();
    const navigateToHome = () => navigate("/");
    const navigateToRegister = () => navigate("/register");
    const navigateToLogin = () => navigate("/login");
    const navigateToLogout = () => navigate("/logout");

  return { navigateToHome, navigateToLogin, navigateToRegister,
     navigateToLogout };
}
import { useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext";

export const useNavigator = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const navigateToHome = () => navigate( auth && auth.isAuth ? "/notes" : "/");
    const navigateToNotes = () => navigate("/notes");
    const navigateToLabels = () => navigate("/labels");
    const navigateToArchive = () => navigate("/archive");
    const navigateToTrash = () => navigate("/trash");
    const navigateToRegister = () => navigate("/register");
    const navigateToLogin = () => navigate("/login");
    const navigateToLogout = () => navigate("/logout");

  return { navigateToHome, navigateToArchive, navigateToLabels,
     navigateToTrash, navigateToLogin, navigateToRegister,
     navigateToLogout, navigateToNotes };
}
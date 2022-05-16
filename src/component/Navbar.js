import { MdLogout } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { useNavigator } from "../utility/UseNavigator";

export const Navbar = () => {
    const { user, auth } = useAuth();
    const { navigateToLogout, navigateToHome } = useNavigator();

    return (
        <div className="nav-bar fixed bg-white">
            <div className="logo pl-md" onClick={navigateToHome}>
                <div className="logo-text">
                    <span className="primary">My </span>
                    <span className="charcoal-black">Notes</span>
                </div>
            </div>
            {
                auth && auth.isAuth &&
                <div className="nav-action">
                    <span className="charcoal-black pr-md">{ user.name }</span>
                    <button className="btn btn-round bg-primary white" onClick={navigateToLogout}><MdLogout size={20}/></button>
                </div>
            }
        </div>
    );
}
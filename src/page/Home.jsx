import { useNavigate } from "react-router";
import "../style/banner.css";
import "../style/flex.css";

export const Home = () => {
    const navigate = useNavigate();
    const navigateToLogin = () => navigate("/login");
    const navigateToRegister = () => navigate("/register");

    return (
        <div className="banner">
          <div className="banner-content">
              <h1 className="banner-content-header">
                <span className="primary">My </span>
                <span>Notes</span>
              </h1>
              <div className="banner-content-info">
                <div className="header">Meet your modern</div>
                <div className="primary header">Note Taking App</div>
                <p className="detail">
                  Manage your daily tasks and workflow in
                  a modern way and boost your efficiency without
                  any efforts.
                </p>
              </div>
              <div className="banner-action">
                <button className="btn bg-primary white" onClick={navigateToRegister}>Join Now</button>
                <p className="secondary pointer link" onClick={navigateToLogin}><a>Alreay have an account?</a></p>
              </div>
          </div>
          <div className="flex justify-content-center align-items-center banner-media ">
            <img src="./image.png" alt="banner image" className="image"/>
          </div>
        </div>
    )
}
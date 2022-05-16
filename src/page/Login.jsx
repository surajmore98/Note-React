import { useRef } from "react";
import { Navbar } from "../component/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNote } from "../context/NoteContext";
import { login } from "../services/AuthService";
import "../style/auth.css";
import { useNavigator } from "../utility/UseNavigator";

export const Login = () => {
    const emailInputRef = useRef("");
    const pswInputRef = useRef("");
    const remeberMeRef = useRef(false);
    const { setAuth, setUser } = useAuth();
    const { setNotes, setArchives, setTrash } = useNote();
    const { navigateToRegister, navigateToHome } = useNavigator();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const emailVal = emailInputRef.current.value;
        const passwordVal = pswInputRef.current.value;
        const rememberMeVal = remeberMeRef.current.checked;

        if(!emailVal || !passwordVal) {
            return;
        }

        const response = await login({email: emailVal, password: passwordVal});
        if(response) {
            setAuth({ isAuth: true , token: response.encodedToken });
            if(response.foundUser) {
                setUser({ name: `${response.foundUser.firstName} ${response.foundUser.lastName}`, email: response.foundUser.email});
                setNotes(response.foundUser.notes);
                setArchives(response.foundUser.archives);
                setTrash(response.foundUser.trash);
            }
            
            if(rememberMeVal) {
                localStorage.setItem("token", response.encodedToken);
                localStorage.setItem("user", `${response.foundUser.firstName} ${response.foundUser.lastName}`);
            }

            navigateToHome();
        }
    }
    
    return (
        <div>
            <Navbar/>
            <div className="note-container justify-content-center align-items-center bg-charcoal-white">
                <div className="register bg-white">
                    <div className="header">
                        Login
                    </div>
                    <form className="register-content" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label className="input-label">Email address</label>
                            <div className="form-control">
                                <input type="email" className="input" placeholder="example@example.com" ref={emailInputRef} required/>
                            </div>
                        </div>
                        <div className="form-field">
                            <label className="input-label">Password</label>
                            <div className="form-control">
                                <input type="password" className="input" placeholder="******" ref={pswInputRef} required/>
                            </div>
                        </div>
                        <div className="form-field-section">
                            <div className="form-field form-field-horizontal">
                                <label className="form-control-horizontal">
                                    <input type="checkbox" ref={remeberMeRef}/>
                                    <span className="input-label register-checkbox-label">Remember me</span>
                                </label>
                                <a className="font-lg secondary">Forgot Password</a>
                            </div>
                        </div>
                        <button className="btn btn-full product-btn bg-primary charcoal-black p-md font-bold" type="submit">Login</button> 
                        <button className="btn btn-full product-btn bg-secondary charcoal-black p-md font-bold" onClick={navigateToRegister}>Create New Account </button> 
                    </form>
                </div>
            </div>
        </div>
    )
}
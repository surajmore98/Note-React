import "../style/auth.css";
import { useRef } from "react";
import { Navbar } from "../component/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNote } from "../context/NoteContext";
import { signup } from "../services/AuthService";
import { useNavigator } from "../utility/UseNavigator";

export const Register = () => {
    const emailInputRef = useRef("");
    const pswInputRef = useRef("");
    const firstNameInputRef = useRef("");
    const lastNameInputRef = useRef("");
    
    const { setAuth, setUser } = useAuth();
    const { setNotes, setArchives, setTrash } = useNote();
    const { navigateToLogin, navigateToHome } = useNavigator(); 

    const handleSubmit = async(e) => {
        e.preventDefault();
        const emailVal = emailInputRef.current.value;
        const passwordVal = pswInputRef.current.value;
        const firstNameVal = firstNameInputRef.current.value;
        const lastNameVal = lastNameInputRef.current.value;

        if(!emailVal || !passwordVal || !firstNameVal || !lastNameVal) {
            return;
        }

        const response = await signup({email: emailVal, password: passwordVal, firstName: firstNameVal, lastName: lastNameVal});
        if(response) {
            setAuth({ isAuth: true , token: response.encodedToken });
            if(response.createdUser) {
                setUser({ name: `${response.createdUser.firstName} ${response.createdUser.lastName}`, email: response.createdUser.email});
                setNotes(response.createdUser.notes);
                setArchives(response.createdUser.archives);
                setTrash(response.createdUser.trash);
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
                        Register
                    </div>
                    <form className="register-content" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label className="input-label">First Name</label>
                            <div className="form-control">
                                <input type="text" className="input" placeholder="enter your first name" ref={firstNameInputRef} required/>
                            </div>
                        </div>
                        <div className="form-field">
                            <label className="input-label">Last Name</label>
                            <div className="form-control">
                                <input type="text" className="input" placeholder="enter your last name" ref={lastNameInputRef} required/>
                            </div>
                        </div>
                        <div className="form-field">
                            <label className="input-label">Email address</label>
                            <div className="form-control">
                                <input type="text" className="input" placeholder="example@example.com" ref={emailInputRef} required/>
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
                                <label className="form-control-horizontal font-md">
                                    <input type="checkbox" name="Label" value="Label" required/>
                                    <span className="input-label register-checkbox-label">I accept all Term & Conditions</span>
                                </label>
                            </div>
                        </div>
                        <button className="btn btn-full product-btn bg-primary charcoal-black p-md font-bold" type="submit">Create New Account</button> 
                        <button className="btn btn-full product-btn bg-secondary charcoal-black p-md font-bold" onClick={navigateToLogin}>Already have an Account</button> 
                    </form>
                </div>
            </div>
        </div>
    )
}
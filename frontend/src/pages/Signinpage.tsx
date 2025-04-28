// module
import { useState } from "react";
import { controllSignin } from '../services/auth';
import {isValidEmail ,isValidPassword} from '../utils/validators'
//icon
import {  FaEye,FaEyeSlash,FaUser,FaLock} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
//css
import '../pages-css/Singinpage-Loginpage.css'
import '../pages-css/Signinpage.css'

function Signinpage() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [showPass, setShowPass] = useState(true);
    const [showPassc, setShowPassc] = useState(true);
    const [error, setError] = useState<{ username?: string; email?: string; password?: string; confirmpassword?: string; }>({});

    const EyeIcon = showPass ? FaEye : FaEyeSlash;
    const EyeIconc = showPassc ? FaEye : FaEyeSlash;


    

    const errorCheck =():boolean =>{
        const newError: typeof error = {};

        if (!username) newError.username = "Fill your username";
        if (!email) newError.email = "Fill your email";
        else if (!isValidEmail(email)) newError.email = "Invalid email format";

        if (!password) newError.password = "Fill your password";
        else if (!isValidPassword(password)) newError.password = "Password must be at least 6 characters long";
        if (!confirmpassword) newError.confirmpassword = "Fill your confirm password";
        else if (password !== confirmpassword) newError.confirmpassword = "Passwords do not match";

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return false;
        }

        setError({});
        return true
    }


    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!errorCheck()) return
        try{
            const res = await controllSignin(username,email,password);

             // เก็บข้อมูลใน localStorage ถ้าอยาก auto login
            localStorage.setItem('userId', res.userId);
            localStorage.setItem('username', res.username);
            
            alert(`Status: ${res.message}`); 
        }catch(err){
            alert("signin Failed" );
        }
    }

    return (
        <div className='signin-login'>
            <form noValidate className='signin-login-container' id="signin" onSubmit={handleSignin}>
                <h2>SIGN IN</h2>
                <div className="user">
                    <FaUser className="icon"/>
                    <input
                        className="input-box"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                {error && <div className="error-message">{error.username}</div>}
                <div className="email">
                    <IoMdMail className="icon"/>
                    <input
                        className="input-box"
                        spellCheck="false"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                </div>
                {error && <div className="error-message">{error.email}</div>}
                <div className="password">
                    <FaLock className="icon"/>
                    <input
                        className="input-box"
                        placeholder="Password"
                        type={showPass?"text":"password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <EyeIcon className="eyes" onClick={() => setShowPass(!showPass)} />
                </div>
                {error && <div className="error-message">{error.password}</div>}
                <div className="password">
                    <FaLock className="icon"/>
                    <input
                        className="input-box"
                        placeholder="Confirm-Password"
                        type={showPassc?"text":"password"}
                        value={confirmpassword}
                        onChange={e => setConfirmpassword(e.target.value)}
                    />
                    <EyeIconc className="eyes" onClick={() => setShowPassc(!showPassc)} />
                </div>
                {error && <div className="error-message">{error.confirmpassword}</div>}
                <button className = "submit" type="submit">Sign In</button>

            </form>
        </div>
    )
}
export default Signinpage
import { useState } from "react";
import axios from "axios";
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

    const validateEmail = (email: string) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const Register = () =>{
        axios.post("http://localhost:3000/api/signin",
            {
                username,
                email,
                password,
            }
        )
        .then((res) => {
            console.log(res.data);
            alert("Sign in successful!");
          })
          .catch((err) => {
            console.error(err);
            alert("Sign in failed!");
          });

    }
    

    const errorCheck =():boolean =>{
        const newError: typeof error = {};

        if (!username) newError.username = "Fill your username";
        if (!email) newError.email = "Fill your email";
        else if (!validateEmail(email)) newError.email = "Invalid email format";

        if (!password) newError.password = "Fill your password";
        if (!confirmpassword) newError.confirmpassword = "Fill your confirm password";
        else if (password !== confirmpassword) newError.confirmpassword = "Passwords do not match";

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return false;
        }

        setError({});
        return true
    }


    const handleSignin = (e: React.FormEvent) => {
        e.preventDefault();
        if (errorCheck()){
            Register();
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
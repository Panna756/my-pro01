// module
import React, { useState } from 'react';
import axios from "axios";

// css
import '../pages-css/Singinpage-Loginpage.css'
import '../pages-css/Loginpage.css'

// icon
import {  FaEye,FaEyeSlash,FaLock} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

function Loginpage(){
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const [error, setError] = useState<{ email?: string; password?: string; }>({});
    const [showPass,setShowPass] = useState(true)
    const [success ,setSuccess] = useState(false);

    const EyeIcon = showPass ? FaEye : FaEyeSlash;

    const Login =  async () =>{

        try {
            const res = await axios.post('http://localhost:3000/api/login', {
              email,
              password,
            });
            alert(res.data.message); // success
          } 
          catch(err) {
            if (axios.isAxiosError(err)) {
              alert(err.response?.data?.error || "Login failed");
            } else {
              alert("Unexpected error");
            }
          }

    } 

    const errorCheck =() =>{
        const newError: typeof error = {};

        if (!email) newError.email = "Fill your email";
        if (!password) newError.password = "Fill your password";

        if (Object.keys(newError).length > 0) {
            setError(newError);
            setSuccess(false);
            return;
        }

        setError({});
        setSuccess(true);
    }

    const handleLogin = (e:React.FormEvent) => {
        e.preventDefault();
        errorCheck();

    }

    return(
       <div className='signin-login'>
                   <form noValidate className='signin-login-container' id='login' onSubmit={handleLogin}>
                       <h2>LOGIN</h2>
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

                       <button className = "submit" type="submit">LogIn</button>
                   </form>
               </div>
    )
}
export default Loginpage
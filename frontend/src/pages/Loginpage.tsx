// module
import React, { useState } from 'react';
import { controllLogin } from '../services/auth';

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

    const EyeIcon = showPass ? FaEye : FaEyeSlash;


    const errorCheck =():boolean =>{
        const newError: typeof error = {};

        if (!email) newError.email = "Fill your email";
        if (!password) newError.password = "Fill your password";

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return false;
        }

        setError({});
        return true
    }

    const handleLogin = async (e:React.FormEvent) => {
        e.preventDefault();
        if (!errorCheck()) return;  // ❗ ต้องเช็คก่อน ถ้า error ไม่ยิงต่อ
        try {
            const res = await controllLogin(email, password);
        
            console.log(res); // สมมุติได้ { message: "Login successful", username: "john", userId: 1 }
        
            // เก็บข้อมูลที่ได้ลง localStorage หรือ state
            localStorage.setItem('userId', res.userId);
            localStorage.setItem('username', res.username);
        
          } catch (err) {
            console.error(err);
            alert("Login failed");
        }
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
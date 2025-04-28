import axios from "axios";


async function controllLogin(email:string, password:string){
    const res = await axios.post("http://localhost:3000/api/login" , {email,password});
    return res.data
}


async function controllSignin(username:string ,email:string, password:string){
    const res = await axios.post("http://localhost:3000/api/signin" , {username ,email ,password});
    return res.data
}



export {
    controllLogin,
    controllSignin,
};
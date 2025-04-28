function isValidEmail(email:string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


function isValidPassword(password:string) {
    return password.length >= 6;
}
  
export { 
    isValidEmail, 
    isValidPassword 
};
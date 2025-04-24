import { Link } from 'react-router-dom'
import '../components-css/Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="menu" >
                <li><Link to="/">Home</Link></li>
                <li className="menu-button menu-login"><Link to="/Login">Login</Link></li>
                <li className="menu-button menu-signin"><Link to="/Signin">Sign in</Link></li>
            </ul>
            <div className="profile"></div>
        </nav>
    )
}

export default Navbar
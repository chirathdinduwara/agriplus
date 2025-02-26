import {Link, useNavigate} from 'react-router-dom'
import '../../css/HomePage/navbar.css'
import logo from "../../assets/Graphics/logo.png"



function handleLogIn() {
    navigate('/login');
}

function NavBar() {
    return (
        <>
            <nav className="home-nav">
                <img src={logo} alt="logo" className="logo" />
                <ul>
                    <li><Link to='/' className='nav-link'>Home</Link></li>
                    <li><Link to='/store' className='nav-link'>Shop</Link></li>
                    <li><Link to='/about' className='nav-link'>About</Link></li>
                    <li><Link to='/contact' className='nav-link'>Contacts</Link></li>
                   
                </ul>
                <div className="nav-actions">
                <button className="log-in" onClick={handleLogIn}>Log In</button>
                <button className="log-in">Sign Up</button>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
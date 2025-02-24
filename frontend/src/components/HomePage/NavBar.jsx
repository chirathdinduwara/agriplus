import {Link} from 'react-router-dom'
import '../../css/HomePage/navbar.css'



function NavBar() {
    return (
        <>
            <nav className="home-nav">
                <h1 className="logo">AgriPlus.</h1>
                <ul>
                    <li><Link to='/' className='nav-link'>Home</Link></li>
                    <li><Link to='/store' className='nav-link'>Shop</Link></li>
                    <li><Link to='/about' className='nav-link'>About</Link></li>
                    <li><Link to='/contact' className='nav-link'>Contacts</Link></li>
                   
                </ul>
                <div className="nav-actions">
                <button className="log-in">Log In</button>
                <button className="log-in">Sign Up</button>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
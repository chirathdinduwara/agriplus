import { Link } from "react-router-dom";
import '../../css/HomePage/userProfile.css';
import { GoChevronRight } from "react-icons/go";

function UserNav() {
    return (
        <>
            <nav className="user-nav">
                <ul className="user-nav-list">
                    <li className="nav-list-item">
                        <Link className="list_none" to='/'>Profile</Link>
                        <GoChevronRight />
                    </li>
                    <li className="nav-list-item">
                        <Link className="list_none" to='/SmartAssist'>Smart Farming</Link>
                    </li>
                    <li className="nav-list-item">
                        <Link className="list_none" to='/Track Orders'>Track Orders</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default UserNav;
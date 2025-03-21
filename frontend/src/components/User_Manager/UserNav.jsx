import { Link } from "react-router-dom";
import '../../css/HomePage/userProfile.css';
import { GoChevronRight, GoPerson, GoCodeOfConduct, GoPackage, GoPersonFill, GoReply   } from "react-icons/go";

function UserNav() {
    return (
        <>
            <nav className="user-nav">
            <div className="user-details">
                    <GoPersonFill size={50} className="u-p" color="#3EA65A"/>
                    <div className="u-details">
                        <p className="u-n">Chirath D Induwara</p>
                        <p className="u-e">tdchirath@gg.com</p>
                    </div>
                </div>
                <ul className="user-nav-list">
                    <li className="nav-list-item">
                        <Link className="list_none" to='/profile'> <GoPerson size={30}/> Profile</Link>
                        <Link className="list_none" to='/profile'><GoChevronRight /></Link> 
                        
                    </li>
                    <li className="nav-list-item">
                        <Link className="list_none" to='SmartAssit'> <GoCodeOfConduct size={30}/> Smart Farming</Link>
                        <Link className="list_none" to='SmartAssit'><GoChevronRight /></Link> 
                    </li>
                    <li className="nav-list-item">
                        <Link className="list_none" to='TrackOrders'> <GoPackage size={30}/>Track Orders</Link>
                        <Link className="list_none" to='TrackOrders'><GoChevronRight /></Link> 
                    </li>
                    <li className="nav-list-item">
                        <div className="list_none" > <GoReply size={30}/>Log Out</div>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default UserNav;
import { GoChevronRight, GoPerson, GoCodeOfConduct, GoPackage, GoPersonFill, GoReply   } from "react-icons/go";

function UserDashboard() {
    return (
        <>
            <div className="user-dash">
                <div className="user-details">
                 <GoPersonFill size={50} className="u-p" color="#3EA65A"/>
                    <div className="u-details">
                            <p className="u-n">Chirath D Induwara</p>
                            <p className="u-e">tdchirath@gg.com</p>
                    </div>
                </div>
                <div className="u-detail-main">
                    <div className="u-d-item">
                    <p className="u-n">Name</p>
                    <p className="u-e">Chirath D Induwara</p>
                    </div>
                    <hr className="pad-10"/>
                    <div className="u-d-item">
                    <p className="u-n">Email</p>
                    <p className="u-e">tdchirath@abc.com</p>
                    </div>
                    <hr className="pad-10"/>
                    <div className="u-d-item">
                    <p className="u-n">Address</p>
                    <p className="u-e">Sliit, Malabe</p>
                    </div>
                    <hr className="pad-10"/>
                    <div className="u-d-item">
                    <p className="u-n">Phone</p>
                    <p className="u-e">0711491264</p>
                    </div>
                    <hr className="pad-10"/>
                    <div className="u-d-item">
                    <p className="u-n">Password</p>
                    <p className="u-e">*******</p>
                    </div>
                </div>

                <div className="user-actions">
                    <button className="btn edit-btn">✏️ Edit Details</button>
                    <button className="btn delete-btn">🗑️ Delete Account</button>
                </div>
            </div>
        </>
    );
}

export default UserDashboard;
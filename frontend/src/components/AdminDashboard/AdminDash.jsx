import '../../css/AdminDashboard/adminDashboard.css';
import InfoCard from '../../components/StaffDashboard/InfoCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

function AdminDash() {
    const [categoryCounts, setCategoryCounts] = useState({
        Admins: 0,
        Farmers: 0,
        Staff: 0
    });

    useEffect(() => {

                const counts = {
                    Admins: 5,
                    Farmers: 101,
                    Staff: 20
                };

                setCategoryCounts(counts);
    }, []);

    return (
        <div className="staff-dashboard">
            <InfoCard title="Admins" count={categoryCounts.Admins} />
            <InfoCard title="Farmers" count={categoryCounts.Farmers} />
            <InfoCard title="Staff" count={categoryCounts.Staff} />
        </div>
    );
}

export default AdminDash;

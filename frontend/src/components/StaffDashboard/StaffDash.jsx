import '../../css/StaffDashboard/staffDashboard.css';
import InfoCard from './InfoCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

function StaffDash() {
    const [categoryCounts, setCategoryCounts] = useState({
        Fertilizers: 0,
        Pesticides: 0,
        Herbicides: 0
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products'); 
                const products = response.data.products;

                const counts = {
                    Fertilizers: 909,
                    Pesticides: 731,
                    Herbicides: 545
                };

                products.forEach(product => {
                    // if (product.cetegory === "Fertilizer") counts.Fertilizers++;
                    // else if (product.cetegory === "Pesticides") counts.Pesticides++;
                    // else if (product.cetegory === "Herbicides") counts.Herbicides++;
                });

                setCategoryCounts(counts);
            } catch (err) {
                console.error("Failed to fetch products", err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="staff-dashboard">
            <InfoCard title="Fertilizers" count={categoryCounts.Fertilizers} />
            <InfoCard title="Pesticides" count={categoryCounts.Pesticides} />
            <InfoCard title="Herbicides" count={categoryCounts.Herbicides} />
        </div>
    );
}

export default StaffDash;

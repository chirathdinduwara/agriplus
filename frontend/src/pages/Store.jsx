import StoreItem from '../components/HomePage/StoreItem';
import '../css/HomePage/store.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Store() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [products, setProducts] = useState([]);
    
    const navigate = useNavigate();
    
    // Fetch all products 
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:5000/api/products'); // Get products from the backend
                setProducts(response.data.products);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        }
        fetchProducts();
    }, []); 

    return (
        <>
            <div className="store">
                <div className="store-head">
                    Store
                </div>
                <div className='store-body'>
                    <div className="store-options">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="all">All Categories</option>
                            <option value="pesticides">Pesticides</option>
                            <option value="herbicides">Herbicides</option>
                            <option value="fertilizers">Fertilizers</option>
                        </select>
                    </div>
                    <div className="store-items">
                        {products.map((product) => (
                            <StoreItem key={product._id} id={product._id} prd_name={product.prd_name} price={product.price} img_url={product.img_url} category={product.category} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Store;
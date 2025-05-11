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

    const filteredProducts = products.filter((product) => {
        // Filter by search term (name, brand, category)
        const matchesSearch = product.prd_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              product.prd_brand.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Filter by category
        const matchesCategory = category === 'all' || product.cetegory === category;

        return matchesSearch && matchesCategory;
    });

    const handleItemClick = (product) => {
        navigate(`/order/${product._id}`, { state: product });
    };

    return (
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
                        <option value="Pesticides">Pesticides</option>
                        <option value="Herbicides">Herbicides</option>
                        <option value="Fertilizer">Fertilizers</option>
                    </select>
                </div>
                <div className="store-items">
                    {filteredProducts.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        filteredProducts.map((product) => (
                            <div id={product._id} onClick={() => handleItemClick(product)} style={{ cursor: "pointer" }} key={product._id}>
                                <StoreItem 
                                    prd_name={product.prd_name} 
                                    price={product.price} 
                                    img_url={product.img_url} 
                                    stock={product.stock} 
                                    prd_brand={product.prd_brand}  
                                    category={product.category} 
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Store;

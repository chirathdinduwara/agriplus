import { useLocation } from "react-router-dom";
import '../../css/SpecialFunction/SmartAssist.css';
import { useEffect, useState } from "react";
import axios from "axios";
import WeatherData from "./WeatherData";
import { useNavigate } from "react-router-dom";
import StoreItem from "../HomePage/StoreItem";

const WeatherDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const detail = location.state;
    const [weathers, setWeather] = useState([]);
    const [tasks, setTasks] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [keywords, setKeywords] = useState([]);
    const [products, setProducts] = useState([]);

    if (!detail) return <p>Details not found</p>;

    const handleItemClick = (product) => {
        navigate(`/order/${product._id}`, { state: product });
    };

    useEffect(() => {
        async function fetchWeather() {
            try {
                const response = await axios.get(`http://localhost:5000/api/weather/${detail.location}`);
                setWeather(response.data.list || []); // Ensure it's an array
            } catch (err) {
                console.error("Error fetching weather data:", err);
            }
        }
        fetchWeather();
    }, [detail]);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await axios.get(`http://localhost:5000/api/tasks/`, {
                    params: {
                        crop_name: detail.crop_name,
                        location: 'Sri Lanka'
                    }
                });
                setTasks(response.data);
                if (response.data.tasks.length > 0) {
                    setSelectedPeriod(response.data.tasks[0].period);
                }
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        }
        fetchTasks();
    }, [detail]);

    useEffect(() => {
        if (!selectedPeriod) return;

        async function fetchRecommendations() {
            try {
                const response = await axios.get(`http://localhost:5000/api/productRecomend`, {
                    params: {
                        crop_name: detail.crop_name,
                        location: 'Sri Lanka',
                        selectedPeriod: selectedPeriod,
                    }
                });

                if (response.data.matchedProducts) {
                    setProducts(response.data.matchedProducts);
                }
                if (response.data.keywords) {
                    setKeywords(response.data.keywords);
                }
            } catch (err) {
                console.error("Error fetching product recommendations:", err);
            }
        }

        fetchRecommendations();


    }, [selectedPeriod, detail]);

    console.log(products);

    return (
        <div className="assist">
            <div className="assist-container">
                <h1 className="weather-location">Weather Information</h1>
                <p className="weather-sub">Your Location: {detail.location}</p>

                {weathers.length > 0 ? (
                    <div className="weather-list">
                        {weathers.slice(0, 7).map((weather, index) => (
                            <WeatherData
                                key={index}
                                day={index + 1}
                                temp={weather.temp?.day || "N/A"}
                                desc={weather.weather?.[0]?.description || ""}
                                icon={weather.weather?.[0]?.icon || ""}
                            />
                        ))}
                    </div>
                ) : (
                    <p>Loading weather data...</p>
                )}

                <hr />

                <nav className="period-nav">
                    {tasks?.tasks?.map((task) => (
                        <button
                            key={task._id}
                            className={`period-btn ${selectedPeriod === task.period ? "active" : ""}`}
                            onClick={() => setSelectedPeriod(task.period)}
                        >
                            {task.period}
                        </button>
                    ))}
                </nav>

                <div className="task-container">
                    <h3>Tasks</h3>
                    {tasks?.tasks?.map((task) =>
                        task.period === selectedPeriod ? (
                            <div key={task._id} className="task-card">
                                <ul>
                                    {task.task_list.map((item, i) => (
                                        <li className="task-item" key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : null
                    )}

                    {keywords.length > 0 && (
                    <div className="keywords-section">
                        <h3>Recommended Categories</h3>
                        <p>{keywords.join(', ')}</p>
                    </div>
                )}

                {products.length > 0 && (
                    <div className="rec-items">
                        {products.map((product) => (
                            <div id={product._id} onClick={() => handleItemClick(product)}  style={{ cursor: "pointer" }}>
                                <StoreItem  prd_name={product.prd_name} price={product.price} img_url={product.img_url} stock={product.stock} prd_brand={product.prd_brand}  category={product.category} />
                            </div>
                        ))}
                        
                    </div>
                )}
                </div>

                
            </div>
        </div>
    );
};

export default WeatherDetails;

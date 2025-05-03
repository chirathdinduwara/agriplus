import "../../css/HomePage/home.css";
import videoBg from "../../assets/videos/home-bg.mp4";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const goShop = () => {
    navigate("/store");
  };
  return (
    <>
      <div className="home">
        <div className="overlay"></div>
        <video className="home-bg" src={videoBg} autoPlay loop muted />
        <div className="home-hero">
          <p className="home-hero-heading">Sri Lanka</p>
          <p className="home-hero-heading2">BEST HARVEST</p>
          <p className="home-hero-heading3">IN THE WORLD</p>
          <button className="log-in gap" onClick={goShop}>
            Discover More
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;

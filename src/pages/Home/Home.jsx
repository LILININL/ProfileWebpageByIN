import backgroundImage from "../../assets/87164382_p0.jpg";
import HomeCard from "./components/HomeCard.jsx";
import HomeHero from "./components/HomeHero.jsx";
import "./Home.css";

function Home() {
  return (
    <div
      className="home-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="home-content">
        <HomeCard />
        <HomeHero />
      </div>
    </div>
  );
}

export default Home;

import { Link } from "react-router-dom";

function HomeHero() {
  return (
    <div className="home-hero-text">
      <p className="home-hero-description">
        This is a simple React application with a fullscreen background image.
      </p>
      <div className="home-button-row">
        <Link className="home-button" to="/iSme">
          Is Me
        </Link>
        <Link className="home-button" to="/contact">
          ติดต่อ
        </Link>
        <Link className="home-button" to="/login">
          Login
        </Link>
        <Link className="home-button" to="/register">
          สมัครสมาชิก
        </Link>
      </div>
    </div>
  );
}

export default HomeHero;

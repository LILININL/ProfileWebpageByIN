import { Link } from "react-router-dom";
import "./IsMe.css";

function IsMe() {
  return (
    <div className="page-shell isme-page">
      <h1>Is Me</h1>
      <p>เกี่ยวกับผม</p>
      <Link className="back-link" to="/">
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
}

export default IsMe;

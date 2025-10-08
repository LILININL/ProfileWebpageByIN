import { Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
  return (
    <div className="page-shell contact-page">
      <h1>ติดต่อ</h1>
      <p>ใส่ข้อมูลติดต่อ เช่น อีเมล หรือโซเชียลมีเดีย ที่นี่</p>
      <Link className="back-link" to="/">
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
}

export default Contact;

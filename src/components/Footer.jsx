import { CONTACT } from "../data.js";
import Brand from "./Brand.jsx";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container footer__inner">
          <Brand light size={32} />
          <p>รับสร้างบ้านครบวงจร · โทร <a href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a></p>
          <p className="footer__copy">
            © {new Date().getFullYear()} Baiboon Home 
          </p>
        </div>
      </footer>

      {/* ปุ่มติดต่อด่วน (แสดงบนมือถือ) */}
      <div className="fab">
        <a href={`tel:${CONTACT.tel}`} className="fab__btn">โทรเลย</a>
        <a href="#contact" className="fab__btn fab__btn--primary">ปรึกษาฟรี</a>
      </div>
    </>
  );
}

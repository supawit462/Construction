import { CONTACT, PHOTOS, srcSet, unsplash } from "../data.js";
import logo from "../assets/logo-mark.svg";
import leaf from "../assets/leaf.svg";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="heroTitle">
      <div className="hero__leaves" aria-hidden="true">
        {[1, 2, 3].map((n) => <img key={n} src={leaf} alt="" className={`leaf leaf--${n}`} />)}
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="pill"><img src={logo} alt="" width="18" height="18" /> ชื่อใหม่… แต่ “หัวใจเดิม”</p>
          <h1 id="heroTitle">
            เริ่มก้าวใหม่<br />ที่<span className="hl">อบอุ่น</span><br />
            <span className="nowrap">ไปกับ Baiboon Home</span>
          </h1>
          <p className="hero__lead">
            รับสร้างบ้านครบวงจร ดูแลบ้านในฝันของคุณด้วย<strong>ความซื่อสัตย์</strong> เหมือนคนในครอบครัว
            เพื่อให้ทุกพื้นที่ตอบโจทย์ความสุขอย่างแท้จริง
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#contact">ปรึกษาฟรี ไม่มีค่าใช้จ่าย</a>
            <a className="btn btn--ghost" href="#plans">ดูแบบบ้าน Signature</a>
          </div>
          <ul className="hero__trust">
            <li>ทีมวิศวกรและช่างชุดเดิม</li>
            <li>ดูแลทุกขั้นตอน</li>
            <li>แบบบ้านมีเอกลักษณ์</li>
          </ul>
        </div>

        <div className="hero__visual">
          <div className="arch">
            <img
              src={unsplash(PHOTOS.hero.id, 1000)}
              srcSet={srcSet(PHOTOS.hero.id, [600, 900, 1200, 1600])}
              sizes="(max-width: 880px) 92vw, 46vw"
              alt={PHOTOS.hero.alt}
              fetchPriority="high"
            />
          </div>
          <div className="float-card float-card--a">
            <span className="float-card__icon" aria-hidden="true">✓</span>
            <div><b>มาตรฐานเดิม</b><small>ไม่เคยเปลี่ยน</small></div>
          </div>
          <a className="float-card float-card--b" href={`tel:${CONTACT.tel}`}>
            <span className="pin" aria-hidden="true" />
            <div><small>ปรึกษาฟรี โทรเลย</small><b>{CONTACT.phone}</b></div>
          </a>
        </div>
      </div>

      <svg className="hero__curve" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 120V60C240 10 480 0 720 30s480 70 720 10v80Z" />
      </svg>
    </section>
  );
}

import { FEATURES, PHOTOS, srcSet, unsplash } from "../data.js";
import { useReveal } from "../hooks.js";
import Icon from "./Icon.jsx";

export default function About() {
  const [mediaRef, mediaCls] = useReveal();
  const [copyRef, copyCls] = useReveal();

  return (
    <section className="section about" id="about" aria-labelledby="aboutTitle">
      <div className="container about__grid">
        <div ref={mediaRef} className={`about__media ${mediaCls}`}>
          <img
            className="about__photo"
            src={unsplash(PHOTOS.about.id, 900)}
            srcSet={srcSet(PHOTOS.about.id, [500, 800, 1100])}
            sizes="(max-width: 880px) 92vw, 42vw"
            alt={PHOTOS.about.alt}
            loading="lazy"
          />
          <img
            className="about__detail"
            src={unsplash(PHOTOS.aboutDetail.id, 400, 400)}
            alt={PHOTOS.aboutDetail.alt}
            loading="lazy"
          />
          <figure className="quote-card">
            <span className="quote-card__mark" aria-hidden="true">“</span>
            <blockquote>
              ชื่อใหม่… แต่ <em>“หัวใจเดิม”</em><br />
              ดูแลด้วย <em>“ความซื่อสัตย์”</em><br />
              เหมือนคนในครอบครัว
            </blockquote>
          </figure>
        </div>

        <div ref={copyRef} className={`about__copy ${copyCls}`}>
          <p className="eyebrow">เกี่ยวกับเรา</p>
          <h2 id="aboutTitle">บ้านหนึ่งหลัง<br />คือความไว้ใจทั้งครอบครัว</h2>
          <p>
            Baiboon Home คือก้าวใหม่ของทีมสร้างบ้านที่คุณคุ้นเคย เราเปลี่ยนเพียงชื่อ แต่ยังคงทีมวิศวกร ช่าง
            และวิธีทำงานแบบเดิม ที่ใส่ใจทุกรายละเอียดเหมือนสร้างบ้านให้คนในครอบครัว
          </p>
          <ul className="features">
            {FEATURES.map((f) => (
              <li key={f.title}>
                <span className="features__icon"><Icon name={f.icon} /></span>
                <div><h3>{f.title}</h3><p>{f.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

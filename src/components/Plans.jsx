import { useMemo, useRef, useState } from "react";
import { PLANS, STYLES, unsplash } from "../data.js";
import island from "../assets/island.webp";
import Icon from "./Icon.jsx";

const styleOf = (key) => STYLES.find((s) => s.key === key);
const FLOORS = [
  { value: "all", label: "ทั้งหมด" },
  { value: "1", label: "บ้านชั้นเดียว" },
  { value: "2", label: "บ้านสองชั้น" },
];

// style / setStyle มาจาก App เพื่อให้เมนูด้านบนเลือกสไตล์ได้ด้วย
export default function Plans({ onAskPlan, style, setStyle }) {
  const [floors, setFloors] = useState("all");
  const trackRef = useRef(null);
  const headRef = useRef(null);

  const list = useMemo(
    () => PLANS.filter((p) => (floors === "all" || String(p.floors) === floors) && (style === "all" || p.style === style)),
    [style, floors]
  );

  const pickStyle = (key) => {
    const next = style === key ? "all" : key;
    setStyle(next);
    trackRef.current?.scrollTo({ left: 0 });
    if (next !== "all") headRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollBy = (dir) => {
    const track = trackRef.current;
    const card = track?.querySelector(".plan");
    track?.scrollBy({ left: (card ? card.offsetWidth + 24 : 300) * dir, behavior: "smooth" });
  };

  return (
    <section className="section plans" id="plans" aria-labelledby="plansTitle">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">แบบบ้าน</p>
          <h2 id="plansTitle">
            <span className="nowrap">ค้นพบบ้านที่ใช่</span> <span className="nowrap">ในสไตล์ที่เป็นคุณ</span>
          </h2>
          <p className="section-head__sub">
            บ้านเป็นมากกว่าที่อยู่อาศัย แต่คือพื้นที่ที่บอกตัวตนของครอบครัว เลือกสไตล์ที่ใช่ แล้วดูแบบบ้านที่ตรงใจได้ทันที
          </p>
        </div>
      </div>

      {/* เลือกบ้านตามสไตล์: เสาสี 5 สไตล์ + บ้านบนเกาะหญ้า */}
      <div className="styles-stage">
        <div className="container">
          <div className={`style-cols${style !== "all" ? " has-active" : ""}`} role="group" aria-label="เลือกสไตล์บ้าน">
            {STYLES.map((s) => (
              <button
                key={s.key}
                type="button"
                className={`style-col style-col--${s.key}${style === s.key ? " is-active" : ""}`}
                aria-pressed={style === s.key}
                onClick={() => pickStyle(s.key)}
              >
                <span className="style-col__name">{s.name}</span>
                <span className="style-col__th">{s.th}</span>
                <Icon name={s.key} className="style-col__icon" />
                <span className="style-col__line" aria-hidden="true" />
                <span className="style-col__desc">{s.desc}</span>
                <span className="style-col__cta">ดูแบบบ้านสไตล์นี้ →</span>
                <img className="style-col__photo" src={unsplash(s.photo, 700, 700)} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
        {/* เกาะสองชั้น: ชั้นหลังอยู่หลังเสา ชั้นหน้า (พุ่มหญ้า/หิน) บังฐานเสา */}
        <div className="island" aria-hidden="true">
          <img className="island__back" src={island} alt="" />
          <img className="island__front" src={island} alt="" />
        </div>
      </div>

      <div className="container">
        <div className="section-head plans__head" ref={headRef}>
          <div>
            <h3 className="plans__title">
              แบบบ้าน Signature{" "}
              {style !== "all" && (
                <span className="plans__style">
                  · {styleOf(style).name}
                  <button className="plans__clear" type="button" aria-label="ล้างตัวกรองสไตล์" onClick={() => setStyle("all")}>✕</button>
                </span>
              )}
            </h3>
            {/* TODO: แทนที่ด้วยแบบบ้านจริง แล้วลบป้ายนี้ */}
            <p className="sample-tag">ตัวอย่างแบบบ้าน — รอใส่แบบจริง</p>
          </div>
          <div className="plans__tools">
            <div className="chips" role="group" aria-label="กรองจำนวนชั้น">
              {FLOORS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  className={`chip${floors === f.value ? " is-active" : ""}`}
                  aria-pressed={floors === f.value}
                  onClick={() => { setFloors(f.value); trackRef.current?.scrollTo({ left: 0 }); }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="arrows">
              <button type="button" className="arrow" aria-label="แบบก่อนหน้า" onClick={() => scrollBy(-1)}>‹</button>
              <button type="button" className="arrow" aria-label="แบบถัดไป" onClick={() => scrollBy(1)}>›</button>
            </div>
          </div>
        </div>

        <div className="plans__track" ref={trackRef} tabIndex={0} aria-label="รายการแบบบ้าน">
          {list.length ? (
            list.map((p) => <PlanCard key={p.code} plan={p} onAsk={onAskPlan} />)
          ) : (
            <p className="plans__empty">
              ยังไม่มีแบบในเงื่อนไขนี้ — <a href="#contact">ปรึกษาเราเพื่อออกแบบให้ตรงใจ</a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan, onAsk }) {
  const s = styleOf(plan.style);
  return (
    <article className="plan">
      <div className="plan__img">
        <img
          src={unsplash(plan.photo, 600, 400)}
          srcSet={`${unsplash(plan.photo, 600, 400)} 600w, ${unsplash(plan.photo, 900, 600)} 900w`}
          sizes="(max-width: 560px) 84vw, (max-width: 1080px) 33vw, 300px"
          alt={`ตัวอย่างบ้านสไตล์ ${s.name} แบบ ${plan.code}`}
          loading="lazy"
        />
        <span className="plan__badge">{plan.floors === 1 ? "บ้านชั้นเดียว" : "บ้านสองชั้น"}</span>
      </div>
      <div className="plan__body">
        <h3 className="plan__code">{plan.code}</h3>
        <p className="plan__style">{s.name} Style</p>
        <dl className="plan__specs">
          <div><dt>พื้นที่ใช้สอย</dt><dd>{plan.area}<small>ตร.ม.</small></dd></div>
          <div><dt>ห้องนอน</dt><dd>{plan.bed}</dd></div>
          <div><dt>ห้องน้ำ</dt><dd>{plan.bath}</dd></div>
        </dl>
        <a className="plan__link" href="#contact" onClick={() => onAsk(plan.code)}>
          สอบถามราคาแบบนี้ <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

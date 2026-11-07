import { PHOTOS, STEPS, unsplash } from "../data.js";
import { useReveal } from "../hooks.js";

function Step({ index, step }) {
  const [ref, cls] = useReveal();
  return (
    <li ref={ref} className={cls} style={{ transitionDelay: `${index * 0.08}s` }}>
      <span className="steps__no">{String(index + 1).padStart(2, "0")}</span>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
    </li>
  );
}

export default function Process() {
  return (
    <section
      className="section process"
      id="process"
      aria-labelledby="processTitle"
      style={{ "--process-photo": `url("${unsplash(PHOTOS.process.id, 1800)}")` }}
    >
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--light">ดูแลครบวงจร</p>
          <h2 id="processTitle">พร้อมดูแลบ้านในฝันของคุณ<br />ทุกขั้นตอน</h2>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => <Step key={s.title} index={i} step={s} />)}
        </ol>
      </div>
    </section>
  );
}

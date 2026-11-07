import { useEffect, useRef, useState } from "react";
import { BUDGETS, CONTACT, FORM_ENDPOINT, PHOTOS, unsplash } from "../data.js";
import Icon from "./Icon.jsx";

const CHANNELS = [
  { icon: "phone", label: "โทร", value: CONTACT.phone, href: `tel:${CONTACT.tel}` },
  { icon: "chat", label: "Messenger", value: "ทักแชทผ่านเพจ", href: CONTACT.messenger, external: true },
  { icon: "facebook", label: "Facebook", value: CONTACT.pageName, href: CONTACT.facebook, external: true },
];

export default function Contact({ askedPlan }) {
  const formRef = useRef(null);
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState({});
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  // กด "สอบถามราคาแบบนี้" ที่การ์ดแบบบ้าน → เติมรหัสแบบลงในข้อความ
  useEffect(() => {
    if (!askedPlan) return;
    setMessage((m) => (m.includes(askedPlan.code) ? m : `สนใจแบบบ้าน ${askedPlan.code}${m ? "\n" + m : ""}`));
  }, [askedPlan]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const bad = {};
    [...form.elements].forEach((f) => {
      if (f.name && !f.checkValidity()) bad[f.name] = true;
    });
    setInvalid(bad);
    if (Object.keys(bad).length) {
      setStatus({ type: "err", text: "กรุณากรอกข้อมูลที่มีเครื่องหมาย * ให้ครบ และยอมรับการติดต่อกลับ" });
      form.querySelector(":invalid")?.focus();
      return;
    }
    if (!FORM_ENDPOINT) {
      setStatus({ type: "err", text: `ฟอร์มยังไม่ได้เชื่อมต่อระบบรับข้อมูล กรุณาโทร ${CONTACT.phone}` });
      return;
    }
    setSending(true);
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ type: "ok", text: "ได้รับข้อมูลแล้ว ทีมงาน Baiboon Home จะติดต่อกลับโดยเร็วที่สุด" });
      form.reset();
      setMessage("");
    } catch {
      setStatus({ type: "err", text: `ส่งข้อมูลไม่สำเร็จ กรุณาโทร ${CONTACT.phone}` });
    } finally {
      setSending(false);
    }
  };

  const clear = (e) => invalid[e.target.name] && setInvalid((v) => ({ ...v, [e.target.name]: false }));
  const cls = (name) => (invalid[name] ? "is-invalid" : undefined);

  return (
    <section className="section contact" id="contact" aria-labelledby="contactTitle">
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="eyebrow">ปรึกษาฟรี ไม่มีค่าใช้จ่าย</p>
          <h2 id="contactTitle">เริ่มต้นสร้างบ้านในฝัน<br />ของคุณวันนี้</h2>
          <p>กรอกข้อมูลสั้น ๆ ทีมงานจะติดต่อกลับโดยเร็วที่สุด หรือคุยกับเราได้ทันทีทางโทรศัพท์และ Facebook</p>
          <ul className="channels">
            {CHANNELS.map((c) => (
              <li key={c.label}>
                <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener" } : {})}>
                  <span className="channels__icon"><Icon name={c.icon} /></span>
                  <span><small>{c.label}</small>{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
          <figure className="contact__photo">
            <img src={unsplash(PHOTOS.contact.id, 800, 520)} alt={PHOTOS.contact.alt} loading="lazy" />
            <figcaption>บ้านที่อบอุ่น เริ่มต้นจากการพูดคุยกัน</figcaption>
          </figure>
        </div>

        <form className="form" ref={formRef} noValidate onSubmit={onSubmit} onInput={clear}>
          <div className="form__row">
            <label>ชื่อ - นามสกุล<span>*</span><input name="name" autoComplete="name" required className={cls("name")} /></label>
            <label>เบอร์โทรศัพท์<span>*</span>
              <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="เช่น 0981234567" pattern="0[0-9]{8,9}" required className={cls("phone")} />
            </label>
          </div>
          <div className="form__row">
            <label>อีเมล<input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={cls("email")} /></label>
            <label>LINE ID<input name="line" /></label>
          </div>
          <div className="form__row">
            <label>ขนาดที่ดิน (ตร.ว.)<span>*</span><input name="land" type="number" min="1" inputMode="numeric" required className={cls("land")} /></label>
            <label>งบประมาณ<span>*</span>
              <select name="budget" required defaultValue="" className={cls("budget")}>
                <option value="">เลือกงบประมาณ</option>
                {BUDGETS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </label>
          </div>
          <label>จังหวัดที่จะสร้างบ้าน<span>*</span><input name="province" required className={cls("province")} /></label>
          <label>เล่าเกี่ยวกับบ้านในฝันของคุณ
            <textarea name="message" rows="4" placeholder="จำนวนสมาชิก ห้องที่ต้องการ สไตล์ที่ชอบ" value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>
          <label className="form__consent">
            <input type="checkbox" name="consent" required /> ยินยอมให้ Baiboon Home ติดต่อกลับตามข้อมูลที่ให้ไว้
          </label>
          <button className="btn btn--primary btn--block" type="submit" disabled={sending}>
            {sending ? "กำลังส่ง…" : "ส่งข้อมูล ขอรับคำปรึกษาฟรี"}
          </button>
          <p className={`form__status${status.type ? ` is-${status.type}` : ""}`} role="status" aria-live="polite">{status.text}</p>
        </form>
      </div>
    </section>
  );
}

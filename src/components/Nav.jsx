import { useEffect, useRef, useState } from "react";
import { CONTACT, NAV, STYLES } from "../data.js";
import { useActiveSection } from "../hooks.js";
import Brand from "./Brand.jsx";
import Icon from "./Icon.jsx";

const IDS = NAV.map((n) => n.id);
// เปิด dropdown ด้วยการชี้เมาส์เฉพาะจอคอมพ์ (เมนูแนวนอน) — มือถือใช้แตะอย่างเดียว
const hoverDesktop = () => window.matchMedia("(hover: hover) and (min-width: 881px)").matches;

// แถบเมนูแบบแคปซูลลอย: เมนูที่กำลังดูอยู่เป็นปุ่มสีเขียว / "แบบบ้าน" มี dropdown สไตล์บ้าน
export default function Nav({ onPickStyle, activeStyle }) {
  const [open, setOpen] = useState(false); // เมนูมือถือ
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(IDS) || "home";
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ปิด dropdown เมื่อคลิกข้างนอกหรือกด Esc
  useEffect(() => {
    if (!dropdown) return;
    const onDown = (e) => !dropRef.current?.contains(e.target) && setDropdown(false);
    const onKey = (e) => e.key === "Escape" && setDropdown(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropdown]);

  const closeAll = () => {
    setOpen(false);
    setDropdown(false);
  };

  const pick = (key) => {
    onPickStyle(key);
    closeAll();
  };

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`} id="top">
      <div className="nav__bar">
        <Brand />

        <nav className={`nav__links${open ? " is-open" : ""}`} id="navLinks" aria-label="เมนูหลัก">
          {NAV.map((n) =>
            n.dropdown ? (
              <div
                key={n.id}
                ref={dropRef}
                className={`nav__item nav__item--drop${dropdown ? " is-open" : ""}`}
                onMouseEnter={() => hoverDesktop() && setDropdown(true)}
                onMouseLeave={() => hoverDesktop() && setDropdown(false)}
              >
                <a href={`#${n.id}`} className={`nav__link${active === n.id ? " is-active" : ""}`} onClick={closeAll}>
                  {n.label}
                </a>
                <button
                  type="button"
                  className="nav__caret"
                  aria-label={`เปิดรายการ${n.label}`}
                  aria-expanded={dropdown}
                  aria-controls="navStyles"
                  onClick={() => setDropdown((d) => (hoverDesktop() ? true : !d))}
                >
                  <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
                </button>
                <ul className="nav__menu" id="navStyles">
                  <li>
                    <button type="button" className={activeStyle === "all" ? "is-current" : undefined} onClick={() => pick("all")}>
                      แบบบ้านทั้งหมด
                    </button>
                  </li>
                  {STYLES.map((s) => (
                    <li key={s.key}>
                      <button type="button" className={activeStyle === s.key ? "is-current" : undefined} onClick={() => pick(s.key)}>
                        <Icon name={s.key} className="nav__menu-icon" />
                        <span>{s.name}<small>{s.th}</small></span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <a key={n.id} href={`#${n.id}`} className={`nav__link${active === n.id ? " is-active" : ""}`} onClick={closeAll}>
                {n.label}
              </a>
            )
          )}
        </nav>

        <div className="nav__icons">
          <a className="nav__icon" href={CONTACT.messenger} target="_blank" rel="noopener" aria-label="ทักแชท Messenger">
            <Icon name="chat" />
            <span className="nav__dot" aria-hidden="true" />
          </a>
          <a className="nav__icon" href={CONTACT.facebook} target="_blank" rel="noopener" aria-label="เพจ Facebook">
            <Icon name="facebook" />
          </a>
          <button
            className="nav__toggle"
            aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
            aria-expanded={open}
            aria-controls="navLinks"
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}

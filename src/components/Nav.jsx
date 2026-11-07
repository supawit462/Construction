import { useEffect, useState } from "react";
import { CONTACT, NAV } from "../data.js";
import { useActiveSection } from "../hooks.js";
import Brand from "./Brand.jsx";

const IDS = NAV.map((n) => n.id);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`} id="top">
      <div className="container nav__inner">
        <Brand />
        <nav className={`nav__links${open ? " is-open" : ""}`} id="navLinks" aria-label="เมนูหลัก">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? "is-active" : undefined} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="nav__cta">
          <a className="nav__phone" href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a>
          <a className="btn btn--primary btn--sm" href="#contact">ปรึกษาฟรี</a>
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

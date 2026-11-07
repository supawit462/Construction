import { useState } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Plans from "./components/Plans.jsx";
import Process from "./components/Process.jsx";
import Reviews from "./components/Reviews.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

// หน้าเดียว 6 section: Hero · เกี่ยวกับเรา · แบบบ้าน · ขั้นตอน · รีวิว · ติดต่อ
export default function App() {
  // แบบบ้านที่ลูกค้ากด "สอบถามราคา" — ส่งต่อไปเติมในฟอร์มติดต่อ
  const [askedPlan, setAskedPlan] = useState(null);
  // สไตล์บ้านที่เลือก — ใช้ร่วมกันระหว่างเมนู (dropdown แบบบ้าน) และส่วนแบบบ้าน
  const [style, setStyle] = useState("all");

  const pickStyleFromMenu = (key) => {
    setStyle(key);
    requestAnimationFrame(() =>
      document.querySelector(".plans__head")?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  return (
    <>
      <a className="skip" href="#main">ข้ามไปเนื้อหาหลัก</a>
      <Nav onPickStyle={pickStyleFromMenu} activeStyle={style} />
      <main id="main">
        <Hero />
        <About />
        <Plans style={style} setStyle={setStyle} onAskPlan={(code) => setAskedPlan({ code, at: Date.now() })} />
        <Process />
        <Reviews />
        <Contact askedPlan={askedPlan} />
      </main>
      <Footer />
    </>
  );
}

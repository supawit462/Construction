import { useEffect, useRef, useState } from "react";
import { CONTACT, HERO_VIDEO } from "../data.js";
import logo from "../assets/logo-mark.svg";

// เลือกไฟล์วิดีโอตามขนาดจอ / โหมดประหยัดเน็ต / ตั้งค่าลดการเคลื่อนไหว
function pickVideo() {
  if (typeof window === "undefined") return null;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection?.saveData;
  if (reduce || saveData) return null;
  return window.innerWidth <= 900 ? HERO_VIDEO.sd : HERO_VIDEO.hd;
}

export default function Hero() {
  const videoRef = useRef(null);
  const [src] = useState(pickVideo);
  const [playing, setPlaying] = useState(Boolean(src));

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;
    v.play().catch(() => setPlaying(false)); // บางเบราว์เซอร์บล็อกการเล่นอัตโนมัติ
  }, [src]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="hero" aria-labelledby="heroTitle">
      <div className="hero__media" aria-hidden="true">
        {src ? (
          <video
            ref={videoRef}
            className="hero__video"
            src={src}
            poster={HERO_VIDEO.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <img className="hero__video" src={HERO_VIDEO.poster} alt="" />
        )}
        <div className="hero__shade" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
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
            <a className="btn btn--light" href="#plans">ดูแบบบ้าน Signature</a>
          </div>
        </div>

      </div>

      {src && (
        <button type="button" className="hero__toggle" onClick={toggle} aria-label={playing ? "หยุดวิดีโอ" : "เล่นวิดีโอ"}>
          {playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
      )}


      <svg className="hero__curve" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 120V60C240 10 480 0 720 30s480 70 720 10v80Z" />
      </svg>
    </section>
  );
}

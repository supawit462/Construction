// สไตล์บ้าน 5 แบบ (ส่วน "ค้นพบบ้านที่ใช่ ในสไตล์ที่เป็นคุณ")
const ICON = {
  tropical: '<path d="M12 21V11"/><path d="M12 11C8 11 5 8.5 4 5c4 0 7 2 8 6Z"/><path d="M12 11c4 0 7-2.5 8-6-4 0-7 2-8 6Z"/><path d="M12 15c-2.5 0-4.5-1.5-5-4"/>',
  wood: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3"/>',
  contemporary: '<rect x="3" y="10" width="18" height="11"/><rect x="7" y="4" width="10" height="6"/><path d="M7 14h4v7M14 14h4v3h-4z"/>',
  family: '<path d="M3 11 12 4l9 7v10H3z"/><path d="M12 18s-3.5-2-3.5-4.3A1.8 1.8 0 0 1 12 13a1.8 1.8 0 0 1 3.5.7C15.5 16 12 18 12 18Z"/>',
  luxury: '<path d="M6 4h12l3 5-9 11L3 9z"/><path d="M3 9h18M9 4l3 16M15 4l-3 16"/>',
};
const STYLES = [
  { key: "tropical", name: "Tropical", th: "โมเดิร์นทรอปิคอล", img: "assets/style-tropical.svg",
    desc: "บ้านโปร่ง รับลม รับแสง ชายคากว้าง ใกล้ชิดธรรมชาติ เหมาะกับอากาศเมืองไทย" },
  { key: "wood", name: "Wood", th: "ซิกเนเจอร์วู้ด", img: "assets/style-wood.svg",
    desc: "อบอุ่นด้วยงานไม้และโทนสีธรรมชาติ สำหรับครอบครัวที่ชอบความเรียบง่ายแต่มีเอกลักษณ์" },
  { key: "contemporary", name: "Contemporary", th: "คอนเทมโพรารี", img: "assets/style-contemporary.svg",
    desc: "เส้นสายเรียบคม หลังคาแบน กระจกบานใหญ่ สำหรับคนรุ่นใหม่ที่ชอบความทันสมัย" },
  { key: "family", name: "Family", th: "แฟมิลี่ คอมฟอร์ต", img: "assets/style-family.svg",
    desc: "พื้นที่กว้าง ห้องนอนชั้นล่าง เดินสะดวก รองรับครอบครัวหลายวัยและผู้สูงอายุ" },
  { key: "luxury", name: "Luxury", th: "ซิกเนเจอร์ลักชัวรี", img: "assets/style-luxury.svg",
    desc: "สง่างาม สมมาตร รายละเอียดประณีต สะท้อนความสำเร็จและรสนิยมของเจ้าของบ้าน" },
];

// ข้อมูลแบบบ้าน (ตัวอย่าง) — แก้รหัสแบบ สเปก และรูปให้ตรงกับแบบจริงของ Baiboon Home
const PLANS = [
  { code: "BB-101", style: "tropical", floors: 1, area: 120, bed: 3, bath: 2 },
  { code: "BB-205", style: "wood", floors: 2, area: 210, bed: 4, bath: 3 },
  { code: "BB-210", style: "contemporary", floors: 2, area: 245, bed: 4, bath: 4 },
  { code: "BB-108", style: "family", floors: 1, area: 150, bed: 3, bath: 3 },
  { code: "BB-220", style: "luxury", floors: 2, area: 290, bed: 5, bath: 5 },
  { code: "BB-215", style: "contemporary", floors: 2, area: 230, bed: 4, bath: 3 },
  { code: "BB-112", style: "tropical", floors: 1, area: 135, bed: 3, bath: 2 },
  { code: "BB-230", style: "family", floors: 2, area: 260, bed: 5, bath: 4 },
];
const styleOf = (key) => STYLES.find((s) => s.key === key);

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// ---------- สไตล์บ้าน ----------
const cols = $("#styleCols");
cols.innerHTML = STYLES.map(
  (s) => `
  <button class="style-col style-col--${s.key}" data-style="${s.key}" aria-pressed="false">
    <span class="style-col__name">${s.name}</span>
    <span class="style-col__th">${s.th}</span>
    <svg class="style-col__icon" viewBox="0 0 24 24" aria-hidden="true">${ICON[s.key]}</svg>
    <span class="style-col__line" aria-hidden="true"></span>
    <span class="style-col__desc">${s.desc}</span>
    <span class="style-col__cta">ดูแบบบ้านสไตล์นี้ →</span>
    <img class="style-col__house" src="${s.img}" alt="" loading="lazy">
  </button>`
).join("");

// ---------- แบบบ้าน ----------
const track = $("#plansTrack");
const state = { floors: "all", style: "all" };

function renderPlans() {
  const list = PLANS.filter(
    (p) => (state.floors === "all" || String(p.floors) === state.floors) && (state.style === "all" || p.style === state.style)
  );
  $("#styleLabel").innerHTML = state.style === "all" ? "" :
    `· ${styleOf(state.style).name} <button class="plans__clear" type="button" aria-label="ล้างตัวกรองสไตล์">✕</button>`;
  track.innerHTML = list.length
    ? list.map((p) => {
        const s = styleOf(p.style);
        return `
    <article class="plan">
      <div class="plan__img plan__img--${p.style}">
        <img src="${s.img}" alt="ภาพประกอบแบบบ้าน ${p.code} สไตล์ ${s.name}" loading="lazy" width="320" height="200">
        <span class="plan__badge">${p.floors === 1 ? "บ้านชั้นเดียว" : "บ้านสองชั้น"}</span>
      </div>
      <div class="plan__body">
        <h3 class="plan__code">${p.code}</h3>
        <p class="plan__style">${s.name} Style</p>
        <dl class="plan__specs">
          <div><dt>พื้นที่ใช้สอย</dt><dd>${p.area}<small>ตร.ม.</small></dd></div>
          <div><dt>ห้องนอน</dt><dd>${p.bed}</dd></div>
          <div><dt>ห้องน้ำ</dt><dd>${p.bath}</dd></div>
        </dl>
        <a class="plan__link" href="#contact" data-plan="${p.code}">สอบถามราคาแบบนี้ <span aria-hidden="true">→</span></a>
      </div>
    </article>`;
      }).join("")
    : `<p class="plans__empty">ยังไม่มีแบบในเงื่อนไขนี้ — <a href="#contact">ปรึกษาเราเพื่อออกแบบให้ตรงใจ</a></p>`;
  track.scrollTo({ left: 0 });
}

function setStyle(key) {
  state.style = state.style === key ? "all" : key;
  $$(".style-col").forEach((c) => {
    const on = c.dataset.style === state.style;
    c.classList.toggle("is-active", on);
    c.setAttribute("aria-pressed", on);
  });
  cols.classList.toggle("has-active", state.style !== "all");
  renderPlans();
}

cols.addEventListener("click", (e) => {
  const col = e.target.closest(".style-col");
  if (!col) return;
  setStyle(col.dataset.style);
  if (state.style !== "all") $(".plans__head").scrollIntoView({ behavior: "smooth", block: "start" });
});
$("#styleLabel").addEventListener("click", (e) => {
  if (e.target.closest(".plans__clear")) setStyle(state.style);
});

renderPlans();

$$(".chip").forEach((chip) =>
  chip.addEventListener("click", () => {
    $$(".chip").forEach((c) => {
      c.classList.toggle("is-active", c === chip);
      c.setAttribute("aria-pressed", c === chip);
    });
    state.floors = chip.dataset.filter;
    renderPlans();
  })
);

$$(".arrow").forEach((btn) =>
  btn.addEventListener("click", () => {
    const card = $(".plan", track);
    const step = card ? card.offsetWidth + 24 : 300;
    track.scrollBy({ left: step * Number(btn.dataset.dir), behavior: "smooth" });
  })
);

// กด "สอบถามราคา" แล้วเติมรหัสแบบลงในฟอร์ม
track.addEventListener("click", (e) => {
  const link = e.target.closest("[data-plan]");
  if (!link) return;
  const msg = $('#leadForm [name="message"]');
  if (!msg.value.includes(link.dataset.plan)) {
    msg.value = `สนใจแบบบ้าน ${link.dataset.plan}${msg.value ? "\n" + msg.value : ""}`;
  }
});

// ---------- เมนู ----------
const nav = $(".nav");
const toggle = $("#navToggle");
const links = $("#navLinks");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "ปิดเมนู" : "เปิดเมนู");
});
$$("a", links).forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 10), { passive: true });

// ไฮไลต์เมนูตาม section ที่กำลังดู
const navMap = new Map($$("a", links).map((a) => [a.getAttribute("href").slice(1), a]));
const spy = new IntersectionObserver(
  (entries) =>
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navMap.forEach((a) => a.classList.remove("is-active"));
      navMap.get(en.target.id)?.classList.add("is-active");
    }),
  { rootMargin: "-45% 0px -50% 0px" }
);
navMap.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

// ---------- เอฟเฟกต์ค่อย ๆ ปรากฏ ----------
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }),
  { threshold: 0.15 }
);
$$(".reveal").forEach((el) => io.observe(el));

// ---------- ฟอร์ม ----------
// ใส่ปลายทางรับข้อมูลที่ data-endpoint ของ <form> (เช่น Formspree หรือ Google Apps Script)
const form = $("#leadForm");
const status = $("#formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let ok = true;
  $$("input, select, textarea", form).forEach((f) => {
    const bad = !f.checkValidity();
    f.classList.toggle("is-invalid", bad && f.type !== "checkbox");
    if (bad) ok = false;
  });
  if (!ok) {
    status.className = "form__status is-err";
    status.textContent = "กรุณากรอกข้อมูลที่มีเครื่องหมาย * ให้ครบ และยอมรับการติดต่อกลับ";
    $(":invalid", form)?.focus();
    return;
  }

  const endpoint = form.dataset.endpoint;
  const btn = $("button[type=submit]", form);
  btn.disabled = true;
  if (!endpoint) {
    status.className = "form__status is-err";
    status.textContent = "ฟอร์มยังไม่ได้เชื่อมต่อระบบรับข้อมูล กรุณาโทร 098 415 2425";
    btn.disabled = false;
    return;
  }
  try {
    const res = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(res.status);
    status.className = "form__status is-ok";
    status.textContent = "ได้รับข้อมูลแล้ว ทีมงาน Baiboon Home จะติดต่อกลับโดยเร็วที่สุด";
    form.reset();
  } catch {
    status.className = "form__status is-err";
    status.textContent = "ส่งข้อมูลไม่สำเร็จ กรุณาโทร 098 415 2425";
  } finally {
    btn.disabled = false;
  }
});

$$("input, select, textarea", form).forEach((f) =>
  f.addEventListener("input", () => f.classList.remove("is-invalid"))
);

$("#year").textContent = new Date().getFullYear();

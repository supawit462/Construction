// ข้อมูลแบบบ้าน (ตัวอย่าง) — แก้รหัสแบบ สเปก และรูปให้ตรงกับแบบจริงของ Baiboon Home
const PLANS = [
  { code: "BB-101", style: "Modern Tropical", floors: 1, img: "assets/house-1storey.svg", area: 120, bed: 3, bath: 2 },
  { code: "BB-205", style: "Signature Wood", floors: 2, img: "assets/house-2storey.svg", area: 210, bed: 4, bath: 3 },
  { code: "BB-210", style: "Contemporary", floors: 2, img: "assets/house-modern.svg", area: 245, bed: 4, bath: 4 },
  { code: "BB-108", style: "Family Comfort", floors: 1, img: "assets/house-1storey.svg", area: 150, bed: 3, bath: 3 },
  { code: "BB-220", style: "Signature Luxury", floors: 2, img: "assets/house-2storey.svg", area: 290, bed: 5, bath: 5 },
  { code: "BB-215", style: "Minimal Modern", floors: 2, img: "assets/house-modern.svg", area: 230, bed: 4, bath: 3 },
];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// ---------- แบบบ้าน ----------
const track = $("#plansTrack");

function renderPlans(filter = "all") {
  const list = PLANS.filter((p) => filter === "all" || String(p.floors) === filter);
  track.innerHTML = list
    .map(
      (p) => `
    <article class="plan">
      <div class="plan__img">
        <img src="${p.img}" alt="ภาพประกอบแบบบ้าน ${p.code}" loading="lazy" width="400" height="260">
        <span class="plan__badge">${p.floors === 1 ? "บ้านชั้นเดียว" : "บ้านสองชั้น"}</span>
      </div>
      <div class="plan__body">
        <h3 class="plan__code">${p.code}</h3>
        <p class="plan__style">${p.style}</p>
        <dl class="plan__specs">
          <div><dt>พื้นที่ใช้สอย</dt><dd>${p.area}<small>ตร.ม.</small></dd></div>
          <div><dt>ห้องนอน</dt><dd>${p.bed}</dd></div>
          <div><dt>ห้องน้ำ</dt><dd>${p.bath}</dd></div>
        </dl>
        <a class="plan__link" href="#contact" data-plan="${p.code}">สอบถามราคาแบบนี้ <span aria-hidden="true">→</span></a>
      </div>
    </article>`
    )
    .join("");
  track.scrollTo({ left: 0 });
}
renderPlans();

$$(".chip").forEach((chip) =>
  chip.addEventListener("click", () => {
    $$(".chip").forEach((c) => {
      c.classList.toggle("is-active", c === chip);
      c.setAttribute("aria-pressed", c === chip);
    });
    renderPlans(chip.dataset.filter);
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

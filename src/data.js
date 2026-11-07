// ข้อมูลทั้งหมดของเว็บ — แก้ข้อความ รูป และแบบบ้านได้ที่ไฟล์นี้ไฟล์เดียว
// รูปทั้งหมดมาจาก Unsplash (ใช้ได้ฟรีตาม Unsplash License)

export const unsplash = (id, w = 1200, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=75`;

export const srcSet = (id, widths = [480, 800, 1200, 1600]) =>
  widths.map((w) => `${unsplash(id, w)} ${w}w`).join(", ");

export const CONTACT = {
  phone: "098 415 2425",
  tel: "0984152425",
  facebook: "https://www.facebook.com/BaiboonHomeOfficial",
  messenger: "https://m.me/BaiboonHomeOfficial",
  pageName: "Baiboon Home รับสร้างบ้านครบวงจร",
};

// เมนูด้านบน — รายการที่มี dropdown: true จะแสดงสไตล์บ้าน 5 แบบให้เลือก
export const NAV = [
  { id: "home", label: "หน้าแรก" },
  { id: "about", label: "เกี่ยวกับเรา" },
  { id: "plans", label: "แบบบ้าน", dropdown: true },
  { id: "process", label: "ขั้นตอนการสร้าง" },
  { id: "reviews", label: "รีวิว" },
  { id: "contact", label: "ติดต่อเรา" },
];

// วิดีโอ Hero — จาก Coverr (ใช้เชิงพาณิชย์บนเว็บไซต์ได้ฟรี ตาม Coverr License)
// https://coverr.co/videos/villa-with-a-swimming-pool
const COVERR = "https://cdn.coverr.co/videos/coverr-villa-with-a-swimming-pool-6618";
export const HERO_VIDEO = {
  hd: `${COVERR}/1080p.mp4`,
  sd: `${COVERR}/720p.mp4`,
  poster: `${COVERR}/thumbnail?width=1280`,
  alt: "บ้านหลังใหญ่ สนามหญ้าเขียว และสระว่ายน้ำ ในแสงแดดยามเย็น",
};

export const PHOTOS = {
  hero: { id: "1600585154340-be6161a56a0c", alt: "บ้านโมเดิร์นสองชั้นยามค่ำ ไฟในบ้านสีอุ่น ใต้ร่มไม้ใหญ่" },
  about: { id: "1541888946425-d81bb19240f5", alt: "ทีมวิศวกรและช่างตรวจงานที่ไซต์ก่อสร้าง" },
  aboutDetail: { id: "1503387762-592deb58ef4e", alt: "สถาปนิกกำลังเขียนแบบบ้าน" },
  process: { id: "1504307651254-35680f356dfd", alt: "" },
  contact: { id: "1600210492486-724fe5c67fb0", alt: "ห้องนั่งเล่นโทนอบอุ่น แสงธรรมชาติ" },
};

export const FEATURES = [
  { icon: "home", title: "แบบบ้าน Signature", text: "ฟังก์ชันลงตัว สวยมีเอกลักษณ์เฉพาะตัว" },
  { icon: "star", title: "คุณภาพเน้น ๆ", text: "ยกระดับความคุ้มค่า ตอบโจทย์ครอบครัว" },
  { icon: "shield", title: "มาตรฐานเดิม ไม่เคยเปลี่ยน", text: "ทีมวิศวกรและช่างชุดเดิม ดูแลครบวงจร" },
];

export const STYLES = [
  { key: "tropical", name: "Tropical", th: "โมเดิร์นทรอปิคอล", photo: "1564013799919-ab600027ffc6",
    desc: "บ้านโปร่ง รับลม รับแสง ชายคากว้าง ใกล้ชิดธรรมชาติ เหมาะกับอากาศเมืองไทย" },
  { key: "wood", name: "Wood", th: "ซิกเนเจอร์วู้ด", photo: "1568605114967-8130f3a36994",
    desc: "อบอุ่นด้วยงานไม้และโทนสีธรรมชาติ สำหรับครอบครัวที่ชอบความเรียบง่ายแต่มีเอกลักษณ์" },
  { key: "contemporary", name: "Contemporary", th: "คอนเทมโพรารี", photo: "1600047509807-ba8f99d2cdde",
    desc: "เส้นสายเรียบคม หลังคาแบน กระจกบานใหญ่ สำหรับคนรุ่นใหม่ที่ชอบความทันสมัย" },
  { key: "family", name: "Family", th: "แฟมิลี่ คอมฟอร์ต", photo: "1625602812206-5ec545ca1231",
    desc: "พื้นที่กว้าง ห้องนอนชั้นล่าง เดินสะดวก รองรับครอบครัวหลายวัยและผู้สูงอายุ" },
  { key: "luxury", name: "Luxury", th: "ซิกเนเจอร์ลักชัวรี", photo: "1613490493576-7fde63acd811",
    desc: "สง่างาม รายละเอียดประณีต สะท้อนความสำเร็จและรสนิยมของเจ้าของบ้าน" },
];

// แบบบ้าน (ตัวอย่าง) — แทนที่ด้วยแบบจริงของ Baiboon Home
export const PLANS = [
  { code: "BB-101", style: "tropical", floors: 1, area: 120, bed: 3, bath: 2, photo: "1512917774080-9991f1c4c750" },
  { code: "BB-205", style: "wood", floors: 2, area: 210, bed: 4, bath: 3, photo: "1600566753190-17f0baa2a6c3" },
  { code: "BB-210", style: "contemporary", floors: 2, area: 245, bed: 4, bath: 4, photo: "1600585154526-990dced4db0d" },
  { code: "BB-108", style: "family", floors: 1, area: 150, bed: 3, bath: 3, photo: "1570129477492-45c003edd2be" },
  { code: "BB-220", style: "luxury", floors: 2, area: 290, bed: 5, bath: 5, photo: "1600596542815-ffad4c1539a9" },
  { code: "BB-215", style: "contemporary", floors: 2, area: 230, bed: 4, bath: 3, photo: "1580587771525-78b9dba3b914" },
  { code: "BB-112", style: "tropical", floors: 1, area: 135, bed: 3, bath: 2, photo: "1582268611958-ebfd161ef9cf" },
  { code: "BB-230", style: "family", floors: 2, area: 260, bed: 5, bath: 4, photo: "1583608205776-bfd35f0d9f83" },
];

export const STEPS = [
  { title: "ปรึกษาฟรี", text: "รับฟังความต้องการ งบประมาณ และสภาพที่ดิน" },
  { title: "เลือกและปรับแบบ", text: "เลือกแบบ Signature หรือปรับให้เข้ากับครอบครัว" },
  { title: "เสนอราคาโปร่งใส", text: "แจกแจงรายการวัสดุและค่าใช้จ่ายชัดเจน" },
  { title: "ยื่นขออนุญาต", text: "ดูแลเอกสารขออนุญาตก่อสร้างให้ครบ" },
  { title: "ก่อสร้าง", text: "ทีมวิศวกรควบคุมงาน รายงานความคืบหน้าสม่ำเสมอ" },
  { title: "ส่งมอบและดูแลต่อ", text: "ตรวจรับร่วมกัน และดูแลหลังการส่งมอบ" },
];

// รีวิว (ตัวอย่าง) — แทนที่ด้วยรีวิวจริงที่ลูกค้าอนุญาตแล้ว และตั้ง REVIEWS_ARE_SAMPLE = false
export const REVIEWS_ARE_SAMPLE = true;
export const REVIEWS = [
  { initial: "ก", name: "ชื่อลูกค้า", plan: "แบบบ้านสองชั้น", photo: "1600566753086-00f18fb6b3ea",
    quote: "ทีมงานอธิบายทุกขั้นตอนชัดเจน เข้าหน้างานแล้วรู้สึกสบายใจ เหมือนมีญาติมาช่วยดูแลบ้านให้" },
  { initial: "ข", name: "ชื่อลูกค้า", plan: "แบบบ้านชั้นเดียว", photo: "1600607687939-ce8a6c25118c",
    quote: "งานละเอียด ตรงไปตรงมาเรื่องราคา มีอะไรบอกก่อนเสมอ ได้บ้านตรงกับที่ฝันไว้" },
  { initial: "ค", name: "ชื่อลูกค้า", plan: "รีโนเวทบ้าน", photo: "1616594039964-ae9021a400a0",
    quote: "ส่งมอบแล้วยังตามดูแลให้ตลอด ประทับใจที่ไม่ทิ้งลูกค้าหลังจบงาน" },
];

export const BUDGETS = ["ต่ำกว่า 2 ล้านบาท", "2 – 4 ล้านบาท", "4 – 7 ล้านบาท", "7 – 10 ล้านบาท", "มากกว่า 10 ล้านบาท"];

// ปลายทางรับข้อมูลฟอร์ม (เช่น Formspree / Google Apps Script) — เว้นว่างไว้ = ยังไม่เชื่อมต่อ
export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || "";

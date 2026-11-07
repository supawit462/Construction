import logo from "../assets/logo-mark.svg";

// โลโก้ชั่วคราว — แทนที่ src/assets/logo-mark.svg ด้วยไฟล์โลโก้จริง
export default function Brand({ light = false, size = 36 }) {
  return (
    <a className={`brand${light ? " brand--light" : ""}`} href="#top" aria-label="Baiboon Home หน้าแรก">
      <img src={logo} alt="" width={size} height={size} />
      <span className="brand__name">Baiboon <b>Home</b></span>
    </a>
  );
}

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// build เป็นไฟล์ dist/index.html ไฟล์เดียว (ฝัง JS/CSS/ไอคอนไว้ข้างใน)
// จึงดับเบิลคลิกเปิดจากเครื่องได้ และอัปโหลดขึ้นโฮสต์ไหนก็ได้
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: "./",
});

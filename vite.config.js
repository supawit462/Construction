import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" ให้ไฟล์ที่ build แล้ววางบนโฮสต์ไหนก็ได้ (รวมถึงโฟลเดอร์ย่อย)
export default defineConfig({
  plugins: [react()],
  base: "./",
});

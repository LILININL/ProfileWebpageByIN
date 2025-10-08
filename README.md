# FirstReact Playground

แอป React + Vite ขนาดกะทัดรัดที่โชว์หน้า Landing เท่ ๆ, ฟอร์มเข้าสู่ระบบ, สมัครสมาชิกที่แฮชรหัสผ่านด้วย SHA‑256 และหน้าเนื้อหาอื่น ๆ อีกเล็กน้อย โครงสร้างโปรเจ็กต์เน้นการแยกโฟลเดอร์ชัดเจน วางไฟล์สไตล์ร่วมกับคอมโพเนนต์ และมีเลเยอร์ services ขนาดเล็กให้ดูแลโค้ดได้ง่ายตอนขยายฟีเจอร์

## ✨ ไฮไลต์

- **สแต็กทันสมัย** ใช้ Vite + React 18 พร้อมปลั๊กอิน Fast Refresh ทางการ
- **ระบบเส้นทาง (Routing)** ผ่าน `src/routes/AppRoutes.jsx` ครบทั้ง Home, Is Me, Contact, Login, Register
- **ตัวช่วยทำงานด้าน Auth** ใน `src/services/auth` แฮชรหัสผ่านด้วย SHA‑256 ก่อนยิง API
- **ตั้งค่า API ได้ยืดหยุ่น** ผ่าน `src/config/apiConfig.js` รองรับ `VITE_API_BASE_URL` และ `VITE_BASE_PATH_API`
- **สไตล์แยกกับคอมโพเนนต์** แต่ละหน้ามีไฟล์ CSS ของตัวเอง ไม่ต้องพึ่ง module/Styled-components

## 🚀 เริ่มต้นใช้งาน

```bash
npm install
npm run dev
```

Vite จะเปิดที่ `http://localhost:5173` อัตโนมัติ หากอยากทดสอบผ่าน HTTPS ตอนพัฒนา (จำลองโปรดักชันหรือทดสอบ service worker) ให้สร้างใบรับรองด้วย [mkcert](https://github.com/FiloSottile/mkcert):

```bash
mkcert -install
mkcert -key-file certs/localhost-key.pem \
       -cert-file certs/localhost-cert.pem \
       localhost 127.0.0.1 ::1
```

ไฟล์ `vite.config.js` อ่านใบรับรองที่โฟลเดอร์ `certs/` อยู่แล้ว เมื่อรีสตาร์ท dev server จะได้ `https://localhost:5173`

## 🛠 การตั้งค่า Environment

สร้างไฟล์ `.env.local` (หรือ `.env`) แล้วกำหนดค่า:

```bash
VITE_API_BASE_URL=https://api.example.com
VITE_BASE_PATH_API=/auth
```

`apiConfig.js` จะจัดการ trim และต่อ path ให้เรียบร้อย สามารถเรียก `buildApiUrl("login")` หรือ endpoint อื่นได้ทันที

## 📁 ผังโปรเจ็กต์

```
src/
├─ App.jsx              # Layout หลักและ container ของ routing
├─ App.css              # Global style + animation
├─ config/
│  └─ apiConfig.js      # ตัวช่วยจัดการ base URL / path
├─ pages/
│  ├─ Home/             # หน้า landing พร้อม CTA
│  ├─ Login/            # ฟอร์มเข้าสู่ระบบ + SHA-256 hashing
│  ├─ Register/         # ฟอร์มสมัครสมาชิกใช้ hashing ร่วมกัน
│  ├─ Contact/          # หน้าเนื้อหาคงที่
│  └─ IsMe/             # หน้าแนะนำตัว
├─ routes/
│  └─ AppRoutes.jsx     # แผนผังเส้นทางของ React Router
└─ services/
   ├─ auth/             # ฟังก์ชันเรียก API login/register
   └─ security/         # ยูทิลิตีแฮชรหัสผ่าน
```

## 🔐 หมายเหตุเกี่ยวกับ Auth

- ทั้งหน้า Login และ Register จะเรียก `hashPassword` เพื่อแปลงรหัสผ่านเป็น SHA‑256 ก่อนส่ง JSON ไปยัง API
- ฝั่งหลังบ้านควรเลือกหนึ่งในสองแนวทาง:
  - นำค่า SHA‑256 ที่รับมาไปเข้าบล็อก bcrypt/Argon2 อีกชั้นเพื่อเทียบกับที่เก็บไว้
  - หรือเก็บ bcrypt ของ SHA‑256 ตั้งแต่ขั้นตอนสมัครสมาชิก แล้วตอนเข้าสู่ระบบก็แฮชเทียบด้วยวิธีเดียวกัน
- โปรดเสิร์ฟแอปนี้ผ่าน HTTPS เสมอในโปรดักชัน การแฮชฝั่ง client เป็นเพียงการปิดบัง ไม่ใช่การแทนที่ TLS

## 📦 สคริปต์ที่ใช้บ่อย

- `npm run dev` – เปิด Vite dev server (รองรับ HTTPS ถ้ามีใบรับรอง)
- `npm run build` – สร้างไฟล์โปรดักชันในโฟลเดอร์ `dist`
- `npm run preview` – ทดสอบเสมือนโปรดักชันจากไฟล์ที่ build แล้ว

## 🤝 อยากต่อยอดทำอย่างไร

- เพิ่มหน้าหรือฟีเจอร์ได้โดยคัดลอกโครงสร้างโฟลเดอร์ใน `src/pages`
- ขยาย services layer ให้รองรับ API อื่น ๆ
- ใส่ state management หรือ data fetching library เพิ่มเมื่อโปรเจ็กต์โตขึ้น

ถ้าคุณเอาไปดัดแปลงต่อ ฝากกดดาวหรือแชร์ให้ดูบ้าง—อยากเห็นสุดยอดผลงานต่อยอดจากสตาร์ทเตอร์ตัวนี้ครับ! 🙌

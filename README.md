# FirstReact Playground

โปรเจ็กต์น้อย ๆ แต่ว่าใจ๋ใหญ่ ใช้ React กับ Vite ปั้นหน้าแลนดิ้ง ฟอร์มเข้าระบบ ฟอร์มสมัครสมาชิก (รหัสผ่านจะถูกแปลงเป็น SHA‑256 ก่อนส่ง) กับหน้าข้อมูลอีกกำเดียว โครงสร้างโค้ดจัดแยกเป็นสัดส่วน ดูแลง่ายขยายได้สะดวก ชุดนี้ตั้งใจ๋ให้เอาไปต่อยอดหรือก๊อปแนวไปลุยของตัวเอง

## ✨ ของเด่นในโปรเจ็กต์

- **สแต็กใหม่ขะหนาด**: React 18 + Vite พร้อมปลั๊กอิน Fast Refresh อย่างเป็นทางการ
- **เส้นทางชัดเจน**: ใช้ `src/routes/AppRoutes.jsx` พาไปหน้า Home, Is Me, Contact, Login, Register ตามลำดับ
- **บริการ Auth เล็ก ๆ**: อยู่ใน `src/services/auth` ช่วยแฮชรหัสผ่านเป็น SHA‑256 ก่อนไปหา API
- **ตั้งค่า API ง่าย**: ไฟล์ `src/config/apiConfig.js` รับค่า `VITE_API_BASE_URL` กับ `VITE_BASE_PATH_API` แล้วจัดการเรียบ
- **สไตล์วางคู่คอมโพเนนต์**: แต่ละหน้าใน `src/pages` มีไฟล์ CSS ของจะอี้ ไม่ต้องพึ่ง Styled-components หรือ CSS module

## 🚀 จะเริ่มต้นยังไง

```bash
npm install
npm run dev
```

ค่าเริ่มต้น Vite จะเปิดที่ `http://localhost:5173` อัตโนมัติ๋ ถ้าอยากลองโหมด HTTPS ตอนพัฒนา (เผื่อลองเหมือนโปรดักชันหรือเทสต์ service worker) สร้างใบรับรองด้วย [mkcert](https://github.com/FiloSottile/mkcert) ตามนี้

```bash
mkcert -install
mkcert -key-file certs/localhost-key.pem \
       -cert-file certs/localhost-cert.pem \
       localhost 127.0.0.1 ::1
```

เมื่อมีไฟล์ในโฟลเดอร์ `certs/` แล้ว รีสตาร์ต dev server จะได้ `https://localhost:5173` พร้อมใช้เลย

## 🛠 ตั้งค่า Environment

สร้างไฟล์ `.env.local` หรือ `.env` แล้วแปะค่าตามนี้

```bash
VITE_API_BASE_URL=https://api.example.com
VITE_BASE_PATH_API=/auth
```

`apiConfig.js` จะช่วยตัดสแลชเกิน ๆ แล้วรวมเป็น URL เดียว เครื่องอื่นก็เรียก `buildApiUrl("login")` ได้สะดวก

## 📁 ผังโฟลเดอร์ (ว่าไปตามสาบเมือง)

```
src/
├─ App.jsx              # โครงหลักของหน้า + container สำหรับ Router
├─ App.css              # สไตล์พื้น ๆ กับแอนิเมชัน
├─ config/
│  └─ apiConfig.js      # ตัวช่วยสร้าง URL สำหรับ API
├─ pages/
│  ├─ Home/             # หน้าแรกมีปุ่มเรียกไปหน้าต่าง ๆ
│  ├─ Login/            # ฟอร์มเข้าสู่ระบบ + แฮชรหัสผ่าน
│  ├─ Register/         # ฟอร์มสมัครสมาชิก ใช้แฮชเดียวกัน
│  ├─ Contact/          # หน้าเอาไว้ใส่ข้อมูลติดต่อ
│  └─ IsMe/             # หน้าเล่าเรื่องตั๋วเก่า (About Me)
├─ routes/
│  └─ AppRoutes.jsx     # ไฟล์รวมเส้นทางของ React Router
└─ services/
   ├─ auth/             # ฟังก์ชันเรียก API Login / Register
   └─ security/         # ตัวแฮชรหัสผ่าน SHA‑256
```

## 🔐 โน้ตเกี่ยวกับฟลว์เข้าสู่ระบบ

- ทั้งฟอร์ม Login กับ Register จะเรียก `hashPassword` เพื่อแปลงรหัสผ่านเป็น SHA‑256 ก่อนใส่ JSON ให้ API
- หลังบ้านเลือกได้สองทาง:
  - รับค่า SHA‑256 นั้นไปเข้ากับ bcrypt/Argon2 อีกชั้นแล้วเทียบกับที่เก็บไว้
  - หรือเก็บ bcrypt ของ SHA‑256 ตั้งแต่ตอนสมัคร แล้วตอนล็อกอินก็ใช้วิธีเดียวกัน
- โปรดเปิดใช้งาน HTTPS ในโปรดักชันเสมอ การแฮชฝั่งผู้ใช้เป็นแค่การพราง ไม่ใช่กำแพงแทน TLS

## 📦 สคริปต์ประจำ

- `npm run dev` – เปิด Vite dev server (ถ้ามีใบรับรองก็วิ่ง HTTPS ได้)
- `npm run build` – สร้างไฟล์โปรดักชันไว้ใน `dist`
- `npm run preview` – ลองรันไฟล์ที่ build แล้วแบบเสมือนโปรดักชัน

## 🤝 ถ้าอยากต่อยอด

- เพิ่มหน้าหรือฟีเจอร์ใหม่ก๊อปโครงจาก `src/pages` ได้เลย
- เติมฟังก์ชันใน services ให้เรียก API เพิ่ม
- ใส่ state management หรือ data fetching library ตามสะดวกเมื่อโปรเจ็กต์ใหญ่ขึ้น

ถ้าใผเอาไปทำต่อ ฝากบอกม๋าโตยกำเต๊อะ จะได้ตามไปผ่อผลงานว่ามันโตขึ้นไปจ๊าดใด 🌾

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

ถ้าคุณเอาไปดัดแปลงต่อ แจ้งข่าวกันได้เลย อยากเห็นไอเดียที่แตกแขนงจากสตาร์ทเตอร์ตัวนี้เหมือนกันครับ

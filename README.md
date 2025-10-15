# FirstReact Playground

โปรเจ็กต์น้อย ๆ แต่ว่าใจ๋ใหญ่ ใช้ React กับ Vite ปั้นหน้าแลนดิ้ง ฟอร์มเข้าระบบ ฟอร์มสมัครสมาชิก (รหัสผ่านจะถูกแปลงเป็น SHA‑256 ก่อนส่ง) กับหน้าข้อมูลอีกกำเดียว โครงสร้างโค้ดจัดแยกเป็นสัดส่วน ดูแลง่ายขยายได้สะดวก ชุดนี้ตั้งใจ๋ให้เอาไปต่อยอดหรือก๊อปแนวไปลุยของตัวเอง

## 🔄 อัปเดตครั้งล่าสุด (2025‑10‑15)

สิ่งที่รีแฟกเตอร์และเพิ่มเข้ามาวันนี้ เพื่อให้โค้ดสะอาด ใช้งานง่าย และต่อยอดได้เร็ว:

- ระบบนำทางใหม่แบบ Sidebar (Menubar) ทางซ้าย ใช้แทน TopBar เดิม และผูกกับสถานะล็อกอิน
  - แสดง/ซ่อนเมนูอัตโนมัติ: ผู้เยี่ยมชมเห็น Home/Contact/Login, ผู้ที่ล็อกอินแล้วเห็น Dashboard/Settings (Login จะหายไป)
  - ไฟล์: `src/components/Sidebar.jsx`, ผูกกับ `useStoredAuth()`
- ธีมและพื้นหลัง: ทุกหน้าถูกจัดให้ใช้พื้นหลังเดียวกันและ glass‑card สไตล์เดียวกัน (Home, Dashboard, Settings, …)
- เปลี่ยนมาใช้ Tailwind utilities เต็มรูปแบบ ลด CSS แยกไฟล์ในหน้า เหลือเพียง utility ใน JSX
- ปรับปรุง hook สถานะผู้ใช้ให้รีเฟรชทันทีเมื่อ login/logout (ไม่มีการรีโหลดหน้า)
  - โมดูลเก็บสถานะร่วม + pub/sub ภายใน hook: `src/hooks/useStoredAuth.js`
  - รับ event เปลี่ยนค่าใน Local/Session storage ข้ามแท็บ
- รวมเส้นทาง API ไว้ที่เดียว
  - เพิ่ม `API_PATHS` ใน `src/config/apiConfig.js` และให้ service ทุกตัวเรียกผ่าน `buildApiUrl(API_PATHS.xxx)`
- บริการเปลี่ยนรหัสผ่าน (service ใหม่)
  - ไฟล์: `src/services/auth/changePasswordService.js`
  - ขั้นตอน: validate → SHA‑256 (hex 64) ทั้งรหัสเดิม/ใหม่ → POST ไปที่ `API_PATHS.changePassword`
  - ชื่อฟิลด์ตามหลังบ้าน: `{ email, old_password, new_password }`
  - ดึงอีเมลจากสถานะล็อกอินเท่านั้น และป้องกันการใส่อีเมลปลอมจาก DevTools (ถ้ามี email ที่ส่งมาและไม่ตรง session จะ throw)
  - เพิ่ม validator: `validateChangePasswordInput` ใน `src/services/auth/validators.js`
- อัปเดตบริการเดิมให้ใช้เส้นทางกลาง
  - `loginService.js` → `buildApiUrl(API_PATHS.login)`
  - `registerService.js` → `buildApiUrl(API_PATHS.register)`
- หน้า Settings (ใหม่)
  - ไฟล์: `src/pages/Settings/Settings.jsx`
  - แบบฟอร์มเปลี่ยนรหัสผ่านใช้ service ใหม่ พร้อมสถานะโหลด/ข้อความแจ้งผล
  - โซนแก้ไขโปรไฟล์พร้อมตัวอัปโหลด/ครอปรูปโปรไฟล์
- คอมโพเนนต์ AvatarEditor (ใหม่)
  - ไฟล์: `src/components/AvatarEditor.jsx`
  - อัปโหลดเฉพาะ `.jpg .png .gif`, ครอปวงกลมด้วย `react-easy-crop`, พรีวิววงกลม
  - UX: คลิกที่วงกลม (มี overlay กล้อง) เพื่อเลือกไฟล์, เข้าโหมดครอปเต็มกรอบ, ปุ่ม “ยกเลิก/ใช้รูปนี้” แยกบรรทัด
  - ยูทิลิตีครอปรูป: `src/utils/cropImage.js` (คืน `Blob` + `ObjectURL`) – พร้อมสำหรับต่อ API อัปโหลดภายหลัง

ตัวอย่างการใช้ service เปลี่ยนรหัสผ่าน

```ts
import { changePassword } from "src/services/auth/changePasswordService";

await changePassword({
  currentPassword: "old-plain-text", // service จะ SHA-256 ให้ และตรวจ hex64 ก่อนส่ง
  newPassword: "new-plain-text",
  confirmPassword: "new-plain-text",
});
```

ตำแหน่งไฟล์ที่เกี่ยวข้องกับ API

- คอนฟิกและเส้นทางกลาง: `src/config/apiConfig.js` (มี `API_PATHS` และ `buildApiUrl()`)
- บริการ: `src/services/auth/*.js`
- ตัวแฮช: `src/services/security/passwordHash.js`

## ✨ ของเด่นในโปรเจ็กต์

- **สแต็กใหม่ขะหนาด**: React 18 + Vite พร้อมปลั๊กอิน Fast Refresh อย่างเป็นทางการ
- **เส้นทางชัดเจน**: ใช้ `src/routes/AppRoutes.jsx` พาไปหน้า Home, Is Me, Contact, Login, Register ตามลำดับ
- **บริการ Auth แยกชั้น**: `src/services/auth` แฮชรหัสผ่าน SHA‑256 ก่อนเรียก API และใช้เส้นทางกลางจาก `API_PATHS`
- **ตั้งค่า API ง่าย**: `src/config/apiConfig.js` มี `API_BASE_URL`, `BASE_PATH_API`, `API_PATHS`, `buildApiUrl()`
- **สไตล์ด้วย Tailwind ล้วน**: ใช้ utility class เป็นหลัก (ลบ CSS แยกหน้าเดิมออก) และธีมพื้นหลัง統一

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
├─ App.jsx                 # โครงหลัก + ใส่ Sidebar เป็น layout ทั่วแอป
├─ components/
│  ├─ Sidebar.jsx          # เมนูทางซ้าย แสดง/ซ่อนตามสถานะล็อกอิน
│  └─ AvatarEditor.jsx     # อัปโหลด/ครอปรูปโปรไฟล์ (วงกลม)
├─ config/
│  └─ apiConfig.js         # API_BASE_URL, BASE_PATH_API, API_PATHS, buildApiUrl
├─ hooks/
│  └─ useStoredAuth.js     # auth store + pub/sub รีเฟรช UI ทันทีที่ login/logout
├─ pages/
│  ├─ Home/                # แลนดิ้ง + CTA
│  ├─ Login/               # ฟอร์มเข้าสู่ระบบ (แฮช SHA‑256 ก่อนส่ง)
│  ├─ Register/            # ฟอร์มสมัครสมาชิก (แฮชเหมือนกัน)
│  ├─ Dashboard/           # ตัวอย่างการ์ด/รายละเอียด พร้อมธีมใหม่
│  ├─ Settings/            # ตั้งชื่อแสดง เปลี่ยนรหัสผ่าน ออกจากระบบ
│  ├─ Contact/             # ติดต่อ
│  └─ IsMe/                # About
├─ routes/
│  └─ AppRoutes.jsx        # รวมเส้นทางทั้งหมด
└─ services/
   ├─ auth/
   │  ├─ loginService.js             # buildApiUrl(API_PATHS.login)
   │  ├─ registerService.js          # buildApiUrl(API_PATHS.register)
   │  ├─ changePasswordService.js    # buildApiUrl(API_PATHS.changePassword)
   │  ├─ validators.js               # รวม validator (เพิ่ม validateChangePasswordInput)
   │  └─ authStorage.js              # เก็บ/อ่านสถานะล็อกอิน (session/cookie)
   └─ security/
      └─ passwordHash.js             # SHA‑256 → hex 64 ตัว
```

## 🔐 โน้ตเกี่ยวกับ Auth / Security

- Login/Register ส่งรหัสผ่านเป็น SHA‑256 (hex 64)
- Change password ส่ง `{ email, old_password, new_password }` โดย:
  - email มาจากสถานะล็อกอินเท่านั้น (กันผู้ใช้แก้ email เอง)
  - ทั้ง old/new เป็น SHA‑256 (hex 64) และตรวจรูปแบบก่อนส่ง
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
- โปรดเสิร์ฟผ่าน HTTPS เสมอในโปรดักชัน การแฮชฝั่ง client เป็นเพียงการปกปิด ไม่แทนที่ TLS

## 📦 สคริปต์ที่ใช้บ่อย

- `npm run dev` – เปิด Vite dev server (รองรับ HTTPS ถ้ามีใบรับรอง)
- `npm run build` – สร้างไฟล์โปรดักชันในโฟลเดอร์ `dist`
- `npm run preview` – ทดสอบเสมือนโปรดักชันจากไฟล์ที่ build แล้ว

## 🤝 อยากต่อยอดทำอย่างไร

- เพิ่มหน้าหรือฟีเจอร์ได้โดยคัดลอกโครงสร้างโฟลเดอร์ใน `src/pages`
- ขยาย services layer ให้รองรับ API อื่น ๆ
- ใส่ state management หรือ data fetching library เพิ่มเมื่อโปรเจ็กต์โตขึ้น

ถ้าคุณเอาไปดัดแปลงต่อ แจ้งข่าวกันได้เลย อยากเห็นไอเดียที่แตกแขนงจากสตาร์ทเตอร์ตัวนี้เหมือนกันครับ

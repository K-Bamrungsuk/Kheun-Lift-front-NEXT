# Kheun Lift — แผนพัฒนา Frontend (Next.js)

> ไฟล์นี้เก็บเฉพาะ **งานฝั่งหน้าเว็บ**
> เรื่องที่ใช้ร่วมกัน (การตัดสินใจ D1–D6, สถาปัตยกรรม, migration, env ของ Go, ความเสี่ยง, ลำดับการตัดงาน)
> อยู่ใน **แผนหลัก** ที่ [`kheun-lift-backend-go/PLAN.md`](https://github.com/K-Bamrungsuk/Kheun-Lift-backend-go/blob/main/PLAN.md)
> (บนเครื่อง: `../kheun-lift-backend-go/PLAN.md`)

**เป้าหมาย:** เปลี่ยนหน้า demo ทั้งหมดให้ใช้ข้อมูลจริงจาก Go แล้วเพิ่มฟีเจอร์ใหม่ภายใน 5 สัปดาห์
**สรุปการตัดสินใจที่กระทบฝั่งนี้:** Next อยู่ที่ `app.<domain>` บน Vercel, Go อยู่ที่ `api.<domain>` (D1, D2) · ไม่มี repost (D4) · reject มีเหตุผลให้แสดง (D6)

---

## สารบัญ

- [วิธีอ่านแผนนี้](#วิธีอ่านแผนนี้)
- [กติกาการเขียนโค้ดฝั่งนี้](#กติกาการเขียนโค้ดฝั่งนี้)
- [สัปดาห์ 0 — เตรียมตัว](#สัปดาห์-0--เตรียมตัว)
- [สัปดาห์ 1 — ต่อ API ทุกหน้า + deploy](#สัปดาห์-1--ต่อ-api-ทุกหน้า--deploy)
- [สัปดาห์ 2 — หน้า Admin + Achievement](#สัปดาห์-2--หน้า-admin--achievement)
- [สัปดาห์ 3 — Forgot password + Google](#สัปดาห์-3--forgot-password--google)
- [สัปดาห์ 4 — Feed + Like + Comment](#สัปดาห์-4--feed--like--comment)
- [สัปดาห์ 5 — Notification + เก็บงาน](#สัปดาห์-5--notification--เก็บงาน)
- [หน้าทั้งหมดเมื่อเสร็จ](#หน้าทั้งหมดเมื่อเสร็จ)
- [Environment variables](#environment-variables)

---

## วิธีอ่านแผนนี้

- งานมีรหัส **F** = Frontend เช่น **F1.4** = สัปดาห์ 1 ข้อ 4 ส่วนงาน Go ใช้ **B** (อยู่ในแผนหลัก)
- **"ต้องรอ B2.4"** = ต้องให้ endpoint ฝั่ง Go ข้อนั้นเสร็จก่อน → ระหว่างรอทำ UI ด้วยข้อมูลตัวอย่างได้
- แต่ละข้อแบ่งเป็น **ทำอะไร / ทำไม / ทำยังไง / เสร็จเมื่อ**
- กฎของ repo ยังใช้: เสนอก่อนแก้, ห้าม build เอง, test ได้เฉพาะจุดเสี่ยงและต้องอนุมัติ (ดู `AGENTS.md`)
- **⚠ Next 16 ไม่เหมือนที่เคยเรียน** — ก่อนใช้ API ไหนให้อ่าน `node_modules/next/dist/docs/` ก่อนทุกครั้ง (เช่น `middleware` เปลี่ยนชื่อเป็น `proxy`, และโปรเจกต์เปิด `cacheComponents` อยู่ ซึ่งเปลี่ยนวิธีใช้ `cookies()`)

---

## กติกาการเขียนโค้ดฝั่งนี้

### โครงโฟลเดอร์ (ต่อจากที่มีอยู่)

| ที่ | เก็บอะไร | ตัวอย่าง |
|---|---|---|
| `app/` | route เท่านั้น — ไฟล์ `page.tsx` บางๆ เรียก component จาก `features/` | `app/(dashboard)/dashboard/page.tsx` |
| `features/<ชื่อ>/components/` | component ของฟีเจอร์นั้น | `features/dashboard/components/` |
| `features/<ชื่อ>/api.ts` | ฟังก์ชันเรียก API ของฟีเจอร์นั้น | `features/lifts/api.ts` → `createLift()` |
| `features/<ชื่อ>/types.ts` | type ของ response จาก Go | `LiftRecord`, `User` |
| `components/` | ของที่ใช้หลายฟีเจอร์ (layout, ui) | `app-shell.tsx`, `icon.tsx` |
| `lib/` | helper กลาง | `lib/api.ts`, `lib/youtube.ts` |

### ดึงข้อมูลแบบไหนเมื่อไร

| กรณี | ใช้ | เหตุผล |
|---|---|---|
| **อ่าน** ข้อมูลเพื่อแสดงหน้า | **Server Component** + `serverFetch()` ที่ส่ง cookie ต่อให้ Go | หน้าโหลดมาพร้อมข้อมูล ไม่กระพริบ |
| **เขียน** (ส่งฟอร์ม, like, ลบ) | **Client Component** + `clientFetch()` (`credentials: "include"`) | browser ส่ง cookie เอง |
| **login / register / forgot password** | **Client Component เท่านั้น** | ต้องให้ request ออกจาก browser ผู้ใช้ ไม่งั้น Go เห็น IP ของ Vercel แล้ว rate limit นับทุกคนรวมกัน |

### กฎอื่น
- type ของ response เขียนให้ตรงกับ struct ฝั่ง Go (ดู tag `json` ใน `internal/*/model/`)
- error จาก Go มีรูปแบบ `{"message": "..."}` เสมอ → แสดงข้อความนั้นให้ผู้ใช้ได้เลย
- รูปโปรไฟล์เป็น URL อะไรก็ได้ → ใช้ `<img>` ธรรมดา ไม่ใช้ `next/image` (ต้องตั้ง `remotePatterns` ทุก domain)
- ทุกปุ่มที่ส่ง request: ปิดปุ่มระหว่างรอ + แสดงข้อความระหว่างทำ (เช่น "Saving...")
- รักษา accessibility ที่มีอยู่: `label` ทุก input, `aria-*`, focus ring, skip link

---

## สัปดาห์ 0 — เตรียมตัว

- [x] **F0.1 Commit งานค้าง** — redesign + หน้า `/log-lift` + ไฟล์ `PLAN.md` นี้ แล้ว push
- [ ] **F0.2 สมัคร Vercel** + เชื่อม GitHub repo นี้ (ยังไม่ต้องตั้ง domain)
- [ ] **F0.3 อ่าน docs Next 16** ใน `node_modules/next/dist/docs/` หัวข้อ: `proxy`, `cookies`, `cacheComponents`, `loading.js`, `error.js`, `redirect`

---

## สัปดาห์ 1 — ต่อ API ทุกหน้า + deploy

**เป้าหมาย:** ทุกหน้าใช้ข้อมูลจริง ไม่มีคำว่า "Demo" เหลือ และใช้ได้บน `app.<domain>`

### F1.1 Spike: deploy หน้าเปล่าขึ้น Vercel (วันที่ 1 พร้อม B1.1)
- **ทำอะไร:** deploy Next ตัวปัจจุบันขึ้น Vercel ชี้ `app.<domain>`
- **ทดสอบร่วมกับ Go:** เปิด DevTools บน `app.<domain>` → `fetch("https://api.<domain>/health")` ได้ผล, login แล้วมี cookie `kheun_session` ที่ Domain `.<domain>`
- **เสร็จเมื่อ:** ทั้ง `app.` และ `api.` ใช้ HTTPS ได้ และ cookie ข้ามกันได้ (ต้องรอ B1.3, B1.4)

### F1.2 `lib/api.ts` — ตัวเรียก API กลาง — 🟡 โค้ดเสร็จ รอทดสอบใน browser + commit
- **ทำอะไร:** ฟังก์ชัน 2 ตัว ใช้ทั้งแอป
  - `clientFetch<T>(path, init?)` — สำหรับ Client Component, ใส่ `credentials: "include"`
  - `serverFetch<T>(path, init?)` — สำหรับ Server Component, อ่าน cookie ด้วย `cookies()` แล้วส่งเป็น header `Cookie` ให้ Go, ตั้ง `cache: "no-store"` (ข้อมูลของแต่ละคนไม่ควร cache รวม)
- **ทั้งสองตัวต้อง:**
  - ต่อ URL ด้วย `NEXT_PUBLIC_API_URL`
  - ใส่ `Content-Type: application/json` เมื่อมี body (Go ตอบ 415 ถ้าไม่มี)
  - ถ้า status ไม่ใช่ 2xx → throw `ApiError` ที่มี `status` และ `message` จาก body
- **ทำไมต้องรวมไว้ที่เดียว:** ถ้าวันหนึ่งเปลี่ยน URL หรือวิธีจัดการ error แก้จุดเดียว
- **เสร็จเมื่อ:** หน้า dashboard เรียก `serverFetch("/users/me")` ได้ข้อมูลจริง

### F1.3 Route protection — 🟡 โค้ดเสร็จ รอทดสอบใน browser + commit
- **ต่างจากแผนเดิม:** `proxy.ts` ไม่พาคนที่มี cookie ออกจาก `/login` เพราะถ้า cookie ค้างแต่ session หมดอายุจะวน `/login` ↔ `/dashboard`
- **ทำอะไร:** หน้าใน `(dashboard)` ต้อง login, หน้า `/login` `/register` ถ้า login แล้วให้ไป dashboard
- **ทำยังไง (2 ชั้น):**
  1. **`proxy.ts`** (ชื่อใหม่ของ middleware ใน Next 16 — เช็ก docs): ไม่มี cookie `kheun_session` → redirect `/login` (เช็กแค่มี cookie ไหม ไม่เรียก API → เร็ว)
  2. **`app/(dashboard)/layout.tsx`**: เรียก `serverFetch("/users/me")` → ได้ 401 (cookie หมดอายุ/ปลอม) → `redirect("/login")` แล้วส่ง `user` ให้ `AppShell` แสดงชื่อและรูปจริง
- **หน้า public:** `/leaderboard` ควรดูได้โดยไม่ login → ย้ายออกจาก `(dashboard)` หรือทำ layout แยกที่ไม่บังคับ login (ต้องรอ B1.5)
- **เสร็จเมื่อ:** เปิด `/dashboard` ตอนไม่ login → ไป `/login`, ลบ cookie แล้ว refresh → ไป `/login`

### F1.4 Login + Register — 🟡 โค้ดเสร็จ รอทดสอบใน browser + commit
- **ต่างจากแผนเดิม:** สมัครเสร็จแล้ว login ให้อัตโนมัติ ไปหน้า `/dashboard` เลย ไม่กลับไปหน้า `/login`
- **ทำอะไร:** เปลี่ยนหน้า placeholder เป็นฟอร์มจริง
- **ทำยังไง:**
  - Client Component ใน `features/auth/components/`
  - Register: username (1–20), email, password (≥ 6) → `POST /auth/register` → สำเร็จแล้วไป `/login` พร้อมข้อความ "สมัครสำเร็จ"
  - Login: email, password → `POST /auth/login` → สำเร็จแล้ว `router.replace("/dashboard")` + `router.refresh()`
  - validate ฝั่ง browser ด้วย attribute ของ HTML (`required`, `minLength`, `type="email"`) ก็พอ — Go validate ซ้ำอยู่แล้ว
  - แสดง `message` จาก Go เมื่อ error (เช่น 409 "Username or email is already registered.", 429 "Too many requests")
- **เสร็จเมื่อ:** สมัครแล้ว login ได้บนเว็บจริง, error แสดงถูกต้อง

### F1.5 Logout — 🟡 โค้ดเสร็จ รอทดสอบใน browser + commit
- ปุ่มใน `AppShell` (desktop) และหน้า profile (mobile) → `POST /auth/logout` → `router.replace("/login")`

### F1.6 Onboarding — กรอกโปรไฟล์ก่อนใช้งาน
- **ทำไม:** Go ไม่ให้ส่ง lift ถ้ายังไม่มี `gender` หรือ `bodyWeight` (ตอบ 400 "Body weight and gender are required.") — ผู้ใช้ใหม่จะงงถ้าไม่บอกก่อน
- **ทำยังไง:** ใน dashboard layout ถ้า `user.gender` หรือ `user.bodyWeight` เป็น `null` → แสดงการ์ดให้กรอก (gender, น้ำหนักตัว, ส่วนสูง, วันเกิด) → `PATCH /users/me`
- **เสร็จเมื่อ:** ผู้ใช้ใหม่กรอกครั้งเดียวแล้วเห็นรุ่นน้ำหนักของตัวเอง

### F1.7 Dashboard ข้อมูลจริง
- `GET /users/me` → ชื่อ, น้ำหนักตัว, `weightClass.name`
- `GET /lifts/me` → personal records (best ของแต่ละท่าที่ verified) + lift ล่าสุด 5 รายการ
  - ลอก logic จาก `Kheun-Lift-frontend/src/utils/getPersonalRecords.js` มาเป็น TypeScript
- `GET /leaderboards/random` → การ์ด leaderboard ด้านข้าง (ถ้า `data` เป็น `null` แสดง "ยังไม่มีอันดับ")
- **เสร็จเมื่อ:** ไม่มีการ import จาก `features/dashboard/data/demo.ts` แล้ว

### F1.8 Log lift ข้อมูลจริง
- ตัวเลือกท่าจาก `GET /exercises` (ไม่ hard-code Squat/Bench/Deadlift)
- น้ำหนัก (> 0, step 0.5), reps (≥ 1), caption (ไม่เกิน 300), **video URL เป็น required** (lift ไม่มีวิดีโอ verify ไม่ได้)
- `POST /lifts` → สำเร็จไป `/dashboard`, error 409 = "เคยส่ง lift น้ำหนักและ reps นี้แล้ว"
- แสดงรุ่นน้ำหนักจริงของผู้ใช้แทน `demoAthlete.weightClass`
- **เสร็จเมื่อ:** ส่ง lift แล้วเห็นสถานะ "Pending" ใน dashboard

### F1.9 Profile ข้อมูลจริง
- ข้อมูลจาก `/users/me` + lift ทั้งหมดจาก `/lifts/me`
- **แก้โปรไฟล์:** ปุ่ม "Edit profile" เปิดฟอร์ม → `PATCH /users/me` (ส่งเฉพาะ field ที่เปลี่ยน, Go ไม่รับค่า `null`)
- **แก้ caption / ลบ lift ของตัวเอง:** `PATCH /lifts/:id`, `DELETE /lifts/:id` + กล่องยืนยันก่อนลบ
- **ลบบัญชี:** `DELETE /users/me` → ถ้าได้ 409 แสดงข้อความ "ลบ lift ก่อน" (จนกว่าจะทำ B4.5)

### F1.10 Leaderboard ข้อมูลจริง
- ตัวเลือก: ท่า (`/exercises`), เพศ, รุ่นน้ำหนัก (`/weight-classes?gender=`)
- เก็บตัวเลือกไว้ใน URL (`?exercise=1&gender=male&weightClass=4`) → แชร์ลิงก์ได้, กด back ได้
- `GET /leaderboards/exercises/:id/weight-classes/:wcId?gender=` → **response เป็น `{message, data}` ไม่ใช่ array**
- ไฮไลต์แถวของผู้ใช้ที่ login อยู่ (ถ้า login)
- **เสร็จเมื่อ:** ดูได้โดยไม่ login (ต้องรอ B1.5)

### F1.11 เก็บกวาด
- [ ] ลบ `features/dashboard/data/demo.ts`, `features/leaderboard/data/demo.ts`
- [ ] ลบแถบ "Demo preview" ใน `components/layout/app-shell.tsx`
- [x] avatar ใน header ใช้ตัวอักษรแรกของ username จริง (ตอนนี้ hard-code "K")
- [ ] `loading.tsx` + `error.tsx` ใน `(dashboard)` — error ให้มีปุ่ม "ลองใหม่"
- [ ] อัปเดต `README.md` ส่วน "Preview limitations" ที่ไม่จริงแล้ว

**สัปดาห์ 1 เสร็จเมื่อ:** สมัคร → login → กรอกโปรไฟล์ → ส่ง lift → เห็นใน profile **บน `app.<domain>`**

---

## สัปดาห์ 2 — หน้า Admin + Achievement

### F2.1 `lib/youtube.ts`
- ลอก `getYoutubeId`, `getYoutubeThumbnail`, `getYoutubeEmbedUrl` จาก `Kheun-Lift-frontend/src/utils/youtube.js` มาเป็น TypeScript
- ใช้ใน admin (สัปดาห์นี้) และ feed (สัปดาห์ 4)
- URL ที่ไม่ใช่ YouTube → แสดงเป็นลิงก์ธรรมดา "เปิดวิดีโอ"

### F2.2 หน้า `/admin` (ต้องรอ B2.2–B2.5)
- **กันคนที่ไม่ใช่ admin:** `app/(dashboard)/admin/layout.tsx` → `user.role !== "admin"` → `notFound()` (ไม่บอกด้วยซ้ำว่ามีหน้านี้)
  - นี่แค่ซ่อนหน้า — **ความปลอดภัยจริงอยู่ที่ Go** (B2.3 ตอบ 403)
- **รายการรอตรวจ:** `GET /admin/lifts?status=pending` → การ์ดแต่ละอัน: ชื่อผู้ใช้, ท่า, น้ำหนัก × reps, รุ่น, caption, วิดีโอฝัง
- **ปุ่ม:**
  - Verify → `PATCH /admin/lifts/:id/status {status: "verified"}`
  - Reject → เปิดช่องกรอกเหตุผล (บังคับ 1–300 ตัวอักษร) → `{status: "rejected", reason}`
  - กดแล้วเอาการ์ดออกจากรายการทันที
- **โหลดเพิ่ม:** ปุ่ม "Load more" ใช้ `nextCursor`
- **Tab:** Pending / Verified / Rejected (ใช้ `?status=` ตัวเดียวกัน) — ไว้ตรวจย้อนหลัง
- **เสร็จเมื่อ:** admin verify แล้ว lift ขึ้น leaderboard

### F2.3 ลิงก์ Admin ใน nav
- `AppNavigation` รับ prop `isAdmin` จาก layout → แสดงลิงก์ "Admin" เฉพาะ admin

### F2.4 แสดงเหตุผลที่ reject
- ใน profile และ dashboard: lift ที่ `status === "rejected"` แสดง `rejectReason` ใต้รายการ (ต้องรอ B2.5)

### F2.5 Achievement ในหน้า profile (ต้องรอ B2.6)
- `GET /users/:id/achievements` → grid ของ badge
- ได้แล้ว = สีทอง + icon, ยังไม่ได้ = จาง + บอกเงื่อนไข (เช่น "Deadlift 2× น้ำหนักตัว")
- ชื่อและคำอธิบาย badge เก็บใน `features/achievements/data.ts` จับคู่กับ `key` จาก Go
- **เสร็จเมื่อ:** lift ถูก verify แล้ว refresh profile เห็น badge ใหม่

---

## สัปดาห์ 3 — Forgot password + Google

### F3.1 หน้า `/forgot-password` (ต้องรอ B3.3)
- กรอก email → `POST /auth/password/forgot` → **แสดงข้อความเดียวกันเสมอ** "ถ้า email นี้มีในระบบ เราส่งรหัสไปแล้ว" → ไปหน้า reset พร้อม email ใน URL
- Client Component (ต้องออกจาก browser — ดูกติกาด้านบน)

### F3.2 หน้า `/reset-password` (ต้องรอ B3.4)
- กรอกรหัส 6 หลัก (`inputMode="numeric"`, `autoComplete="one-time-code"` → มือถือเติมจาก email/SMS ได้) + รหัสผ่านใหม่ + ยืนยันรหัสผ่าน
- `POST /auth/password/reset` → สำเร็จไป `/login` พร้อมข้อความ "ตั้งรหัสใหม่แล้ว"
- ปุ่ม "ส่งรหัสใหม่" (กดได้หลัง 60 วินาที ให้ตรงกับ Go)

### F3.3 ลิงก์ "ลืมรหัสผ่าน?" ในหน้า login

### F3.4 ปุ่ม "Continue with Google" (ต้องรอ B3.7)
- ใน login และ register
- **เป็นลิงก์ `<a>` ธรรมดา** ไปที่ `${NEXT_PUBLIC_API_URL}/auth/google` — ไม่ใช้ `fetch` เพราะต้องพา browser ไปหน้า Google จริง
- หน้า login อ่าน `?error=google` → แสดง "เข้าสู่ระบบด้วย Google ไม่สำเร็จ ลองใหม่"
- ทำตาม [แนวทางปุ่มของ Google](https://developers.google.com/identity/branding-guidelines) (โลโก้, ข้อความ)
- **เสร็จเมื่อ:** กดแล้วกลับมาที่ `/dashboard` แบบ login แล้ว

---

## สัปดาห์ 4 — Feed + Like + Comment

### F4.1 เปิดเมนู Social → `/feed`
- `AppNavigation`: เปลี่ยน item "Social" ที่ตอนนี้เป็นปุ่ม disabled ให้เป็นลิงก์ `/feed`

### F4.2 หน้า `/feed` (ต้องรอ B4.2)
- หน้าแรกดึงด้วย Server Component (เร็ว, ไม่กระพริบ) → หน้าถัดไปโหลดด้วย Client Component
- **การ์ด:** avatar + username, ท่า, น้ำหนัก × reps, รุ่น, caption, thumbnail YouTube (กดแล้วเล่น), ปุ่ม like + จำนวน, จำนวน comment (กดไปหน้า detail), เวลาแบบ "3 ชม. ที่แล้ว" (`Intl.RelativeTimeFormat` ไม่ต้องลง library)
- **โหลดเพิ่มอัตโนมัติ:** `IntersectionObserver` จับ element ท้ายรายการ → เรียก `/feed?cursor=<nextCursor>` → ต่อท้าย
  - กันโหลดซ้ำระหว่างกำลังโหลด, หยุดเมื่อ `nextCursor` เป็น `null`
  - มีปุ่ม "Load more" สำรองให้คนที่ใช้ keyboard
- **ว่าง:** "ยังไม่มี lift ที่ผ่านการตรวจ"

### F4.3 ปุ่ม Like (ต้องรอ B4.3)
- **optimistic update:** กดแล้วเปลี่ยนสีและตัวเลขทันที → ส่ง `PUT`/`DELETE /lifts/:id/like` → ถ้า error ย้อนกลับ + แจ้งเตือน
- ใช้ค่าที่ Go ตอบกลับมา (`likeCount`, `likedByMe`) แทนที่ค่าที่เดาไว้ → ตัวเลขถูกเสมอ
- `aria-pressed` บอกสถานะให้ screen reader

### F4.4 หน้า lift detail `/lifts/[id]` (ต้องรอ B4.4)
- วิดีโอเต็ม + ข้อมูล lift + ปุ่ม like
- รายการ comment (เก่าสุดก่อน, "Load more")
- ช่องพิมพ์ comment (1–500 ตัวอักษร, แสดงตัวนับ) → `POST` → ต่อท้ายรายการทันที
- ปุ่มลบ comment แสดงเฉพาะของตัวเอง (หรือทุกอันถ้าเป็น admin) → ยืนยันก่อนลบ

### F4.5 หน้าโปรไฟล์คนอื่น `/users/[id]`
- `GET /users/:id` (มีอยู่แล้ว) + `/lifts/users/:id` + achievements
- กดชื่อใน feed / leaderboard แล้วมาหน้านี้
- **เสร็จเมื่อ (สัปดาห์ 4):** ไถ feed ได้, like ได้, comment ได้, กดดูโปรไฟล์คนอื่นได้

---

## สัปดาห์ 5 — Notification + เก็บงาน

### F5.1 กระดิ่งใน header (ต้องรอ B5.3)
- `GET /notifications/unread-count` ทุก 60 วินาที (`setInterval` ใน Client Component, หยุดเมื่อแท็บถูกซ่อน `document.visibilityState`)
- จำนวนเกิน 9 แสดง "9+"
- **ไม่ทำ real-time** (WebSocket) — 60 วินาทีพอสำหรับแจ้งเตือนอันดับ

### F5.2 หน้า `/notifications`
- รายการใหม่สุดก่อน, "Load more"
- เปิดหน้าแล้วเรียก `POST /notifications/read` → จำนวนในกระดิ่งเป็น 0
- **ข้อความสร้างจาก `type` + `data`** ใน `features/notifications/format.ts`:

| type | ข้อความ | กดแล้วไป |
|---|---|---|
| `lift_verified` | "Lift {exercise} ผ่านแล้ว! คุณอันดับ #{rank} ในรุ่น {weightClass}" | leaderboard ของรุ่นนั้น |
| `lift_rejected` | "Lift {exercise} ไม่ผ่าน: {reason}" | profile |
| `rank_dropped` | "คุณตกจากอันดับ #{oldRank} เป็น #{newRank} ใน {exercise} {weightClass}" | leaderboard ของรุ่นนั้น |
| `lift_liked` / `lift_commented` (ถ้ามี) | "{username} ถูกใจ / แสดงความเห็นใน lift ของคุณ" | `/lifts/[id]` |

- type ที่ไม่รู้จัก → ไม่แสดง (เผื่อ Go เพิ่ม type ใหม่ก่อนหน้าเว็บ)

### F5.3 เช็กคุณภาพ
- [ ] ทุกหน้าที่ความกว้าง 375px (มือถือ) ไม่มี scroll แนวนอน
- [ ] ใช้ทุกหน้าด้วย keyboard อย่างเดียวได้ (Tab, Enter, Esc ปิด modal)
- [ ] Lighthouse: Accessibility ≥ 90 ทุกหน้าหลัก
- [ ] ทุกหน้ามี `metadata.title` ที่ถูกต้อง
- [ ] `npm run lint` + `npx --no-install tsc --noEmit` ผ่าน

### F5.4 README (repo นี้)
- [ ] ลิงก์เว็บจริง + บัญชี demo
- [ ] screenshot: dashboard, leaderboard, feed, admin (มือถือ + desktop)
- [ ] stack + เหตุผล: Next 16 App Router, Server Component อ่าน / Client Component เขียน, Tailwind 4
- [ ] ลิงก์ไป repo Go
- [ ] วิธีรันบนเครื่อง

---

## หน้าทั้งหมดเมื่อเสร็จ

| Path | ต้อง login | สัปดาห์ |
|---|---|---|
| `/` | — | redirect ไป `/dashboard` (มีอยู่แล้ว) |
| `/login`, `/register` | ไม่ (login แล้วถูกพาไป dashboard) | 1 |
| `/forgot-password`, `/reset-password` | ไม่ | 3 |
| `/dashboard` | ✓ | 1 |
| `/log-lift` | ✓ | 1 |
| `/profile` | ✓ | 1 |
| `/leaderboard` | ไม่ | 1 |
| `/admin` | ✓ admin | 2 |
| `/feed` | ✓ | 4 |
| `/lifts/[id]` | ✓ | 4 |
| `/users/[id]` | ✓ | 4 |
| `/notifications` | ✓ | 5 |

---

## Environment variables

| ตัวแปร | dev | prod (ตั้งใน Vercel) |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` | `https://api.<domain>` |

- ขึ้นต้นด้วย `NEXT_PUBLIC_` → ใช้ได้ทั้งใน browser และ server (ไม่ใช่ความลับ)
- สร้าง `.env.example` ที่มีตัวแปรนี้ (ค่าว่าง) — **ห้าม commit `.env.local`**
- ⚠ บนเครื่อง: Next อยู่ `localhost:3000` และ Go อยู่ `localhost:3001` → เป็น same-site เหมือนบน prod แต่ Go ต้องตั้ง `APP_ORIGIN=http://localhost:3000` (B1.3)

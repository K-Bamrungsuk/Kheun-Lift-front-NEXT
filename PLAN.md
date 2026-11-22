# Kheun Lift แผน Frontend (Next.js)

การตัดสินใจ, สถาปัตยกรรม และ endpoint อยู่ในแผนหลัก [`../kheun-lift-backend-go/PLAN.md`](../kheun-lift-backend-go/PLAN.md) (เลข Phase ตรงกัน)

---

## กติกา

- โครง: `app/` มีแค่ route, ของแต่ละฟีเจอร์อยู่ `features/<ชื่อ>/` (components, api.ts, types.ts)
- อ่านข้อมูล: Server Component + `serverFetch` (ส่ง cookie ต่อให้ Go)
- เขียนข้อมูล: Client Component + `clientFetch` (`credentials: "include"`)
- login / register / forgot password: Client Component เท่านั้น
- type มาจาก zod schema ใน `features/*/types.ts` (`z.infer`) ตรงกับ struct ฝั่ง Go, แสดง `message` จาก Go เมื่อ error
- รูปโปรไฟล์ใช้ `<img>` ไม่ใช้ `next/image`
- ปุ่มที่ส่ง request: ปิดปุ่มระหว่างรอ + มีข้อความ เช่น "Saving..."
- รักษา accessibility: label, aria, focus ring, skip link
- ⚠ Next 16 ไม่เหมือนเดิม: อ่าน `node_modules/next/dist/docs/` ก่อนใช้ API

## สถานะ (2026-11-18)

- ✅ lib/api, กันหน้า login 2 ชั้น (`proxy.ts` + layout), login / register / logout, onboarding, dashboard, log lift, profile (แก้โปรไฟล์, ลบบัญชี), หน้า error, leaderboard, รูปโปรไฟล์, lift detail (แก้ caption / ลบ), โปรไฟล์คนอื่น
- ✅ test ด้วย vitest (`npm test`), ฟอร์มใน modal ปิดด้วย `useCloseModal()` (`components/ui/modal.tsx`), edit profile / รูปโปรไฟล์ / log lift / lift detail เป็น modal แบบ state (ไม่มี URL), test ranking (`personal-record.test.ts`, `pass-target.test.ts`), Playwright (`npx playwright test`, โฟลเดอร์ `tests/`)

---

## Phase 1: Deploy

- [ ] Vercel + `NEXT_PUBLIC_API_URL=https://api.<domain>` (ตั้งก่อน build เพราะค่าฝังตอน build)
  - ⚠ preview URL `*.vercel.app` login ไม่ได้ ต้องทดสอบบน app.<domain>
- [x] Leaderboard ข้อมูลจริง
  - ตัวเลือกท่า / เพศ / รุ่น เก็บใน URL ให้แชร์ลิงก์ได้
  - response เป็น `{message, data}` ไม่ใช่ array
- [x] แก้ caption / ลบ lift ใน modal lift detail (กดจาก profile / dashboard / leaderboard, dialog ยืนยันก่อนลบ)
- [x] อัปโหลดรูปโปรไฟล์ในหน้า profile (`POST /users/me/profile-image`, FormData ช่อง `profileImage`)
  - เช็กไม่เกิน 2 MB ฝั่ง client ก่อนส่ง, Go ตรวจชนิดไฟล์จากเนื้อไฟล์
- [x] ลบรูปโปรไฟล์ (`DELETE /users/me/profile-image`) → กลับเป็น avatar เปล่า
- [x] `components/ui/avatar.tsx` ใช้ใน profile, dashboard, header มือถือ (ไม่มีรูป = ไอคอน user แทนตัวอักษรแรก)
  - ยังไม่ทำ: ครอป/ย่อรูป, พรีวิว, รูปใน leaderboard

**เสร็จเมื่อ:** สมัคร → login → กรอกโปรไฟล์ → ส่ง lift → เห็นใน profile บน app.<domain>

## Phase 2: หน้า /admin

- [ ] กันคนที่ไม่ใช่ admin ด้วย `notFound()` (ความปลอดภัยจริงอยู่ที่ Go)
- [ ] tab Pending / Verified / Rejected, การ์ดมีวิดีโอฝัง (`lib/youtube.ts`), ปุ่ม Load more
- [ ] Verify / Reject (กรอกเหตุผล) → กดแล้วเอาการ์ดออกทันที
- [ ] ลิงก์ Admin ใน nav เฉพาะ admin, แสดงเหตุผลที่ reject ใน profile / dashboard

**เสร็จเมื่อ:** admin verify แล้ว lift ขึ้น leaderboard

## Phase 3: ผลจาก AI

- [ ] การ์ด admin แสดงธง + ความเห็นของ AI, เรียงอันที่ติดธงขึ้นก่อน

## Phase 4: Achievement

- [ ] grid badge ในหน้า profile: ได้แล้ว = สีทอง, ยังไม่ได้ = จาง + บอกเงื่อนไข

## Phase 5: Forgot password + Google

- [ ] `/forgot-password` ตอบข้อความเดิมเสมอ → `/reset-password` (รหัส 6 หลัก, `autoComplete="one-time-code"`, ส่งใหม่ได้หลัง 60 วิ)
- [ ] ปุ่ม Google เป็น `<a>` ไปที่ `${API}/auth/google`, แสดง error จาก `?error=google`

## Phase 6: Feed + Like + Comment

- [ ] `/feed` หน้าแรกจาก server, หน้าถัดไปโหลดเองด้วย IntersectionObserver + ปุ่ม Load more สำรอง
- [ ] like แบบ optimistic → ใช้ค่าที่ Go ตอบกลับ, `aria-pressed`
- [ ] `/lifts/[id]` วิดีโอ + comment (1 ถึง 500 ตัว, ลบได้เฉพาะของตัวเองหรือ admin)
  - ตอนนี้ lift detail เป็น modal อย่างเดียว (ลบหน้า `/lifts/[id]` ออกแล้ว) ต้องสร้างหน้าใหม่ไว้แชร์ลิงก์ + comment, ใช้ `getLift` ใน `features/lifts/api-server.ts` ที่เตรียมไว้ และ `LiftDetail` เดิม
  - วิดีโอ YouTube (`lib/youtube.ts`) เสร็จแล้ว, comment รอ Go
- [x] `/users/[id]` โปรไฟล์คนอื่น, กดชื่อจาก leaderboard มาได้ (feed ยังไม่มี), id ตัวเอง → `/profile`

## Phase 7: Notification

- [ ] กระดิ่งถามจำนวนทุก 60 วิ (หยุดเมื่อแท็บถูกซ่อน), เกิน 9 แสดง "9+"
- [ ] `/notifications` สร้างข้อความจาก `type` + `data`, type ที่ไม่รู้จักไม่แสดง

## ต้องแก้ที่ Go

- [ ] `GET /lifts/:id` ส่ง lift ที่ไม่ใช่ `verified` ให้เฉพาะเจ้าของ (และ admin) คนอื่นได้ 404
- [ ] `GET /lifts/users/:id` คนอื่นได้เฉพาะ `verified`
  - ตอนนี้หน้าเว็บกรองให้ (comment `shortcut:` ใน `users/[id]/page.tsx`) แต่เรียก API ตรงยังเห็น pending / rejected + ลิงก์วิดีโอ
  - แก้ Go แล้วลบ filter ฝั่งหน้าเว็บออกได้

## Validate response จาก Go ด้วย zod ✅

ตอนนี้ `request` ใน `lib/api.ts` ทำ `data as T` คือเชื่อ type โดยไม่ตรวจ ถ้า Go เปลี่ยนรูปข้อมูล หน้าจะพังตอน render แทนที่จะพังตอนรับข้อมูล zod ติดตั้งแล้ว (`dependencies`)

- [x] `features/*/types.ts` เปลี่ยน `type` เป็น zod schema แล้วใช้ `z.infer` (user, lifts, leaderboard)
- [x] `request` / `serverFetch` / `clientFetch` รับ schema แล้ว `safeParse` ถ้าไม่ผ่านโยน `ApiError(502, ...)` เพื่อไม่ให้ขึ้นว่า "Cannot reach the server"
- [x] ส่ง schema ทุกจุดที่เรียก fetch (19 จุด) endpoint ที่ไม่ใช้ body ส่ง `z.unknown()`
- [x] เพิ่มในกติกา: type มาจาก zod schema ใน `types.ts`

## ค้างจากรีวิว TypeScript (optional)

- [x] ใช้ `PageProps<"/users/[id]">` แทน `{ params: Promise<{ id: string }> }` (หน้า `/lifts/[id]` ใหม่ใน Phase 6 ใช้แบบเดียวกัน)
- [x] type `after` ซ้ำ 6 ไฟล์: เปลี่ยนเป็น `variant` ที่มี type เดียวแล้ว
- [x] `[400, 404].includes(error.status)` ซ้ำ 3 ที่ (leaderboard, users, lift-detail) ทำเป็น `isNotFound(error)` (`lib/api.ts`)
- [x] test ของ `youtubeEmbedUrl` (`lib/youtube.test.ts`) และแก้ regex ให้รับลิงก์ที่ `v=` ไม่ได้อยู่ตัวแรก

## ปิดงาน

- [ ] ทุกหน้าใช้ได้ที่ 375px, ใช้ด้วย keyboard ได้, Lighthouse a11y ≥ 90, ทุกหน้ามี title
- [ ] `npm run lint` + `tsc --noEmit` + `npm test` ผ่าน
- [ ] README: ลิงก์เว็บจริง, บัญชี demo, screenshot, เหตุผลที่เลือก stack, วิธีรัน

---

## Env

| ตัวแปร | dev | prod (Vercel) |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` | `https://api.<domain>` |

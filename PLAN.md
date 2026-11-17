# Kheun Lift — แผน Frontend (Next.js)

การตัดสินใจ, สถาปัตยกรรม และ endpoint อยู่ในแผนหลัก [`../kheun-lift-backend-go/PLAN.md`](../kheun-lift-backend-go/PLAN.md) (เลข Phase ตรงกัน)

---

## กติกา

- โครง: `app/` มีแค่ route, ของแต่ละฟีเจอร์อยู่ `features/<ชื่อ>/` (components, api.ts, types.ts)
- อ่านข้อมูล: Server Component + `serverFetch` (ส่ง cookie ต่อให้ Go)
- เขียนข้อมูล: Client Component + `clientFetch` (`credentials: "include"`)
- login / register / forgot password: Client Component เท่านั้น
- type ตรงกับ struct ฝั่ง Go, แสดง `message` จาก Go เมื่อ error
- รูปโปรไฟล์ใช้ `<img>` ไม่ใช้ `next/image`
- ปุ่มที่ส่ง request: ปิดปุ่มระหว่างรอ + มีข้อความ เช่น "Saving..."
- รักษา accessibility: label, aria, focus ring, skip link
- ⚠ Next 16 ไม่เหมือนเดิม: อ่าน `node_modules/next/dist/docs/` ก่อนใช้ API

## สถานะ (2026-11-17)

- ✅ lib/api, กันหน้า login 2 ชั้น (`proxy.ts` + layout), login / register / logout, onboarding, dashboard, log lift, profile (แก้โปรไฟล์, ลบบัญชี), หน้า error, leaderboard, รูปโปรไฟล์, lift detail (แก้ caption / ลบ), โปรไฟล์คนอื่น

---

## Phase 1 — Deploy

- [ ] Vercel + `NEXT_PUBLIC_API_URL=https://api.<domain>` (ตั้งก่อน build เพราะค่าฝังตอน build)
  - ⚠ preview URL `*.vercel.app` login ไม่ได้ ต้องทดสอบบน app.<domain>
- [x] Leaderboard ข้อมูลจริง
  - ตัวเลือกท่า / เพศ / รุ่น เก็บใน URL ให้แชร์ลิงก์ได้
  - response เป็น `{message, data}` ไม่ใช่ array
- [x] แก้ caption / ลบ lift ในหน้า `/lifts/[id]` (modal เมื่อกดจาก profile / dashboard / leaderboard, กล่อง `confirm()` ก่อนลบ)
- [x] อัปโหลดรูปโปรไฟล์ในหน้า profile (`POST /users/me/profile-image`, FormData ช่อง `profileImage`)
  - เช็กไม่เกิน 2 MB ฝั่ง client ก่อนส่ง, Go ตรวจชนิดไฟล์จากเนื้อไฟล์
- [x] ลบรูปโปรไฟล์ (`DELETE /users/me/profile-image`) → กลับเป็น avatar เปล่า
- [x] `components/ui/avatar.tsx` ใช้ใน profile, dashboard, header มือถือ (ไม่มีรูป = ไอคอน user แทนตัวอักษรแรก)
  - ยังไม่ทำ: ครอป/ย่อรูป, พรีวิว, รูปใน leaderboard

**เสร็จเมื่อ:** สมัคร → login → กรอกโปรไฟล์ → ส่ง lift → เห็นใน profile บน app.<domain>

## Phase 2 — หน้า /admin

- [ ] กันคนที่ไม่ใช่ admin ด้วย `notFound()` (ความปลอดภัยจริงอยู่ที่ Go)
- [ ] tab Pending / Verified / Rejected, การ์ดมีวิดีโอฝัง (`lib/youtube.ts`), ปุ่ม Load more
- [ ] Verify / Reject (กรอกเหตุผล) → กดแล้วเอาการ์ดออกทันที
- [ ] ลิงก์ Admin ใน nav เฉพาะ admin, แสดงเหตุผลที่ reject ใน profile / dashboard

**เสร็จเมื่อ:** admin verify แล้ว lift ขึ้น leaderboard

## Phase 3 — ผลจาก AI

- [ ] การ์ด admin แสดงธง + ความเห็นของ AI, เรียงอันที่ติดธงขึ้นก่อน

## Phase 4 — Achievement

- [ ] grid badge ในหน้า profile: ได้แล้ว = สีทอง, ยังไม่ได้ = จาง + บอกเงื่อนไข

## Phase 5 — Forgot password + Google

- [ ] `/forgot-password` ตอบข้อความเดิมเสมอ → `/reset-password` (รหัส 6 หลัก, `autoComplete="one-time-code"`, ส่งใหม่ได้หลัง 60 วิ)
- [ ] ปุ่ม Google เป็น `<a>` ไปที่ `${API}/auth/google`, แสดง error จาก `?error=google`

## Phase 6 — Feed + Like + Comment

- [ ] `/feed` หน้าแรกจาก server, หน้าถัดไปโหลดเองด้วย IntersectionObserver + ปุ่ม Load more สำรอง
- [ ] like แบบ optimistic → ใช้ค่าที่ Go ตอบกลับ, `aria-pressed`
- [ ] `/lifts/[id]` วิดีโอ + comment (1–500 ตัว, ลบได้เฉพาะของตัวเองหรือ admin)
  - ✅ หน้า + modal + วิดีโอ YouTube (`lib/youtube.ts`) แล้ว, เหลือ comment (รอ Go)
- [x] `/users/[id]` โปรไฟล์คนอื่น, กดชื่อจาก leaderboard มาได้ (feed ยังไม่มี), id ตัวเอง → `/profile`

## Phase 7 — Notification

- [ ] กระดิ่งถามจำนวนทุก 60 วิ (หยุดเมื่อแท็บถูกซ่อน), เกิน 9 แสดง "9+"
- [ ] `/notifications` สร้างข้อความจาก `type` + `data`, type ที่ไม่รู้จักไม่แสดง

## ต้องแก้ที่ Go

- [ ] `GET /lifts/:id` ส่ง lift ที่ไม่ใช่ `verified` ให้เฉพาะเจ้าของ (และ admin) คนอื่นได้ 404
- [ ] `GET /lifts/users/:id` คนอื่นได้เฉพาะ `verified`
  - ตอนนี้หน้าเว็บกรองให้ (comment `shortcut:` ใน `lift-detail.tsx`, `users/[id]/page.tsx`) แต่เรียก API ตรงยังเห็น pending / rejected + ลิงก์วิดีโอ
  - แก้ Go แล้วลบ filter ฝั่งหน้าเว็บออกได้

## ค้างจากรีวิว TypeScript (optional)

- [ ] ใช้ `PageProps<"/lifts/[id]">` แทน `{ params: Promise<{ id: string }> }` (เช็กก่อนว่า route modal `(.)lifts/[id]` ใช้ได้)
- [ ] type `after: "back" | "profile"` ซ้ำ 6 ไฟล์ ให้ derive จาก props แบบ `log-lift-form.tsx`
- [ ] `[400, 404].includes(error.status)` ซ้ำ 3 ที่ (leaderboard, users, lift-detail) ทำเป็น `isNotFound(error)`
- [ ] test ของ `youtubeEmbedUrl` ใน `lib/youtube.ts` (ต้องอนุมัติตาม CLAUDE.md ข้อ 3)
- [ ] `data as T` ใน `lib/api.ts` ยังไม่ parse response จาก Go (ต้องเพิ่ม zod, ตัดสินใจแยก)

## ปิดงาน

- [ ] ทุกหน้าใช้ได้ที่ 375px, ใช้ด้วย keyboard ได้, Lighthouse a11y ≥ 90, ทุกหน้ามี title
- [ ] `npm run lint` + `tsc --noEmit` ผ่าน
- [ ] README: ลิงก์เว็บจริง, บัญชี demo, screenshot, เหตุผลที่เลือก stack, วิธีรัน

---

## Env

| ตัวแปร | dev | prod (Vercel) |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` | `https://api.<domain>` |

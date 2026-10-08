# Website Fix Progress Log

**Task Scope:** Fix non-donation/payment technical and functional issues.  
**Exclusion Notice:** Donation page, Razorpay payment API, payment verification, donation DB tables, and payment keys are strictly EXCLUDED from all modifications.

---

## Verified Audit Issues Status

| Issue ID | Area | Finding | Verification | Action Taken |
| -------- | ---- | ------- | ------------ | ------------ |
| **ISS-001** | Live Event | `live_event_settings` vs `live_status` table mismatch | Verified. Code uses `live_event_settings`; SQL schema created `live_status`. | Added `live_event_settings` table DDL & RLS policies to `supabase-schema.sql`. |
| **ISS-002** | DB Schema | Missing `CREATE TABLE` DDL for `join_members` & `donations` | Verified. `supabase-schema.sql` had RLS for `join_members` but lacked DDL. | Added DDL for `join_members` to `supabase-schema.sql`. (Donation table left untouched per scope). |
| **ISS-003** | Storage | Missing `aadhaar-files` bucket in SQL schema | Verified. `join/page.tsx` uploads to `aadhaar-files`, which wasn't in SQL bucket setup. | Added `aadhaar-files` bucket & RLS policies to `supabase-schema.sql`. |
| **ISS-004** | Security | Hardcoded Razorpay test key fallback | EXCLUDED | Left untouched per user mandate. |
| **ISS-005** | Error UI | `alert(JSON.stringify(dbError))` in donation | EXCLUDED | Left untouched per user mandate. |
| **ISS-006** | React/Lint | Synchronous `setState` in `useEffect` in `chatbot.tsx` & `language-context.tsx` | Verified. Triggering ESLint cascading render warnings. | Refactored `useEffect` state logic in `chatbot.tsx` & lazy initializer in `language-context.tsx`. |
| **ISS-007** | React/Lint | Impure `Math.random()` during render in `chatbot.tsx` | Verified. | Replaced `Math.random()` with `Date.now().toString(36)`. |
| **ISS-008** | Build | Duplicate parent `package-lock.json` workspace root warning | Verified. | Removed outer container `package-lock.json`. |

---

## Intentionally Excluded Items

- `src/app/donation/page.tsx`
- `src/app/api/razorpay/route.ts`
- Razorpay order creation and payment callbacks in `join/page.tsx`
- Razorpay key ID fallbacks
- `donations` table DDL / RLS in SQL schema

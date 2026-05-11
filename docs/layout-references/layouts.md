# Layout references — Merchant Loan (Gen AI standardisation file)

### Role of this file (what wins)

**What:** **Which blocks** appear, **flow**, **user purpose**, suggested Paytm component families, and **ASCII regions** (semantic only — no pixel gospel). **Not:** exact spacing or hex — use **`.cursor/tokens.mdc`**, **`design-tokens.json`**, and **`.cursor/design.mdc`** for that.

**Canonical vs `layout-pattern-catalog.md`:** For any flow **documented in this file**, **this file wins** for structure and intent. Use **`LP-*`** IDs from the catalog as a **secondary label** in PRs when helpful, or when **no** matching section exists here yet — then pick **`LP-*`** from the catalog first.

**Cross-vertical use:** Entries are **pattern templates**, not locked to one business vertical. If another product’s use case matches the **Purpose** and **Page structure** (e.g. compare options + consents, OTP + legal checkboxes, document review + acknowledgements), reuse the same composition and swap copy, routes, and data — still implement with Paytm common UI and your vertical’s tokens.

**Generic pattern IDs:** For screens not yet listed here, see **`layout-pattern-catalog.md`** (`LP-01`–`LP-50`) in the same folder — pick the closest shell, then apply tokens per `.cursor/design.mdc`.

Reference only. Implement with **`@paytm-h5-common/paytm_common_ui`**, project patterns in `src/`, and token/layout rules in `.cursor/tokens.mdc` (and product notes). This file describes **composition and intent**, not fixed colors or spacing. Each screen includes an **ASCII layout** (semantic regions only — regenerate via **`prompts/hi-pods.md (**MODE B**)`** (repo root) when structure changes).

---

## 1. Loan offer — collapsed

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=139-11970

**Purpose:** Compare loan offers, pick one, confirm identity snippets, accept consents, and move forward.

**Suggested Paytm composition**

- **Header:** `Header` / header-with-logo pattern — back, centered product mark + “Merchant Loan”, tertiary **Help** text action.
- **Body:** `SectionHeader` for the main headline; scrollable **column** of **selectable cards** (radio-in-card pattern — use **Radio** + **Card** / grouped surface from common UI).
- **Offer card (expanded):** Hero amount, **slider** (or equivalent control) for amount in range, **key-value rows** (amount, fees, net disbursement), highlighted **instalment / rate** strip, inline **link** (“Read KFS” class action).
- **Collapsed offers:** Same card pattern with **radio**, lender/headline, **semantic status** copy (success / warning / neutral emphasis — map to design-system semantic text).
- **Expand/collapse:** `Button` secondary / **Chips** or text button with chevron — “view more / view fewer offers”.
- **Review block:** `SectionHeader` + **Card** with read-only **List** / **ListItem** rows (PAN, email).
- **Consents:** stacked **Checkbox** rows with inline **link** (“Read more”).
- **Optional row:** Text **link** with leading icon (“Add … optional”).
- **Footer:** supporting disclaimer line; sticky **primary `Button`** (“Proceed”).

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| App header | Navigate, get help | Primary chrome | Fixed top; single row |
| Offer headline | Orient | Primary | Below header; scroll start |
| Offer stack | Compare, decide | Primary | Single column; one card emphasised (selected border) |
| Toggle offers | Reduce clutter | Supporting | Full-width control under list |
| Review details | Confirm identity | Supporting | Card under offers |
| Consents | Legal acknowledge | Primary for compliance | Above footer |
| Footer actions | Act | Primary | Sticky bottom: disclaimer + primary button |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]    Merchant Loan         Help |
+------------------------------------+
|  Section headline                  |
|  +------------------------------+ |
|  | ( ) Offer card (collapsed)   | |
|  +------------------------------+ |
|  | (*) Offer card (expanded)    | |
|  |     slider + key-value rows  | |
|  |     instalment / rate strip  | |
|  +------------------------------+ |
|  [ expand / collapse offers ]     |
|  +------------------------------+ |
|  | Review: ListItem rows        | |
|  +------------------------------+ |
|  [ ] consent rows + links          |
|  optional link row                 |
|         ... scroll ...              |
+====================================+
|  disclaimer (small)                |
|  [ Primary: Proceed            ]   |
+------------------------------------+
```

**Diversity:** This screen mixes **radio cards**, **slider + ledger rows**, **expand control**, and **checkbox legal** — not a single repeated “title + card” template.

---

## 2. Enter OTP

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=139-8698

**Purpose:** Enter the OTP sent to the user’s mobile and confirm consent checkboxes before continuing.

**Suggested Paytm composition**

- Same **Header** pattern as screen 1.
- **`SectionHeader`:** title “Enter OTP” + subtitle with **emphasised phone number** in body style.
- **`TextField` / OTP pattern:** label “One Time Password (OTP)”, **six single-character cells** (common UI OTP or composed **TextField**s); **link** “Resend OTP” trailing.
- **Card** wrapper around OTP block (`Card` or elevated surface).
- **Consent stack:** multiple **Checkbox** rows (privacy policy link, lender consent, Paytm consent, catch-all).
- **Footer:** **primary `Button`** “Agree and Proceed”; **Badge** or small row “Loan provided by” + lender logo placeholder.

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| Header | Navigate | Primary | Fixed |
| Title + instruction | Act (understand where code went) | Primary | Scroll |
| OTP card | Act | Primary | Grouped surface |
| Consents | Confirm | Primary | Stack above CTA |
| Footer CTA | Act | Primary | Fixed bottom stack |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]    Merchant Loan         Help |
+------------------------------------+
|  Enter OTP                         |
|  subtitle + masked mobile            |
|  +------------------------------+ |
|  | OTP label + six cells        | |
|  | Resend link                  | |
|  +------------------------------+ |
|  [ ] consent + policy link         |
|  [ ] consent + lender link         |
|  ... more checkboxes ...           |
|         ... scroll ...              |
+====================================+
|  [ Agree and Proceed           ]   |
|  lender attribution row            |
+------------------------------------+
```

**Diversity:** OTP **digit grid** + long-form **checkbox legal** is a different rhythm than the offer cards screen.

---

## 3. UPI Autopay — education

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=139-8005

**Purpose:** Explain what happens with UPI Autopay today, after disbursement, and after the loan ends — likely under a tabbed “story” variant.

**Suggested Paytm composition**

- **Header** (Merchant Loan) as above.
- **`Tabs` / `SegmentedControl`:** two segments (e.g. education modes or languages — follow copy from design).
- **`SectionHeader`** for the active panel title.
- **Vertical timeline / steps** inside a **Card:** step icon + title + supporting copy; **middle step** adds **ListItem** with bank avatar, primary and secondary lines (“settlement / repayment account”).
- **Connector lines** between steps (visual only — semantic “progress education”, not a live tracker unless product says so).
- **Info row:** icon + compact explanatory copy (e.g. regulatory limit — use **ListItem** or inline alert pattern).
- **Footer:** **primary `Button`**; “Loan provided by” + **Badge**; safe-area.

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| Header | Navigate | Primary | Fixed |
| Segments | Switch story variant | Primary | Full width under header |
| Section title | Orient | Primary | Scroll |
| Explainer card | Decide (trust) | Primary | Single card; timeline down the left |
| Footer | Act / dismiss | Primary | Sticky |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]    Merchant Loan         Help |
+------------------------------------+
|  [ Segment A | Segment B ]         |
|  Section title                     |
|  +------------------------------+ |
|  | o Step 1 + copy              | |
|  | |                            | |
|  | o Step 2 + copy              | |
|  | |   ListItem: bank row       | |
|  | o Step 3 + copy              | |
|  +------------------------------+ |
|  info row (icon + compact text)    |
|         ... scroll ...              |
+====================================+
|  [ Primary CTA                 ]   |
|  lender badge row                  |
+------------------------------------+
```

**Diversity:** **Segmented control + vertical timeline** inside one card; distinct from offer selection and OTP.

---

## 4. Review KFS

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=139-7886

**Purpose:** Show a preview of the Key Facts Statement and collect explicit acknowledgements.

**Suggested Paytm composition**

- **Header** as above.
- **`SectionHeader`:** “Review KFS” + short explainer.
- **Large `Card`:** document preview (image / PDF thumbnail — **not** hard-coded assets in implementation); overlay **secondary `Button`** “Read Key Fact Statement” with trailing chevron (opens full doc or web view).
- **Consent list:** **Checkbox** rows with **link** “Read more” where needed; final checkbox affirms all above.
- **Footer:** **primary `Button`** “Agree and Proceed”; lender attribution row.

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| Header | Navigate | Primary | Fixed |
| Title + explainer | Orient | Primary | Scroll |
| KFS preview card | Decide (read) | Primary | Dominant central block |
| Checklist | Confirm | Primary | Below preview |
| Footer | Act | Primary | Sticky |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]    Merchant Loan         Help |
+------------------------------------+
|  Review KFS                        |
|  short explainer                   |
|  +------------------------------+ |
|  |                              | |
|  |   KFS preview / thumbnail    | |
|  |   [ Read full doc    > ]     | |
|  |                              | |
|  +------------------------------+ |
|  [ ] checklist + read-more links   |
|  [ ] affirm all                    |
|         ... scroll ...              |
+====================================+
|  [ Agree and Proceed           ]   |
|  lender attribution                |
+------------------------------------+
```

**Diversity:** **Document preview + overlay CTA** is the hero pattern; differs from timeline and offer cards.

---

## 5. Application status — disbursement pending

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=139-16032  

(Frame name in file: **Sn#2**.)

**Purpose:** Show expected disbursement timing, progress through application steps, and loan summary with a way to return home.

**Suggested Paytm composition**

- **Header** as above.
- **`SegmentedControl`:** language (e.g. English vs Hindi) — accessibility/localisation toggle.
- **`SectionHeader`:** status headline + **link** “Know more” in subtitle.
- **Progress card:** vertical **step list** with **success** icons on completed steps and **in-progress/pending** on current step; vertical connector; **bank row** under active step (logo + name).
- **Illustration** region optional ( decorative — Lottie/image from product).
- **`SectionHeader`** “Loan details”.
- **Summary `Card`:** **ListItem**-style rows, label left / value right; **separator** between rows; some rows with **expand chevron** (“Amount you get”, “Amount you pay”) for disclosure pattern.
- **Footer:** **primary `Button`** “Back to home”.

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| Header | Navigate | Primary | Fixed |
| Language toggle | Prefer reading language | Supporting | Under header |
| Status hero | Reassure | Primary | Scroll |
| Timeline card | Track progress | Primary | Single card |
| Loan details card | Compare numbers | Supporting | Accordion-ready rows |
| Footer | Exit flow | Primary | Sticky |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]    Merchant Loan         Help |
+------------------------------------+
|  [ English | Hindi ]               |
|  status headline + Know more link  |
|  +------------------------------+ |
|  | progress timeline + icons    | |
|  | bank row under active step   | |
|  +------------------------------+ |
|  optional illustration             |
|  Loan details header               |
|  +------------------------------+ |
|  | label / value rows           | |
|  | some rows [ expandable v ]   | |
|  +------------------------------+ |
|         ... scroll ...              |
+====================================+
|  [ Back to home                ]   |
+------------------------------------+
```

**Diversity:** **Status timeline + language switch + collapsible summary rows** — post-submission dashboard feel vs earlier funnel screens.

---

## 6. Send Money — landing (UPI / peer entry)

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=118-4841

**Purpose:** Find a payee (name, number, UPI ID), use shortcuts (scan, bank, bills), pick self-account transfer or suggested contacts, repeat a recent payment.

**Suggested Paytm composition**

- **Header:** `Header` with back; **screen title** + subtitle row with **UPI / partner marks** (logos as assets, not hard-coded colors).
- **Search row:** `Search` (or `TextField`) with payee hint + **numeric/UPI affordance** on trailing edge; **Contacts** affordance (stacked icon + label) beside or trailing the field.
- **Shortcuts:** horizontal **circular actions** (scan, to bank account, split bills, monthly payments) — map to **Chips** / icon+label pattern or small **Button** variants per storybook.
- **Self account transfer:** `SectionHeader` + subtitle; **horizontal scroll** of **bank cards** (logo, bank name, masked account) — `Card`-like surfaces or custom rows.
- **Suggestions:** `SectionHeader`; **grid** of `Avatar` + label (initials or photo); trailing **View all** with chevron.
- **Recent payments:** `SectionHeader` + header **Search** icon; **`List` / `ListItem`** (avatar, title, amount + date line, trailing **Pay** `Button`); **View all** link in card footer.
- **Footer:** brand / **Powered by UPI** strip; home indicator area (platform).

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| Header + title | Navigate, orient | Primary chrome | Fixed top |
| Search + contacts | Act (find payee) | Primary | Below header |
| Shortcut row | Act (alternate entry) | Supporting | Horizontal strip |
| Self transfer | Decide (own account) | Primary | Section + horizontal cards |
| Suggestions | Browse, pick | Primary | Grid + view all |
| Recent list | Act (repeat pay) | Primary | Card list + footer link |
| Footer strip | Trust | Supporting | Bottom |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]  Send Money                   |
|  subtitle + payment marks          |
|  +------------------------+ [Co]  |
|  | Search payee hint      | ntacts|
|  +------------------------+       |
| (o)(o)(o)(o)  shortcuts row        |
| Self Account Transfer              |
|  hint line                         |
|  [ bank card ] [ bank card ] ->     |
| Suggestions                        |
|  avatars grid + View all >         |
| Recent Payments              [Q]  |
|  +------------------------------+ |
|  | ListItem rows + Pay          | |
|  | View all >                   | |
|  +------------------------------+ |
|  brand / UPI line                  |
+------------------------------------+
```

**Diversity:** **Search + side Contacts**, **shortcut carousel**, **horizontal bank cards**, **avatar grid**, and **actionable recent list** — dense hub, not a single column of identical cards.

---

## 7. Send Money — self account bottom sheet

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=118-4537

**Purpose:** Choose which of the user’s bank accounts receives the self-transfer; confirm with a trust-forward primary action.

**Suggested Paytm composition**

- **Scrim:** standard overlay behind sheet (`BottomSheet` / modal stack).
- **`BottomSheet`:** drag handle / rounded top per component.
- **Sheet header:** title, **close** (`Button` icon / dismiss), subtitle (instructional).
- **Account list:** vertical **selectable rows** or **cards** — bank logo, name + masked number, optional **Check balance** text link; **radio** / selected check on trailing edge; selected state uses **semantic** primary border (token-driven).
- **Footer:** full-width **primary `Button`** (e.g. shield + proceed label); **Powered by UPI** under button.

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| Backdrop | Dismiss context | — | Dimmed full screen |
| Sheet chrome | Orient | Primary | Bottom-anchored |
| Title + close | Navigate away | Primary | Sheet top |
| Account stack | Decide | Primary | Scroll if many |
| Primary CTA | Act | Primary | Sticky in sheet |

**ASCII layout**

```ascii
/.......... dimmed page ............/
+------------------------------------+
|  ---  sheet handle                 |
|  Title                    [ X ]    |
|  subtitle                          |
|  +------------------------------+ |
|  | (*) bank row + balance link  | |
|  +------------------------------+ |
|  | ( ) bank row                 | |
|  +------------------------------+ |
|  | ( ) bank row                 | |
|  +------------------------------+ |
|         ... scroll ...             |
+====================================+
|  [ Primary: proceed + trust   ]   |
|  Powered by UPI                    |
+------------------------------------+
```

**Diversity:** **Modal sheet + radio list + sticky trust CTA** — pattern reusable for any “pick one account” flow.

---

## 8. Payment success / receipt (UTH · PPS-style)

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=118-5172

**Purpose:** Confirm success, show receipt metadata, offer repeat/share and secondary actions, optional timeline and privacy.

**Suggested Paytm composition**

- **Header:** back + **brand** centre + **Help** link (UTH / post-payment chrome).
- **Receipt hero `Card`:** scalloped / ticket metaphor if product uses it — **Avatar** + verified affordance, **display amount** + **success** badge, note/category + edit affordance, **reference row** with **copy** action, date/time + optional map, message line, **From** block (counterparty + bank mask).
- **Dual CTAs:** **outline** primary family + **filled** secondary action (e.g. pay again + share) side by side — `Button` variants.
- **Quick actions card:** `ListItem` rows with lead icon + chevron (favourite, reminder, history, invite).
- **Payment details:** **expandable** section (`Accordion` pattern or chevron header) with **vertical timeline** / status steps (`ActivityTimeline` or styled **List**).
- **Utility rows:** **hide from history** with **`Switch`**; **contact support** row with chevron.
- **Promo / education banner** (optional full-width strip at bottom).

Figma notes **UTH as per PODS structure** — align header/receipt blocks with internal PODS spec when implementing.

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| Header | Navigate, help | Primary | Fixed |
| Receipt card | Confirm | Primary | Hero; scroll |
| CTA pair | Act | Primary | Below hero |
| Quick actions | Engage | Supporting | Card list |
| Payment details | Understand | Supporting | Collapsible timeline |
| Utility | Privacy / support | Supporting | Small card |
| Promo | Cross-sell | Supporting | Full width bottom |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]    brand mark           Help  |
+------------------------------------+
|  +~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+ |
|  | receipt card (hero)          | |
|  |  avatar  amount  success      | |
|  |  note / category  edit      | |
|  |  ref + copy    date / map    | |
|  |  message    From: party+bank  | |
|  +~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+ |
|  [ Pay again ]  [ Share receipt ] |
|  +------------------------------+ |
|  | quick action rows        >   | |
|  +------------------------------+ |
|  Payment Details            ^    |
|  | o timeline step            | |
|  | o timeline step            | |
|  +------------------------------+ |
|  hide payment    [ Switch ]       |
|  contact support              >   |
|  +------------------------------+ |
|  promo / deals banner             |
+------------------------------------+
```

**Diversity:** **Receipt-as-hero**, **paired CTAs**, **mixed list + accordion timeline**, **toggle privacy** — post-pay hub distinct from funnel screens above.

---

## 9. Mobile recharge — entry hub

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=214-3130

**Purpose:** Start a mobile recharge or bill payment: enter or pick a number, see offers, repeat from history or saved payees.

**Suggested Paytm composition**

- **Header:** back; **large title** + trust row (**payment-network** logos as assets).
- **Offers strip:** semantic **banner** (icon + headline + **View all** link) — `Card` / inset banner pattern.
- **Search / entry row:** `TextField` or composed row for mobile; trailing **Contacts** (icon + label stack).
- **Your number:** `SectionHeader`; **selectable profile card** — operator logo, name, number, last recharge line, overflow menu.
- **Quick top-ups:** `SectionHeader`; **horizontal pair/small cards** (operator, label, plan snippet).
- **Recent activity:** `SectionHeader` + header **Search**; **grouped `List`** (`ListItem` + status line + menu); **View all** in footer.
- **Saved destinations:** same list pattern (avatars / bank badges, name, subtitle).
- **Footer:** brand / UPI trust line.

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| Title + marks | Orient | Primary | Below status |
| Offers | Browse deals | Supporting | Full-width banner |
| Number entry | Act | Primary | Field + contacts |
| Your number | Confirm context | Primary | Card |
| Quick top-ups | Decide | Supporting | Horizontal cards |
| Recent + saved | Browse, repeat | Primary | Scroll lists in grouped surfaces |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]  Recharge or Pay Mobile Bill  |
|  payment marks row                 |
|  [ offers banner    View all > ] |
|  +------------------------+ [Co] |
|  | mobile number field    | ntacts|
|  +------------------------+       |
| Your Number                        |
|  +------------------------------+ |
|  | operator card + menu         | |
|  +------------------------------+ |
| Quick Top-ups                      |
|  [ small card ] [ small card ]    |
| Recent …                    [Q]   |
|  +------------------------------+ |
|  | ListItem + status + …         | |
|  +------------------------------+ |
| To saved bank accounts      [Q]   |
|  +------------------------------+ |
|  | saved rows                    | |
|  +------------------------------+ |
|  brand / UPI                       |
+------------------------------------+
```

**Diversity:** **Banner + field row**, **profile operator card**, **two-column quick picks**, **dual history sections** — telecom hub vs generic send-money.

---

## 10. Select plan — catalog

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=214-3392

**Purpose:** Browse and narrow recharge plans for the current number: see current plan, add data packs, search and filter, switch plans in a list.

**Suggested Paytm composition**

- **Header:** back; title; trailing **text action** (e.g. history).
- **Context card:** operator **Avatar**; name + number; **Change** link; **current plan** block with **Recharge** `Button`, validity/data lines, **Plan details** link.
- **Add-ons:** `SectionHeader` + optional **badge**; **horizontal scroll** of **Chips** / small price pills.
- **Find plans:** `Search` + **Filter** icon `Button`.
- **Categories:** `Tabs` or scrollable chip row (**Popular**, categories…).
- **Results:** vertical **plan cards** — hero price + per-day line, validity/data columns, optional **semantic badges**, partner icons row, **Plan details** + chevron — tappable whole card.

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| Header | Navigate | Fixed | Row + trailing action |
| Subscriber card | Orient | Primary | Grouped surface |
| Data packs | Upsell | Supporting | Horizontal scroll |
| Search + filter | Find | Primary | Full-width bar |
| Tabs | Narrow | Supporting | Horizontal scroll |
| Plan list | Compare, pick | Primary | Single column scroll |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]  Select a Plan     View Hist  |
|  +------------------------------+ |
|  | logo  name  number  Change   | |
|  | current plan + [Recharge]    | |
|  +------------------------------+ |
| Add Data Pack [badge]             |
|  [ chip ] [ chip ] [ chip ] ->    |
|  [ Search plans……… ]        [fil] |
|  Popular | Data | Ent | …         |
|  +------------------------------+ |
|  | plan price + per-day         | |
|  | Validity | Data              | |
|  | badges + Plan details     >  | |
|  +------------------------------+ |
|  + plan card … +                  |
+------------------------------------+
```

**Diversity:** **Current-plan mini-dashboard** atop a **filterable catalog** — different from single-offer compare screens.

---

## 11. Confirm plan — review before pay

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=214-3700

**Purpose:** Review chosen plan and subscriber, see promos, then proceed to payment.

**Suggested Paytm composition**

- **Header:** back; **Confirm Plan**; trailing **Change plan** text `Button`.
- **Summary `Card`:** **ListItem** row (operator logo, name, number, **Change**); divider; plan amount label; **split emphasis** (price + per-day vs validity/data columns); optional **Badge**; long **benefits** copy; **View more details** expand control.
- **Promo row:** light **success-toned strip** — offer icon + copy + **View all**.
- **Footer:** sticky **primary `Button`** (e.g. proceed to recharge).

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| Header | Navigate | Fixed | Back + title + change |
| Summary card | Confirm | Primary | Scroll within page |
| Offer strip | Cross-sell | Supporting | Below card |
| Primary CTA | Act | Primary | Sticky bottom |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]  Confirm Plan    Change Plan   |
|  +------------------------------+ |
|  | logo  name  number  Change   | |
|  | ——————————————————————————— | |
|  Plan Amount:                      |
|  price    Validity | Data        |
|  [ badge optional ]               |
|  benefits paragraph…             |
|  [ View more details        v ]  |
|  +------------------------------+ |
|  [ offers strip    View all > ]  |
|         ... scroll ...            |
+====================================+
|  [ Proceed to Recharge        ]   |
+------------------------------------+
```

**Diversity:** **Single focused review card** + **sticky pay CTA** — checkout summary, not a long catalog.

---

## 12. Send Money — landing (alternate frame)

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=206-10329

**Purpose:** Same user job as **§6** — find a payee, shortcuts, self-transfer, suggestions, repeat recent sends.

**Suggested Paytm composition**

- Treat as **the same pattern as §6** Paytm composition (search + contacts, shortcut grid, self-account carousel, suggestions grid, recent list with **Pay** actions, footer strip).

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| (mirror §6) | — | — | Same hub rhythm |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]  Send Money                   |
|  subtitle + UPI marks              |
|  [ Search name/UPI/number ] [123|Co]|
| (o)(o)(o)(o)  shortcuts            |
| Self account transfer + hint         |
|  [ bank ] [ bank ] ->              |
| Suggestions — avatar grid + View > |
| Recent payments              [Q]   |
|  | row + Pay | row + Pay |         |
|  brand / UPI                       |
+------------------------------------+
```

**Diversity:** Confirms **§6** template against a second Figma frame for Gen-AI standardisation.

---

## 13. Bank Transfer — saved accounts hub

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=118-4462

**Purpose:** Send to own accounts or pick from saved bank beneficiaries; add a new account.

**Suggested Paytm composition**

- **Header:** back; **large title** only (or subtitle if product adds).
- **Own accounts:** `SectionHeader`; **horizontal scroll** bank **Cards** (logo, name, masked account).
- **Saved list:** `SectionHeader` + **Search** icon; **grouped list** — avatar/initials, name, bank + mask, last amount + date per row.
- **FAB / primary float:** **pill `Button`** — add new bank account (plus + label).
- **Footer:** brand / UPI.

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| Header | Navigate | Primary | Fixed |
| Own accounts | Pick self | Primary | Horizontal cards |
| Saved beneficiaries | Pick recipient | Primary | Scroll list |
| FAB | Act (new) | Primary | Float above footer |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]  Bank Transfer                |
| To your own account                |
|  [ bank card ] [ bank card ] ->    |
| To saved bank accounts      [Q]   |
|  +------------------------------+ |
|  | avatar  name + bank mask       | |
|  | last payment line             | |
|  +------------------------------+ |
|         ... scroll ...              |
|      ( + To New Bank A/c )          |
|  brand / UPI                       |
+------------------------------------+
```

**Diversity:** **FAB-centred bank directory** vs peer-first Send Money hub (**§6** / **§12**).

---

## 14. Balance & History — passbook overview

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=186-4436

**Purpose:** See linked accounts and portfolio snapshots, then drill into filterable month-grouped transaction history.

**Suggested Paytm composition**

- **Header:** back; title; **overflow / more**; optional **glass** secondary actions per platform.
- **Accounts:** `SectionHeader`; **horizontal bank cards** with **Check balance** (or equivalent) **Button**.
- **Portfolio:** `SectionHeader`; **horizontal asset cards** (icon, balance label, amount).
- **Payment history:** `SectionHeader` + **Search**, **Filter**, **Download** icons.
- **Account filter chips:** scrollable **Chips** (all accounts, per-bank…).
- **Month groups:** **tappable month header** (month label + signed total + chevron); inside **transaction `ListItem`** rows — avatar, title, time, **category tag**, amount with semantic sign styling, **From** bank hint.
- **Footer:** trust strip.

Figma labels this **Passbook** — align list/month modules with PODS passbook patterns when available.

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| Header | Navigate | Primary | Fixed |
| Accounts | Act, balance | Primary | Horizontal cards |
| Portfolio | Browse | Supporting | Horizontal cards |
| History tools | Find, export | Primary | Icons + chips |
| Month stacks | Review | Primary | Accordion or drill-in month |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]  Balance & History        ⋮   |
| Accounts                           |
|  [ bank + Check Balance ] ->       |
| Portfolio                          |
|  [ Gold … ] [ Coins … ] ->         |
| Payment History        [Q][F][Dl] |
|  [ All ] [ HDFC… ] [ AXIS… ]      |
|  +------------------------------+ |
|  | June 2025        total     > | |
|  | | avatar line amount From  | | |
|  | | … rows …                 | | |
|  +------------------------------+ |
|  brand / UPI                       |
+------------------------------------+
```

**Diversity:** **Multi-entity dashboard** (accounts + assets + ledger) vs single-flow screens.

---

## 15. Payment success — receipt hero + inline promo + bottom nav

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=237-11694

**Purpose:** Confirm success in a **short receipt card**, keep user in app shell with **marketing surface** below and **floating bottom navigation**.

**Suggested Paytm composition**

- **Header:** back; **centred brand logo**; optional trailing control.
- **Receipt `Card`:** **brand band** footer inside card; centred **Avatar**; name + **verified**; **display amount** + **success** badge; trailing **View more** (e.g. chat/share affordance); row **Check balance** + **Share receipt**.
- **Below card:** large **hero banner** / partner creative (full-width rounded).
- **Bottom:** **floating tab bar** (home, scan, rewards) + home indicator.

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| Header | Navigate | Fixed | Logo centre |
| Receipt card | Confirm | Primary | Compact hero |
| Promo block | Cross-sell | Supporting | Below fold scroll |
| Bottom nav | Navigate app | Primary | Float over content |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]      brand mark          (•)  |
|  +------------------------------+ |
|  |    avatar  name  verified    | |
|  |    ₹ amount    [success]    | |
|  | View more (pill)            | |
|  | [ Check Balance ] [ Share ]    | |
|  | brand band                   | |
|  +------------------------------+ |
|  +------------------------------+ |
|  |   large promo / partner hero | |
|  +------------------------------+ |
|         ... scroll ...             |
|      ==== [ o o o ]  float  ====   |
+------------------------------------+
```

**Diversity:** **Marketing-first post-pay** with **app chrome** — different from document-style receipt in **§8**.

---

## 16. Payment receipt — expanded card + follow-ups (variant)

**Figma:** https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=237-11833

**Purpose:** Same post-pay job as **§8** with **richer inline receipt** (UPI id, ref + copy, category, sender block), **paired CTAs inside card**, **quick-actions list**, **collapsed payment-details teaser**, utility rows.

**Suggested Paytm composition**

- **Header:** back; centred **logo** (variant without Help — add if product requires).
- **Receipt `Card`:** `View less` / density control; avatar + verified + **UPI handle**; amount + success; **reference + copy**; dashed separator; date, message + **editable category chip**; **From** sender + bank mask + avatar; **Check balance** + **Share receipt** (+ optional third action).
- **Quick actions card:** same as **§8** (favourite, reminder, history, invite rows).
- **Payment details:** **accordion** header collapsed by default in this frame (**chevron down**).
- **Utility card:** **hide payment** + **`Switch`**; **Help** + chevron (labels may vary from §8 Contact support).

**Page structure**

| Section | Job | Role | Layout |
|--------|-----|------|--------|
| Header | Navigate | Fixed | |
| Receipt card | Confirm | Primary | Dense metadata |
| CTA row | Act | Primary | Inside or under hero |
| Quick actions | Engage | Supporting | List card |
| Payment details | Deep link | Supporting | Collapsed accordion |
| Utility | Privacy / help | Supporting | |

**ASCII layout**

```ascii
+------------------------------------+
|  [<]      brand mark               |
|  +------------------------------+ |
|  | avatar  name  verified  [Less]| |
|  | UPI handle                   | |
|  | ₹ amount      [success]      | |
|  | UPI ref + copy               | |
|  | ····· dashed rule ·····      | |
|  | date  message  [category v] | |
|  | From: party + bank    avatar | |
|  | [ Check Bal ] [ Share ] …    | |
|  | brand band                   | |
|  +------------------------------+ |
|  | quick action rows        >   | |
|  +------------------------------+ |
|  Payment Details            v    |
|  +------------------------------+ |
|  hide payment        [switch]    |
|  Help                         >  |
|  +------------------------------+ |
+------------------------------------+
```

**Diversity:** **Collapsible density** on hero and **collapsed timeline** state — pair with **§8** for full vs compact post-pay specs.

---

## Layout categories (this import batch)

| Category | Screens | Note |
|----------|---------|------|
| **Telecom recharge funnel** | §9 → §10 → §11 | Entry hub → catalog → confirm |
| **P2P / UPI hub** | §6, §12 | Same pattern; §12 alternate Figma |
| **Bank directory** | §13 | Saved + own accounts + FAB |
| **Ledger / passbook** | §14 | Accounts, portfolio, month-grouped history |
| **Post-payment / receipt** | §8, §15, §16 | §8 full UTH; §15 promo + bottom nav; §16 expanded-card variant |

*Node **118-5172** is already documented as **§8** (not duplicated above).*

---

## Flow (cross-screen)

**Merchant loan funnel** (suggested order — adjust if product maps differently):

1. **Choose offer** → **Enter OTP** → **Autopay education** → **Review KFS** → **Status / home return**.  
   *(Additional steps: document in this file only after Figma node loads — see **`prompts/hi-pods.md (**MODE B**)`** at repo root.)*

**Send money → receipt** (§6–§8, §12–§13, §15–§16):

1. **Send Money landing** (§6 or §12) or **Bank Transfer hub** (§13) → complete payment → **Payment success / receipt** (§8, §15, or §16 depending on product surface).

**Telecom recharge** (§9–§11):

1. **Mobile recharge entry** → **Select plan** → **Confirm plan** → payment (out of scope here).

Back from header should pop the funnel; **Proceed** / **Agree and Proceed** advances; **Read KFS** / **Read Key Fact Statement** opens detailed document; **Help** is global support entry.

---

## Source limitations

- Node **139:8005** returned structural metadata only; copy and fine structure were taken from that tree and naming (**UPI Autopay Education**).

## Pending Figma (not in inventory — retry prompt when access works)

- https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=139-14902 — omitted until design context loads (do not add placeholder screens per **`prompts/hi-pods.md (**MODE B**)`** at repo root).

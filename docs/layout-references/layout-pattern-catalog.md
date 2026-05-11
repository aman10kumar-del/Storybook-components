# Layout pattern catalog (50 reusable shells)

### Role of this file (what wins)

**What:** **`LP-01`–`LP-50`** shorthand shells — structure and component **families** for mobile-first Paytm-style screens. **No pixel or hex** — only pattern shape.

**Canonical:** If **`docs/layout-references/layouts.md`** already documents the same flow, **`layouts.md` wins** for structure and copy of blocks; use **`LP-*`** here as a **tag** or when **no** `layouts.md` section exists. **Do not** let a catalog row override a specific `layouts.md` entry.

**Purpose (continued):** Cross-vertical **pattern menu**. Use with **`@paytm-h5-common/paytm_common_ui`**, `layouts.md` (concrete Figma-backed flows), and `.cursor/design.mdc` §2–§6.

**How agents should use it**

1. Infer the user’s **job** (browse, decide, act, confirm, learn, recover).  
2. Pick the closest **`LP-NN`** pattern (or combine two: e.g. **LP-04** body + **LP-11** overlay).  
3. Implement with **tokens** and **Storybook** variants — do not copy ASCII literally.  
4. Prefer a matching row in **`layouts.md`** when one exists; use this catalog when there is no Figma import yet.

---

## LP-01 — Single-column form (short)

**Use when:** A few inputs + validation + one primary submit (login-light, profile edit light, simple request).

**Blocks:** `Header`, `TextField` / `Dropdown` stack, `Checkbox` optional, **`Alerts` inline** on error, primary `Button`, optional secondary text link.

**Regions:** chrome → fields → legal/helper → sticky/local CTA.

```ascii
+--------------------------------+
| [<]  Title              Help  |
| field                           |
| field                           |
| [ ] optional                    |
| [ Primary submit            ]   |
+--------------------------------+
```

---

## LP-02 — Stepped flow (wizard chrome)

**Use when:** Multi-screen funnel with ordered steps (KYC, checkout substeps, loan substeps).

**Blocks:** `Header`, **step indicator** (custom or `SegmentedControl` read-only), body per step, **Back** + **Next** / primary `Button`, `Alerts` for blocking errors.

**Regions:** progress → content → nav actions.

```ascii
+--------------------------------+
| [<]  Flow title                 |
| * -- * -- o   (steps)           |
|                                 |
|  step body content              |
|                                 |
| [ Back ]  [ Continue         ]  |
+--------------------------------+
```

---

## LP-03 — Hub: title + shortcut grid

**Use when:** Entry hub with 4–8 actions (services home, pay hub, more menu dense).

**Blocks:** `Header`, optional subtitle, **icon+label grid** (`Card` tiles or circular shortcuts), optional promo `Alerts` block.

```ascii
+--------------------------------+
| [<]  Hub title                  |
| (o)(o)(o)(o)                    |
| (o)(o)(o)(o)                    |
| optional banner                 |
+--------------------------------+
```

---

## LP-04 — Search-first + scrolling list

**Use when:** Find payee, merchant, order, ticket; **Send Money landing** aligns (see `layouts.md` §6).

**Blocks:** `HeaderSearch` / `Search`, **`List` + `ListItem`**, empty state row, optional **fab**.

```ascii
+--------------------------------+
| [<]  Title                      |
| [ Search..................] [Q] |
| ListItem                        |
| ListItem                        |
+--------------------------------+
```

---

## LP-05 — Filter chips + list

**Use when:** Narrowing a long catalog (orders by status, offers by type).

**Blocks:** `Header`, **`Chips`** horizontal scroll, `List` / `Card` rows, optional sort `OverflowMenu`.

```ascii
+--------------------------------+
| [<]  Catalog                    |
| [All][Shipped][Return] ->       |
| row                             |
| row                             |
+--------------------------------+
```

---

## LP-06 — Grouped settings list

**Use when:** App settings, account preferences, toggles per row.

**Blocks:** `Header`, **`SectionHeader`** per group, **`ListItem` + `Switch` / chevron**, separators per `design.mdc` §8.

```ascii
+--------------------------------+
| [<]  Settings                   |
| Group A                         |
|  row toggle                     |
| Group B                         |
|  row         >                  |
+--------------------------------+
```

---

## LP-07 — List → detail (drill-in)

**Use when:** Row opens next screen (order detail, message thread); not split-view on phone.

**Blocks:** Parent: `List`. Child screen: `Header`, hero summary `Card`, `List` details.

```ascii
(list)        (detail screen)
  row >    -> | [<] Title        |
              | summary card     |
              | detail rows       |
```

---

## LP-08 — Empty state (centered)

**Use when:** No data yet; first-time list, no search results.

**Blocks:** illustration region, **Title 3** + body copy, primary `Button`, secondary link optional.

```ascii
+--------------------------------+
| [<]  Title                      |
|                                 |
|      [illus]                    |
|      Headline                   |
|      Support line               |
|   [ Primary action        ]    |
+--------------------------------+
```

---

## LP-09 — Error / offline recovery

**Use when:** Failed fetch, timeout, no network.

**Blocks:** `Alerts` **block** or inline, explain copy, **`Button`** retry, secondary **contact support** link.

```ascii
+--------------------------------+
| [!] problem title               |
|     what to do                  |
| [ Retry                    ]    |
|  contact support                |
+--------------------------------+
```

---

## LP-10 — Permission education

**Use when:** Camera, contacts, notifications — explain then enable.

**Blocks:** `SectionHeader`, bullets or **illustration**, primary `Button` → system flow, **skip** text link.

```ascii
+--------------------------------+
| [X]                             |
| Why we need X                   |
| bullet bullet                   |
| [ Continue                   ]  |
| Skip for now                    |
+--------------------------------+
```

---

## LP-11 — Bottom sheet: action list

**Use when:** Context menu, share sheet, **more** on a row.

**Blocks:** `BottomSheet`, title optional, **`ListItem`** destructive/normal styles, cancel row.

```ascii
+--------------------------------+
|  --- title                      |
|  Action one                     |
|  Action two (destructive)       |
|  Cancel                         |
+--------------------------------+
```

---

## LP-12 — Bottom sheet: compact form

**Use when:** Quick edit, add note, tip amount without full page.

**Blocks:** `BottomSheet`, `TextField` / `Dropdown`, primary `Button`, dismiss `FAB` or X in header.

```ascii
+--------------------------------+
|  --- Edit                       |
|  field                          |
|  [ Save                    ]    |
+--------------------------------+
```

---

## LP-13 — Full-screen sheet (form-heavy)

**Use when:** Longer modal task (filters sheet, add address).

**Blocks:** **`BottomSheet` tall** or full-screen dialog, scroll body, sticky footer CTA.

```ascii
+--------------------------------+
|  --- Title              [X]   |
|  ... scroll body ...            |
+================================+
|  [ Apply                  ]     |
+--------------------------------+
```

---

## LP-14 — Stacked feed cards

**Use when:** Offers, articles, social-style vertical feed.

**Blocks:** `Card` per item, **optional `SectionHeader`**, infinite scroll list.

```ascii
+--------------------------------+
| +----------------------------+ |
| | card media + text          | |
| +----------------------------+ |
| +----------------------------+ |
+--------------------------------+
```

---

## LP-15 — Horizontal carousel + list

**Use when:** Featured rail above standard list (banners + orders).

**Blocks:** horizontal **`Card`** scroll, `SectionHeader`, vertical `List`.

```ascii
+--------------------------------+
| Section                         |
| [card][card][card]->           |
| ListItem                        |
+--------------------------------+
```

---

## LP-16 — Comparison (stacked blocks)

**Use when:** Compare 2–3 plans; mobile stacks “Option A block” then “Option B block”.

**Blocks:** repeated **`Card`** with title + bullet list + `RadioButton` / `Button` select.

```ascii
+--------------------------------+
| Compare                         |
| + Option A (select) --------+   |
| + Option B ----------------+   |
+--------------------------------+
```

---

## LP-17 — Sticky checkout summary

**Use when:** Scroll line items; **total + pay** always visible.

**Blocks:** scroll **`List`**, sticky footer **`Card`** with breakdown rows + primary pay `Button`.

```ascii
+--------------------------------+
| line                            |
| line                   scroll   |
+================================+
| total        [ Pay          ]   |
+--------------------------------+
```

---

## LP-18 — Line items + quantity

**Use when:** Cart, ticketing counts.

**Blocks:** `ListItem` + **stepper** / segmented quantity, sticky footer with total.

```ascii
+--------------------------------+
| item A      [-] 2 [+]          |
| item B      [-] 1 [+]          |
+================================+
| [ Checkout                 ]   |
+--------------------------------+
```

---

## LP-19 — Media hero + accordion details

**Use when:** Product / policy detail with long specs.

**Blocks:** media carousel top, **title + price row**, **accordion** sections (`ListItem` chevron rows driving expand).

```ascii
+--------------------------------+
| [    media hero        ]        |
| Title  price                    |
| Details                    v    |
|  expanded body                  |
+--------------------------------+
```

---

## LP-20 — Rating + free-text review

**Use when:** Post-trip / post-order feedback.

**Blocks:** **star** row (custom or icons), `TextField` multiline, `Checkbox` anonymous optional, submit `Button`.

```ascii
+--------------------------------+
| Rate experience                 |
| * * * * *                       |
| [ review text                ]  |
| [ Submit                   ]    |
+--------------------------------+
```

---

## LP-21 — Calendar + time slots

**Use when:** Appointments, deliveries.

**Blocks:** date picker strip or calendar block, **`Chips` or `List`** for slots, confirm `Button`.

```ascii
+--------------------------------+
| Feb 2026  (picker)              |
| [09:00][10:30] ...             |
| [ Confirm slot             ]   |
+--------------------------------+
```

---

## LP-22 — Map + peek card

**Use when:** Store finder, rider tracking teaser.

**Blocks:** map layer full bleed, **floating `Card`** peek with CTA, `FAB` recenter.

```ascii
+--------------------------------+
|:::::::: map area ::::::::::::::|
|:::::::::::::::::::: +--------+ |
|:::::::::::::::::::: | peek   | |
+--------------------------------+
```

---

## LP-23 — Chat thread + composer

**Use when:** Support chat, p2p messaging lite.

**Blocks:** message list (bubbles), **`TextField` + send** docked, `Header` with case title.

```ascii
+--------------------------------+
| [<]  Chat                       |
|     bubble                      |
| bubble                          |
+================================+
| [ message...............] [>]  |
+--------------------------------+
```

---

## LP-24 — Notification inbox (grouped)

**Use when:** Alerts history grouped by **Today / Earlier**.

**Blocks:** `SectionHeader` date groups, `ListItem` with meta time, swipe/delete per platform pattern.

```ascii
+--------------------------------+
| Today                           |
|  row             2h             |
| Earlier                         |
|  row             Mon            |
+--------------------------------+
```

---

## LP-25 — Profile header + menus

**Use when:** Me tab, account home.

**Blocks:** **banner / avatar**, name subtitle, **grid shortcuts** or `List` groups.

```ascii
+--------------------------------+
|        ( avatar )               |
|        Name @id                 |
| (o) (o) (o)  shortcuts          |
| List              >             |
+--------------------------------+
```

---

## LP-26 — Edit profile (sections)

**Use when:** Change phone, email, address fields in chunks.

**Blocks:** `Header`, **photo row**, grouped `TextField`, save `Button`, `Alerts` validation.

```ascii
+--------------------------------+
| [<]  Edit profile               |
|  avatar  [ change photo ]      |
| Legal name        field        |
| [ Save changes             ]   |
+--------------------------------+
```

---

## LP-27 — Step checklist (progress)

**Use when:** Setup wizards, onboarding tasks, loan status (see `layouts.md` §5).

**Blocks:** vertical **timeline** / checklist icons, `ListItem` per step, optional bank row under active.

```ascii
+--------------------------------+
| o----- done step               |
| o----- current + extra row    |
| o upcoming                    |
+--------------------------------+
```

---

## LP-28 — Success celebration + next

**Use when:** Non-receipt success (account created, request submitted).

**Blocks:** success icon/illus, headline, body, **primary next** + secondary link, dismiss `Header` optional.

```ascii
+--------------------------------+
|         ( success )             |
|         All set                 |
|   [ Go to dashboard        ]   |
+--------------------------------+
```

---

## LP-29 — Failure / declined + paths

**Use when:** Payment failed, application rejected.

**Blocks:** `Alerts` **block**, reasons list, **Retry** + **contact** + **home** hierarchy of actions.

```ascii
+--------------------------------+
| Couldn't complete               |
| reason 1                        |
| [ Retry ]  [ Help ]            |
+--------------------------------+
```

---

## LP-30 — Legal wall (scroll + single gate)

**Use when:** Terms, privacy — must scroll or read before continue.

**Blocks:** web / long text region, **`Checkbox` confirm read**, primary `Button` disabled until checked (validation on tap per `design.mdc` §8).

```ascii
+--------------------------------+
| Terms                           |
| | scroll text body          |  |
| |                            |  |
| [ ] I have read               |
| [ Accept                   ]   |
+--------------------------------+
```

---

## LP-31 — Full-screen OTP / PIN

**Use when:** Code entry, PIN pad (aligns OTP screen in `layouts.md` §2).

**Blocks:** `SectionHeader`, **`OTP`**, resend link, legal `Checkbox` if needed, primary `Button`.

```ascii
+--------------------------------+
| Enter code                      |
| [_][_][_][_][_][_]            |
| Resend                          |
| [ Continue                 ]    |
+--------------------------------+
```

---

## LP-32 — Biometric / device security explain

**Use when:** Face/fingerprint setup, device binding.

**Blocks:** icon hero, bullets, **Try** `Button`, **use password** link.

```ascii
+--------------------------------+
|      ( biometric icon )         |
| Fast sign-in                    |
| [ Enable                   ]    |
| Use PIN instead                 |
+--------------------------------+
```

---

## LP-33 — Single-select list (radio cards)

**Use when:** Pick one offer, one account, one plan — **loan offer** (`layouts.md` §1), **self account sheet** (`layouts.md` §7).

**Blocks:** `RadioButton` + **`Card`** rows, optional **inline link** per row, sticky **Proceed** `Button`.

```ascii
+--------------------------------+
| Choose one                      |
| ( ) row A                       |
| (*) row B                       |
| [ Continue                 ]    |
+--------------------------------+
```

---

## LP-34 — Multi-select + toolbar

**Use when:** Bulk delete, bulk pay, cart-like selection in list.

**Blocks:** **`Checkbox`** on `ListItem`, **sticky bar** “N selected” + primary action.

```ascii
+--------------------------------+
| [x] row                         |
| [ ] row                         |
+================================+
| 2 selected   [ Delete      ]   |
+--------------------------------+
```

---

## LP-35 — Amount-first entry

**Use when:** Send money amount, top-up, donation.

**Blocks:** **large amount display**, `TextField` / custom numpad, quick-add `Chips`, continue `Button`.

```ascii
+--------------------------------+
|        Rs. amount               |
| [________________]              |
| [+100][+500]                    |
| [ Continue                 ]    |
+--------------------------------+
```

---

## LP-36 — Scanner / QR frame

**Use when:** Scan to pay, scan order.

**Blocks:** camera preview full bleed, **corner overlay** hints, cancel `Button`, torch `FAB`.

```ascii
+--------------------------------+
| [ live camera / qr frame ]      |
| hint text                       |
| [ Cancel                   ]    |
+--------------------------------+
```

---

## LP-37 — Credential / ticket hero

**Use when:** Boarding pass, event QR, membership code.

**Blocks:** barcode/QR large, title meta rows, **screenshot / add to wallet** secondary actions.

```ascii
+--------------------------------+
| Event name                      |
+--------------------------------+
| |||||||||||||||||||||||||||| | |
| code   + copy                 |
+--------------------------------+
```

---

## LP-38 — Balance / points summary

**Use when:** Wallet home, rewards balance.

**Blocks:** **`Card`** hero balance, **secondary metrics row**, shortcuts below.

```ascii
+--------------------------------+
| +---------------------------+   |
| | Balance        pts        |   |
| +---------------------------+   |
| Add money    Passbook           |
+--------------------------------+
```

---

## LP-39 — Referral code + share

**Use when:** Invite friends, cashback code.

**Blocks:** code in **`Card`**, **Copy** `Button`, share row (`Button` + icon), terms link.

```ascii
+--------------------------------+
| Your code                       |
| + ABC123 ------------------+   |
| [ Copy ]  [ Share          ]    |
+--------------------------------+
```

---

## LP-40 — FAQ accordion

**Use when:** Help centre static content.

**Blocks:** `Search` optional, **expandable Q rows** (accordion), still need **contact** CTA at bottom.

```ascii
+--------------------------------+
| [ search help            ]      |
 Q: Payment failed?           v   
   answer shown...              |
 Q: Refunds?                  >   |
+--------------------------------+
```

---

## LP-41 — Support channels

**Use when:** Choose chat, call, email.

**Blocks:** `ListItem` with lead icon + chevron per channel, wait time subtext optional.

```ascii
+--------------------------------+
| Help                            |
| (i) Chat with us            >  |
| (i) Call                    >  |
+--------------------------------+
```

---

## LP-42 — Media viewer + actions

**Use when:** Receipt image, KYC photo preview.

**Blocks:** zoom image region, **secondary** actions row (share, download).

```ascii
+--------------------------------+
| [<]                    [...]   |
| [      full bleed media    ]   |
| [ Share ]  [ Save ]             |
+--------------------------------+
```

---

## LP-43 — Upload queue

**Use when:** KYC docs, multiple attachments.

**Blocks:** **`ListItem`** file name + **progress** + cancel, add file `Button`.

```ascii
+--------------------------------+
| doc1.pdf  ====···· 60%    [x]   |
| [ + Add file              ]    |
| [ Submit docs             ]    |
+--------------------------------+
```

---

## LP-44 — Tabbed content (equal tabs)

**Use when:** **Orders | Returns**, **Shop | Profile** within one screen body.

**Blocks:** **`Tabs`** under `Header`, panel swap, shared bottom CTA optional.

```ascii
+--------------------------------+
| Title                           |
| [ Tab1 | Tab2 ]                 |
| tab body content                |
+--------------------------------+
```

---

## LP-45 — Segment switch + single panel

**Use when:** EN/HI toggle, monthly/yearly pricing toggle — **Autopay education** (`layouts.md` §3).

**Blocks:** **`SegmentedControl`**, `SectionHeader`, body **Card** or timeline.

```ascii
+--------------------------------+
| [ A | B ]                       |
| Panel headline                  |
| content / timeline              |
+--------------------------------+
```

---

## LP-46 — KPI dashboard tiles

**Use when:** Merchant overview, seller stats.

**Blocks:** **2×2 `Card` metrics**, tap to drill `ListItem` history below.

```ascii
+--------------------------------+
| +-------+ +-------+            |
| | m1    | | m2    |            |
| +-------+ +-------+            |
| +-------+ +-------+            |
| Recent                          |
+--------------------------------+
```

---

## LP-47 — Mixed activity stream

**Use when:** Wallet activity, audit log, notifications as timeline.

**Blocks:** interleaved row types (txn, promo, system) with different left icons; optional **filter** `Chips`.

```ascii
+--------------------------------+
| o promo card                    |
| o txn  -500                     |
| o txn  +200                     |
+--------------------------------+
```

---

## LP-48 — Onboarding pager

**Use when:** First-launch slides.

**Blocks:** full-bleed pages, **page dots**, **Skip** + **Next**, last page **Get started**.

```ascii
+--------------------------------+
|                                 |
|... full bleed story ...........|
|                                 |
| o o o *     Skip    [ Next ]    |
+--------------------------------+
```

---

## LP-49 — Search with grouped results

**Use when:** Contacts — **People / Merchants** sections under one query.

**Blocks:** `Search`, **`SectionHeader` per group**, `ListItem` rows.

```ascii
+--------------------------------+
| [ query..................]     |
| People                          |
|  row                            |
| Merchants                       |
|  row                            |
+--------------------------------+
```

---

## LP-50 — Stacked inline notices

**Use when:** Multiple **Alerts** (`inline` / `block`), promo banner under header.

**Blocks:** `Alerts` stack, dismiss per row, main content below; respect **one inset owner** (`design.mdc` §8.1).

```ascii
+--------------------------------+
| [!] notice 1                x   |
| promo strip                    |
| --- main page body ---          |
+--------------------------------+
```

---

## Cross-reference (examples in `layouts.md`)

| Pattern IDs | Example sections in `layouts.md` |
|-------------|-----------------------------------|
| LP-33, LP-30, LP-17 | §1 Loan offer |
| LP-31, legal rows | §2 Enter OTP |
| LP-45, LP-27 | §3 UPI Autopay education |
| LP-42, document hero | §4 Review KFS |
| LP-27, LP-19 | §5 Application status |
| LP-04, LP-15, LP-05 | §6 Send Money landing |
| LP-13 / sheet chrome, LP-33 | §7 Self account sheet |
| LP-28, LP-19, LP-23 lite, LP-50 | §8 Payment receipt |

---

*Add new `LP-NN` rows here when a pattern repeats across products; keep Figma-backed specifics in `layouts.md`.*

# PayHero — Scroll Storyboard

The homepage is **one WebGL world** and **seven HTML beats**. Scroll does not reveal stacked sections; it moves the camera through the world while copy for the current beat fades in.

Total track: **700vh** (seven beats × 100vh). Canvas is `position: fixed`. Overlay copy is sticky per beat.

| Beat | Progress | Camera | World | Overlay (verbatim from `content/home.ts`) |
| --- | --- | --- | --- | --- |
| **01 Intro** | 0.00–0.12 | Close on analyzer. Slight orbit. | Analyzer chassis, live metrics as 3D type, comparison bars as boxes, chips in foreground. | Badge, H1, subcopy, dual CTAs, reassurance |
| **02 Upload** | 0.12–0.26 | Dolly toward the statement. Analyzer recedes on Z. | Statement card flies from the right and faces camera. | How it works step 01 |
| **03 Parse** | 0.26–0.40 | Hold, then crane up. | Statement splits into three fee-layer slabs (interchange / network / markup). Bars grow. | How it works step 02 |
| **04 Path** | 0.40–0.52 | Orbit ~35°. | Layers collapse into savings report (`2.10%` vs `2.58%`, `$5,160`). | How it works step 03 |
| **05 Industries** | 0.52–0.66 | Pull back. | Eight industry tiles arrange in a constellation. Neighbours dim except the nearest. | Who we serve |
| **06 Pricing** | 0.66–0.80 | Lateral truck. | Two pricing slabs split in depth (transparent vs reduce-fees). | Pricing |
| **07 Trust → CTA** | 0.80–1.00 | Lighting cools. Dolly through vault to CTA plane. | Four onboarding documents stack then fan. Then all hero objects converge toward a single empty statement waiting for upload. | Security copy then final CTA |

Backwards scrub must reverse the same path. No one-shot animations that desync from scroll.

Trust-bar signals are not a separate page section; they are four small slabs that pass under the camera between beats 01 and 02.

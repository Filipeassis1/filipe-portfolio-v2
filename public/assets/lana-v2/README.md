# Lana v2 — process case assets

Source: Figma file `cd9cfkMDZiZbV17A6txLnC`, frame `658:12406`.

The case's text, cards, metadata, layout and interactions are React/CSS. The following files are presentation figures exported from their corresponding Figma artwork (not screenshots of the case page):

| File | Figma node |
| --- | --- |
| cover-process.png | 658:18404 |
| foundations-tokens.png | 728:22901 |
| foundations-components.png | 658:13051 |
| interface-screens.png | 658:18668 |
| interface-phone.png | 740:14544 |
| local-details.png | 658:22599 |
| sitemap-v1.png | 721:15620 |
| sitemap-v2.png | 719:15955 |
| research-poster.png | 713:13795 |
| research-results.png | 713:13790 (image overlay) |
| organic-background.png | 658:18537 (image fill) |
| preview-site.png | 746:23844 (image fill) |
| external-arrow.svg | 746:23834 |
| compare-redesign.png | 740:15102, full width, original height |
| compare-original.png | 740:15388, expanded to full width with original child positions |

The comparator artwork was exported using temporary copies, then those copies were removed. Source frames were preserved. The redesign is cropped from the top in CSS, preserving the page's original proportions.

`research-demo.mp4` is the matching local `Downloads/lana-record.mp4`. `pneus-lana.mp4` was already present in the project. Videos play muted when visible, pause offscreen, provide a manual pause control, and respect `prefers-reduced-motion`.

The main case is served at `/project.html` (with `/projects/lana-v2.html` retained as an alias). Both preview CTAs link to `https://lana-institucional-v2.vercel.app/`. The original site is `https://lanaautomotiva.com.br`, verified against the site's local project documentation.

The repeated learnings/next steps at the bottom follow the supplied Figma frame.

## SVG connections and mobile media

`sitemap-v2.svg` is the original vector export of `719:15955` (no raster images). The `home-connection-flow` group adds four masked gradient trails along the original connection coordinates, beneath the Home card, with a 4.2-second loop. Reduced motion hides the trails.

The page uses `research-demo-web.mp4` and `pneus-lana-web.mp4`: H.264 Main level 3.1, 1280×718, 30 fps, yuv420p, silent, MP4 faststart. Originals remain preserved. These derivatives avoid the original 2204×1238 High level 5.0 decoder requirement and reduce transfer size. Native muted inline autoplay/loop is supplemented by visible-page and canplay retries; blocked autoplay can still be started with the play control. Research panels share equal columns and the same aspect ratio.

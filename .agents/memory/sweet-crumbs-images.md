---
name: Sweet Crumbs image paths
description: Local asset images referenced in ogcode.html do not exist on disk; use Unsplash replacements
---

The original `components/ogcode.html` references `/src/assets/images/*.jpg` (logo, hero cake, chef photo). These files were never committed and the directory does not exist.

**Why it matters:** Any new component HTML that references these local paths will show broken images.

**How to apply:** Use Unsplash URLs instead:
- Logo: `https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&q=80&w=200`
- Hero cake: `https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=900`
- Chef portrait: `https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=650`

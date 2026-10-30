# VectorForce Official Website (`getvectorforce.github.io`)

Official static website and interactive documentation portal for **[VectorForce (VF)](https://github.com/getvectorforce/VectorForce)** — *Git for AI Context*.

## Built for GitHub Pages (Zero Build Step Required)

This website is engineered specifically for **GitHub Pages** static hosting:
- **Relative Asset Paths (`./`)**: Works seamlessly whether hosted at the root domain (`https://getvectorforce.github.io/`) or under a repository subpath (`https://getvectorforce.github.io/VectorForce/`).
- **`.nojekyll` Included**: Prevents GitHub Pages from running Jekyll processing so all static assets load immediately.
- **Zero External JS Dependencies**: Pure HTML5, modern CSS, and vanilla JavaScript with Dark/Light mode support.

---

## How to Add Your Demo Video

Open [`index.html`](./index.html) and scroll to the `DEMO VIDEO PLACEHOLDER SLOT` section (around line 195):

### Option A: Local `.mp4` Video File
1. Place your video file (e.g. `demo.mp4`) in this folder.
2. In `index.html`, update the `<source>` tag:
   ```html
   <video id="vf-demo-video" controls preload="metadata">
     <source src="./demo.mp4" type="video/mp4" />
   </video>
   ```
   When `src` is populated, clicking the Play button automatically plays your video!

### Option B: YouTube or Loom Embed
Uncomment the `<iframe>` inside `.video-stage` in `index.html` and set your embed link:
```html
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  title="VectorForce Product Demo"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>
```

---

## Deploying to GitHub Pages

```bash
git init
git add .
git commit -m "feat: launch VectorForce official website"
git branch -M main
git remote add origin https://github.com/getvectorforce/getvectorforce.github.io.git
git push -u origin main
```


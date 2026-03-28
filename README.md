# Shangun Studio - Wedding Photography Portfolio

A stunning animated wedding photography portfolio website with camera-themed animations.

## Features
- Camera shutter intro animation
- Flash effect on photo click
- Viewfinder-style hover effects
- Lightbox with shutter transitions
- Category filtering
- Fully responsive

---

## How to Add Your Own Images

### Step 1: Prepare Your Images
- Resize wedding photos to around **1200x800px** for best performance
- Use `.jpg` or `.webp` format (smaller file size)
- Name them clearly: `sharma-wedding-1.jpg`, `ring-ceremony.jpg`, etc.

### Step 2: Add Images to Project
Put your images inside the `public/images/` folder:

```
public/
  images/
    photo1.jpg
    photo2.jpg
    photo3.jpg
    ...
```

### Step 3: Update the Image Array
Open `app/ShangunStudio.js` and edit the `weddingImages` array at the top:

```js
const weddingImages = [
  { id: 1, src: "/images/sharma-wedding.jpg",   alt: "Sharma Wedding",   category: "Portraits" },
  { id: 2, src: "/images/ring-ceremony.jpg",     alt: "Ring Ceremony",    category: "Ceremony" },
  { id: 3, src: "/images/reception-dance.jpg",   alt: "Reception Dance",  category: "Reception" },
  { id: 4, src: "/images/mehndi-closeup.jpg",    alt: "Mehndi Details",   category: "Details" },
  // Add as many as you want...
];
```

### Categories Available:
- `"Portraits"` - Couple shots, bridal portraits
- `"Ceremony"` - Wedding rituals, mandap, vows
- `"Reception"` - Dance, party, toasts
- `"Details"` - Rings, flowers, decorations, mehndi

You can also **add new categories** by editing the `categories` array:
```js
const categories = ["All", "Portraits", "Ceremony", "Reception", "Details", "Pre-Wedding"];
```

### Step 4: Change Hero Background
Find the `.hero-bg` CSS class and change the background URL:
```css
.hero-bg {
  background: url('/images/your-hero-image.jpg') center/cover;
}
```

### Step 5: Change About Section Image
Find the `<img>` in the about section and update:
```html
<img className="about-img" src="/images/your-studio-photo.jpg" alt="Studio" />
```

---

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## Deploy to Vercel (Step by Step)

### Method 1: Via GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   cd shangun-studio
   git init
   git add .
   git commit -m "Shangun Studio website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/shangun-studio.git
   git push -u origin main
   ```

2. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign up / Login with GitHub
   - Click "Add New Project"
   - Select your `shangun-studio` repo
   - Click "Deploy" (no settings needed to change)
   - Wait 1-2 minutes — DONE!

3. **Your site will be live at:**
   `https://shangun-studio.vercel.app` (or similar)

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd shangun-studio
vercel

# Follow the prompts, then done!
```

---

## Custom Domain (Optional)
1. Go to your Vercel project → Settings → Domains
2. Add your domain: `shangunstudio.com`
3. Update DNS records as shown by Vercel
4. SSL is automatic!

---

## Tech Stack
- Next.js 14
- React 18
- Pure CSS animations (no extra libraries)

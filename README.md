# Baba 2 Numbari — Website

Plain HTML + CSS + JavaScript. No build step. Works on GitHub + Cloudflare Pages.

## Files
- `wrangler.jsonc` – tells Cloudflare to publish the `public` folder (do not delete)
- `public/` – **the whole website lives here**, including `assets/`
- `public/index.html` – page structure and text
- `public/style.css` – design
- `public/script.js` – store settings (WhatsApp, Instagram, Maps) are at the top of this file
- `public/products.json` – **all your products live here**
- `public/assets/` – images (`hero`, `products`, `brand`, `instagram`, `logo`, `icons`)

## Where to upload each image
Placeholder files already exist at every path below. **Upload your photo with the exact same name and it replaces the placeholder. No code change needed.** On GitHub: open the folder, **Add file → Upload files**, upload, **Commit**.

| Upload to | Used for | Best size |
|---|---|---|
| `public/assets/logo/logo.svg` | Logo in menu and footer (use a **white** logo; the bar is dark) | any, wide |
| `public/assets/hero/hero-main.jpg` | Top full-screen image | 1920×1080 or larger, landscape |
| `public/assets/brand/brand-01.jpg` | "BUILT DIFFERENT." full-screen section | 1920×1080, landscape |
| `public/assets/brand/brand-02.jpg` | Last "READY TO MAKE IT YOURS?" section | 1920×1080, landscape |
| `public/assets/brand/store-01.jpg` | Store photo in VISIT OUR STORE | 1600×1000, landscape |
| `public/assets/products/product-01.jpg`, `product-02.jpg`, `product-03.jpg` | Products | 1200×1600, portrait (3:4) |
| `public/assets/instagram/instagram-01.jpg` … `04` | Instagram grid | 1080×1080, square |

**Using PNG or WebP instead of JPG?** The file name must match the path in the code. Two options:
- Easiest: save/convert your photo as `.jpg` with the same name.
- Or upload e.g. `hero-main.webp`, **delete** the old `hero-main.jpg` placeholder, and change the name in `index.html` (hero, brand, store, logo) or in `script.js` (Instagram) or `public/products.json` (products).

Tip: keep photos under about 400 KB each (compress at squoosh.app) so the site stays fast.

If a path is wrong, the site shows a grey "IMAGE NOT FOUND" picture and prints the bad path in the browser console (F12).

## Change WhatsApp number
Top of `public/script.js`: change `whatsapp` (digits only with country code, e.g. `9195888196195`) and `phoneDisplay` (how it looks on the page).

## Change Instagram / Google Maps / location text
Top of `public/script.js`: `instagramHandle`, `instagramUrl`, `mapsUrl`, `location`.

# How to Manage Products

All products are in **`public/products.json`**. You never need to touch `index.html` or `script.js` for products.

## Change a product (name, price, details)
1. Open `public/products.json` on GitHub.
2. Find the product (search for its name or `id`).
3. Change the text between the quotes, e.g. `"price": "₹1,199"`.
4. Save: click **Commit changes**.
5. Cloudflare redeploys automatically (about a minute).
6. Refresh the website (Ctrl+F5).

## Add a new product
1. Upload the photo to `public/assets/products/` (e.g. `product-11.jpg`).
2. In `products.json`, copy a whole `{ ... }` block, paste it after the last one, and put a **comma** between the blocks (no comma after the very last one).
3. Change the details. Example:

```json
{
  "id": "product-11",
  "name": "Black Oversized T-Shirt",
  "price": "₹999",
  "image": "assets/products/product-11.jpg",
  "description": "Premium oversized t-shirt.",
  "category": "T-Shirt",
  "sizes": ["M", "L", "XL"],
  "colors": ["Black"],
  "badge": "NEW"
}
```
4. Commit and refresh as above. The product appears automatically.

## Field guide
- `id` must be unique (`product-12`, …). It is used in the WhatsApp product link.
- `name` and `image` are required. Everything else can be left as `""` or `[]` and is simply hidden.
- `"featured": true` shows a product in THE LATEST DROP. If none are marked, the first 2 are used.
- `"images": ["assets/products/product-11-b.jpg"]` adds extra photos in the product popup.
- To remove a product, delete its whole `{ ... }` block (and fix the commas).

## If the products disappear
A missing or extra comma/quote breaks the file. Paste the contents into jsonlint.com to find the mistake. The site then shows a "collection could not be loaded" message and prints the exact error in the browser console (F12).

Testing on your computer: the products only load through a web server, not by double-clicking `index.html`. Use VS Code "Live Server" or run `python3 -m http.server` inside the `public` folder.

## What BUY NOW does
Opens WhatsApp with a ready message containing the product name, price and a link (`yoursite/#product-id`). The customer must press **Send**. Nothing is ordered automatically.

## Publish with GitHub
1. Create a repository on github.com and upload all these files (keep the `assets` folder).
2. To update later: edit a file on GitHub (or upload a new image) and click **Commit changes**.

## Deploy with Cloudflare Workers (static assets)
- `wrangler.jsonc` points Cloudflare at the `public` folder. Only that folder is published, so README and config files stay private.
- In `wrangler.jsonc`, `"name"` must match your Worker's name in the Cloudflare dashboard exactly.
- Cloudflare dashboard → your Worker → **Settings → Build**: build command empty, deploy command `npx wrangler deploy`.
- Every GitHub commit to the connected branch redeploys automatically (check **Deployments** / **Builds**).
- Test an image: `https://YOUR-WORKER.workers.dev/assets/hero/hero-main.jpg`
- File names are **case-sensitive** online: `Hero-Main.JPG` is not `hero-main.jpg`.

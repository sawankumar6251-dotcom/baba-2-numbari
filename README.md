# Baba 2 Numbari — Website

Plain HTML + CSS + JavaScript. No build step. Works on GitHub + Cloudflare Pages.

## Files
- `index.html` – page structure and text
- `style.css` – design
- `script.js` – **all your settings and products are at the top of this file**
- `assets/` – images (`hero`, `products`, `brand`, `instagram`, `logo`, `icons`)

## Images the site expects
| File | Where it shows |
|---|---|
| `assets/hero/hero.jpg` | Top of the page (use your strongest, tall/wide model photo) |
| `assets/brand/cinematic.jpg` | Full-screen "BUILT DIFFERENT." section |
| `assets/brand/final.jpg` | Last section |
| `assets/products/product-01.jpg` … | Product photos |
| `assets/instagram/insta-01.jpg` … | Instagram grid |

If a file is missing, a dark placeholder with the missing filename appears. Add that file and refresh.

## Change WhatsApp number
Top of `script.js`: change `whatsapp` (digits only with country code, e.g. `9195888196195`) and `phoneDisplay` (how it looks on the page).

## Change Instagram / Google Maps / location text
Top of `script.js`: `instagramHandle`, `instagramUrl`, `mapsUrl`, `location`.

## Add a product
1. Put the photo in `assets/products/` (e.g. `product-04.jpg`).
2. In `script.js`, copy one block inside `const products = [ ... ]`, paste it after the last one (with a comma between), and change `id` (must be unique), `name`, `price`, `image`, `description`, `category`.
3. Optional: `sizes: ["S","M","L"]`, `colors: ["Black"]`, `badge: "New"`, `images: ["assets/products/product-04-b.jpg"]` for extra photos.
4. `featured: true` puts it in THE LATEST DROP. Leave out any field you don't have — it is hidden.

## Change a price / replace an image
Change `price` in that product's block. To replace a photo, upload a new file with the **same name** (or change the `image` path).

## Change text
Open `index.html` and edit the words (headings, "Not made for everyone.", "Built different.", etc.). Only change text between `>` and `<`.

## Add Instagram images
Put photos in `assets/instagram/` and list them in `instagramImages` in `script.js`.

## What BUY NOW does
Opens WhatsApp with a ready message containing the product name, price and a link (`yoursite/#product-id`). The customer must press **Send**. Nothing is ordered automatically.

## Publish with GitHub
1. Create a repository on github.com and upload all these files (keep the `assets` folder).
2. To update later: edit a file on GitHub (or upload a new image) and click **Commit changes**.

## Deploy with Cloudflare Pages
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick your repository. Framework preset: **None**. Build command: *(empty)*. Output directory: `/`.
3. **Save and Deploy.** Every GitHub commit updates the site automatically.

/* ============================================================
   BABA 2 NUMBARI — EDIT ONLY THIS TOP PART TO UPDATE THE SITE
   ============================================================ */
const STORE_CONFIG = {
  brandName: "Baba 2 Numbari",
  whatsapp: "9195888196195",            // digits only, with country code (for wa.me)
  phoneDisplay: "+91 95888196195",
  instagramHandle: "@baba2numbri_clothes_store",
  instagramUrl: "https://www.instagram.com/baba2numbri_clothes_store/",
  mapsUrl: "https://maps.app.goo.gl/9YmNNBdQQ3FC9Vuu9",
  location: "Jhinjhana, Uttar Pradesh, India"
};

/* Instagram pictures: put files in assets/instagram/ and list them here. */
const instagramImages = [
  "assets/instagram/insta-01.jpg",
  "assets/instagram/insta-02.jpg",
  "assets/instagram/insta-03.jpg",
  "assets/instagram/insta-04.jpg"
];

/* PRODUCTS. To add one: put the photo in assets/products/ and copy one block below.
   Leave a field empty ("" or []) to hide it. Add  featured: true  to show a product in THE LATEST DROP
   (if none are marked, the first 2 are used).
   The 3 entries below are PLACEHOLDERS: replace them with the real products. */
const products = [
  { id: "product-01", name: "REPLACE WITH PRODUCT NAME", price: "", image: "assets/products/product-01.jpg",
    images: [], description: "", category: "", sizes: [], colors: [], badge: "", featured: true },
  { id: "product-02", name: "REPLACE WITH PRODUCT NAME", price: "", image: "assets/products/product-02.jpg",
    images: [], description: "", category: "", sizes: [], colors: [], badge: "", featured: true },
  { id: "product-03", name: "REPLACE WITH PRODUCT NAME", price: "", image: "assets/products/product-03.jpg",
    images: [], description: "", category: "", sizes: [], colors: [], badge: "" }
];

/* ============================================================
   CODE BELOW — you do not need to change anything
   ============================================================ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const C = STORE_CONFIG;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Missing image -> visible placeholder showing the filename to add */
addEventListener("error", e => {
  const t = e.target;
  if (t.tagName !== "IMG" || t.dataset.ph) return;
  t.dataset.ph = 1;
  const name = "REPLACE_WITH_" + decodeURIComponent((t.getAttribute("src") || "").split("/").pop());
  t.src = "data:image/svg+xml;utf8," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><rect width="800" height="1000" fill="#1c1c1c"/><text x="400" y="500" fill="#999" font-family="Arial" font-size="28" text-anchor="middle">${name}</text></svg>`);
}, true);

/* Config -> links and text */
const waLink = text => `https://wa.me/${C.whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : "");
const hrefs = { wa: waLink(`Hi ${C.brandName} 👋\n\nI'd like to know more about your collection.`), ig: C.instagramUrl, maps: C.mapsUrl };
$$("[data-link]").forEach(a => a.href = hrefs[a.dataset.link]);
const texts = { location: C.location, phone: C.phoneDisplay, ig: C.instagramHandle };
$$("[data-text]").forEach(el => el.append(texts[el.dataset.text]));

/* Product helpers */
const productLink = p => location.origin + location.pathname + "#" + p.id;
const buyLink = p => waLink(
  `Hi ${C.brandName} 👋\n\nI'm interested in buying this product.\n\nProduct: ${p.name}` +
  (p.price ? `\nPrice: ${p.price}` : "") + `\n\nProduct Link:\n${productLink(p)}`);
const frame = p => `<div class="frame" data-id="${p.id}" role="button" tabindex="0" aria-label="View ${esc(p.name)}">${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy"></div>`;
const priceHtml = p => p.price ? `<p class="price">${esc(p.price)}</p>` : "";

/* Latest drop */
let featured = products.filter(p => p.featured);
if (!featured.length) featured = products.slice(0, 2);
$("#drop").innerHTML = featured.map(p => `
  <article class="drop-item"><div class="drop-img">${frame(p)}</div>
  <div class="drop-text reveal"><h3>${esc(p.name)}</h3>${priceHtml(p)}
  <a class="link-btn" href="${buyLink(p)}" target="_blank" rel="noopener">Buy now →</a></div></article>`).join("");

/* Collection */
$("#grid").innerHTML = products.map(p => `
  <article class="card">${frame(p)}
  <div class="card-meta"><h3>${esc(p.name)}</h3>${p.price ? `<span class="price">${esc(p.price)}</span>` : ""}</div>
  <a class="link-btn" href="${buyLink(p)}" target="_blank" rel="noopener">Buy now →</a></article>`).join("");

/* Instagram */
$("#ig-grid").innerHTML = instagramImages.map((s, i) => `<img src="${esc(s)}" alt="${esc(C.brandName)} on Instagram, post ${i + 1}" loading="lazy">`).join("");

/* Nav */
const nav = $("#nav"), burger = $("#burger"), menu = $("#menu");
const setMenu = open => {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.style.overflow = open ? "hidden" : "";
};
burger.onclick = () => setMenu(!menu.classList.contains("open"));
$$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));

/* Statement words light up as you scroll */
const words = $("#words");
words.innerHTML = words.textContent.split(" ").map(w => `<span>${w}</span>`).join(" ");
const spans = $$("span", words);

/* Scroll work: nav size, parallax, word progress (one rAF loop) */
const par = $$("[data-parallax]");
let ticking = false;
function onScroll() {
  ticking = false;
  const vh = innerHeight;
  nav.classList.toggle("small", scrollY > 60);
  if (!reduce) par.forEach(img => {
    const r = img.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return;
    const p = (r.top + r.height / 2 - vh / 2) / vh;
    img.style.transform = `translate3d(0,${(-p * 8).toFixed(2)}%,0)`;
  });
  const r = words.getBoundingClientRect();
  const prog = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.6)));
  spans.forEach((s, i) => s.classList.toggle("on", reduce || prog * spans.length > i));
}
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
addEventListener("resize", onScroll);
onScroll();

/* Reveal on scroll */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
$$(".reveal, .frame").forEach(el => io.observe(el));

/* Product modal */
const modal = $("#modal");
let lastFocus = null;
const row = (el, items) => { el.innerHTML = items.map(i => `<span>${esc(i)}</span>`).join(""); el.hidden = !items.length; };
function openProduct(id, pushHash = true) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  lastFocus = document.activeElement;
  const main = $("#m-img");
  main.dataset.ph = ""; main.src = p.image; main.alt = p.name;
  const gallery = [p.image, ...(p.images || [])];
  $("#m-thumbs").innerHTML = gallery.length > 1 ? gallery.map((s, i) => `<img src="${esc(s)}" alt="${esc(p.name)} view ${i + 1}" class="${i ? "" : "on"}" tabindex="0">`).join("") : "";
  $("#m-cat").textContent = p.category || ""; $("#m-name").textContent = p.name;
  $("#m-price").textContent = p.price || ""; $("#m-desc").textContent = p.description || "";
  row($("#m-sizes"), p.sizes.map(s => s)); row($("#m-colors"), p.colors);
  $("#m-buy").href = buyLink(p);
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add("open"));
  document.body.style.overflow = "hidden";
  $(".m-x").focus();
  if (pushHash) history.replaceState(null, "", "#" + p.id);
}
function closeProduct() {
  modal.classList.remove("open");
  setTimeout(() => { modal.hidden = true; }, reduce ? 0 : 450);
  document.body.style.overflow = "";
  history.replaceState(null, "", location.pathname);
  lastFocus && lastFocus.focus();
}
document.addEventListener("click", e => {
  const f = e.target.closest(".frame");
  if (f) return openProduct(f.dataset.id);
  if (e.target.closest("[data-close]")) return closeProduct();
  const t = e.target.closest(".m-thumbs img");
  if (t) { $("#m-img").dataset.ph = ""; $("#m-img").src = t.src; $$(".m-thumbs img").forEach(i => i.classList.toggle("on", i === t)); }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { if (!modal.hidden) closeProduct(); else setMenu(false); }
  if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("frame")) { e.preventDefault(); openProduct(e.target.dataset.id); }
  if (e.key === "Tab" && !modal.hidden) {
    const f = $$("button,a[href],img[tabindex]", modal).filter(x => x.offsetParent);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
/* Shared product link (…/#product-01) opens that product */
const fromHash = () => { const id = location.hash.slice(1); if (products.some(p => p.id === id)) openProduct(id, false); };
addEventListener("hashchange", fromHash);
fromHash();

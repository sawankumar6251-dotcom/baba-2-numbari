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

/* Instagram pictures: upload files to assets/instagram/ and list them here (any .jpg .png .webp name works, just match it). */
const instagramImages = [
  "assets/instagram/instagram-01.jpg",
  "assets/instagram/instagram-02.jpg",
  "assets/instagram/instagram-03.jpg",
  "assets/instagram/instagram-04.jpg"
];

/* PRODUCTS now live in products.json (same folder as index.html). Edit that file to add or change products. */
let products = [];

/* ============================================================
   CODE BELOW — you do not need to change anything
   ============================================================ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const C = STORE_CONFIG;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Missing image -> shows assets/icons/placeholder.svg and logs the bad path in the console */
const FALLBACK = "assets/icons/placeholder.svg";
addEventListener("error", e => {
  const t = e.target;
  if (t.tagName !== "IMG" || t.dataset.ph) return;
  t.dataset.ph = 1;
  console.warn("Image not found:", t.getAttribute("src"));
  t.src = FALLBACK;
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

/* Render products (called once products.json has loaded) */
function renderProducts() {
  let featured = products.filter(p => p.featured);
  if (!featured.length) featured = products.slice(0, 2);
  $("#drop").innerHTML = featured.map(p => `
    <article class="drop-item"><div class="drop-img">${frame(p)}</div>
    <div class="drop-text reveal"><h3>${esc(p.name)}</h3>${priceHtml(p)}
    <a class="link-btn" href="${buyLink(p)}" target="_blank" rel="noopener">Buy now →</a></div></article>`).join("");
  $("#grid").innerHTML = products.map(p => `
    <article class="card">${frame(p)}
    <div class="card-meta"><h3>${esc(p.name)}</h3>${p.price ? `<span class="price">${esc(p.price)}</span>` : ""}</div>
    <a class="link-btn" href="${buyLink(p)}" target="_blank" rel="noopener">Buy now →</a></article>`).join("");
  $$(".reveal", $("#drop")).forEach(el => io.observe(el));
  $$(".frame", $("#drop")).concat($$(".frame", $("#grid"))).forEach(f => io.observe(f.parentElement));
}

/* Friendly message if products.json cannot be loaded */
function showProductsError() {
  $("#drop").closest("section").hidden = true;
  $("#grid").innerHTML = `<p class="notice">Our collection could not be loaded right now. Please refresh the page, or <a class="link-btn" data-link="wa" target="_blank" rel="noopener">message us on WhatsApp →</a></p>`;
  $$("[data-link]", $("#grid")).forEach(a => a.href = hrefs[a.dataset.link]);
}

/* Load products.json */
async function loadProducts() {
  try {
    const res = await fetch("products.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`products.json returned HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("products.json must be a list: [ { ... }, { ... } ]");
    const seen = new Set();
    products = data.filter(p => {
      const ok = p && p.id && p.name && p.image && !seen.has(p.id);
      if (!ok) console.warn("products.json: skipped an entry (needs unique id, name and image):", p);
      if (p && p.id) seen.add(p.id);
      return ok;
    }).map(p => ({ price: "", description: "", category: "", badge: "", ...p,
      sizes: p.sizes || [], colors: p.colors || [], images: p.images || [] }));
    if (!products.length) throw new Error("products.json has no valid products");
    renderProducts();
    fromHash();
  } catch (err) {
    console.error("Could not load products:", err);
    showProductsError();
  }
}

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
/* A fully clipped .frame never counts as "visible", so we watch its parent and reveal the frame inside it */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  const f = e.target.classList.contains("frame") ? e.target : e.target.querySelector(".frame");
  if (f) f.classList.add("in");
  io.unobserve(e.target);
}), { threshold: .15 });
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
loadProducts();

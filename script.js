const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

/* ---- Theme ---- */
const themeBtn = $("#themeBtn");
const savedTheme = localStorage.getItem("pawpups_theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;

function syncThemeIcon(){
  if (!themeBtn) return;
  themeBtn.textContent = document.documentElement.dataset.theme === "light" ? "☀️" : "🌙";
}
syncThemeIcon();

themeBtn?.addEventListener("click", () => {
  const cur = document.documentElement.dataset.theme || "dark";
  const next = cur === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("pawpups_theme", next);
  syncThemeIcon();
});

/* ---- Mobile menu ---- */
const menuBtn = $("#menuBtn");
const mobileMenu = $("#mobileMenu");
menuBtn?.addEventListener("click", () => {
  const hidden = mobileMenu?.hasAttribute("hidden");
  hidden ? mobileMenu?.removeAttribute("hidden") : mobileMenu?.setAttribute("hidden", "");
});
mobileMenu?.addEventListener("click", (e) => {
  if (e.target.tagName === "A") mobileMenu.setAttribute("hidden", "");
});

/* ---- Data ---- */
const pups = [
  {
    id:"pup-luna",
    name:"Luna",
    breed:"Golden Retriever",
    ageWeeks:10,
    energy:"medium",
    price:1450,
    location:"Houston, TX",
    img:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=60",
    desc:"Calm, affectionate, great with families. Started on crate basics and name recognition.",
    tags:["family-friendly","trainable","gentle"],
    details:[
      "Temperament: sweet + people-focused",
      "Starter training: name response, sit lure",
      "Ideal for: families, first-time owners"
    ]
  },
  {
    id:"pup-koda",
    name:"Koda",
    breed:"Siberian Husky",
    ageWeeks:12,
    energy:"high",
    price:1250,
    location:"Dallas, TX",
    img:"https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1600&q=60",
    desc:"Energetic and playful. Loves outdoor time and enrichment games. Confident temperament.",
    tags:["active","smart","outdoors"],
    details:[
      "Temperament: confident + social",
      "Starter training: leash exposure, recall games",
      "Ideal for: active owners with structure"
    ]
  },
  {
    id:"pup-bella",
    name:"Bella",
    breed:"French Bulldog",
    ageWeeks:11,
    energy:"low",
    price:1900,
    location:"Austin, TX",
    img:"https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=60",
    desc:"Compact cuddle buddy with a sweet personality. Great for apartments and chill routines.",
    tags:["apartment","affectionate","low-energy"],
    details:[
      "Temperament: affectionate + calm",
      "Care note: avoid heat stress, keep cool",
      "Ideal for: apartments and quieter homes"
    ]
  },
  {
    id:"pup-max",
    name:"Max",
    breed:"German Shepherd",
    ageWeeks:12,
    energy:"high",
    price:1650,
    location:"Houston, TX",
    img:"https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1600&q=60",
    desc:"Focused, loyal, and eager to learn. Ideal for training-minded owners.",
    tags:["loyal","trainable","working"],
    details:[
      "Temperament: focused + handler-oriented",
      "Starter training: engagement, place, heel foundations",
      "Ideal for: active, training-focused owners"
    ]
  },
  {
    id:"pup-daisy",
    name:"Daisy",
    breed:"Beagle",
    ageWeeks:10,
    energy:"medium",
    price:1100,
    location:"San Antonio, TX",
    img:"https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=1600&q=60",
    desc:"Friendly nose and curious vibe. Loves scent games and gentle play.",
    tags:["friendly","scent","family"],
    details:[
      "Temperament: curious + friendly",
      "Starter training: recall + “leave it”",
      "Ideal for: families who like scent games"
    ]
  },
  {
    id:"pup-ace",
    name:"Ace",
    breed:"Labrador Retriever",
    ageWeeks:11,
    energy:"high",
    price:1400,
    location:"Houston, TX",
    img:"https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1600&q=60",
    desc:"Happy, social, and food-motivated—great for basic obedience training.",
    tags:["social","trainable","active"],
    details:[
      "Temperament: social + upbeat",
      "Starter training: sit/down, focus, leash manners",
      "Ideal for: active families and beginners"
    ]
  },
  {
    id:"pup-milo",
    name:"Milo",
    breed:"Poodle (Mini)",
    ageWeeks:12,
    energy:"medium",
    price:1750,
    location:"Houston, TX",
    img:"https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=60",
    desc:"Smart and alert with a playful spirit. Great for training and tricks.",
    tags:["smart","low-shed","trainable"],
    details:[
      "Temperament: bright + attentive",
      "Grooming: routine trims",
      "Ideal for: owners who enjoy training"
    ]
  },
  {
    id:"pup-scout",
    name:"Scout",
    breed:"Cavalier King Charles Spaniel",
    ageWeeks:10,
    energy:"low",
    price:1850,
    location:"Dallas, TX",
    img:"https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1600&q=60",
    desc:"Gentle companion dog with a calm, affectionate personality.",
    tags:["gentle","apartment","companion"],
    details:[
      "Temperament: affectionate + mellow",
      "Starter training: crate comfort, calm greetings",
      "Ideal for: calm homes and companionship"
    ]
  }
];

function fmtUSD(n){
  return n.toLocaleString("en-US", { style:"currency", currency:"USD", maximumFractionDigits:0 });
}

/* ---- Cart ---- */
const CART_KEY = "pawpups_cart_v2"; // stores array of ids

function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
  catch { return []; }
}
function setCart(ids){
  localStorage.setItem(CART_KEY, JSON.stringify(ids));
  renderCartBadge();
}
function addToCart(id){
  const cart = getCart();
  if (!cart.includes(id)) cart.push(id);
  setCart(cart);
}
function removeFromCart(id){
  const cart = getCart().filter(x => x !== id);
  setCart(cart);
  renderCartDrawer();
  renderCartSnapshot();
}
function clearCart(){
  setCart([]);
  renderCartDrawer();
  renderCartSnapshot();
}

function renderCartBadge(){
  const el = $("#cartCount");
  if (!el) return;
  el.textContent = String(getCart().length);
}
renderCartBadge();

/* ---- Cart Drawer ---- */
const cartBtn = $("#cartBtn");
const cartDrawer = $("#cartDrawer");
const closeCartBtn = $("#closeCart");
const cartBackdrop = $("#cartBackdrop");
const clearCartBtn = $("#clearCart");

function openCart(){
  if (!cartDrawer) return;
  cartDrawer.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
  renderCartDrawer();
}
function closeCart(){
  if (!cartDrawer) return;
  cartDrawer.setAttribute("hidden", "");
  document.body.style.overflow = "";
}
cartBtn?.addEventListener("click", openCart);
closeCartBtn?.addEventListener("click", closeCart);
cartBackdrop?.addEventListener("click", closeCart);
clearCartBtn?.addEventListener("click", clearCart);

function renderCartDrawer(){
  const cartItemsEl = $("#cartItems");
  const subtotalEl = $("#cartSubtotal");
  if (!cartItemsEl || !subtotalEl) return;

  const ids = getCart();
  const items = ids.map(id => pups.find(p => p.id === id)).filter(Boolean);

  cartItemsEl.innerHTML = "";
  if (items.length === 0){
    cartItemsEl.innerHTML = `<p class="muted">Your cart is empty.</p>`;
    subtotalEl.textContent = fmtUSD(0);
    return;
  }

  let subtotal = 0;
  items.forEach(p => {
    subtotal += p.price;
    const row = document.createElement("div");
    row.className = "cartItem";
    row.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <div>
        <div style="font-weight:950;">${p.name}</div>
        <div class="tiny muted">${p.breed} • ${fmtUSD(p.price)}</div>
      </div>
      <button class="btn btn--ghost" type="button">Remove</button>
    `;
    row.querySelector("button").addEventListener("click", () => removeFromCart(p.id));
    cartItemsEl.appendChild(row);
  });

  subtotalEl.textContent = fmtUSD(subtotal);
}

function renderCartSnapshot(){
  const snap = $("#cartSnapshot");
  if (!snap) return;
  const ids = getCart();
  if (ids.length === 0){
    snap.textContent = "Your cart is empty.";
    return;
  }
  const names = ids.map(id => pups.find(p => p.id === id)?.name).filter(Boolean);
  snap.textContent = `In cart: ${names.join(", ")}.`;
}
renderCartSnapshot();

/* ---- Puppies page render + filters + sort ---- */
const pupsGrid = $("#pupsGrid");
const searchPups = $("#searchPups");
const breedFilter = $("#breedFilter");
const energyFilter = $("#energyFilter");
const priceFilter = $("#priceFilter");
const sortFilter = $("#sortFilter");
const resultsCount = $("#resultsCount");

function makeChip(text){
  const s = document.createElement("span");
  s.className = "chip";
  s.textContent = text;
  return s;
}

function cardHTML(p){
  return `
    <img loading="lazy" src="${p.img}" alt="${p.breed} puppy named ${p.name}">
    <div>
      <div class="kicker">${p.breed}</div>
      <h3>${p.name}</h3>
      <div class="tiny muted">${p.ageWeeks} weeks • ${p.energy.toUpperCase()} energy • ${p.location}</div>
      <p class="muted">${p.desc}</p>
      <div class="metaRow"></div>
      <div class="row" style="margin-top:10px;">
        <div class="rowLeft">
          <span class="price">${fmtUSD(p.price)}</span>
        </div>
        <div class="rowLeft">
          <button class="btn btn--primary" data-add="${p.id}" type="button">Add to Cart</button>
          <button class="btn btn--ghost" data-view="${p.id}" type="button">Quick View</button>
        </div>
      </div>
    </div>
  `;
}

function renderPups(list){
  if (!pupsGrid) return;
  pupsGrid.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "tile product";
    card.id = p.id;
    card.innerHTML = cardHTML(p);

    const meta = card.querySelector(".metaRow");
    p.tags.slice(0,3).forEach(t => meta.appendChild(makeChip(t)));

    // Button handlers
    card.querySelector(`[data-add="${p.id}"]`).addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(p.id);
      renderCartDrawer();
    });

    card.querySelector(`[data-view="${p.id}"]`).addEventListener("click", (e) => {
      e.stopPropagation();
      openPupModal(p);
    });

    // Card click = modal
    card.addEventListener("click", () => openPupModal(p));
    pupsGrid.appendChild(card);
  });

  if (resultsCount) resultsCount.textContent = `${list.length} result${list.length === 1 ? "" : "s"}`;
}

function applyPupFilters(){
  if (!pupsGrid) return;

  const q = (searchPups?.value || "").trim().toLowerCase();
  const b = breedFilter?.value || "all";
  const e = energyFilter?.value || "all";
  const max = Number(priceFilter?.value || 9999);
  const sort = sortFilter?.value || "featured";

  let filtered = pups.filter(p => {
    const matchText = (p.name + " " + p.breed).toLowerCase().includes(q);
    const matchBreed = b === "all" ? true : p.breed === b;
    const matchEnergy = e === "all" ? true : p.energy === e;
    const matchPrice = p.price <= max;
    return matchText && matchBreed && matchEnergy && matchPrice;
  });

  // Sort
  if (sort === "price_low") filtered.sort((a,b) => a.price - b.price);
  if (sort === "price_high") filtered.sort((a,b) => b.price - a.price);
  if (sort === "age_low") filtered.sort((a,b) => a.ageWeeks - b.ageWeeks);
  if (sort === "age_high") filtered.sort((a,b) => b.ageWeeks - a.ageWeeks);

  renderPups(filtered);
}

searchPups?.addEventListener("input", applyPupFilters);
breedFilter?.addEventListener("change", applyPupFilters);
energyFilter?.addEventListener("change", applyPupFilters);
priceFilter?.addEventListener("change", applyPupFilters);
sortFilter?.addEventListener("change", applyPupFilters);

if (pupsGrid) renderPups(pups);

/* ---- Featured widgets (Home page) ---- */
const featuredWrap = $("#featuredWrap");
if (featuredWrap){
  const featured = pups.slice(0,3);
  featuredWrap.innerHTML = "";
  featured.forEach(p => {
    const a = document.createElement("a");
    a.className = "feature";
    a.href = `puppies.html#${p.id}`;
    a.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div>
        <p class="kicker">${p.breed}</p>
        <p class="title">${p.name}</p>
        <p class="sub">${fmtUSD(p.price)} • ${p.ageWeeks} weeks</p>
      </div>
    `;
    featuredWrap.appendChild(a);
  });
}

/* ---- Modal (Quick View) ---- */
const modal = $("#modal");
const modalImg = $("#modalImg");
const modalTitle = $("#modalTitle");
const modalDesc = $("#modalDesc");
const modalMeta = $("#modalMeta");
const modalList = $("#modalList");
const modalCap = $("#modalCap");
const closeModalBtn = $("#closeModal");
const modalAdd = $("#modalAdd");

let currentModalPup = null;

function openPupModal(p){
  if (!modal) return;
  currentModalPup = p;

  modalImg.src = p.img;
  modalImg.alt = `${p.breed} puppy named ${p.name}`;
  modalTitle.textContent = `${p.name} — ${p.breed}`;
  modalDesc.textContent = p.desc;

  modalMeta.innerHTML = "";
  modalMeta.appendChild(makeChip(`${p.ageWeeks} weeks`));
  modalMeta.appendChild(makeChip(`${p.energy} energy`));
  modalMeta.appendChild(makeChip(p.location));
  modalMeta.appendChild(makeChip(fmtUSD(p.price)));

  modalList.innerHTML = "";
  p.details.forEach(d => {
    const li = document.createElement("li");
    li.textContent = d;
    modalList.appendChild(li);
  });

  modalCap.textContent = "Photos: Unsplash (demo use). Listings: class project demo.";
  modal.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
}
function closeModal(){
  if (!modal) return;
  modal.setAttribute("hidden", "");
  document.body.style.overflow = "";
  currentModalPup = null;
}
closeModalBtn?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => {
  if (e.target?.dataset?.close === "true") closeModal();
});
document.addEventListener("keydown", (e) => {
  if (!modal?.hasAttribute("hidden") && e.key === "Escape") closeModal();
});
modalAdd?.addEventListener("click", () => {
  if (!currentModalPup) return;
  addToCart(currentModalPup.id);
  renderCartDrawer();
});

/* ---- Inquiry dropdown + validation ---- */
const iPup = $("#iPup");
if (iPup){
  const ids = getCart();
  const inCart = ids.map(id => pups.find(p => p.id === id)).filter(Boolean);
  const list = inCart.length ? inCart : pups;

  iPup.innerHTML = list.map(p => `<option value="${p.id}">${p.name} — ${p.breed} (${fmtUSD(p.price)})</option>`).join("");
}

function isValidEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

const inquiryForm = $("#inquiryForm");
if (inquiryForm){
  const status = $("#inqStatus");
  inquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#iName").value.trim();
    const email = $("#iEmail").value.trim();
    const city = $("#iCity").value.trim();
    const msg = $("#iMsg").value.trim();

    const eName = $("#eName"), eEmail = $("#eEmail"), eCity = $("#eCity"), eMsg = $("#eMsg");
    let ok = true;

    if (!name){ eName.hidden = false; ok = false; } else eName.hidden = true;
    if (!isValidEmail(email)){ eEmail.hidden = false; ok = false; } else eEmail.hidden = true;
    if (!city){ eCity.hidden = false; ok = false; } else eCity.hidden = true;
    if (!msg){ eMsg.hidden = false; ok = false; } else eMsg.hidden = true;

    if (!ok){
      status.textContent = "Please fix the highlighted fields.";
      return;
    }

    const pupId = $("#iPup").value;
    const p = pups.find(x => x.id === pupId);

    status.textContent = "Submitting inquiry...";
    setTimeout(() => {
      status.textContent = `✅ Inquiry submitted (demo). We will follow up about ${p?.name || "your selection"} soon.`;
      inquiryForm.reset();
      renderCartSnapshot();
    }, 650);
  });

  renderCartSnapshot();
}

/* ---- Reviews: dynamic add ---- */
const reviewForm = $("#reviewForm");
if (reviewForm){
  const status = $("#reviewStatus");
  const list = $("#reviewList");

  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#rName").value.trim();
    const stars = $("#rStars").value;
    const text = $("#rText").value.trim();

    if (!name || !text){
      status.textContent = "Please fill out your name and review text.";
      return;
    }

    status.textContent = "Submitting...";
    setTimeout(() => {
      const card = document.createElement("article");
      card.className = "tile";
      card.innerHTML = `
        <p class="stars">${stars}</p>
        <h3 style="margin:0 0 6px;">“${text.replace(/</g,"&lt;").slice(0,90)}${text.length>90?"…":""}”</h3>
        <p class="tiny muted">— ${name.replace(/</g,"&lt;")}</p>
      `;
      list?.prepend(card);

      status.textContent = "✅ Review submitted (demo). Thank you!";
      reviewForm.reset();
    }, 550);
  });
}

/* ---- Accordion (Care page) ---- */
$$(".accBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    const panel = btn.nextElementSibling;
    btn.setAttribute("aria-expanded", String(!expanded));
    if (expanded) panel.setAttribute("hidden", "");
    else panel.removeAttribute("hidden");
    btn.querySelector("span:last-child").textContent = expanded ? "+" : "–";
  });
});
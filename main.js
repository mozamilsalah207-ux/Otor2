// ===== بيانات المنتجات =====
const products = [
  {
    id: 1,
    name: "عطر سوفاج إكسير Dior",
    price: 389,
    cat: "رجالي",
    rating: 5,
    desc: "عطر فاخر للرجل العصري. مزيج من اللافندر والفلفل والعنبر يدوم 12 ساعة.",
    img: "https://picsum.photos/600/600?random=1",
    badge: "جديد",
  },
  {
    id: 2,
    name: "لا في إي بيل Lancome",
    price: 349,
    cat: "نسائي",
    rating: 5,
    desc: "عطر زهري أنثوي برائحة الأيريس والياسمين. لمسة فخامة فرنسية.",
    img: "https://picsum.photos/600/600?random=2",
    badge: "الأكثر مبيعاً",
  },
  {
    id: 3,
    name: "عود ملكي كمبودي",
    price: 550,
    cat: "عود",
    rating: 5,
    desc: "دهن عود أصلي 100% من كمبوديا. رائحة شرقية عميقة وثابتة.",
    img: "https://picsum.photos/600/600?random=3",
    badge: "حصري",
  },
  {
    id: 4,
    name: "بلو دي شانيل",
    price: 320,
    cat: "رجالي",
    rating: 4,
    desc: "انتعاش البحر مع لمسة خشبية. مثالي للاستخدام اليومي.",
    img: "https://picsum.photos/600/600?random=4",
  },
  {
    id: 5,
    name: "قوتشي بلوم",
    price: 380,
    cat: "نسائي",
    rating: 5,
    desc: "باقة زهور بيضاء مع لمسة مسك. عطر رومانسي بامتياز.",
    img: "https://picsum.photos/600/600?random=5",
  },
  {
    id: 6,
    name: "بخور ملكي فاخر",
    price: 150,
    cat: "عود",
    rating: 4,
    desc: "تشكيلة بخور منزلي برائحة العود والعنبر.",
    img: "https://picsum.photos/600/600?random=6",
  },
  {
    id: 7,
    name: "ون مليون Paco Rabanne",
    price: 310,
    cat: "رجالي",
    rating: 4,
    desc: "عطر شبابي برائحة الجريب فروت والنعناع.",
    img: "https://picsum.photos/600/600?random=7",
  },
  {
    id: 8,
    name: "كوكو مادموزيل Chanel",
    price: 420,
    cat: "نسائي",
    rating: 5,
    desc: "كلاسيكي أنيق برائحة البرتقال والياسمين.",
    img: "https://picsum.photos/600/600?random=8",
  },
];

let cart = [];
let currentProduct = null;

// صورة بديلة محلية بصيغة SVG مشفرة لاستخدامها عند فشل تحميل الصورة
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="100%" height="100%" fill="#f3f3f3"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#7a7a7a" font-size="28" font-family="Tajawal, Arial, sans-serif">صورة غير متاحة</text></svg>`,
  );

// ===== دوال مساعدة =====
function showStars(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function displayProducts(list) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  if (list.length == 0) {
    grid.innerHTML =
      '<p style="grid-column:1/-1;text-align:center;padding:50px;color:var(--gray)">لا توجد منتجات مطابقة</p>';
    return;
  }
  grid.innerHTML = list
    .map(
      (p) => `
    <div class="card" onclick="openModal(${p.id})">
      <div class="card-img">
        ${p.badge ? `<span class="card-badge" style="top:15px;right:15px">${p.badge}</span>` : ""}
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
      </div>
      <div class="card-body">
        <div class="stars">${showStars(p.rating)}</div>
        <h3>${p.name}</h3>
        <p class="price">${p.price} ريال</p>
        <div class="card-actions">
          <button class="btn-cart" onclick="addToCart(${p.id});event.stopPropagation()">أضف للسلة</button>
          <button class="btn-view" onclick="openModal(${p.id});event.stopPropagation()">التفاصيل</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

function filterProducts(cat, btn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  const filtered =
    cat == "all" ? products : products.filter((p) => p.cat == cat);
  displayProducts(filtered);
}

// ===== البحث =====
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = products.filter((p) => p.name.toLowerCase().includes(val));
    displayProducts(filtered);
  });
}

// ===== المودال =====
function openModal(id) {
  currentProduct = products.find((p) => p.id == id);
  if (!currentProduct) return;
  const modalImgEl = document.getElementById("modalImg");
  modalImgEl.src = currentProduct.img;
  modalImgEl.alt = currentProduct.name;
  modalImgEl.onerror = () => (modalImgEl.src = FALLBACK_IMG);
  document.getElementById("modalName").textContent = currentProduct.name;
  document.getElementById("modalStars").innerHTML = showStars(
    currentProduct.rating,
  );
  document.getElementById("modalPrice").textContent =
    currentProduct.price + " ريال";
  document.getElementById("modalDesc").textContent = currentProduct.desc;
  document.getElementById("productModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("productModal").classList.remove("active");
  document.body.style.overflow = "auto";
}

// ===== السلة =====
function addToCart(id) {
  const item = products.find((p) => p.id == id);
  if (!item) return;

  const existing = cart.find((c) => c.id == id);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });
  updateCart();
  showToast("تمت الإضافة للسلة ✅");
}

function addToCartFromModal() {
  if (currentProduct) addToCart(currentProduct.id);
  closeModal();
}

function updateCart() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cartCount) cartCount.textContent = cart.reduce((s, i) => s + i.qty, 0);

  if (cart.length == 0) {
    if (cartItems)
      cartItems.innerHTML =
        '<p style="text-align:center;color:var(--gray);padding:50px 0">السلة فارغة</p>';
    if (cartTotal) cartTotal.textContent = 0;
    return;
  }

  if (cartItems) {
    cartItems.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'">
        <div style="flex:1;min-width:150px">
          <h4 style="font-size:clamp(14px, 1.8vw, 15px);margin-bottom:5px">${item.name}</h4>
          <p style="color:var(--gold);font-weight:700">${item.price} ريال</p>
          <div style="display:flex;gap:10px;margin-top:10px;align-items:center;flex-wrap:wrap">
            <button class="qty-btn" onclick="changeQty(${item.id},-1)">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
            <button style="margin-right:auto;background:none;border:none;color:red;cursor:pointer" onclick="removeFromCart(${item.id})">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  if (cartTotal)
    cartTotal.textContent = cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function changeQty(id, delta) {
  const item = cart.find((c) => c.id == id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter((c) => c.id != id);
  updateCart();
}

function toggleCart() {
  const cartPanel = document.getElementById("cartPanel");
  if (cartPanel) cartPanel.classList.toggle("active");
}

// ===== الدفع والطلب =====
function checkout() {
  if (cart.length == 0) {
    showToast("السلة فارغة!");
    return;
  }
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const lines = cart
    .map((i) => `${i.name} x${i.qty} = ${i.price * i.qty} ريال`)
    .join("\n");
  const msg = `طلب جديد من متجر عطرك:\n\n${lines}\n\nالإجمالي: ${total} ريال`;
  window.open(`https://wa.me/0968295016?text=${encodeURIComponent(msg)}`);
  cart = [];
  updateCart();
  toggleCart();
  showToast("تم إرسال الطلب عبر واتساب!");
}

function orderWhatsApp() {
  if (!currentProduct) return;
  const msg = `أريد طلب: ${currentProduct.name} - ${currentProduct.price} ريال`;
  window.open(`https://wa.me/0968295016?text=${encodeURIComponent(msg)}`);
}

// ===== الفورم =====
function submitForm(e) {
  e.preventDefault();
  showToast("تم استلام رسالتك وسنرد خلال 24 ساعة ✅");
  e.target.reset();
}

// ===== رسائل Toast =====
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ===== تأثيرات السكرول =====
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) {
    if (window.scrollY > 50) header.style.background = "rgba(10,10,10,1)";
    else header.style.background = "rgba(10,10,10,0.95)";
  }
});

// ===== إغلاق المودال عند الضغط برا =====
const productModal = document.getElementById("productModal");
if (productModal) {
  productModal.addEventListener("click", (e) => {
    if (e.target.id === "productModal") closeModal();
  });
}

// ===== تشغيل أول ما الصفحة تحمل =====
document.addEventListener("DOMContentLoaded", function () {
  displayProducts(products);
});

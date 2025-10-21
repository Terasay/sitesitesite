const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        category: 'smartphones',
        price: 129990,
        img: 'img/S600xU_2x.webp',
    },
    {
        id: 2,
        name: 'MacBook Air 2025',
        category: 'notebooks',
        price: 159990,
        img: 'img/12345.webp',
    },
    {
        id: 3,
        name: 'Samsung QLED TV',
        category: 'tvs',
        price: 89990,
        img: 'img/samsung.png',
    },
    {
        id: 4,
        name: 'Sony WH-1000XM5',
        category: 'headphones',
        price: 34990,
        img: 'img/a3426836123ee5cb367d694a2b0648c52fa992d6.webp',
    },
    {
        id: 5,
        name: 'PlayStation 5',
        category: 'consoles',
        price: 69990,
        img: 'img/playstation.webp',
    },
    {
        id: 6,
        name: 'Xiaomi Smart Home Kit',
        category: 'smarthome',
        price: 12990,
        img: 'img/12526.png',
    },
    {
        id: 7,
        name: 'Apple Watch Series 9',
        category: 'smartphones',
        price: 59990,
        img: 'img/6780957357.jpg',
    },
    {
        id: 8,
        name: 'Lenovo Legion 5',
        category: 'notebooks',
        price: 109990,
        img: 'img/Best-Buy-Original-Brand-Laptop-R9000p-Y9000K-New-16-Inch-for-Sale-Core-I7-I9-16g-512GB-1tb-Gaming-Business-Computer-PC-Laptops.webp',
    },
    {
        id: 9,
        name: 'LG OLED TV 55"',
        category: 'tvs',
        price: 119990,
        img: 'img/OLED55BXPTA-Ambalg2-1536x1020.png',
    },
    {
        id: 10,
        name: 'JBL Tune 510BT',
        category: 'headphones',
        price: 8990,
        img: 'img/fdb7386c61846a469ae6dd9d3a4c7e2e-1000x1000.png',
    },
    {
        id: 11,
        name: 'Xbox Series S',
        category: 'consoles',
        price: 49990,
        img: 'img/xbox.png',
    },
    {
        id: 12,
        name: 'Philips Hue Starter Kit',
        category: 'smarthome',
        price: 15990,
        img: 'img/Philips-hue-starterpakket.webp',
    },
];

let currentCategory = 'all';
let currentSort = 'default';
let cart = [];

function renderProducts() {
    let filtered = products.filter(p => currentCategory === 'all' || p.category === currentCategory);
    switch (currentSort) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
            break;
        case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name, 'ru'));
            break;
    }
    const grid = document.getElementById('shop-products');
    grid.innerHTML = filtered.map(product => `
        <div class="shop-product-card">
            <img src="${product.img}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <div class="price">${product.price.toLocaleString('ru-RU')} ₸</div>
            <div class="shop-product-actions">
                <a href="#" class="btn small" onclick="openQuickBuy(${JSON.stringify(product).replace(/"/g,'&quot;')});return false;">Купить</a>
                <button class="cart-btn small" title="В корзину" onclick="addToCart(${JSON.stringify(product).replace(/"/g,'&quot;')});return false;">
                    <span class="svg-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    </span>
                </button>
            </div>
        </div>
    `).join('');
}

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    document.body.style.overflow = '';
}

function openQuickBuy(product) {
    document.getElementById('quickbuy-product').innerHTML = `
        <div style="margin-bottom:10px;"><b>${product.name}</b><br><span style='color:#e53935;'>${product.price.toLocaleString('ru-RU')} ₸</span></div>
    `;
    document.getElementById('quickbuy-success').style.display = 'none';
    document.getElementById('quickbuy-form').reset();
    openModal('quickbuy-modal');
    document.getElementById('quickbuy-form').onsubmit = function(e) {
        e.preventDefault();
        document.getElementById('quickbuy-success').style.display = 'block';
        setTimeout(() => closeModal('quickbuy-modal'), 2000);
    };
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="color:#bbb;">Корзина пуста</div>';
    } else {
        cartItems.innerHTML = cart.map((item, idx) => `
            <div class="cart-item">
                <span class="cart-item-title">${item.name}</span>
                <span>${item.price.toLocaleString('ru-RU')} ₸</span>
                <button class="cart-item-remove" onclick="removeFromCart(${idx})">×</button>
            </div>
        `).join('');
    }
    document.getElementById('cart-total-price').textContent = cart.reduce((sum, p) => sum + p.price, 0).toLocaleString('ru-RU') + ' ₸';
}
function addToCart(product) {
    cart.push(product);
    updateCart();
    openModal('cart-modal');
}
function removeFromCart(idx) {
    cart.splice(idx, 1);
    updateCart();
}

function openCheckout() {
    document.getElementById('checkout-success').style.display = 'none';
    document.getElementById('checkout-form').reset();
    closeModal('cart-modal');
    openModal('checkout-modal');
}
document.getElementById('cart-checkout-btn').onclick = openCheckout;
document.getElementById('checkout-form').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('checkout-success').style.display = 'block';
    cart = [];
    updateCart();
    setTimeout(() => closeModal('checkout-modal'), 2000);
};

const categoryBtns = document.querySelectorAll('.shop-category');
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        renderProducts();
    });
});

const sortSelect = document.getElementById('sort-select');
sortSelect.addEventListener('change', () => {
    currentSort = sortSelect.value;
    renderProducts();
});

['cart-modal-close','checkout-modal-close','quickbuy-modal-close'].forEach(id => {
    document.getElementById(id).onclick = function() {
        closeModal(id.replace('-close',''));
    };
});

window.onclick = function(e) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (e.target === modal) modal.style.display = 'none';
    });
    document.body.style.overflow = '';
};

window.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    const id = params.get('id');
    const category = params.get('category');
    if (category) {
        currentCategory = category;
        categoryBtns.forEach(btn => {
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    renderProducts();
    if (action && id) {
        const product = products.find(p => p.id == id);
        if (product) {
            if (action === 'buy') {
                openQuickBuy(product);
            } else if (action === 'cart') {
                addToCart(product);
            }
        }
    }
});

renderProducts();
updateCart();

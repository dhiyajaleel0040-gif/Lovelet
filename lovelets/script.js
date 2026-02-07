import { initSharedComponents } from './components.js';
import { products } from './products-data.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize shared Header and Footer
    initSharedComponents();

    // 2. Setup standard listeners (Cart, Badge etc) after rendering components
    const cartBadge = document.querySelector('.cart-badge');
    const wishlistBadge = document.querySelector('.wishlist-badge');

    // Cart Drawer Elements
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalAmount = document.getElementById('cart-total-amount');

    // Initialize counters and cart UI
    updateBadges();
    updateCartUI();

    const cartBtn = document.querySelector('.cart-btn');

    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    function openCart() {
        if (cartDrawer) cartDrawer.classList.add('active');
        if (cartOverlay) cartOverlay.classList.add('active');
    }

    function closeCart() {
        if (cartDrawer) cartDrawer.classList.remove('active');
        if (cartOverlay) cartOverlay.classList.remove('active');
    }

    function updateBadges() {
        const wishlist = JSON.parse(localStorage.getItem('lovelets_wishlist') || '[]');
        if (wishlistBadge) wishlistBadge.innerText = wishlist.length;

        const cart = JSON.parse(localStorage.getItem('lovelets_cart') || '[]');
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        if (cartBadge) cartBadge.innerText = totalItems;
    }

    // 3. Render Static Products from products-data.js
    renderCategoryProducts();

    // 4. Render Dynamic (Custom) Products from LocalStorage
    renderDynamicProducts();

    // 4.5 Render Wishlist if on wishlist page
    renderWishlist();

    // 5. Function to render category-specific products
    function renderCategoryProducts() {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;

        const h2 = document.querySelector('h2');
        if (!h2) return;

        const pageTitle = h2.innerText.toLowerCase();
        let currentCategory = '';
        if (pageTitle.includes('clothing')) currentCategory = 'clothing';
        else if (pageTitle.includes('toy')) currentCategory = 'toys';
        else if (pageTitle.includes('travel')) currentCategory = 'travel';
        else if (pageTitle.includes('care')) currentCategory = 'care';
        else if (pageTitle.includes('bathing')) currentCategory = 'bathing';
        else if (pageTitle.includes('feeding')) currentCategory = 'feeding';
        else if (pageTitle.includes('nursery')) currentCategory = 'nursery';

        // Filter products: if "Mom's Choice", show featured. Otherwise show by category.
        const filtered = pageTitle.includes('choice')
            ? products.filter(p => p.featured)
            : products.filter(p => p.category === currentCategory);

        filtered.forEach(p => {
            const card = createProductCard(p);
            productGrid.appendChild(card);
        });
    }

    // 6. Function to render user-added products
    function renderDynamicProducts() {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;

        const h2 = document.querySelector('h2');
        if (!h2) return;

        const pageTitle = h2.innerText.toLowerCase();
        let currentCategory = '';
        if (pageTitle.includes('clothing')) currentCategory = 'clothing';
        else if (pageTitle.includes('toy')) currentCategory = 'toys';
        else if (pageTitle.includes('travel')) currentCategory = 'travel';
        else if (pageTitle.includes('care')) currentCategory = 'care';
        else if (pageTitle.includes('bathing')) currentCategory = 'bathing';
        else if (pageTitle.includes('feeding')) currentCategory = 'feeding';
        else if (pageTitle.includes('nursery')) currentCategory = 'nursery';

        const customProducts = JSON.parse(localStorage.getItem('lovelets_custom_products') || '[]');

        customProducts.forEach(p => {
            if (p.category === currentCategory) {
                const card = createProductCard(p, true);
                productGrid.appendChild(card);
            }
        });
    }

    // 6.5 Function to render wishlist items
    function renderWishlist() {
        const wishlistGrid = document.getElementById('wishlist-grid');
        const emptyMsg = document.getElementById('empty-wishlist');
        if (!wishlistGrid) return;

        const wishlist = JSON.parse(localStorage.getItem('lovelets_wishlist') || '[]');

        if (wishlist.length === 0) {
            wishlistGrid.style.display = 'none';
            if (emptyMsg) emptyMsg.style.display = 'block';
            return;
        }

        wishlistGrid.style.display = 'grid';
        if (emptyMsg) emptyMsg.style.display = 'none';
        wishlistGrid.innerHTML = '';

        wishlist.forEach(p => {
            const card = createProductCard(p);
            wishlistGrid.appendChild(card);
        });
    }

    // 7. Helper to create a product card element
    function createProductCard(p, isCustom = false) {
        const card = document.createElement('div');
        card.className = 'product-card';
        if (isCustom) card.classList.add('custom-product');

        const badgeClass = p.badge && p.badge.toLowerCase().includes('cute') ? 'product-badge ultra-cute' : 'product-badge';
        const badgeHtml = isCustom
            ? `<div class="product-badge" style="background: var(--color-blue); color: white;">Collection</div>`
            : (p.badge ? `<div class="${badgeClass}">${p.badge}</div>` : '');

        const wishlist = JSON.parse(localStorage.getItem('lovelets_wishlist') || '[]');
        const isWishlisted = wishlist.some(item => item.id === p.id);

        card.innerHTML = `
            ${badgeHtml}
            <div class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${p.id}">
                <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </div>
            <div class="product-img-container">
                <div class="product-img active">
                    <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; transition: transform 0.5s ease;">
                </div>
                <!-- Sparkle decoration -->
                <div class="cute-sparkle" style="position: absolute; top: 10px; right: 10px; font-size: 1.2rem; opacity: 0; transition: 0.3s; pointer-events: none;">✨</div>
                <div class="image-dots">
                    <span class="dot active"></span>
                </div>
            </div>
            <div class="product-info">
                <h4>${p.name}</h4>
                <div class="rating">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                </div>
                <p class="price">$${p.price}</p>
                <div style="position: relative;">
                    <button class="btn btn-sm">Add to Cart</button>
                    <!-- Heart pop element -->
                    <div class="heart-pop" style="position: absolute; top: -30px; left: 50%; transform: translateX(-50%) scale(0); opacity: 0; transition: 0.5s ease; color: var(--color-pink); font-size: 1.5rem;">💖</div>
                </div>
            </div>
        `;

        // Wishlist Toggle Logic
        const heartBtn = card.querySelector('.product-wishlist-btn');
        heartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWishlist(p, heartBtn);
        });

        function toggleWishlist(product, btn) {
            let wishlist = JSON.parse(localStorage.getItem('lovelets_wishlist') || '[]');
            const index = wishlist.findIndex(item => item.id === product.id);
            const icon = btn.querySelector('i');

            if (index > -1) {
                wishlist.splice(index, 1);
                btn.classList.remove('active');
                icon.className = 'fa-regular fa-heart';
            } else {
                wishlist.push(product);
                btn.classList.add('active');
                icon.className = 'fa-solid fa-heart';

                // Show a small "saved" feedback
                const feedback = document.createElement('span');
                feedback.innerText = 'Saved! ✨';
                feedback.style.cssText = 'position:absolute; top:-20px; left:50%; transform:translateX(-50%); font-size:0.7rem; color:var(--color-pink); font-weight:700; pointer-events:none; animation: float 1s forwards;';
                btn.appendChild(feedback);
                setTimeout(() => feedback.remove(), 1000);
            }

            localStorage.setItem('lovelets_wishlist', JSON.stringify(wishlist));
            updateBadges();
        }

        // Hover effects in JS for more control
        card.addEventListener('mouseenter', () => {
            const img = card.querySelector('.product-img img');
            const sparkle = card.querySelector('.cute-sparkle');
            if (img) img.style.transform = 'scale(1.1) rotate(2deg)';
            if (sparkle) sparkle.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('.product-img img');
            const sparkle = card.querySelector('.cute-sparkle');
            if (img) img.style.transform = 'scale(1) rotate(0deg)';
            if (sparkle) sparkle.style.opacity = '0';
        });

        // Add event listener to the button
        const btn = card.querySelector('button');
        const heartPop = card.querySelector('.heart-pop');

        btn.addEventListener('click', () => {
            addToCart(p);

            btn.innerText = "Added! ✨";
            btn.style.backgroundColor = "#4CAF50";
            btn.style.color = "white";

            // Heart pop animation
            if (heartPop) {
                heartPop.style.transform = 'translateX(-50%) scale(1.5) translateY(-20px)';
                heartPop.style.opacity = '1';
                setTimeout(() => {
                    heartPop.style.transform = 'translateX(-50%) scale(0) translateY(0)';
                    heartPop.style.opacity = '0';
                }, 1000);
            }

            setTimeout(() => {
                btn.innerText = "Add to Cart";
                btn.style.backgroundColor = "";
                btn.style.color = "";
            }, 1500);
        });

        return card;
    }

    // 7.5 Shopping Cart Management Functions
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('lovelets_cart') || '[]');
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('lovelets_cart', JSON.stringify(cart));
        updateBadges();
        updateCartUI();
        openCart();
    }

    function removeFromCart(id) {
        let cart = JSON.parse(localStorage.getItem('lovelets_cart') || '[]');
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('lovelets_cart', JSON.stringify(cart));
        updateBadges();
        updateCartUI();
    }

    function changeQuantity(id, delta) {
        let cart = JSON.parse(localStorage.getItem('lovelets_cart') || '[]');
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
        }
        localStorage.setItem('lovelets_cart', JSON.stringify(cart));
        updateBadges();
        updateCartUI();
    }

    function updateCartUI() {
        if (!cartItemsContainer || !cartTotalAmount) return;

        const cart = JSON.parse(localStorage.getItem('lovelets_cart') || '[]');

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-msg">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <p>Your cart is empty! <br> Let's find some cute things.</p>
                </div>
            `;
            cartTotalAmount.innerText = '$0.00';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += parseFloat(item.price) * item.quantity;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="price">$${item.price}</p>
                    <div class="cart-item-controls">
                        <button class="qty-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn plus" data-id="${item.id}">+</button>
                        <span class="remove-item" data-id="${item.id}">Remove</span>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        cartTotalAmount.innerText = `$${total.toFixed(2)}`;

        // Add event listeners to buttons in cart
        cartItemsContainer.querySelectorAll('.plus').forEach(b => {
            b.onclick = () => changeQuantity(b.dataset.id, 1);
        });
        cartItemsContainer.querySelectorAll('.minus').forEach(b => {
            b.onclick = () => changeQuantity(b.dataset.id, -1);
        });
        cartItemsContainer.querySelectorAll('.remove-item').forEach(b => {
            b.onclick = () => removeFromCart(b.dataset.id);
        });
    }

    // 8. Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

import { initSharedComponents } from './components.js';
import { products } from './products-data.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize shared Header and Footer
    initSharedComponents();

    // 2. Setup standard listeners (Cart, Badge etc) after rendering components
    const badge = document.querySelector('.badge');
    const cartBtn = document.querySelector('.cart-btn');

    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Your little cart is empty! 🛒');
        });
    }

    // 3. Render Static Products from products-data.js
    renderCategoryProducts();

    // 4. Render Dynamic (Custom) Products from LocalStorage
    renderDynamicProducts();

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

    // 7. Helper to create a product card element
    function createProductCard(p, isCustom = false) {
        const card = document.createElement('div');
        card.className = 'product-card';
        if (isCustom) card.classList.add('custom-product');

        const badgeHtml = isCustom
            ? `<div class="product-badge" style="background: var(--color-blue); color: white;">Collection</div>`
            : (p.badge ? `<div class="product-badge">${p.badge}</div>` : '');

        card.innerHTML = `
            ${badgeHtml}
            <div class="product-img-container">
                <div class="product-img active">
                    <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                </div>
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
                <button class="btn btn-sm">Add to Cart</button>
            </div>
        `;

        // Add event listener to the button
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
            let currentCount = parseInt(badge.innerText);
            badge.innerText = currentCount + 1;
            btn.innerText = "Added! ✨";
            btn.style.backgroundColor = "#4CAF50";
            btn.style.color = "white";
            setTimeout(() => {
                btn.innerText = "Add to Cart";
                btn.style.backgroundColor = "";
                btn.style.color = "";
            }, 1500);
        });

        return card;
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

export function initSharedComponents() {
    renderHeader();
    renderFooter();
}

function renderHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    // Preserve the exact structure for index.css to apply correctly
    header.className = 'main-header';
    header.innerHTML = `
        <div class="top-bar">
            <span>Only pure love for your little one 👶✨ | Free Shipping on Orders over $100</span>
        </div>
        <div class="header-content container">
            <div class="logo">
                <a href="index.html">Lovelet</a>
            </div>

            <div class="search-bar">
                <input type="text" placeholder="Search for tiny things...">
                <button><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>

            <div class="user-actions">
                <a href="#" class="icon-btn"><i class="fa-regular fa-heart"></i></a>
                <a href="#" class="icon-btn"><i class="fa-regular fa-user"></i></a>
                <a href="#" class="icon-btn cart-btn">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <span class="badge">0</span>
                </a>
            </div>
        </div>

        <nav class="main-nav">
            <div class="container">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="clothing.html">Clothing</a></li>
                    <li><a href="toys.html">Toys & Gifts</a></li>
                    <li><a href="care.html">Baby Care</a></li>
                    <li><a href="bathing.html">Bathing</a></li>
                    <li><a href="feeding.html">Feeding</a></li>
                    <li><a href="nursery.html">Nursery</a></li>
                    <li><a href="travel.html">Travel</a></li>
                </ul>
            </div>
        </nav>
    `;

    // Highlight active page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = header.querySelectorAll('.main-nav a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function renderFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="container footer-content">
            <div class="footer-col">
                <h3>Lovelet</h3>
                <p>Making parenting distinctively beautiful and simpler.</p>
                <div class="socials">
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#"><i class="fa-brands fa-pinterest"></i></a>
                </div>
            </div>
            <div class="footer-col">
                <h4>Shop</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="clothing.html">Clothing</a></li>
                    <li><a href="toys.html">Toys & Gifts</a></li>
                    <li><a href="travel.html">Travel Gear</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Help</h4>
                <ul>
                    <li><a href="#">Shipping</a></li>
                    <li><a href="#">Returns</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="admin.html" style="font-weight: 600; color: var(--color-blue-dark);"><i
                                class="fa-solid fa-gear"></i> Manage Products</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Newsletter</h4>
                <div class="newsletter-form">
                    <input type="email" placeholder="Your email">
                    <button>Sub</button>
                </div>
            </div>
        </div>
        <div class="bottom-bar">
            <p>&copy; 2026 Lovelet Baby Store. All rights reserved.</p>
        </div>
    `;
}

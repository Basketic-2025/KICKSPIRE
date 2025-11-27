
// 1. Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    const isClosed = mobileMenu.classList.contains('translate-x-full');
    if (isClosed) {
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
    }
}

mobileMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);

// Close menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// 2. IntersectionObserver for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// 3. Hero Parallax Mouse Effect
const heroSection = document.getElementById('hero');
const heroShoe = document.getElementById('hero-shoe');

if (heroSection && heroShoe && window.matchMedia("(min-width: 768px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate distance from center
        const moveX = (clientX - centerX) / 40;
        const moveY = (clientY - centerY) / 40;

        // Apply transform (Shoe moves slightly opposite to mouse for depth)
        heroShoe.style.transform = `rotate(-15deg) translate(${-moveX}px, ${-moveY}px)`;
    });
}

// 4. Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 5. Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
        navbar.style.background = 'rgba(9, 9, 11, 0.85)';
    } else {
        navbar.classList.remove('shadow-lg');
        navbar.style.background = 'rgba(24, 24, 27, 0.7)'; // Original glass style
    }
});

// 6. Cart store (API-backed with localStorage fallback)
const API_BASE = 'http://localhost:3001/api';
const CART_KEY = 'ks_cart_items';

const cartStore = {
    async get() {
        try {
            const response = await fetch(`${API_BASE}/cart`, {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                // Update localStorage as cache
                localStorage.setItem(CART_KEY, JSON.stringify(data.items));
                return data.items;
            }
        } catch (e) {
            console.warn('Failed to fetch cart from API, using localStorage:', e);
        }
        // Fallback to localStorage
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch (e) {
            return [];
        }
    },

    async add(item) {
        try {
            const response = await fetch(`${API_BASE}/cart/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    productId: item.id,
                    quantity: item.qty || 1,
                    size: item.size,
                    color: item.color,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem(CART_KEY, JSON.stringify(data.items));
                await this.updateBadge();
                return;
            }
        } catch (e) {
            console.warn('Failed to add to cart via API, using localStorage:', e);
        }

        // Fallback to localStorage
        const items = this.getLocal();
        const found = items.find(i => i.id === item.id);
        if (found) {
            found.qty += item.qty || 1;
        } else {
            items.push({ ...item, qty: item.qty || 1 });
        }
        localStorage.setItem(CART_KEY, JSON.stringify(items));
        await this.updateBadge();
    },

    getLocal() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch (e) {
            return [];
        }
    },

    async updateBadge() {
        const badge = document.getElementById('nav-count');
        if (!badge) return;

        const items = await this.get();
        const total = items.reduce((sum, i) => sum + (i.qty || 0), 0);
        badge.textContent = total > 0 ? total : '';
    }
};

window.cartStore = cartStore;
cartStore.updateBadge();

// 7. Add-to-cart wiring
document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cart-add]');
    if (!btn) return;
    e.preventDefault();
    const { productId, title, price, image } = btn.dataset;
    if (!productId) return;
    cartStore.add({
        id: productId,
        title: title || 'Product',
        price: Number(price) || 0,
        image: image || '',
    });
});


// 8. Product Data (Centralized)
const products = [
    { id: 'urban-1', title: 'Urban Essentials', price: 149, category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop' },
    { id: 'performance-1', title: 'Jordan Retro Low', price: 189, category: 'Urban Lifestyle', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop' },
    { id: 'urban-2', title: 'Vapor Max 2', price: 129, category: 'Daily Trainer', image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1000&auto=format&fit=crop' },
    { id: 'urban-3', title: 'Court Vision', price: 119, category: 'Skate & Street', image: 'https://images.unsplash.com/photo-1556906781-9a412961d28c?q=80&w=1000&auto=format&fit=crop' },
    { id: 'performance-2', title: 'Y-3 Runner', price: 220, category: 'High Fashion', image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000&auto=format&fit=crop' },
    { id: 'performance-3', title: 'Ozone Glide', price: 159, category: 'Trail Running', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop' }
];

// 9. Search Functionality
function injectSearchOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'search-overlay';
    overlay.className = 'fixed inset-0 bg-black/95 z-50 hidden flex flex-col items-center pt-24 opacity-0 transition-opacity duration-300';
    overlay.innerHTML = `
                <button id="close-search" class="absolute top-6 right-6 text-3xl text-gray-400 hover:text-white transition-colors">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="w-full max-w-2xl px-6">
                    <div class="relative">
                        <input type="text" id="search-input" placeholder="Search products..." 
                            class="w-full bg-transparent border-b-2 border-gray-700 text-3xl font-bold text-white py-4 focus:outline-none focus:border-lime-400 placeholder-gray-600 uppercase tracking-wide">
                        <i class="fa-solid fa-magnifying-glass absolute right-0 top-1/2 -translate-y-1/2 text-2xl text-gray-500"></i>
                    </div>
                    <div id="search-results" class="mt-8 grid gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                        <!-- Results injected here -->
                    </div>
                </div>
            `;
    document.body.appendChild(overlay);

    // Event Listeners
    const closeBtn = overlay.querySelector('#close-search');
    const input = overlay.querySelector('#search-input');
    const resultsContainer = overlay.querySelector('#search-results');

    closeBtn.addEventListener('click', toggleSearch);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
            toggleSearch();
        }
    });

    // Autocomplete Logic
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        resultsContainer.innerHTML = '';

        if (query.length < 1) return;

        const matches = products.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
            resultsContainer.innerHTML = `<p class="text-gray-500 text-center py-4">No products found.</p>`;
            return;
        }

        matches.forEach(product => {
            const el = document.createElement('div');
            el.className = 'flex items-center gap-4 p-4 bg-zinc-900/50 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer group';
            el.innerHTML = `
                        <img src="${product.image}" alt="${product.title}" class="w-16 h-16 object-cover rounded-lg">
                        <div class="flex-1">
                            <h4 class="font-bold text-lg group-hover:text-lime-400 transition-colors">${product.title}</h4>
                            <p class="text-sm text-gray-500">${product.category}</p>
                        </div>
                        <div class="text-right">
                            <span class="block font-bold text-lime-400">$${product.price}</span>
                            <button class="text-xs bg-white text-black px-3 py-1 rounded-full font-bold mt-1 hover:bg-lime-400 transition-colors"
                                data-cart-add data-product-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">
                                Add
                            </button>
                        </div>
                    `;

            // Clicking the row (except button) could go to product page, but for now we just have add to cart
            // Let's make the whole row clickable to go to shop? Or just keep it simple.
            // For this task, the "Add" button handles the cart.

            resultsContainer.appendChild(el);
        });
    });
}

function toggleSearch() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');

    if (!overlay) return;

    if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
            input.focus();
        }, 10);
        document.body.style.overflow = 'hidden';
    } else {
        overlay.classList.add('opacity-0');
        setTimeout(() => {
            overlay.classList.add('hidden');
            input.value = ''; // Clear input
            document.getElementById('search-results').innerHTML = ''; // Clear results
        }, 300);
        document.body.style.overflow = '';
    }
}

// Initialize Search
injectSearchOverlay();

// Wire up existing search buttons (desktop and potentially mobile if added)
document.querySelectorAll('.fa-magnifying-glass').forEach(icon => {
    const btn = icon.closest('button');
    if (btn) {
        btn.addEventListener('click', (e) => {
            // Prevent default if it's in a form (unlikely here but good practice)
            e.preventDefault();
            toggleSearch();
        });
    }
});

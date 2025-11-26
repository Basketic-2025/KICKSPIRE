
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

        // 6. Cart store (localStorage-backed)
        const CART_KEY = 'ks_cart_items';
        const cartStore = {
            get() {
                try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
                catch (e) { return []; }
            },
            save(items) {
                localStorage.setItem(CART_KEY, JSON.stringify(items));
                this.updateBadge();
            },
            add(item) {
                const items = this.get();
                const found = items.find(i => i.id === item.id);
                if (found) {
                    found.qty += item.qty || 1;
                } else {
                    items.push({ ...item, qty: item.qty || 1 });
                }
                this.save(items);
            },
            updateBadge() {
                const badge = document.getElementById('nav-count');
                if (!badge) return;
                const total = this.get().reduce((sum, i) => sum + (i.qty || 0), 0);
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

    

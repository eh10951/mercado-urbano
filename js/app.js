// MERCADO URBANO - Main Interactive Application Engine
// Pure Vanilla JavaScript, Zero Emojis, 100% Vector Aesthetics

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

const App = {
    currentView: 'explorar',
    selectedCategory: 'all',
    searchQuery: '',
    sortBy: 'destacados',
    activeStoreId: null, // For storefront view
    activeChatStoreId: null, // For chat modal
    editingProductId: null, // For vendor modal

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.renderAll();
    },

    cacheDOM() {
        this.dom = {
            // Views
            viewExplorar: document.getElementById('view-explorar'),
            viewLocatarios: document.getElementById('view-locatarios'),
            viewTienda: document.getElementById('view-tienda'),
            viewPedidos: document.getElementById('view-pedidos'),
            viewFavoritos: document.getElementById('view-favoritos'),
            viewVendorPanel: document.getElementById('view-vendor-panel'),

            // Navigation
            navTabs: document.querySelectorAll('.nav-tab'),
            mobileNavItems: document.querySelectorAll('.mobile-nav-item'),
            roleSwitcherBtn: document.getElementById('btn-role-switcher'),
            roleBadgeText: document.getElementById('role-badge-text'),

            // Search
            desktopSearchInput: document.getElementById('desktop-search-input'),
            mobileSearchInput: document.getElementById('mobile-search-input'),
            categoryPillBar: document.getElementById('category-pill-bar'),
            sortSelect: document.getElementById('sort-select'),

            // Containers
            productGrid: document.getElementById('product-grid'),
            storeGrid: document.getElementById('store-grid'),
            storefrontContainer: document.getElementById('storefront-container'),
            ordersListContainer: document.getElementById('orders-list-container'),
            favoritesGrid: document.getElementById('favorites-grid'),

            // Vendor DOM
            vendorStoreSelect: document.getElementById('vendor-store-select'),
            vendorStatsContainer: document.getElementById('vendor-stats-container'),
            vendorProductsTableBody: document.getElementById('vendor-products-tbody'),
            vendorOrdersTableBody: document.getElementById('vendor-orders-tbody'),
            vendorSubtabBtns: document.querySelectorAll('.vendor-subtab-btn'),
            vendorTabContents: document.querySelectorAll('.vendor-tab-content'),

            // Cart
            cartTriggerBtn: document.getElementById('btn-cart-trigger'),
            cartDrawerOverlay: document.getElementById('cart-drawer-overlay'),
            closeCartBtn: document.getElementById('btn-close-cart'),
            cartItemsContainer: document.getElementById('cart-items-container'),
            cartSubtotalEl: document.getElementById('cart-subtotal'),
            cartTotalEl: document.getElementById('cart-total'),
            cartCountBadges: document.querySelectorAll('.cart-count-badge'),
            checkoutBtn: document.getElementById('btn-checkout-modal-trigger'),

            // Modals
            productModalOverlay: document.getElementById('product-modal-overlay'),
            productModalBody: document.getElementById('product-modal-body'),
            closeProductModalBtn: document.getElementById('btn-close-product-modal'),

            checkoutModalOverlay: document.getElementById('checkout-modal-overlay'),
            checkoutForm: document.getElementById('checkout-form'),
            closeCheckoutModalBtn: document.getElementById('btn-close-checkout-modal'),
            checkoutItemsRecap: document.getElementById('checkout-items-recap'),
            checkoutTotalSummary: document.getElementById('checkout-total-summary'),

            vendorProductModalOverlay: document.getElementById('vendor-product-modal-overlay'),
            vendorProductForm: document.getElementById('vendor-product-form'),
            closeVendorProductModalBtn: document.getElementById('btn-close-vendor-product-modal'),
            vendorModalTitle: document.getElementById('vendor-modal-title'),

            chatModalOverlay: document.getElementById('chat-modal-overlay'),
            chatModalTitle: document.getElementById('chat-modal-title'),
            chatMessagesContainer: document.getElementById('chat-messages-container'),
            chatInput: document.getElementById('chat-message-input'),
            sendChatBtn: document.getElementById('btn-send-chat'),
            closeChatModalBtn: document.getElementById('btn-close-chat-modal'),

            toastContainer: document.getElementById('toast-container')
        };
    },

    bindEvents() {
        // State change listener
        window.addEventListener('app:state-change', (e) => {
            this.updateBadges();
            if (this.currentView === 'pedidos') this.renderOrders();
            if (this.currentView === 'favoritos') this.renderFavorites();
            if (this.currentView === 'panel-locatario') this.renderVendorPortal();
        });

        // Navigation Tabs (Desktop)
        this.dom.navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const view = tab.getAttribute('data-view');
                this.navigate(view);
            });
        });

        // Navigation (Mobile Bottom Bar)
        this.dom.mobileNavItems.forEach(item => {
            item.addEventListener('click', () => {
                const view = item.getAttribute('data-view');
                if (view === 'cart') {
                    this.openCart();
                } else {
                    this.navigate(view);
                }
            });
        });

        // Brand click -> home
        document.querySelectorAll('.brand-clickable').forEach(el => {
            el.addEventListener('click', () => this.navigate('explorar'));
        });

        // Role Switcher
        if (this.dom.roleSwitcherBtn) {
            this.dom.roleSwitcherBtn.addEventListener('click', () => {
                const currentRole = storeManager.getRole();
                const newRole = currentRole === 'client' ? 'vendor' : 'client';
                storeManager.setRole(newRole);
                this.showToast(newRole === 'vendor' ? 'Modo Locatario activado. Gestione su local.' : 'Modo Comprador activado.', 'info');
                this.updateRoleUI();
                if (newRole === 'vendor') {
                    this.navigate('panel-locatario');
                } else {
                    this.navigate('explorar');
                }
            });
        }

        // Search inputs
        const handleSearch = (e) => {
            this.searchQuery = e.target.value.trim().toLowerCase();
            if (this.currentView !== 'explorar') {
                this.navigate('explorar');
            } else {
                this.renderProducts();
            }
        };

        if (this.dom.desktopSearchInput) {
            this.dom.desktopSearchInput.addEventListener('input', handleSearch);
        }
        if (this.dom.mobileSearchInput) {
            this.dom.mobileSearchInput.addEventListener('input', handleSearch);
        }

        // Sort Select
        if (this.dom.sortSelect) {
            this.dom.sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.renderProducts();
            });
        }

        // Cart Drawer
        if (this.dom.cartTriggerBtn) {
            this.dom.cartTriggerBtn.addEventListener('click', () => this.openCart());
        }
        if (this.dom.closeCartBtn) {
            this.dom.closeCartBtn.addEventListener('click', () => this.closeCart());
        }
        if (this.dom.cartDrawerOverlay) {
            this.dom.cartDrawerOverlay.addEventListener('click', (e) => {
                if (e.target === this.dom.cartDrawerOverlay) this.closeCart();
            });
        }

        // Checkout trigger
        if (this.dom.checkoutBtn) {
            this.dom.checkoutBtn.addEventListener('click', () => {
                this.closeCart();
                this.openCheckoutModal();
            });
        }

        // Checkout Form Submit
        if (this.dom.checkoutForm) {
            this.dom.checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleCheckoutSubmit();
            });
        }
        if (this.dom.closeCheckoutModalBtn) {
            this.dom.closeCheckoutModalBtn.addEventListener('click', () => this.closeCheckoutModal());
        }

        // Delivery type radio toggle inside checkout
        const deliveryRadios = document.querySelectorAll('input[name="checkout-delivery"]');
        deliveryRadios.forEach(radio => {
            radio.addEventListener('change', () => this.updateCheckoutTotals());
        });

        // Close Product Modal
        if (this.dom.closeProductModalBtn) {
            this.dom.closeProductModalBtn.addEventListener('click', () => this.closeProductModal());
        }
        if (this.dom.productModalOverlay) {
            this.dom.productModalOverlay.addEventListener('click', (e) => {
                if (e.target === this.dom.productModalOverlay) this.closeProductModal();
            });
        }

        // Vendor Subtabs
        this.dom.vendorSubtabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const subtab = btn.getAttribute('data-subtab');
                this.switchVendorSubtab(subtab);
            });
        });

        // Vendor Store Selector Change
        if (this.dom.vendorStoreSelect) {
            this.dom.vendorStoreSelect.addEventListener('change', (e) => {
                storeManager.setActiveVendorId(e.target.value);
                this.renderVendorPortal();
                this.showToast('Local activo cambiado', 'info');
            });
        }

        // Vendor Add Product Modal
        const btnNewProduct = document.getElementById('btn-add-product-vendor');
        if (btnNewProduct) {
            btnNewProduct.addEventListener('click', () => this.openVendorProductModal());
        }
        if (this.dom.closeVendorProductModalBtn) {
            this.dom.closeVendorProductModalBtn.addEventListener('click', () => this.closeVendorProductModal());
        }
        if (this.dom.vendorProductForm) {
            this.dom.vendorProductForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleVendorProductSubmit();
            });
        }

        // Vendor Store Settings Form
        const vendorSettingsForm = document.getElementById('vendor-settings-form');
        if (vendorSettingsForm) {
            vendorSettingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleVendorSettingsSubmit();
            });
        }

        // Chat Modal
        if (this.dom.closeChatModalBtn) {
            this.dom.closeChatModalBtn.addEventListener('click', () => this.closeChatModal());
        }
        if (this.dom.sendChatBtn) {
            this.dom.sendChatBtn.addEventListener('click', () => this.handleSendChatMessage());
        }
        if (this.dom.chatInput) {
            this.dom.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleSendChatMessage();
                }
            });
        }
    },

    navigate(view) {
        this.currentView = view;

        // Hide all views
        this.dom.viewExplorar.style.display = 'none';
        this.dom.viewLocatarios.style.display = 'none';
        this.dom.viewTienda.style.display = 'none';
        this.dom.viewPedidos.style.display = 'none';
        this.dom.viewFavoritos.style.display = 'none';
        this.dom.viewVendorPanel.style.display = 'none';

        // Update active desktop tabs
        this.dom.navTabs.forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-view') === view);
        });

        // Update active mobile nav
        this.dom.mobileNavItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-view') === view);
        });

        // Show selected view
        window.scrollTo({ top: 0, behavior: 'smooth' });

        switch (view) {
            case 'explorar':
                this.dom.viewExplorar.style.display = 'block';
                this.renderProducts();
                break;
            case 'locatarios':
                this.dom.viewLocatarios.style.display = 'block';
                this.renderStores();
                break;
            case 'tienda':
                this.dom.viewTienda.style.display = 'block';
                this.renderStorefront();
                break;
            case 'pedidos':
                this.dom.viewPedidos.style.display = 'block';
                this.renderOrders();
                break;
            case 'favoritos':
                this.dom.viewFavoritos.style.display = 'block';
                this.renderFavorites();
                break;
            case 'panel-locatario':
                this.dom.viewVendorPanel.style.display = 'block';
                this.renderVendorPortal();
                break;
            default:
                this.dom.viewExplorar.style.display = 'block';
                this.renderProducts();
        }
    },

    renderAll() {
        this.updateRoleUI();
        this.renderCategoriesBar();
        this.renderProducts();
        this.renderStores();
        this.updateBadges();
        this.populateVendorStoreSelect();
    },

    updateRoleUI() {
        const role = storeManager.getRole();
        if (this.dom.roleBadgeText) {
            const label = role === 'vendor' ? 'Locatario' : 'Comprador';
            this.dom.roleBadgeText.innerHTML = `<span class="role-prefix">Modo: </span><span class="role-text-label">${label}</span>`;
        }
        const vendorTab = document.querySelector('.nav-tab[data-view="panel-locatario"]');
        if (vendorTab) {
            vendorTab.style.display = 'inline-flex';
        }
    },

    updateBadges() {
        const cartDetails = storeManager.getCartDetails();
        this.dom.cartCountBadges.forEach(badge => {
            badge.textContent = cartDetails.count;
            badge.style.display = cartDetails.count > 0 ? 'flex' : 'none';
        });

        const favsCount = storeManager.getFavorites().length;
        const favBadge = document.getElementById('fav-count-badge');
        if (favBadge) {
            favBadge.textContent = favsCount;
            favBadge.style.display = favsCount > 0 ? 'flex' : 'none';
        }
    },

    // Categories Pill Bar
    renderCategoriesBar() {
        if (!this.dom.categoryPillBar) return;
        this.dom.categoryPillBar.innerHTML = INITIAL_CATEGORIES.map(cat => `
            <button class="cat-pill ${this.selectedCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
                ${getIcon(this.getCategoryIconName(cat.id))}
                <span>${cat.name}</span>
            </button>
        `).join('');

        this.dom.categoryPillBar.querySelectorAll('.cat-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                this.selectedCategory = pill.getAttribute('data-cat');
                this.renderCategoriesBar();
                this.renderProducts();
            });
        });
    },

    getCategoryIconName(catId) {
        switch (catId) {
            case 'gourmet': return 'package';
            case 'moda': return 'tag';
            case 'joyeria': return 'star';
            case 'tecnologia': return 'sliders';
            case 'hogar': return 'store';
            default: return 'layers';
        }
    },

    // Render Product Catalog
    renderProducts() {
        if (!this.dom.productGrid) return;

        let products = storeManager.getProducts(true);

        // Filter by category
        if (this.selectedCategory !== 'all') {
            products = products.filter(p => p.category === this.selectedCategory);
        }

        // Filter by search query
        if (this.searchQuery) {
            products = products.filter(p => {
                const store = storeManager.getStoreById(p.storeId) || {};
                const text = `${p.name} ${p.description || ''} ${p.category} ${store.name || ''}`.toLowerCase();
                return text.includes(this.searchQuery);
            });
        }

        // Sort products
        if (this.sortBy === 'menor-precio') {
            products.sort((a, b) => a.price - b.price);
        } else if (this.sortBy === 'mayor-precio') {
            products.sort((a, b) => b.price - a.price);
        } else if (this.sortBy === 'calificacion') {
            products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else {
            // destacados default
            products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }

        if (products.length === 0) {
            this.dom.productGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-icon">${getIcon('search')}</div>
                    <div class="empty-title">No se encontraron productos</div>
                    <div class="empty-desc">Intente ajustar los términos de búsqueda o cambiar el filtro de categoría.</div>
                    <button class="btn btn-secondary btn-sm" id="btn-reset-filters">Limpiar Filtros</button>
                </div>
            `;
            const resetBtn = document.getElementById('btn-reset-filters');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    this.selectedCategory = 'all';
                    this.searchQuery = '';
                    if (this.dom.desktopSearchInput) this.dom.desktopSearchInput.value = '';
                    if (this.dom.mobileSearchInput) this.dom.mobileSearchInput.value = '';
                    this.renderCategoriesBar();
                    this.renderProducts();
                });
            }
            return;
        }

        this.dom.productGrid.innerHTML = products.map(product => {
            const store = storeManager.getStoreById(product.storeId) || { name: 'Local del Mercado' };
            const isFav = storeManager.isFavorite(product.id);
            return `
                <div class="product-card" data-product-id="${product.id}">
                    <div class="product-thumb-wrap" onclick="App.openProductModal('${product.id}')">
                        <img src="${product.image}" alt="${product.name}" class="product-thumb" loading="lazy">
                        ${product.badge ? `<div class="product-top-badge"><span class="badge badge-gold">${product.badge}</span></div>` : ''}
                        <button class="product-fav-btn ${isFav ? 'active' : ''}" 
                                onclick="event.stopPropagation(); App.toggleFavorite('${product.id}')"
                                title="Guardar en favoritos">
                            ${isFav ? getIcon('heartFilled') : getIcon('heart')}
                        </button>
                    </div>
                    <div class="product-info">
                        <div class="product-store-link" onclick="App.viewStorefront('${store.id}')">
                            ${getIcon('store')}
                            <span>${store.name}</span>
                        </div>
                        <h3 class="product-title" onclick="App.openProductModal('${product.id}')">${product.name}</h3>
                        <div class="product-meta-row">
                            <span class="rating-pill">
                                ${getIcon('star')}
                                <span>${product.rating.toFixed(1)}</span>
                            </span>
                            <span>(${product.reviewsCount} opiniones)</span>
                            <span class="meta-dot"></span>
                            <span>${product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}</span>
                        </div>
                        <div class="product-price-section">
                            <div class="price-box">
                                ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toLocaleString('es-MX')} MXN</span>` : ''}
                                <span class="price-current">$${product.price.toLocaleString('es-MX')} <small style="font-size: 0.65em; font-weight: 500; color: var(--text-muted);">MXN</small></span>
                            </div>
                            <div class="product-actions-btn">
                                <button class="btn btn-secondary btn-icon" title="Ver detalles" onclick="App.openProductModal('${product.id}')">
                                    ${getIcon('info')}
                                </button>
                                <button class="btn btn-primary btn-sm" onclick="App.addToCart('${product.id}')" ${product.stock <= 0 ? 'disabled' : ''}>
                                    ${getIcon('cart')}
                                    <span>Agregar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    // Render Store Directory
    renderStores() {
        if (!this.dom.storeGrid) return;

        const stores = storeManager.getStores();
        this.dom.storeGrid.innerHTML = stores.map(store => {
            const productsCount = storeManager.getProductsByStore(store.id, true).length;
            return `
                <div class="store-card">
                    <img src="${store.banner}" alt="${store.name}" class="store-banner" loading="lazy">
                    <div class="store-header-info">
                        <img src="${store.avatar}" alt="${store.name}" class="store-avatar-img">
                        <span class="badge badge-emerald">
                            ${getIcon('shieldCheck')}
                            <span>Local Oficial</span>
                        </span>
                    </div>
                    <div class="store-body">
                        <div class="store-name-row">
                            <h3 class="store-name">${store.name}</h3>
                            <span class="store-verified-icon">${getIcon('badgeCheck')}</span>
                        </div>
                        <div class="store-local-tag">
                            ${getIcon('mapPin')}
                            <span>${store.localNumber}</span>
                        </div>
                        <p class="store-desc">${store.description}</p>
                        
                        <div class="store-badges-list">
                            ${(store.badges || []).map(b => `<span class="badge badge-dark">${b}</span>`).join('')}
                        </div>

                        <div class="store-details-list">
                            <div class="store-detail-row">
                                ${getIcon('clock')}
                                <span>${store.schedule}</span>
                            </div>
                            <div class="store-detail-row">
                                ${getIcon('phone')}
                                <span>${store.phone}</span>
                            </div>
                            <div class="store-detail-row">
                                ${getIcon('package')}
                                <span>${productsCount} productos en catálogo</span>
                            </div>
                        </div>

                        <div class="flex gap-2" style="margin-top: 10px;">
                            <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="App.openChatModal('${store.id}')">
                                ${getIcon('message')}
                                <span>Mensaje</span>
                            </button>
                            <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="App.viewStorefront('${store.id}')">
                                <span>Visitar Local</span>
                                ${getIcon('chevronRight')}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    // Storefront / Locatario View
    viewStorefront(storeId) {
        this.activeStoreId = storeId;
        this.navigate('tienda');
    },

    renderStorefront() {
        if (!this.dom.storefrontContainer) return;
        const store = storeManager.getStoreById(this.activeStoreId) || storeManager.getStores()[0];
        const products = storeManager.getProductsByStore(store.id, true);

        this.dom.storefrontContainer.innerHTML = `
            <div class="storefront-header">
                <img src="${store.banner}" alt="${store.name}" class="storefront-banner">
                <div class="storefront-meta">
                    <div class="storefront-brand-row">
                        <img src="${store.avatar}" alt="${store.name}" class="storefront-avatar">
                        <div class="storefront-title-area">
                            <h2>
                                <span>${store.name}</span>
                                <span class="store-verified-icon">${getIcon('badgeCheck')}</span>
                            </h2>
                            <p class="storefront-tagline">${store.tagline}</p>
                        </div>
                    </div>
                    <div class="storefront-actions">
                        <button class="btn btn-secondary" onclick="App.openChatModal('${store.id}')">
                            ${getIcon('message')}
                            <span>Contactar Locatario</span>
                        </button>
                        <button class="btn btn-outline" onclick="App.navigate('locatarios')">
                            ${getIcon('arrowLeft')}
                            <span>Ver todos los locales</span>
                        </button>
                    </div>
                </div>

                <div class="storefront-info-grid">
                    <div class="storefront-info-col">
                        ${getIcon('mapPin')}
                        <div>
                            <strong style="color: var(--text-primary); display: block;">Ubicación Física</strong>
                            <span>${store.localNumber}</span>
                        </div>
                    </div>
                    <div class="storefront-info-col">
                        ${getIcon('clock')}
                        <div>
                            <strong style="color: var(--text-primary); display: block;">Horario de Atención</strong>
                            <span>${store.schedule}</span>
                        </div>
                    </div>
                    <div class="storefront-info-col">
                        ${getIcon('shieldCheck')}
                        <div>
                            <strong style="color: var(--text-primary); display: block;">Garantía Directa</strong>
                            <span>Calificación ${store.rating} (${store.reviewsCount} ventas verificadas)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section-head">
                <div>
                    <h3 class="section-title">
                        ${getIcon('package')}
                        <span>Catálogo de ${store.name}</span>
                    </h3>
                    <div class="section-subtitle">Disponibles para entrega inmediata en local o envío directo</div>
                </div>
                <span class="badge badge-gold">${products.length} productos listados</span>
            </div>

            <div class="product-grid">
                ${products.length > 0 ? products.map(product => {
                    const isFav = storeManager.isFavorite(product.id);
                    return `
                        <div class="product-card">
                            <div class="product-thumb-wrap" onclick="App.openProductModal('${product.id}')">
                                <img src="${product.image}" alt="${product.name}" class="product-thumb" loading="lazy">
                                ${product.badge ? `<div class="product-top-badge"><span class="badge badge-gold">${product.badge}</span></div>` : ''}
                                <button class="product-fav-btn ${isFav ? 'active' : ''}" 
                                        onclick="event.stopPropagation(); App.toggleFavorite('${product.id}')">
                                    ${isFav ? getIcon('heartFilled') : getIcon('heart')}
                                </button>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title" onclick="App.openProductModal('${product.id}')">${product.name}</h3>
                                <div class="product-meta-row">
                                    <span class="rating-pill">${getIcon('star')} ${product.rating.toFixed(1)}</span>
                                    <span class="meta-dot"></span>
                                    <span>${product.stock} disponibles</span>
                                </div>
                                <div class="product-price-section">
                                    <div class="price-box">
                                        ${product.originalPrice ? `<span class="price-original">$${product.originalPrice} MXN</span>` : ''}
                                        <span class="price-current">$${product.price} <small style="font-size: 0.65em; color: var(--text-muted);">MXN</small></span>
                                    </div>
                                    <button class="btn btn-primary btn-sm" onclick="App.addToCart('${product.id}')">
                                        ${getIcon('cart')}
                                        <span>Agregar</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('') : `
                    <div class="empty-state" style="grid-column: 1 / -1;">
                        <div class="empty-icon">${getIcon('package')}</div>
                        <div class="empty-title">Sin productos disponibles</div>
                        <div class="empty-desc">Este locatario está actualizando su inventario.</div>
                    </div>
                `}
            </div>
        `;
    },

    // Product Details Modal
    openProductModal(productId) {
        const product = storeManager.getProductById(productId);
        if (!product) return;

        const store = storeManager.getStoreById(product.storeId) || { name: 'Local del Mercado' };
        const isFav = storeManager.isFavorite(product.id);

        this.dom.productModalBody.innerHTML = `
            <div class="product-modal-grid">
                <div>
                    <img id="main-modal-img" src="${product.image}" alt="${product.name}" class="modal-product-img">
                    ${product.gallery && product.gallery.length > 1 ? `
                        <div style="display: flex; gap: 8px; margin-top: 10px; overflow-x: auto;">
                            ${product.gallery.map(img => `
                                <img src="${img}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px; cursor: pointer; border: 2px solid var(--border-subtle);"
                                     onclick="document.getElementById('main-modal-img').src = '${img}'">
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <div>
                    <div class="flex items-center justify-between" style="margin-bottom: 8px;">
                        <span class="badge badge-gold">${product.badge || 'Producto Oficial'}</span>
                        <div class="product-store-link" onclick="App.closeProductModal(); App.viewStorefront('${store.id}')">
                            ${getIcon('store')}
                            <span>${store.name}</span>
                        </div>
                    </div>

                    <h2 style="font-size: 1.35rem; font-weight: 800; line-height: 1.25; margin-bottom: 12px; color: var(--text-primary);">${product.name}</h2>
                    
                    <div class="product-meta-row">
                        <span class="rating-pill">${getIcon('star')} ${product.rating.toFixed(1)}</span>
                        <span>(${product.reviewsCount} opiniones verificadas)</span>
                        <span class="meta-dot"></span>
                        <span>SKU: ${product.sku || 'N/A'}</span>
                    </div>

                    <div style="margin: 16px 0; padding: 12px 16px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; align-items: baseline; gap: 12px;">
                        ${product.originalPrice ? `<span class="price-original" style="font-size: 0.9rem;">$${product.originalPrice} MXN</span>` : ''}
                        <span class="price-current" style="font-size: 1.6rem; color: var(--primary);">$${product.price.toLocaleString('es-MX')} MXN</span>
                        <span class="badge badge-emerald" style="margin-left: auto;">${product.stock > 0 ? 'Disponible' : 'Agotado'}</span>
                    </div>

                    <p style="font-size: 0.85rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 16px;">
                        ${product.description}
                    </p>

                    ${product.specs && product.specs.length > 0 ? `
                        <div class="modal-specs-list">
                            ${product.specs.map(spec => `
                                <div class="modal-spec-row">
                                    <span class="modal-spec-lbl">${spec.label}:</span>
                                    <span class="modal-spec-val">${spec.value}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    <div style="display: flex; gap: 10px; margin-top: 20px;">
                        <button class="btn btn-secondary" onclick="App.closeProductModal(); App.openChatModal('${store.id}')" title="Preguntar al locatario">
                            ${getIcon('message')}
                            <span>Preguntar</span>
                        </button>
                        <button class="btn btn-primary" style="flex: 1;" onclick="App.addToCart('${product.id}'); App.closeProductModal(); App.openCart();">
                            ${getIcon('cart')}
                            <span>Comprar Ahora</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.dom.productModalOverlay.classList.add('active');
    },

    closeProductModal() {
        this.dom.productModalOverlay.classList.remove('active');
    },

    // Cart Operations
    openCart() {
        this.renderCartDrawer();
        this.dom.cartDrawerOverlay.classList.add('active');
    },

    closeCart() {
        this.dom.cartDrawerOverlay.classList.remove('active');
    },

    addToCart(productId, qty = 1) {
        storeManager.addToCart(productId, qty);
        this.showToast('Producto agregado al carrito', 'success');
        this.updateBadges();
    },

    updateCartQty(productId, qty) {
        storeManager.updateCartQuantity(productId, qty);
        this.renderCartDrawer();
        this.updateBadges();
    },

    removeFromCart(productId) {
        storeManager.removeFromCart(productId);
        this.renderCartDrawer();
        this.updateBadges();
        this.showToast('Producto eliminado del carrito', 'info');
    },

    renderCartDrawer() {
        const cartDetails = storeManager.getCartDetails();

        if (cartDetails.items.length === 0) {
            this.dom.cartItemsContainer.innerHTML = `
                <div class="empty-state" style="padding: 40px 10px;">
                    <div class="empty-icon">${getIcon('cart')}</div>
                    <div class="empty-title">Tu carrito está vacío</div>
                    <div class="empty-desc">Explora el mercado y agrega artículos de los distintos locatarios locales.</div>
                    <button class="btn btn-primary btn-sm" onclick="App.closeCart(); App.navigate('explorar');">Explorar Productos</button>
                </div>
            `;
            this.dom.cartSubtotalEl.textContent = '$0 MXN';
            this.dom.cartTotalEl.textContent = '$0 MXN';
            this.dom.checkoutBtn.disabled = true;
            return;
        }

        this.dom.checkoutBtn.disabled = false;
        this.dom.cartSubtotalEl.textContent = `$${cartDetails.subtotal.toLocaleString('es-MX')} MXN`;
        this.dom.cartTotalEl.textContent = `$${cartDetails.subtotal.toLocaleString('es-MX')} MXN`;

        this.dom.cartItemsContainer.innerHTML = cartDetails.items.map(item => `
            <div class="cart-item">
                <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-thumb">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.product.name}</h4>
                    <span class="cart-item-store">${getIcon('store')} ${item.store.name}</span>
                    <div class="cart-item-bottom">
                        <span class="cart-item-price">$${item.lineTotal.toLocaleString('es-MX')}</span>
                        <div class="cart-qty-ctrl">
                            <button class="cart-qty-btn" onclick="App.updateCartQty('${item.product.id}', ${item.quantity - 1})">
                                ${item.quantity === 1 ? getIcon('trash') : getIcon('minus')}
                            </button>
                            <span class="cart-qty-val">${item.quantity}</span>
                            <button class="cart-qty-btn" onclick="App.updateCartQty('${item.product.id}', ${item.quantity + 1})">
                                ${getIcon('plus')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Favorites
    toggleFavorite(productId) {
        const added = storeManager.toggleFavorite(productId);
        this.showToast(added ? 'Guardado en favoritos' : 'Eliminado de favoritos', 'info');
        this.updateBadges();
        this.renderProducts();
        if (this.currentView === 'favoritos') {
            this.renderFavorites();
        }
    },

    renderFavorites() {
        if (!this.dom.favoritesGrid) return;
        const favIds = storeManager.getFavorites();
        const allProducts = storeManager.getProducts();
        const favProducts = allProducts.filter(p => favIds.includes(p.id));

        if (favProducts.length === 0) {
            this.dom.favoritesGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-icon">${getIcon('heart')}</div>
                    <div class="empty-title">No tienes favoritos guardados</div>
                    <div class="empty-desc">Haz clic en el icono de corazón en cualquier producto para guardarlo aquí y consultarlo más tarde.</div>
                    <button class="btn btn-primary btn-sm" onclick="App.navigate('explorar')">Explorar Catálogo</button>
                </div>
            `;
            return;
        }

        this.dom.favoritesGrid.innerHTML = favProducts.map(product => {
            const store = storeManager.getStoreById(product.storeId) || { name: 'Local del Mercado' };
            return `
                <div class="product-card">
                    <div class="product-thumb-wrap" onclick="App.openProductModal('${product.id}')">
                        <img src="${product.image}" alt="${product.name}" class="product-thumb">
                        <button class="product-fav-btn active" onclick="event.stopPropagation(); App.toggleFavorite('${product.id}')">
                            ${getIcon('heartFilled')}
                        </button>
                    </div>
                    <div class="product-info">
                        <div class="product-store-link" onclick="App.viewStorefront('${store.id}')">
                            ${getIcon('store')}
                            <span>${store.name}</span>
                        </div>
                        <h3 class="product-title" onclick="App.openProductModal('${product.id}')">${product.name}</h3>
                        <div class="product-price-section">
                            <span class="price-current">$${product.price.toLocaleString('es-MX')} MXN</span>
                            <button class="btn btn-primary btn-sm" onclick="App.addToCart('${product.id}')">
                                ${getIcon('cart')}
                                <span>Agregar</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    // Checkout Flow
    openCheckoutModal() {
        const cartDetails = storeManager.getCartDetails();
        if (cartDetails.items.length === 0) return;

        this.dom.checkoutItemsRecap.innerHTML = cartDetails.items.map(item => `
            <div style="display: flex; justify-content: space-between; font-size: 0.82rem; padding: 6px 0; border-bottom: 1px solid var(--border-subtle);">
                <div>
                    <strong>${item.quantity}x</strong> ${item.product.name}
                    <div style="font-size: 0.72rem; color: var(--accent-blue);">${item.store.name}</div>
                </div>
                <span style="font-weight: 700;">$${item.lineTotal.toLocaleString('es-MX')} MXN</span>
            </div>
        `).join('');

        this.updateCheckoutTotals();
        this.dom.checkoutModalOverlay.classList.add('active');
    },

    updateCheckoutTotals() {
        const cartDetails = storeManager.getCartDetails();
        const deliveryRadios = document.querySelector('input[name="checkout-delivery"]:checked');
        const isDeliveryShipping = deliveryRadios ? deliveryRadios.value === 'shipping' : false;
        const shippingFee = isDeliveryShipping ? 65 : 0;
        const grandTotal = cartDetails.subtotal + shippingFee;

        this.dom.checkoutTotalSummary.innerHTML = `
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 4px;">
                <span>Subtotal productos (${cartDetails.count} arts):</span>
                <span>$${cartDetails.subtotal.toLocaleString('es-MX')} MXN</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">
                <span>Costo de Entrega:</span>
                <span style="color: ${shippingFee === 0 ? 'var(--accent-emerald)' : 'var(--text-primary)'}; font-weight: 600;">
                    ${shippingFee === 0 ? 'Gratis (Recoger en local)' : `$${shippingFee} MXN (A domicilio)`}
                </span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: 800; color: var(--text-primary); border-top: 1px dashed var(--border-subtle); padding-top: 8px;">
                <span>Total a Pagar:</span>
                <span style="color: var(--primary);">$${grandTotal.toLocaleString('es-MX')} MXN</span>
            </div>
        `;
    },

    closeCheckoutModal() {
        this.dom.checkoutModalOverlay.classList.remove('active');
    },

    selectDeliveryCard(cardEl) {
        if (!cardEl) return;
        const grid = cardEl.closest('.luxury-selection-grid');
        if (grid) {
            grid.querySelectorAll('.luxury-selection-card').forEach(c => c.classList.remove('selected'));
        }
        cardEl.classList.add('selected');
        const radio = cardEl.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
            this.updateCheckoutTotals();
        }
    },

    selectPaymentCard(cardEl) {
        if (!cardEl) return;
        const grid = cardEl.closest('.luxury-selection-grid');
        if (grid) {
            grid.querySelectorAll('.luxury-selection-card').forEach(c => c.classList.remove('selected'));
        }
        cardEl.classList.add('selected');
        const radio = cardEl.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
        }
    },

    handleCheckoutSubmit() {
        const cartDetails = storeManager.getCartDetails();
        if (cartDetails.items.length === 0) return;

        const name = document.getElementById('checkout-name').value.trim();
        const phone = document.getElementById('checkout-phone').value.trim();
        const email = document.getElementById('checkout-email').value.trim();
        const address = document.getElementById('checkout-address').value.trim();
        const deliveryType = document.querySelector('input[name="checkout-delivery"]:checked').value;
        const paymentMethod = document.querySelector('input[name="checkout-payment"]:checked').value;

        const shippingFee = deliveryType === 'shipping' ? 65 : 0;
        const total = cartDetails.subtotal + shippingFee;

        const orderData = {
            clientName: name,
            clientPhone: phone,
            clientEmail: email,
            shippingAddress: address,
            deliveryType,
            paymentMethod,
            items: cartDetails.items.map(i => ({
                productId: i.product.id,
                name: i.product.name,
                storeName: i.store.name,
                storeId: i.product.storeId,
                price: i.product.price,
                quantity: i.quantity
            })),
            subtotal: cartDetails.subtotal,
            deliveryFee: shippingFee,
            total
        };

        const newOrder = storeManager.createOrder(orderData);
        this.closeCheckoutModal();
        this.showToast(`¡Pedido ${newOrder.id} confirmado con éxito!`, 'success');
        this.navigate('pedidos');
    },

    // Client Orders History
    renderOrders() {
        if (!this.dom.ordersListContainer) return;
        const orders = storeManager.getOrders();

        if (orders.length === 0) {
            this.dom.ordersListContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">${getIcon('package')}</div>
                    <div class="empty-title">Aún no tienes compras realizadas</div>
                    <div class="empty-desc">Cuando adquieras artículos de nuestros locatarios, podrás consultar el estatus de preparación y retiro aquí mismo.</div>
                    <button class="btn btn-primary btn-sm" onclick="App.navigate('explorar')">Ir a Comprar</button>
                </div>
            `;
            return;
        }

        this.dom.ordersListContainer.innerHTML = orders.map(order => {
            return `
                <div class="order-card">
                    <div class="order-head">
                        <div>
                            <span class="order-num">${order.id}</span>
                            <div class="order-date">${getIcon('clock')} ${order.date}</div>
                        </div>
                        <span class="status-pill status-${order.status}">
                            ${getIcon('shieldCheck')}
                            <span>${this.getStatusLabel(order.status)}</span>
                        </span>
                    </div>

                    <div class="order-items-summary">
                        ${order.items.map(item => `
                            <div class="order-item-row">
                                <div>
                                    <div class="order-item-title">${item.quantity}x ${item.name}</div>
                                    <div class="order-item-store">${getIcon('store')} ${item.storeName}</div>
                                </div>
                                <span style="font-weight: 700;">$${(item.price * item.quantity).toLocaleString('es-MX')} MXN</span>
                            </div>
                        `).join('')}
                    </div>

                    <div style="font-size: 0.78rem; color: var(--text-secondary); background: var(--bg-input); padding: 10px 14px; border-radius: var(--radius-sm);">
                        <div><strong>Modalidad:</strong> ${order.deliveryType === 'shipping' ? 'Envío Local a Domicilio' : 'Retiro en Local del Mercado'}</div>
                        <div><strong>Dirección / Local:</strong> ${order.shippingAddress || 'Mostrador del local'}</div>
                        <div><strong>Pago:</strong> ${order.paymentMethod}</div>
                    </div>

                    <div class="order-footer">
                        <span style="color: var(--text-secondary); font-size: 0.85rem;">Total pagado:</span>
                        <span style="font-size: 1.15rem; font-weight: 800; color: var(--primary);">$${order.total.toLocaleString('es-MX')} MXN</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    getStatusLabel(status) {
        switch (status) {
            case 'pendiente': return 'Pendiente de Confirmación';
            case 'preparacion': return 'En Preparación en Local';
            case 'listo': return 'Listo para Retiro / Envío';
            case 'entregado': return 'Completado / Entregado';
            default: return status;
        }
    },

    // =========================================================================
    // LOCATARIO VENDOR PORTAL
    // =========================================================================
    populateVendorStoreSelect() {
        if (!this.dom.vendorStoreSelect) return;
        const stores = storeManager.getStores();
        const activeId = storeManager.getActiveVendorId();

        this.dom.vendorStoreSelect.innerHTML = stores.map(s => `
            <option value="${s.id}" ${s.id === activeId ? 'selected' : ''}>${s.name} (${s.localNumber})</option>
        `).join('');
    },

    switchVendorSubtab(subtab) {
        this.dom.vendorSubtabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-subtab') === subtab);
        });

        this.dom.vendorTabContents.forEach(content => {
            content.style.display = content.getAttribute('data-tab-content') === subtab ? 'block' : 'none';
        });

        if (subtab === 'ajustes') {
            this.populateVendorSettingsForm();
        }
    },

    renderVendorPortal() {
        const store = storeManager.getCurrentVendorStore();
        if (!store) return;

        // Render Stats
        const storeProducts = storeManager.getProductsByStore(store.id);
        const storeOrders = storeManager.getOrders().filter(o => 
            o.items.some(i => i.storeId === store.id)
        );

        const totalSales = storeOrders.reduce((acc, order) => {
            const storeItemTotal = order.items
                .filter(i => i.storeId === store.id)
                .reduce((sum, item) => sum + (item.price * item.quantity), 0);
            return acc + storeItemTotal;
        }, 0);

        const pendingOrders = storeOrders.filter(o => o.status === 'pendiente' || o.status === 'preparacion').length;

        if (this.dom.vendorStatsContainer) {
            this.dom.vendorStatsContainer.innerHTML = `
                <div class="vendor-stat-card">
                    <div class="stat-icon-wrap emerald">${getIcon('trendingUp')}</div>
                    <div class="stat-content">
                        <h4>Ventas Acumuladas</h4>
                        <div class="stat-number">$${totalSales.toLocaleString('es-MX')}</div>
                    </div>
                </div>
                <div class="vendor-stat-card">
                    <div class="stat-icon-wrap">${getIcon('package')}</div>
                    <div class="stat-content">
                        <h4>Pedidos Activos</h4>
                        <div class="stat-number">${pendingOrders}</div>
                    </div>
                </div>
                <div class="vendor-stat-card">
                    <div class="stat-icon-wrap blue">${getIcon('layers')}</div>
                    <div class="stat-content">
                        <h4>Productos Registrados</h4>
                        <div class="stat-number">${storeProducts.length}</div>
                    </div>
                </div>
                <div class="vendor-stat-card">
                    <div class="stat-icon-wrap">${getIcon('star')}</div>
                    <div class="stat-content">
                        <h4>Reputación del Local</h4>
                        <div class="stat-number">${store.rating} / 5.0</div>
                    </div>
                </div>
            `;
        }

        // Render Vendor Products Table
        if (this.dom.vendorProductsTableBody) {
            if (storeProducts.length === 0) {
                this.dom.vendorProductsTableBody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align: center; padding: 30px; color: var(--text-muted);">
                            No tienes productos registrados en tu local. Haz clic en "Publicar Nuevo Producto" para comenzar.
                        </td>
                    </tr>
                `;
            } else {
                this.dom.vendorProductsTableBody.innerHTML = storeProducts.map(p => `
                    <tr>
                        <td style="width: 50px;">
                            <img src="${p.image}" alt="${p.name}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 6px;">
                        </td>
                        <td>
                            <strong style="color: var(--text-primary); display: block;">${p.name}</strong>
                            <span style="font-size: 0.72rem; color: var(--text-muted);">${p.sku || 'Sin SKU'} <span class="meta-dot"></span> Cat: ${p.category}</span>
                        </td>
                        <td><strong>$${p.price.toLocaleString('es-MX')}</strong> MXN</td>
                        <td>
                            <span class="badge ${p.stock > 0 ? 'badge-emerald' : 'badge-gold'}">${p.stock} unids</span>
                        </td>
                        <td>
                            <span class="status-pill ${p.active ? 'status-entregado' : 'status-pendiente'}">
                                ${p.active ? 'Activo' : 'Pausado'}
                            </span>
                        </td>
                        <td>
                            <div class="flex gap-2">
                                <button class="btn btn-secondary btn-sm" onclick="App.editVendorProduct('${p.id}')" title="Editar">
                                    ${getIcon('edit')}
                                </button>
                                <button class="btn btn-secondary btn-sm" onclick="App.toggleProductStatus('${p.id}')" title="Pausar / Activar">
                                    ${getIcon('sliders')}
                                </button>
                                <button class="btn btn-danger btn-sm" onclick="App.deleteVendorProduct('${p.id}')" title="Eliminar">
                                    ${getIcon('trash')}
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
            }
        }

        // Render Vendor Orders Table
        if (this.dom.vendorOrdersTableBody) {
            if (storeOrders.length === 0) {
                this.dom.vendorOrdersTableBody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align: center; padding: 30px; color: var(--text-muted);">
                            No hay órdenes registradas para este local aún.
                        </td>
                    </tr>
                `;
            } else {
                this.dom.vendorOrdersTableBody.innerHTML = storeOrders.map(order => {
                    const storeItems = order.items.filter(i => i.storeId === store.id);
                    const subtotalStore = storeItems.reduce((s, i) => s + (i.price * i.quantity), 0);
                    return `
                        <tr>
                            <td><strong>${order.id}</strong><br><small style="color: var(--text-muted);">${order.date}</small></td>
                            <td>
                                <div><strong>${order.clientName}</strong></div>
                                <small style="color: var(--text-secondary);">${order.clientPhone}</small>
                            </td>
                            <td>
                                ${storeItems.map(i => `<div>${i.quantity}x ${i.name}</div>`).join('')}
                            </td>
                            <td><strong>$${subtotalStore.toLocaleString('es-MX')}</strong> MXN</td>
                            <td>
                                <div class="luxury-select-wrapper">
                                    <select class="luxury-select" onchange="App.handleOrderStatusChange('${order.id}', this.value)" style="padding: 4px 28px 4px 8px; font-size: 0.75rem;">
                                        <option value="pendiente" ${order.status === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                                        <option value="preparacion" ${order.status === 'preparacion' ? 'selected' : ''}>En Preparación</option>
                                        <option value="listo" ${order.status === 'listo' ? 'selected' : ''}>Listo p/ Entrega</option>
                                        <option value="entregado" ${order.status === 'entregado' ? 'selected' : ''}>Entregado</option>
                                    </select>
                                    <span class="select-chevron-icon" style="right: 8px;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </span>
                                </div>
                            </td>
                            <td>
                                <button class="btn btn-secondary btn-sm" onclick="App.openChatModal('${store.id}')">
                                    ${getIcon('message')}
                                </button>
                            </td>
                        </tr>
                    `;
                }).join('');
            }
        }
    },

    // Vendor Product CRUD
    openVendorProductModal(productId = null) {
        this.editingProductId = productId;
        const currentStore = storeManager.getCurrentVendorStore();

        if (productId) {
            const product = storeManager.getProductById(productId);
            if (!product) return;
            this.dom.vendorModalTitle.textContent = 'Editar Producto de ' + currentStore.name;
            document.getElementById('vp-name').value = product.name;
            document.getElementById('vp-price').value = product.price;
            document.getElementById('vp-original-price').value = product.originalPrice || '';
            document.getElementById('vp-stock').value = product.stock;
            document.getElementById('vp-sku').value = product.sku || '';
            document.getElementById('vp-category').value = product.category;
            document.getElementById('vp-badge').value = product.badge || '';
            document.getElementById('vp-image').value = product.image;
            document.getElementById('vp-description').value = product.description;
        } else {
            this.dom.vendorModalTitle.textContent = 'Publicar Nuevo Producto en ' + currentStore.name;
            this.dom.vendorProductForm.reset();
            // defaults
            document.getElementById('vp-image').value = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
        }

        this.dom.vendorProductModalOverlay.classList.add('active');
    },

    closeVendorProductModal() {
        this.dom.vendorProductModalOverlay.classList.remove('active');
        this.editingProductId = null;
    },

    handleVendorProductSubmit() {
        const currentStore = storeManager.getCurrentVendorStore();
        const name = document.getElementById('vp-name').value.trim();
        const price = parseFloat(document.getElementById('vp-price').value);
        const originalPriceVal = document.getElementById('vp-original-price').value;
        const originalPrice = originalPriceVal ? parseFloat(originalPriceVal) : null;
        const stock = parseInt(document.getElementById('vp-stock').value, 10);
        const sku = document.getElementById('vp-sku').value.trim();
        const category = document.getElementById('vp-category').value;
        const badge = document.getElementById('vp-badge').value.trim();
        const image = document.getElementById('vp-image').value.trim();
        const description = document.getElementById('vp-description').value.trim();

        const productData = {
            storeId: currentStore.id,
            name,
            price,
            originalPrice,
            stock,
            sku,
            category,
            badge,
            image,
            description,
            active: true
        };

        if (this.editingProductId) {
            storeManager.updateProduct(this.editingProductId, productData);
            this.showToast('Producto actualizado correctamente', 'success');
        } else {
            storeManager.addProduct(productData);
            this.showToast('Producto agregado al catálogo de tu local', 'success');
        }

        this.closeVendorProductModal();
        this.renderVendorPortal();
        this.renderProducts();
    },

    editVendorProduct(productId) {
        this.openVendorProductModal(productId);
    },

    toggleProductStatus(productId) {
        const prod = storeManager.toggleProductStatus(productId);
        if (prod) {
            this.showToast(`Producto ${prod.active ? 'activado' : 'pausado'}`, 'info');
            this.renderVendorPortal();
            this.renderProducts();
        }
    },

    deleteVendorProduct(productId) {
        if (confirm('¿Está seguro de eliminar este producto del inventario?')) {
            storeManager.deleteProduct(productId);
            this.showToast('Producto eliminado', 'info');
            this.renderVendorPortal();
            this.renderProducts();
        }
    },

    handleOrderStatusChange(orderId, newStatus) {
        storeManager.updateOrderStatus(orderId, newStatus);
        this.showToast(`Estado de ${orderId} actualizado a: ${this.getStatusLabel(newStatus)}`, 'success');
        this.renderVendorPortal();
    },

    populateVendorSettingsForm() {
        const store = storeManager.getCurrentVendorStore();
        if (!store) return;
        document.getElementById('vs-name').value = store.name;
        document.getElementById('vs-local').value = store.localNumber;
        document.getElementById('vs-phone').value = store.phone;
        document.getElementById('vs-schedule').value = store.schedule;
        document.getElementById('vs-tagline').value = store.tagline || '';
        document.getElementById('vs-description').value = store.description || '';
    },

    handleVendorSettingsSubmit() {
        const store = storeManager.getCurrentVendorStore();
        const updated = {
            id: store.id,
            name: document.getElementById('vs-name').value.trim(),
            localNumber: document.getElementById('vs-local').value.trim(),
            phone: document.getElementById('vs-phone').value.trim(),
            schedule: document.getElementById('vs-schedule').value.trim(),
            tagline: document.getElementById('vs-tagline').value.trim(),
            description: document.getElementById('vs-description').value.trim()
        };

        storeManager.updateStore(updated);
        this.showToast('Datos de tu local actualizados', 'success');
        this.populateVendorStoreSelect();
        this.renderStores();
    },

    // =========================================================================
    // DIRECT CHAT MODAL
    // =========================================================================
    openChatModal(storeId) {
        this.activeChatStoreId = storeId;
        const store = storeManager.getStoreById(storeId) || storeManager.getStores()[0];
        this.dom.chatModalTitle.innerHTML = `
            <span>${getIcon('store')}</span>
            <span>Atención Directa: ${store.name}</span>
        `;
        this.renderChatMessages();
        this.dom.chatModalOverlay.classList.add('active');
        setTimeout(() => this.dom.chatInput.focus(), 150);
    },

    closeChatModal() {
        this.dom.chatModalOverlay.classList.remove('active');
    },

    renderChatMessages() {
        const messages = storeManager.getChats(this.activeChatStoreId);
        this.dom.chatMessagesContainer.innerHTML = messages.map(msg => `
            <div class="chat-bubble ${msg.from}">
                <span>${msg.text}</span>
                <span class="chat-time">${msg.time}</span>
            </div>
        `).join('');
        this.dom.chatMessagesContainer.scrollTop = this.dom.chatMessagesContainer.scrollHeight;
    },

    handleSendChatMessage() {
        const text = this.dom.chatInput.value.trim();
        if (!text) return;

        const role = storeManager.getRole();
        storeManager.sendChatMessage(this.activeChatStoreId, text, role);
        this.dom.chatInput.value = '';
        this.renderChatMessages();

        // If client sent message, simulate instant friendly merchant answer
        if (role === 'client') {
            setTimeout(() => {
                const store = storeManager.getStoreById(this.activeChatStoreId) || { name: 'Locatario' };
                const replies = [
                    `¡Hola! En ${store.name} estamos listos para atenderte. Tu pedido o duda queda registrado. ¿Deseas recogerlo en nuestro local hoy mismo?`,
                    `Con gusto te atendemos. Te confirmamos que tenemos piezas en existencia directa en nuestro mostrador.`,
                    `¡Excelente elección! Si realizas tu compra ahora, podemos prepararlo para entrega inmediata.`
                ];
                const reply = replies[Math.floor(Math.random() * replies.length)];
                storeManager.sendChatMessage(this.activeChatStoreId, reply, 'vendor');
                this.renderChatMessages();
            }, 800);
        }
    },

    // Toast Notification System
    showToast(message, type = 'info') {
        if (!this.dom.toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let iconName = 'info';
        if (type === 'success') iconName = 'check';
        if (type === 'info') iconName = 'info';

        toast.innerHTML = `
            <span>${getIcon(iconName)}</span>
            <span>${message}</span>
        `;

        this.dom.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }
};

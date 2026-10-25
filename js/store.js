// LocalStorage-backed State Management Store

const STORAGE_KEYS = {
    STORES: 'mercado_stores_v1',
    PRODUCTS: 'mercado_products_v1',
    ORDERS: 'mercado_orders_v1',
    CART: 'mercado_cart_v1',
    FAVORITES: 'mercado_favorites_v1',
    ACTIVE_ROLE: 'mercado_role_v1',
    ACTIVE_VENDOR_ID: 'mercado_vendor_id_v1',
    CHATS: 'mercado_chats_v1'
};

class StoreManager {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem(STORAGE_KEYS.STORES)) {
            localStorage.setItem(STORAGE_KEYS.STORES, JSON.stringify(INITIAL_STORES));
        }
        if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.CART)) {
            localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
            localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(["prod-101", "prod-105"]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.ACTIVE_ROLE)) {
            localStorage.setItem(STORAGE_KEYS.ACTIVE_ROLE, 'client');
        }
        if (!localStorage.getItem(STORAGE_KEYS.ACTIVE_VENDOR_ID)) {
            localStorage.setItem(STORAGE_KEYS.ACTIVE_VENDOR_ID, 'loc-1');
        }
        if (!localStorage.getItem(STORAGE_KEYS.CHATS)) {
            localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify({}));
        }
    }

    // Generic helpers
    get(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Storage parse error', e);
            return defaultValue;
        }
    }

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            this.emitChange(key, value);
        } catch (e) {
            console.error('Storage write error', e);
        }
    }

    emitChange(key, value) {
        window.dispatchEvent(new CustomEvent('app:state-change', { detail: { key, value } }));
    }

    // Role management
    getRole() {
        return this.get(STORAGE_KEYS.ACTIVE_ROLE, 'client');
    }

    setRole(role) {
        this.set(STORAGE_KEYS.ACTIVE_ROLE, role);
    }

    getActiveVendorId() {
        return this.get(STORAGE_KEYS.ACTIVE_VENDOR_ID, 'loc-1');
    }

    setActiveVendorId(storeId) {
        this.set(STORAGE_KEYS.ACTIVE_VENDOR_ID, storeId);
    }

    getCurrentVendorStore() {
        const vendorId = this.getActiveVendorId();
        const stores = this.getStores();
        return stores.find(s => s.id === vendorId) || stores[0];
    }

    // Stores CRUD
    getStores() {
        return this.get(STORAGE_KEYS.STORES, INITIAL_STORES);
    }

    getStoreById(id) {
        return this.getStores().find(s => s.id === id);
    }

    updateStore(updatedStore) {
        const stores = this.getStores();
        const index = stores.findIndex(s => s.id === updatedStore.id);
        if (index !== -1) {
            stores[index] = { ...stores[index], ...updatedStore };
            this.set(STORAGE_KEYS.STORES, stores);
            return true;
        }
        return false;
    }

    // Products CRUD
    getProducts(onlyActive = false) {
        const products = this.get(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
        return onlyActive ? products.filter(p => p.active !== false) : products;
    }

    getProductById(id) {
        return this.getProducts().find(p => p.id === id);
    }

    getProductsByStore(storeId, onlyActive = false) {
        const products = this.getProducts(onlyActive);
        return products.filter(p => p.storeId === storeId);
    }

    addProduct(productData) {
        const products = this.getProducts();
        const newProduct = {
            id: 'prod-' + Date.now(),
            rating: 5.0,
            reviewsCount: 1,
            featured: false,
            active: true,
            gallery: productData.image ? [productData.image] : [],
            ...productData
        };
        products.unshift(newProduct);
        this.set(STORAGE_KEYS.PRODUCTS, products);
        return newProduct;
    }

    updateProduct(id, updatedFields) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields };
            this.set(STORAGE_KEYS.PRODUCTS, products);
            return products[index];
        }
        return null;
    }

    deleteProduct(id) {
        let products = this.getProducts();
        products = products.filter(p => p.id !== id);
        this.set(STORAGE_KEYS.PRODUCTS, products);
        // Also remove from cart if present
        this.removeFromCart(id);
    }

    toggleProductStatus(id) {
        const product = this.getProductById(id);
        if (product) {
            return this.updateProduct(id, { active: !product.active });
        }
        return null;
    }

    // Cart operations
    getCart() {
        return this.get(STORAGE_KEYS.CART, []);
    }

    addToCart(productId, quantity = 1) {
        const cart = this.getCart();
        const existing = cart.find(item => item.productId === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ productId, quantity });
        }
        this.set(STORAGE_KEYS.CART, cart);
    }

    updateCartQuantity(productId, quantity) {
        let cart = this.getCart();
        if (quantity <= 0) {
            cart = cart.filter(item => item.productId !== productId);
        } else {
            const item = cart.find(i => i.productId === productId);
            if (item) {
                item.quantity = quantity;
            }
        }
        this.set(STORAGE_KEYS.CART, cart);
    }

    removeFromCart(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.productId !== productId);
        this.set(STORAGE_KEYS.CART, cart);
    }

    clearCart() {
        this.set(STORAGE_KEYS.CART, []);
    }

    getCartDetails() {
        const cart = this.getCart();
        const products = this.getProducts();
        const stores = this.getStores();

        const items = [];
        let subtotal = 0;

        cart.forEach(cartItem => {
            const product = products.find(p => p.id === cartItem.productId);
            if (product) {
                const store = stores.find(s => s.id === product.storeId) || { name: 'Local Desconocido' };
                const lineTotal = product.price * cartItem.quantity;
                subtotal += lineTotal;
                items.push({
                    ...cartItem,
                    product,
                    store,
                    lineTotal
                });
            }
        });

        return {
            items,
            count: items.reduce((sum, item) => sum + item.quantity, 0),
            subtotal
        };
    }

    // Favorites
    getFavorites() {
        return this.get(STORAGE_KEYS.FAVORITES, []);
    }

    toggleFavorite(productId) {
        let favs = this.getFavorites();
        const exists = favs.includes(productId);
        if (exists) {
            favs = favs.filter(id => id !== productId);
        } else {
            favs.push(productId);
        }
        this.set(STORAGE_KEYS.FAVORITES, favs);
        return !exists;
    }

    isFavorite(productId) {
        return this.getFavorites().includes(productId);
    }

    // Orders
    getOrders() {
        return this.get(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    }

    getOrderById(orderId) {
        return this.getOrders().find(o => o.id === orderId);
    }

    createOrder(orderData) {
        const orders = this.getOrders();
        const newOrder = {
            id: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
            date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            status: 'pendiente',
            ...orderData
        };
        orders.unshift(newOrder);
        this.set(STORAGE_KEYS.ORDERS, orders);
        this.clearCart();
        return newOrder;
    }

    updateOrderStatus(orderId, newStatus) {
        const orders = this.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            this.set(STORAGE_KEYS.ORDERS, orders);
            return true;
        }
        return false;
    }

    // Direct chats between client & locatario
    getChats(storeId) {
        const allChats = this.get(STORAGE_KEYS.CHATS, {});
        return allChats[storeId] || [
            {
                from: 'vendor',
                text: '¡Hola! Te atendemos directamente desde nuestro local en el mercado. ¿En qué podemos apoyarte hoy?',
                time: 'Hace un momento'
            }
        ];
    }

    sendChatMessage(storeId, text, sender = 'client') {
        const allChats = this.get(STORAGE_KEYS.CHATS, {});
        if (!allChats[storeId]) {
            allChats[storeId] = [
                {
                    from: 'vendor',
                    text: '¡Hola! Te atendemos directamente desde nuestro local en el mercado. ¿En qué podemos apoyarte hoy?',
                    time: 'Hace un momento'
                }
            ];
        }
        allChats[storeId].push({
            from: sender,
            text,
            time: 'Justo ahora'
        });
        this.set(STORAGE_KEYS.CHATS, allChats);
        return allChats[storeId];
    }

    // Reset data
    resetAllData() {
        localStorage.clear();
        this.init();
        window.location.reload();
    }
}

const storeManager = new StoreManager();

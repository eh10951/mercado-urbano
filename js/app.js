// MARCHANTE DIGITAL - Interactive Application Engine
// Vanilla JavaScript, 100% Vector SVG, Zero Emojis

(function () {
    'use strict';

    // -------------------------------------------------------------
    // SVG ICONS DICTIONARY (Pristine vectors, 0 emojis)
    // -------------------------------------------------------------
    const ICONS = {
        home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
        grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
        mic: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"/></svg>',
        truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h14v13H1z"/><path d="M15 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
        leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-7 8-9 16-9 0 8-2 16-9 16z"/><path d="M11 20v-9"/></svg>',
        coins: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h2"/><path d="M8 5v2"/></svg>',
        cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
        tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
        users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
        user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
        back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
        x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
        plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
        minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
        trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>',
        edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
        store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        pin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
        clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
        apple: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4c0 3-4 6-4 6s-4-3-4-6a4 4 0 0 1 4-4z"/><path d="M12 2v4"/><path d="M6 13c0 4 3 7 6 7s6-3 6-7a6 6 0 0 0-12 0z"/></svg>',
        drumstick: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6"/><path d="M18.8 6.2a4 4 0 0 0-5.6 0L4 15.4a2 2 0 0 0 0 2.8l1.8 1.8a2 2 0 0 0 2.8 0l9.2-9.2a4 4 0 0 0 0-5.6z"/><circle cx="5" cy="19" r="2"/></svg>',
        fish: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 16s4-8 12-8c4 0 8 3 8 3s-4 8-12 8c-3 0-5-1-8-3z"/><path d="M18 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M2 12l-1 4h5l-4-4z"/></svg>',
        cheese: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13h18l-9-9-9 9z"/><rect x="3" y="13" width="18" height="7" rx="1"/><circle cx="8" cy="16" r="1"/><circle cx="15" cy="17" r="1"/></svg>',
        whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.12c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.12 8.12 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4 1.55 1.55 2.4 3.61 2.4 5.8 0 4.52-3.68 8.22-8.16 8.22zm4.49-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.17 1.75 2.67 4.24 3.75.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z"/></svg>',
        star: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
    };

    function renderIcons() {
        document.querySelectorAll('[data-icon]').forEach(el => {
            const name = el.getAttribute('data-icon');
            if (ICONS[name]) el.innerHTML = ICONS[name];
        });
    }

    // -------------------------------------------------------------
    // DATA: SEASONAL PRICES (Central de Abasto CDMX)
    // -------------------------------------------------------------
    const SEASONAL_TICKER = [
        { name: 'Jitomate Saladette', season: 'Primavera · Bajío', price: 14, unit: 'kg', trend: -12.5, type: 'down', history: [19, 18, 16, 15, 14] },
        { name: 'Papa Blanca Alpha', season: 'Puebla / Tlaxcala', price: 16, unit: 'kg', trend: 0, type: 'flat', history: [16, 16, 16, 16, 16] },
        { name: 'Cebolla Bola', season: 'Cosecha Morelos', price: 11, unit: 'kg', trend: -18.0, type: 'down', history: [15, 14, 13, 12, 11] },
        { name: 'Limón con Semilla', season: 'Michoacán / Colima', price: 19, unit: 'kg', trend: 15.2, type: 'up', history: [15, 16, 17, 18, 19] },
        { name: 'Aguacate Hass', season: 'Uruapan', price: 42, unit: 'kg', trend: -8.5, type: 'down', history: [48, 46, 45, 44, 42] },
        { name: 'Chile Serrano', season: 'Zacatecas', price: 22, unit: 'kg', trend: 10.0, type: 'up', history: [18, 19, 20, 21, 22] },
        { name: 'Plátano Tabasco', season: 'Teapa', price: 13, unit: 'kg', trend: -7.0, type: 'down', history: [15, 14, 14, 13, 13] },
        { name: 'Naranja Valencia', season: 'Veracruz', price: 12, unit: 'kg', trend: -14.0, type: 'down', history: [15, 14, 13, 12, 12] },
        { name: 'Huevo Blanco', season: 'Tehuacán', price: 38, unit: 'kg', trend: 2.7, type: 'up', history: [36, 37, 37, 38, 38] },
        { name: 'Pollo Entero', season: 'Granjas Hidalgo', price: 48, unit: 'kg', trend: -4.0, type: 'down', history: [52, 51, 50, 49, 48] }
    ];

    // -------------------------------------------------------------
    // DATA: INITIAL ORDER (Identical to reference screen 3)
    // -------------------------------------------------------------
    const INITIAL_ORDER = [
        {
            id: 'jitomate',
            name: 'Jitomate',
            desc: '3 cajas (60 kg)',
            rawQty: 3,
            unitLabel: 'cajas',
            price: 480,
            unitPrice: 160,
            img: 'assets/jitomate.jpg'
        },
        {
            id: 'papa',
            name: 'Papa',
            desc: '2 costales (50 kg)',
            rawQty: 2,
            unitLabel: 'costales',
            price: 400,
            unitPrice: 200,
            img: 'assets/papa.jpg'
        },
        {
            id: 'cebolla',
            name: 'Cebolla',
            desc: '20 kg',
            rawQty: 20,
            unitLabel: 'kg',
            price: 220,
            unitPrice: 11,
            img: 'assets/cebolla.jpg'
        },
        {
            id: 'limon',
            name: 'Limón',
            desc: '1 caja (20 kg)',
            rawQty: 1,
            unitLabel: 'cajas',
            price: 380,
            unitPrice: 380,
            img: 'assets/limon.jpg'
        }
    ];

    // -------------------------------------------------------------
    // DATA: CATEGORIES & SUPPLIERS (Screen 4 reference)
    // -------------------------------------------------------------
    const CATEGORIES = [
        { id: 'frutas', name: 'Frutas y verduras', icon: 'apple' },
        { id: 'carnes', name: 'Carnes y pollo', icon: 'drumstick' },
        { id: 'pescados', name: 'Pescados y mariscos', icon: 'fish' },
        { id: 'cremeria', name: 'Cremería', icon: 'cheese' }
    ];

    const SUPPLIERS_BY_PRODUCT = {
        jitomate: [
            { id: 'ceda-1', name: 'Central de Abasto', loc: 'Iztapalapa, Nave I', price: 14, eta: 'Entrega mañana 5:00 a. m.', quality: 'Calidad A', best: true, img: 'assets/jitomate.jpg' },
            { id: 'ceda-2', name: 'Proveedor San Juan', loc: 'Central de Abasto, Bodega K-42', price: 15, eta: 'Entrega mañana 5:00 a. m.', quality: 'Calidad A', img: 'assets/jitomate.jpg' },
            { id: 'ceda-3', name: 'Distribuidora Reforma', loc: 'Central de Abasto, Pasillo 3', price: 16, eta: 'Entrega mañana 5:30 a. m.', quality: 'Calidad A', img: 'assets/jitomate.jpg' },
            { id: 'ceda-4', name: 'Productor directo', loc: 'Milpa Alta (Cultivo tradicional)', price: 13, eta: 'Entrega en 2 días', quality: 'Calidad A', eco: true, img: 'assets/jitomate.jpg' }
        ],
        papa: [
            { id: 'papa-1', name: 'Central de Abasto', loc: 'Iztapalapa, Bodega F-12', price: 16, eta: 'Entrega mañana 5:00 a. m.', quality: 'Calidad A', best: true, img: 'assets/papa.jpg' },
            { id: 'papa-2', name: 'Papas del Altiplano', loc: 'Central de Abasto, Pasillo 2', price: 17, eta: 'Entrega mañana 5:00 a. m.', quality: 'Calidad A', img: 'assets/papa.jpg' },
            { id: 'papa-3', name: 'Productor Tlaxcala', loc: 'Huamantla directo', price: 15, eta: 'Entrega en 2 días', quality: 'Calidad A', img: 'assets/papa.jpg' }
        ],
        cebolla: [
            { id: 'ceb-1', name: 'Central de Abasto', loc: 'Iztapalapa, Nave G', price: 11, eta: 'Entrega mañana 5:00 a. m.', quality: 'Calidad A', best: true, img: 'assets/cebolla.jpg' },
            { id: 'ceb-2', name: 'Comercializadora Morelos', loc: 'Central de Abasto, Pasillo 4', price: 12, eta: 'Entrega mañana 5:00 a. m.', quality: 'Calidad A', img: 'assets/cebolla.jpg' }
        ],
        limon: [
            { id: 'lim-1', name: 'Limones Colima', loc: 'Central de Abasto, Bodega L-08', price: 19, eta: 'Entrega mañana 5:00 a. m.', quality: 'Calidad A', best: true, img: 'assets/limon.jpg' },
            { id: 'lim-2', name: 'Central de Abasto', loc: 'Iztapalapa, Pasillo 1', price: 20, eta: 'Entrega mañana 5:00 a. m.', quality: 'Calidad A', img: 'assets/limon.jpg' },
            { id: 'lim-3', name: 'Cítricos de Apatzingán', loc: 'Michoacán directo', price: 18, eta: 'Entrega en 2 días', quality: 'Calidad A', img: 'assets/limon.jpg' }
        ]
    };

    // -------------------------------------------------------------
    // DATA: TIMELINE (Screen 5 reference)
    // -------------------------------------------------------------
    const TIMELINE_STEPS = [
        { title: 'Pedido confirmado', time: 'Hoy, 8:15 p. m.', status: 'done', icon: 'check' },
        { title: 'Proveedor preparando', time: 'Hoy, 10:00 p. m.', status: 'done', icon: 'check' },
        { title: 'En transporte', time: 'Hoy, 2:30 a. m.', status: 'active', icon: 'truck' },
        { title: 'En camino a tu tianguis', time: 'Hoy, 4:00 a. m.', status: 'pending', icon: 'pin' },
        { title: 'Entregado', time: 'Pendiente', status: 'pending', icon: 'home' }
    ];

    // -------------------------------------------------------------
    // DATA: GROUP PURCHASES
    // -------------------------------------------------------------
    const GROUP_PURCHASES = [
        { id: 'g1', name: 'Jitomate Saladette por tonelada', tianguis: 'Tianguis Doctores', current: 16, goal: 20, unit: 'cajas', save: 'Ahorras 22% en flete', img: 'assets/jitomate.jpg' },
        { id: 'g2', name: 'Limón con semilla Michoacán', tianguis: 'Tianguis Doctores + Narvarte', current: 8, goal: 10, unit: 'cajas', save: 'Ahorras 18% en precio', img: 'assets/limon.jpg' },
        { id: 'g3', name: 'Papa Alpha en costal', tianguis: 'Tianguis Doctores', current: 12, goal: 15, unit: 'costales', save: 'Flete gratis compartido', img: 'assets/papa.jpg' }
    ];

    // -------------------------------------------------------------
    // DATA: TIANGUIS EN CDMX (Impacto territorial)
    // -------------------------------------------------------------
    const TIANGUIS_LIST = [
        { id: 'san-felipe', name: 'Tianguis San Felipe de Jesús', alcaldia: 'Gustavo A. Madero', dias: 'Domingos', flete: 120, eta: '5:00 a. m.', puestos: 450 },
        { id: 'el-salado', name: 'Tianguis El Salado', alcaldia: 'Iztapalapa', dias: 'Miércoles', flete: 90, eta: '4:30 a. m.', puestos: 380 },
        { id: 'tepito', name: 'Tianguis Tepito / Lagunilla', alcaldia: 'Cuauhtémoc', dias: 'Miércoles a Lunes', flete: 110, eta: '5:15 a. m.', puestos: 600 },
        { id: 'doctores', name: 'Tianguis de los Martes', alcaldia: 'Cuauhtémoc', dias: 'Martes', flete: 120, eta: '5:00 a. m.', puestos: 210 },
        { id: 'xochimilco', name: 'Tianguis Xochimilco Centro', alcaldia: 'Xochimilco', dias: 'Jueves y Sábados', flete: 140, eta: '5:30 a. m.', puestos: 290 },
        { id: 'san-cosme', name: 'Tianguis San Cosme', alcaldia: 'Miguel Hidalgo', dias: 'Viernes', flete: 115, eta: '5:10 a. m.', puestos: 180 }
    ];

    // -------------------------------------------------------------
    // APP STATE & STORAGE
    // -------------------------------------------------------------
    const STORAGE_KEY = 'tianguis_conectado_v1';

    function loadState() {
        let loaded = null;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) loaded = JSON.parse(raw);
        } catch (e) { /* ignore */ }

        const def = {
            order: JSON.parse(JSON.stringify(INITIAL_ORDER)),
            shippingFee: 120,
            activeTianguis: 'san-felipe',
            selectedSuppliers: { jitomate: 'ceda-1', papa: 'papa-1', cebolla: 'ceb-1', limon: 'lim-1' },
            activeCategory: 'frutas',
            activeProductChip: 'jitomate',
            joinedGroups: [],
            ordersHistory: [
                { id: 'TC-2401', date: 'Ayer, 8:15 p. m.', total: 1600, status: 'En transporte', itemsCount: 4 },
                { id: 'TC-2388', date: '18 oct, 7:40 p. m.', total: 1420, status: 'Entregado', itemsCount: 3 }
            ]
        };

        if (!loaded) return def;
        if (!loaded.activeTianguis) loaded.activeTianguis = 'san-felipe';
        return loaded;
    }

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) { /* ignore */ }
    }

    let state = loadState();
    let currentScreen = 'inicio';
    let historyStack = ['inicio'];
    let isEditingOrder = false;
    let voiceDraft = [];
    let isListening = false;
    let speechRecognition = null;

    // -------------------------------------------------------------
    // SPARKLINE GENERATOR (SVG Mini charts)
    // -------------------------------------------------------------
    function sparklineSvg(pts, color) {
        const min = Math.min(...pts);
        const max = Math.max(...pts);
        const range = max - min || 1;
        const w = 38, h = 16, pad = 2;
        const coords = pts.map((v, i) => {
            const x = pad + (i / (pts.length - 1)) * (w - pad * 2);
            const y = h - pad - ((v - min) / range) * (h - pad * 2);
            return `${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(' ');
        return `<svg class="tk-spark" viewBox="0 0 ${w} ${h}"><polyline points="${coords}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }

    // -------------------------------------------------------------
    // TICKER CAROUSEL (Infinite loop with sparklines)
    // -------------------------------------------------------------
    function renderTicker() {
        const track = document.getElementById('ticker-track');
        const seasonEl = document.getElementById('ticker-season');
        if (!track) return;

        seasonEl.textContent = 'Otoño 2026 · CEDA CDMX';

        const makeCard = (item) => {
            const isUp = item.type === 'up';
            const isDown = item.type === 'down';
            const arrow = isUp ? '▲' : (isDown ? '▼' : '●');
            const color = isUp ? '#B42318' : (isDown ? '#2E7D4F' : '#6E5A60');
            const sign = isUp ? '+' : '';
            const pct = `${sign}${item.trend.toFixed(1)}%`;
            const spark = sparklineSvg(item.history, color);

            return `
                <div class="tk" tabindex="0" role="group" aria-label="${item.name}: $${item.price} por ${item.unit}, tendencia ${pct}">
                    <span class="tk-thumb">${item.name.charAt(0)}</span>
                    <div>
                        <div style="display:flex;align-items:center;gap:6px">
                            <strong class="tk-name">${item.name}</strong>
                            <span class="tk-price">$${item.price}/${item.unit}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:4px">
                            <span class="tk-season">${item.season}</span>
                        </div>
                    </div>
                    ${spark}
                    <span class="tk-trend ${item.type}">${arrow} ${pct}</span>
                </div>
            `;
        };

        const html = SEASONAL_TICKER.map(makeCard).join('');
        // Duplicate once for mathematical seamless infinite loop
        track.innerHTML = html + html;
    }

    // -------------------------------------------------------------
    // ROUTING / NAVIGATION
    // -------------------------------------------------------------
    function goTo(screenId, pushToHistory = true) {
        if (!document.getElementById(`screen-${screenId}`)) return;
        const prev = currentScreen;
        currentScreen = screenId;

        if (pushToHistory && screenId !== prev) {
            historyStack.push(screenId);
        }

        document.querySelectorAll('.screen').forEach(el => {
            const isTarget = el.dataset.screen === screenId;
            el.classList.toggle('is-active', isTarget);
        });

        // Tabbar active state
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('is-active', tab.dataset.tab === screenId);
        });

        // Hide tabbar on flow screens
        const tabbar = document.getElementById('tabbar');
        const hideTabbarOn = ['voz', 'pedido', 'precios', 'seguimiento'];
        const isFlow = hideTabbarOn.includes(screenId);
        if (tabbar) tabbar.classList.toggle('is-hidden', isFlow);

        // Flow step tag / bar in Precios
        const preciosStep = document.getElementById('precios-step');
        const confirmBar = document.getElementById('confirm-bar');
        const screenPrecios = document.getElementById('screen-precios');
        if (preciosStep && confirmBar && screenPrecios) {
            const fromPedidoFlow = historyStack.includes('pedido') && screenId === 'precios';
            preciosStep.hidden = !fromPedidoFlow;
            confirmBar.hidden = !fromPedidoFlow;
            screenPrecios.classList.toggle('in-flow', fromPedidoFlow);
        }

        // Screen-specific updates
        if (screenId === 'pedido') renderOrderReview();
        if (screenId === 'precios') renderPreciosView();
        if (screenId === 'seguimiento') renderTimeline();
        if (screenId === 'mis-pedidos') renderOrdersList();
        if (screenId === 'colectivas') renderGroupsList();
        if (screenId === 'inicio') updateBadge();

        window.scrollTo(0, 0);
        const activeScreenEl = document.getElementById(`screen-${screenId}`);
        if (activeScreenEl) activeScreenEl.scrollTo(0, 0);
    }

    function goBack() {
        if (historyStack.length > 1) {
            historyStack.pop();
            const prev = historyStack[historyStack.length - 1];
            goTo(prev, false);
        } else {
            goTo('inicio', false);
        }
    }

    // -------------------------------------------------------------
    // SCREEN 2: VOICE ORDERING
    // -------------------------------------------------------------
    function parseVoiceText(text) {
        const lower = text.toLowerCase();
        const found = [];

        if (lower.includes('lo mismo que la semana pasada')) {
            state.order = JSON.parse(JSON.stringify(INITIAL_ORDER));
            saveState();
            return { special: 'semana_pasada' };
        }

        const patterns = [
            { re: /(\d+)\s*(?:cajas?|kg|kilos?|costales?)\s*de\s*jitomates?/i, id: 'jitomate', name: 'Jitomate', unit: 'cajas', unitPrice: 160, img: 'assets/jitomate.jpg' },
            { re: /(\d+)\s*(?:costales?|cajas?|kg|kilos?)\s*de\s*papas?/i, id: 'papa', name: 'Papa', unit: 'costales', unitPrice: 200, img: 'assets/papa.jpg' },
            { re: /(\d+)\s*(?:kg|kilos?|cajas?)\s*de\s*cebollas?/i, id: 'cebolla', name: 'Cebolla', unit: 'kg', unitPrice: 11, img: 'assets/cebolla.jpg' },
            { re: /(\d+)\s*(?:cajas?|kg|kilos?)\s*de\s*lim[oó]n(?:es)?/i, id: 'limon', name: 'Limón', unit: 'cajas', unitPrice: 380, img: 'assets/limon.jpg' }
        ];

        patterns.forEach(p => {
            const m = lower.match(p.re);
            if (m) {
                const qty = parseInt(m[1], 10);
                found.push({
                    id: p.id,
                    name: p.name,
                    rawQty: qty,
                    unitLabel: p.unit,
                    desc: `${qty} ${p.unit}`,
                    unitPrice: p.unitPrice,
                    price: qty * p.unitPrice,
                    img: p.img
                });
            }
        });

        // Fallback generic
        if (found.length === 0 && text.trim().length > 0) {
            found.push({
                id: 'gen-' + Date.now(),
                name: text.trim(),
                rawQty: 1,
                unitLabel: 'pedido',
                desc: '1 pedido',
                unitPrice: 150,
                price: 150,
                img: null
            });
        }

        return { items: found };
    }

    function addParsedItems(items) {
        items.forEach(newItem => {
            const existing = state.order.find(i => i.id === newItem.id);
            if (existing) {
                existing.rawQty += newItem.rawQty;
                existing.price = existing.rawQty * existing.unitPrice;
                existing.desc = `${existing.rawQty} ${existing.unitLabel}`;
            } else {
                state.order.push(newItem);
            }
            voiceDraft.push(`${newItem.rawQty} ${newItem.unitLabel} de ${newItem.name}`);
        });
        saveState();
        renderCapturedList();
        updateBadge();
    }

    function renderCapturedList() {
        const wrap = document.getElementById('captured');
        const list = document.getElementById('captured-list');
        const btnVer = document.getElementById('btn-ver-pedido');
        if (!wrap || !list) return;

        if (voiceDraft.length === 0) {
            wrap.hidden = true;
            if (btnVer) btnVer.hidden = true;
            return;
        }

        wrap.hidden = false;
        list.innerHTML = voiceDraft.map(txt => `<li>${txt}</li>`).join('');
        if (btnVer) {
            btnVer.hidden = false;
            document.getElementById('btn-ver-pedido-txt').textContent = `Ver mi pedido (${state.order.length} productos)`;
        }
    }

    function simulateVoiceInput(text) {
        const transcriptEl = document.getElementById('transcript');
        const stateEl = document.getElementById('listen-state');
        const mic = document.getElementById('mic-btn');

        if (mic) mic.classList.add('is-listening');
        if (stateEl) stateEl.textContent = 'Escuchando...';
        if (transcriptEl) transcriptEl.textContent = '“...”';

        setTimeout(() => {
            if (transcriptEl) transcriptEl.textContent = `“${text}”`;
            if (stateEl) stateEl.textContent = '¡Entendido!';
            if (mic) mic.classList.remove('is-listening');

            const res = parseVoiceText(text);
            if (res.special === 'semana_pasada') {
                showToast('Listo: cargué tu pedido de la semana pasada');
                goTo('pedido');
            } else if (res.items) {
                addParsedItems(res.items);
                showToast(`Agregado: ${text}`);
            }
        }, 900);
    }

    function initSpeech() {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRec) return;
        speechRecognition = new SpeechRec();
        speechRecognition.lang = 'es-MX';
        speechRecognition.continuous = false;
        speechRecognition.interimResults = false;

        speechRecognition.onstart = () => {
            isListening = true;
            const mic = document.getElementById('mic-btn');
            const stateEl = document.getElementById('listen-state');
            if (mic) mic.classList.add('is-listening');
            if (stateEl) stateEl.textContent = 'Estoy escuchando... habla ahora';
        };

        speechRecognition.onresult = (e) => {
            const text = e.results[0][0].transcript;
            simulateVoiceInput(text);
        };

        speechRecognition.onerror = () => {
            stopSpeech();
            showToast('No alcancé a escuchar. Puedes tocar un ejemplo o escribirlo.');
        };

        speechRecognition.onend = () => {
            stopSpeech();
        };
    }

    function stopSpeech() {
        isListening = false;
        const mic = document.getElementById('mic-btn');
        const stateEl = document.getElementById('listen-state');
        if (mic) mic.classList.remove('is-listening');
        if (stateEl) stateEl.textContent = 'Toca el micrófono para hablar';
    }

    function toggleMic() {
        if (speechRecognition) {
            if (isListening) {
                speechRecognition.stop();
                stopSpeech();
            } else {
                speechRecognition.start();
            }
        } else {
            // Simulated voice prompt if API unavailable
            const examples = [
                '3 cajas de jitomate',
                '2 costales de papa',
                '20 kilos de cebolla',
                '1 caja de limón'
            ];
            const pick = examples[Math.floor(Math.random() * examples.length)];
            simulateVoiceInput(pick);
        }
    }

    // -------------------------------------------------------------
    // SCREEN 3: ORDER REVIEW
    // -------------------------------------------------------------
    function renderOrderReview() {
        const filled = document.getElementById('pedido-filled');
        const empty = document.getElementById('pedido-empty');
        const linesList = document.getElementById('order-lines');
        const sumSub = document.getElementById('sum-sub');
        const sumShip = document.getElementById('sum-ship');
        const sumTotal = document.getElementById('sum-total');

        if (!filled || !empty) return;

        if (state.order.length === 0) {
            filled.hidden = true;
            empty.hidden = false;
            return;
        }

        filled.hidden = false;
        empty.hidden = true;

        const subtotal = state.order.reduce((acc, i) => acc + i.price, 0);
        const total = subtotal + state.shippingFee;

        sumSub.textContent = `$${subtotal.toLocaleString('es-MX')}`;
        sumShip.textContent = `$${state.shippingFee.toLocaleString('es-MX')}`;
        sumTotal.textContent = `$${total.toLocaleString('es-MX')}`;

        linesList.className = 'lines' + (isEditingOrder ? ' is-editing' : '');
        linesList.innerHTML = state.order.map((item, idx) => `
            <li class="line" data-id="${item.id}">
                ${item.img ? `<img src="${item.img}" alt="${item.name}" class="line-img">` : `<span class="line-ph">${item.name.charAt(0)}</span>`}
                <div>
                    <h4 class="line-name">${item.name}</h4>
                    <p class="line-desc">${item.desc}</p>
                    <div class="line-edit">
                        <button class="qty-btn" data-qty-dec="${idx}">${ICONS.minus}</button>
                        <span class="qty-val">${item.rawQty}</span>
                        <button class="qty-btn" data-qty-inc="${idx}">${ICONS.plus}</button>
                        <button class="qty-btn del" data-qty-del="${idx}">${ICONS.trash}</button>
                    </div>
                </div>
                <strong class="line-price">$${item.price.toLocaleString('es-MX')}</strong>
            </li>
        `).join('');

        const btnCambiarTxt = document.getElementById('btn-cambiar-txt');
        if (btnCambiarTxt) btnCambiarTxt.textContent = isEditingOrder ? 'Listo con los cambios' : 'Quiero cambiar algo';
    }

    function updateOrderQty(index, delta) {
        const item = state.order[index];
        if (!item) return;
        item.rawQty += delta;
        if (item.rawQty <= 0) {
            state.order.splice(index, 1);
        } else {
            item.price = item.rawQty * item.unitPrice;
            item.desc = `${item.rawQty} ${item.unitLabel}`;
        }
        saveState();
        renderOrderReview();
        updateBadge();
    }

    function removeOrderItem(index) {
        state.order.splice(index, 1);
        saveState();
        renderOrderReview();
        updateBadge();
        showToast('Producto eliminado');
    }

    // -------------------------------------------------------------
    // SCREEN 4: PRICES & SUPPLIERS
    // -------------------------------------------------------------
    function renderPreciosView() {
        const catsEl = document.getElementById('cats');
        const chipsEl = document.getElementById('product-chips');
        const supsEl = document.getElementById('suppliers');
        if (!catsEl || !chipsEl || !supsEl) return;

        // Categories
        catsEl.innerHTML = CATEGORIES.map(c => `
            <button class="cat ${c.id === state.activeCategory ? 'is-active' : ''}" data-cat="${c.id}" role="tab" aria-selected="${c.id === state.activeCategory}">
                <span data-icon="${c.icon}"></span>
                <span>${c.name}</span>
            </button>
        `).join('');

        // Product Chips (from order if available, else standard)
        const orderIds = state.order.map(i => i.id);
        const availableChips = orderIds.length > 0 ? orderIds : ['jitomate', 'papa', 'cebolla', 'limon'];
        if (!availableChips.includes(state.activeProductChip)) {
            state.activeProductChip = availableChips[0];
        }

        chipsEl.innerHTML = availableChips.map(pid => {
            const label = pid.charAt(0).toUpperCase() + pid.slice(1);
            return `<button class="chip ${pid === state.activeProductChip ? 'is-active' : ''}" data-chip="${pid}" role="tab">${label}</button>`;
        }).join('');

        // Suppliers list for active product chip
        const list = SUPPLIERS_BY_PRODUCT[state.activeProductChip] || SUPPLIERS_BY_PRODUCT['jitomate'];
        const currentSelected = state.selectedSuppliers[state.activeProductChip];

        supsEl.innerHTML = list.map(s => {
            const isSel = s.id === currentSelected;
            return `
                <li class="sup ${isSel ? 'is-selected' : ''}">
                    ${s.img ? `<img src="${s.img}" alt="${s.name}" class="sup-img">` : `<span class="sup-img sup-ph">${s.name.charAt(0)}</span>`}
                    <div class="sup-info">
                        <div class="sup-top">
                            <div>
                                <strong class="sup-name">${s.name}</strong>
                                ${s.best ? `<span class="sup-best">★ Mejor precio</span>` : ''}
                            </div>
                            <strong class="sup-price">$${s.price}/kg</strong>
                        </div>
                        <div class="sup-loc">${ICONS.pin}<span>${s.loc}</span></div>
                        <div class="sup-bottom">
                            <div>
                                <span class="badge-q">${s.quality}</span>
                                <div class="sup-eta">${s.eta}</div>
                            </div>
                            <button class="sup-btn" data-pick-sup="${s.id}">
                                ${isSel ? `${ICONS.check} Seleccionado` : 'Seleccionar'}
                            </button>
                        </div>
                    </div>
                </li>
            `;
        }).join('');

        // Bottom confirm bar total
        const total = state.order.reduce((acc, i) => acc + i.price, 0) + state.shippingFee;
        const barTotal = document.getElementById('confirm-bar-total');
        if (barTotal) barTotal.textContent = `$${total.toLocaleString('es-MX')}`;

        renderIcons();
    }

    function selectSupplier(supId) {
        state.selectedSuppliers[state.activeProductChip] = supId;
        saveState();
        renderPreciosView();
        showToast('Proveedor seleccionado para este producto');
    }

    function confirmOrder() {
        const newId = 'TC-' + Math.floor(1000 + Math.random() * 9000);
        const subtotal = state.order.reduce((acc, i) => acc + i.price, 0);
        state.ordersHistory.unshift({
            id: newId,
            date: 'Hoy, ' + new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
            total: subtotal + state.shippingFee,
            status: 'En transporte',
            itemsCount: state.order.length
        });
        saveState();
        showToast(`¡Pedido ${newId} confirmado! Sigue el transporte aquí.`);
        goTo('seguimiento');
    }

    // -------------------------------------------------------------
    // SCREEN 5: TIMELINE & MAP
    // -------------------------------------------------------------
    function renderTimeline() {
        const tlEl = document.getElementById('timeline');
        const mapEl = document.getElementById('map');
        if (!tlEl) return;

        tlEl.innerHTML = TIMELINE_STEPS.map(s => `
            <li class="tl ${s.status}">
                <span class="tl-dot">${ICONS[s.icon] || ''}</span>
                <div>
                    <strong class="tl-title">${s.title}</strong>
                    <div class="tl-time">${s.time}</div>
                </div>
            </li>
        `).join('');

        if (mapEl) {
            // Elegant SVG Map of Mexico City route (CEDA Iztapalapa -> Tianguis Doctores)
            mapEl.innerHTML = `
                <svg viewBox="0 0 340 170" preserveAspectRatio="none" style="width:100%;height:100%">
                    <defs>
                        <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stop-color="#7B1E3A"/>
                            <stop offset="100%" stop-color="#B98328"/>
                        </linearGradient>
                    </defs>
                    <!-- Base map background -->
                    <rect width="340" height="170" fill="#F4EFEA"/>
                    <!-- City blocks / streets -->
                    <path d="M0 40h340M0 85h340M0 130h340M50 0v170M120 0v170M200 0v170M270 0v170" stroke="#E6DED8" stroke-width="2"/>
                    <path d="M20 170 C90 120, 160 140, 240 70 S320 20, 340 10" stroke="#D8CDC6" stroke-width="5" fill="none"/>
                    <!-- Route -->
                    <path id="routePath" d="M30 115 Q90 110 130 85 T220 120 T300 45" fill="none" stroke="url(#routeGrad)" stroke-width="4" stroke-dasharray="6,4"/>
                    <!-- Origin CEDA -->
                    <circle cx="30" cy="115" r="14" fill="#7B1E3A"/>
                    <g transform="translate(23,108) scale(0.6)" fill="#fff" stroke="#fff" stroke-width="2">${ICONS.truck}</g>
                    <text x="30" y="142" font-size="9" font-weight="700" fill="#7B1E3A" text-anchor="middle">Central de Abasto</text>
                    <!-- Current truck position -->
                    <circle cx="175" cy="102" r="10" fill="#2A171D"/>
                    <circle cx="175" cy="102" r="14" fill="#2A171D" opacity="0.25">
                        <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <g transform="translate(169,96) scale(0.5)" fill="#fff" stroke="#fff" stroke-width="2">${ICONS.truck}</g>
                    <!-- Destination Tianguis -->
                    <circle cx="300" cy="45" r="14" fill="#7B1E3A"/>
                    <g transform="translate(293,38) scale(0.6)" fill="#fff">${ICONS.pin}</g>
                    <text x="290" y="70" font-size="9" font-weight="700" fill="#7B1E3A" text-anchor="middle">Tu tianguis</text>
                </svg>
            `;
        }
    }

    // -------------------------------------------------------------
    // SCREENS: MIS PEDIDOS / COLECTIVAS / PERFIL
    // -------------------------------------------------------------
    function renderOrdersList() {
        const el = document.getElementById('orders-list');
        if (!el) return;
        el.innerHTML = state.ordersHistory.map(o => `
            <li>
                <button class="order-card" data-order-detail="${o.id}">
                    <div class="order-top">
                        <strong class="order-id">${o.id}</strong>
                        <span class="status ${o.status === 'Entregado' ? 'ok' : ''}">${o.status}</span>
                    </div>
                    <div class="order-items">${o.itemsCount} productos · ${o.date}</div>
                    <div class="order-bottom">
                        <span>Total pagado:</span>
                        <strong>$${o.total.toLocaleString('es-MX')}</strong>
                    </div>
                </button>
            </li>
        `).join('');
    }

    function renderGroupsList() {
        const el = document.getElementById('groups-list');
        if (!el) return;
        el.innerHTML = GROUP_PURCHASES.map(g => {
            const isJoined = state.joinedGroups.includes(g.id);
            const current = g.current + (isJoined ? 1 : 0);
            const pct = Math.min(100, Math.round((current / g.goal) * 100));
            return `
                <li class="group">
                    <img src="${g.img}" alt="${g.name}" class="group-img">
                    <div>
                        <h4>${g.name}</h4>
                        <p>${g.tianguis}</p>
                        <p class="group-save">${g.save}</p>
                        <div class="bar"><span style="width:${pct}%"></span></div>
                    </div>
                    <div class="group-foot">
                        <span>${current} de ${g.goal} ${g.unit} reunidos (${pct}%)</span>
                        <button class="sup-btn ${isJoined ? 'joined' : ''}" data-join-group="${g.id}">
                            ${isJoined ? `${ICONS.check} Unido` : '+ Unirme al grupo'}
                        </button>
                    </div>
                </li>
            `;
        }).join('');
    }

    // -------------------------------------------------------------
    // BOTTOM SHEET & TOAST
    // -------------------------------------------------------------
    function openSheet(title, html) {
        const sheet = document.getElementById('sheet');
        const sheetTitle = document.getElementById('sheet-title');
        const sheetBody = document.getElementById('sheet-body');
        if (!sheet) return;
        sheetTitle.textContent = title;
        sheetBody.innerHTML = html;
        sheet.hidden = false;
    }

    function closeSheet() {
        const sheet = document.getElementById('sheet');
        if (sheet) sheet.hidden = true;
    }

    let toastTimer = null;
    function showToast(msg) {
        const t = document.getElementById('toast');
        if (!t) return;
        t.textContent = msg;
        t.classList.add('is-show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => t.classList.remove('is-show'), 2600);
    }

    function updateBadge() {
        const badge = document.getElementById('tile-badge');
        if (!badge) return;
        const count = state.order.length;
        badge.textContent = count;
        badge.hidden = count === 0;
    }

    // -------------------------------------------------------------
    // TIANGUIS SELECTOR & CDMX LOCATION LOGIC
    // -------------------------------------------------------------
    function getActiveTianguis() {
        return TIANGUIS_LIST.find(t => t.id === state.activeTianguis) || TIANGUIS_LIST[0];
    }

    function updateTianguisUI() {
        const active = getActiveTianguis();
        const lbl = document.getElementById('active-tianguis-label');
        if (lbl) {
            const shortAlcaldia = active.alcaldia.includes('Gustavo') ? 'GAM' : active.alcaldia;
            lbl.textContent = `${active.name} • ${shortAlcaldia}`;
        }
        const etaPlace = document.getElementById('eta-place');
        if (etaPlace) etaPlace.textContent = `en ${active.name}`;
        const etaTime = document.getElementById('eta-time');
        if (etaTime) etaTime.textContent = `Mañana, ${active.eta}`;

        // Update shipping fee
        if (active.flete) state.shippingFee = active.flete;
    }

    function openTianguisSelector() {
        const active = getActiveTianguis();
        const listHtml = TIANGUIS_LIST.map(t => {
            const isSel = t.id === active.id;
            return `
                <li style="margin-bottom:8px">
                    <button class="guide-card ${isSel ? 'tone-rosa' : 'tone-crema'}" data-pick-tianguis="${t.id}" style="border:1.5px solid ${isSel ? 'var(--vino)' : 'var(--linea)'};width:100%">
                        <span class="guide-num ${isSel ? '' : 'oro'}" style="font-size:0.8rem">${ICONS.pin}</span>
                        <div class="guide-txt" style="flex:1">
                            <strong style="font-size:0.95rem;color:${isSel ? 'var(--vino)' : 'var(--texto)'}">${t.name}</strong>
                            <span>Alcaldía ${t.alcaldia} · Flete compartido: <strong>$${t.flete}</strong> · ${t.puestos} puestos</span>
                        </div>
                        ${isSel ? `<span style="color:var(--verde);font-weight:800;font-size:1.1rem">✓</span>` : ''}
                    </button>
                </li>
            `;
        }).join('');

        openSheet('Selecciona tu Tianguis en CDMX', `
            <p class="note" style="margin-bottom:12px">Elige en qué tianguis recibes tu mercancía consolidada desde la Central de Abasto:</p>
            <ul style="max-height:360px;overflow-y:auto;padding-right:4px">
                ${listHtml}
            </ul>
        `);
    }

    function selectTianguis(tianguisId) {
        state.activeTianguis = tianguisId;
        const active = getActiveTianguis();
        state.shippingFee = active.flete;
        saveState();
        updateTianguisUI();
        closeSheet();
        showToast(`Tianguis asignado: ${active.name}`);
        if (currentScreen === 'seguimiento') renderTimeline();
        if (currentScreen === 'pedido') renderOrderReview();
    }

    // -------------------------------------------------------------
    // WHATSAPP / SMS RECEIPT SIMULATION
    // -------------------------------------------------------------
    function showWhatsAppSimulation() {
        const active = getActiveTianguis();
        const itemsList = state.order.map(i => `• ${i.name} (${i.desc}) - $${i.price.toLocaleString('es-MX')}`).join('\n');
        const subtotal = state.order.reduce((acc, i) => acc + i.price, 0);
        const total = subtotal + state.shippingFee;
        const folio = 'MD-' + Math.floor(1000 + Math.random() * 9000);
        const clave = 'CLAVE-' + Math.floor(10 + Math.random() * 90);

        const waText = 
`🧺 *MARCHANTE DIGITAL CDMX*
📋 *Comprobante de Pedido #${folio}*
📍 *Tianguis:* ${active.name} (${active.alcaldia})
⏰ *Hora de entrega:* Mañana, ${active.eta}
🚚 *Ruta:* CEDA Iztapalapa ➔ Camión 04

📦 *Productos pedidos:*
${itemsList}

🚚 *Flete compartido:* $${state.shippingFee} MXN
💵 *TOTAL A PAGAR:* $${total.toLocaleString('es-MX')} MXN
(Se paga en efectivo directo al chofer del camión)

🔑 *Tu clave de entrega:* *${clave}*
_Conserva este mensaje. No requiere conexión continua._`;

        openSheet('Comprobante WhatsApp / SMS', `
            <div style="text-align:left">
                <div class="wa-card-top" style="margin-bottom:8px">
                    <span class="wa-badge-ico">${ICONS.whatsapp}</span>
                    <div>
                        <strong>Mensaje enviado al 55 4910 2311</strong>
                        <small>Simulación oficial para demostración al jurado</small>
                    </div>
                </div>
                <div class="wa-bubble">${waText}<span class="wa-bubble-time">✓✓ Entregado • Ahora</span></div>
                <div class="stack" style="margin-top:14px">
                    <button class="btn btn-primary" data-copy-wa><span data-icon="check"></span>Copiar texto de confirmación</button>
                    <button class="btn btn-outline" id="btn-send-sms"><span data-icon="phone"></span>Simular envío por SMS de respaldo</button>
                </div>
            </div>
        `);
        renderIcons();

        setTimeout(() => {
            const copyBtn = document.querySelector('[data-copy-wa]');
            if (copyBtn) {
                copyBtn.onclick = () => {
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(waText).then(() => {
                            showToast('¡Texto copiado al portapapeles!');
                        }).catch(() => showToast('Copia lista para compartir'));
                    } else {
                        showToast('Copia lista para compartir');
                    }
                };
            }
            const smsBtn = document.getElementById('btn-send-sms');
            if (smsBtn) {
                smsBtn.onclick = () => {
                    closeSheet();
                    showToast('SMS enviado con éxito al comerciante (Simulación)');
                };
            }
        }, 50);
    }

    // -------------------------------------------------------------
    // EVENT DELEGATION
    // -------------------------------------------------------------
    function bindEvents() {
        document.addEventListener('click', (e) => {
            // Screen switches (data-go)
            const goBtn = e.target.closest('[data-go]');
            if (goBtn) {
                e.preventDefault();
                goTo(goBtn.getAttribute('data-go'));
                return;
            }

            // Back button
            if (e.target.closest('[data-back]')) {
                e.preventDefault();
                goBack();
                return;
            }

            // Tabbar navigation
            const tabBtn = e.target.closest('[data-tab]');
            if (tabBtn) {
                e.preventDefault();
                goTo(tabBtn.getAttribute('data-tab'));
                return;
            }

            // Mic toggle
            if (e.target.closest('#mic-btn')) {
                e.preventDefault();
                toggleMic();
                return;
            }

            // Voice examples
            const sayBtn = e.target.closest('[data-say]');
            if (sayBtn) {
                e.preventDefault();
                simulateVoiceInput(sayBtn.getAttribute('data-say'));
                return;
            }

            // Clear draft
            if (e.target.closest('#btn-clear-draft')) {
                e.preventDefault();
                voiceDraft = [];
                state.order = [];
                saveState();
                renderCapturedList();
                updateBadge();
                showToast('Borrador limpio');
                return;
            }

            // Cancel voice
            if (e.target.closest('#btn-cancel-voz')) {
                e.preventDefault();
                goBack();
                return;
            }

            // Help button
            if (e.target.closest('#btn-help')) {
                e.preventDefault();
                openSheet('¿Cómo pedir por voz?', `
                    <div class="sheet-tips">
                        <p><strong>Habla como en el tianguis:</strong> toca el botón del micrófono y di cuántas cajas, costales o kilos necesitas.</p>
                        <p><strong>Ejemplo:</strong> “3 cajas de jitomate y 2 costales de papa”.</p>
                        <p><strong>¿Siempre pides lo mismo?</strong> Solo di “Lo mismo que la semana pasada” y yo cargo tu lista anterior.</p>
                    </div>
                `);
                return;
            }

            // Order review: "Sí, está correcto" -> go to Precios & Proveedores
            if (e.target.closest('#btn-correcto')) {
                e.preventDefault();
                goTo('precios');
                return;
            }

            // Order review: "Quiero cambiar algo" -> toggle edit mode
            if (e.target.closest('#btn-cambiar')) {
                e.preventDefault();
                isEditingOrder = !isEditingOrder;
                renderOrderReview();
                return;
            }

            // Quantity adjusters in review
            const incBtn = e.target.closest('[data-qty-inc]');
            if (incBtn) {
                e.preventDefault();
                updateOrderQty(parseInt(incBtn.getAttribute('data-qty-inc'), 10), 1);
                return;
            }
            const decBtn = e.target.closest('[data-qty-dec]');
            if (decBtn) {
                e.preventDefault();
                updateOrderQty(parseInt(decBtn.getAttribute('data-qty-dec'), 10), -1);
                return;
            }
            const delBtn = e.target.closest('[data-qty-del]');
            if (delBtn) {
                e.preventDefault();
                removeOrderItem(parseInt(delBtn.getAttribute('data-qty-del'), 10));
                return;
            }

            // Category select in Precios
            const catBtn = e.target.closest('[data-cat]');
            if (catBtn) {
                e.preventDefault();
                state.activeCategory = catBtn.getAttribute('data-cat');
                saveState();
                renderPreciosView();
                return;
            }

            // Chip select in Precios
            const chipBtn = e.target.closest('[data-chip]');
            if (chipBtn) {
                e.preventDefault();
                state.activeProductChip = chipBtn.getAttribute('data-chip');
                saveState();
                renderPreciosView();
                return;
            }

            // Supplier select
            const pickSupBtn = e.target.closest('[data-pick-sup]');
            if (pickSupBtn) {
                e.preventDefault();
                selectSupplier(pickSupBtn.getAttribute('data-pick-sup'));
                return;
            }

            // Confirm order from Precios
            if (e.target.closest('#btn-confirmar')) {
                e.preventDefault();
                confirmOrder();
                return;
            }

            // Tracking details
            if (e.target.closest('#btn-detalles')) {
                e.preventDefault();
                const itemsHtml = state.order.map(i => `<li><span>${i.name} (${i.desc})</span><strong>$${i.price.toLocaleString('es-MX')}</strong></li>`).join('');
                const total = state.order.reduce((acc, i) => acc + i.price, 0) + state.shippingFee;
                openSheet('Detalles del pedido', `
                    <ul class="sheet-list">
                        <li><span>Pedido</span><strong>TC-2401</strong></li>
                        <li><span>Destino</span><strong>Tianguis de los martes, Col. Doctores</strong></li>
                        <li><span>Llegada estimada</span><strong>Mañana, 5:00 a. m.</strong></li>
                        <li><span>Transportista</span><strong>Ruta Central - Camión 04</strong></li>
                        <li><span>Forma de pago</span><strong>Efectivo al recibir</strong></li>
                        ${itemsHtml}
                        <li><span>Transporte compartido</span><strong>$${state.shippingFee}</strong></li>
                        <li><span>Total a pagar</span><strong style="color:var(--vino);font-size:1.15rem">$${total.toLocaleString('es-MX')}</strong></li>
                    </ul>
                `);
                return;
            }

            // Order detail from Mis Pedidos
            const orderCard = e.target.closest('[data-order-detail]');
            if (orderCard) {
                e.preventDefault();
                goTo('seguimiento');
                return;
            }

            // Join group purchase
            const joinBtn = e.target.closest('[data-join-group]');
            if (joinBtn) {
                e.preventDefault();
                const gid = joinBtn.getAttribute('data-join-group');
                const idx = state.joinedGroups.indexOf(gid);
                if (idx > -1) {
                    state.joinedGroups.splice(idx, 1);
                    showToast('Saliste del grupo');
                } else {
                    state.joinedGroups.push(gid);
                    showToast('¡Te uniste al grupo! Te avisaremos cuando se complete el pedido.');
                }
                saveState();
                renderGroupsList();
                return;
            }

            // Tianguis selector open
            if (e.target.closest('#btn-select-tianguis')) {
                e.preventDefault();
                openTianguisSelector();
                return;
            }

            // Tianguis pick
            const pickTianguisBtn = e.target.closest('[data-pick-tianguis]');
            if (pickTianguisBtn) {
                e.preventDefault();
                selectTianguis(pickTianguisBtn.getAttribute('data-pick-tianguis'));
                return;
            }

            // WhatsApp simulation triggers
            if (e.target.closest('#btn-open-wa') || e.target.closest('#btn-share-wa')) {
                e.preventDefault();
                showWhatsAppSimulation();
                return;
            }

            // Reset demo
            if (e.target.closest('#btn-reset')) {
                e.preventDefault();
                try { localStorage.removeItem(STORAGE_KEY); } catch (err) { /* ignore */ }
                state = loadState();
                updateBadge();
                updateTianguisUI();
                showToast('Datos de demostración restablecidos');
                goTo('inicio');
                return;
            }

            // Close sheet
            if (e.target.closest('[data-close-sheet]')) {
                e.preventDefault();
                closeSheet();
                return;
            }
        });

        // Type input form
        const typeForm = document.getElementById('type-form');
        const typeInput = document.getElementById('type-input');
        if (typeForm && typeInput) {
            typeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const val = typeInput.value.trim();
                if (!val) return;
                simulateVoiceInput(val);
                typeInput.value = '';
            });
        }
    }

    // -------------------------------------------------------------
    // INIT
    // -------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', () => {
        renderIcons();
        renderTicker();
        initSpeech();
        bindEvents();
        updateBadge();
        updateTianguisUI();
        goTo('inicio', false);
    });

})();

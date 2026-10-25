// Initial Seed Data for Mercado Urbano (Locatarios & Clientes)

const INITIAL_STORES = [
    {
        id: "loc-1",
        name: "Café & Tostador de Altura",
        slug: "cafe-altura",
        tagline: "Café de especialidad de origen chiapaneco y veracruzano",
        localNumber: "Local 22 - Nave Gourmet",
        category: "gourmet",
        rating: 4.9,
        reviewsCount: 184,
        establishedYear: 2018,
        phone: "+52 55 4912 8830",
        schedule: "Lun - Sáb: 08:00 - 20:00 | Dom: 09:00 - 18:00",
        avatar: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80",
        banner: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80",
        description: "Tostadores artesanales dedicados a la selección directa de granos con productores de Chiapas y Veracruz. Ofrecemos molienda personalizada y accesorios para baristas.",
        verified: true,
        badges: ["Tostado Semanal", "Comercio Justo", "Local Verificado"]
    },
    {
        id: "loc-2",
        name: "Taller Piel & Calzado Condesa",
        slug: "piel-calzado-condesa",
        tagline: "Marroquinería y calzado confeccionado a mano en piel genuina",
        localNumber: "Local 104 - Pasillo de Moda & Peletería",
        category: "moda",
        rating: 4.8,
        reviewsCount: 142,
        establishedYear: 2015,
        phone: "+52 55 6720 1144",
        schedule: "Lun - Dom: 10:00 - 20:30",
        avatar: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&q=80",
        banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
        description: "Maestros zapateros y marroquineros. Diseños atemporales en piel de curtido vegetal con costuras reforzadas para durabilidad de por vida.",
        verified: true,
        badges: ["Hecho a Mano", "Garantía 1 Año", "Local Verificado"]
    },
    {
        id: "loc-3",
        name: "Platería & Autor Taxco 925",
        slug: "plateria-taxco-925",
        tagline: "Joyería contemporánea en plata ley 925 y minerales naturales",
        localNumber: "Local 15 - Galería de Joyeros",
        category: "joyeria",
        rating: 5.0,
        reviewsCount: 96,
        establishedYear: 2012,
        phone: "+52 55 8390 2201",
        schedule: "Mar - Dom: 11:00 - 19:30",
        avatar: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80",
        banner: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
        description: "Taller familiar con raíces en Taxco. Joyería de autor con certificación de autenticidad en cada pieza.",
        verified: true,
        badges: ["Plata Ley 925", "Certificado Autenticidad", "Local Verificado"]
    },
    {
        id: "loc-4",
        name: "AudioLab & Gadgets Pro",
        slug: "audiolab-gadgets",
        tagline: "Accesorios de audio Hi-Fi, tecnología de escritorio y periféricos",
        localNumber: "Local 88 - Pasillo Tecnológico",
        category: "tecnologia",
        rating: 4.7,
        reviewsCount: 230,
        establishedYear: 2020,
        phone: "+52 55 3110 9988",
        schedule: "Lun - Sáb: 10:00 - 21:00",
        avatar: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
        banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
        description: "Especialistas en gadgets y periféricos para creadores de contenido, audiofilos y profesionales de oficina.",
        verified: true,
        badges: ["Entrega Exprés", "Soporte Técnico", "Local Verificado"]
    },
    {
        id: "loc-5",
        name: "Alacena Selecta & Especias",
        slug: "alacena-selecta",
        tagline: "Especias del mundo, mieles crudas y aceites de oliva extra virgen",
        localNumber: "Local 07 - Mercado Gastronómico",
        category: "gourmet",
        rating: 4.9,
        reviewsCount: 165,
        establishedYear: 2017,
        phone: "+52 55 7820 4412",
        schedule: "Mié - Lun: 08:30 - 18:30",
        avatar: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=300&q=80",
        banner: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1200&q=80",
        description: "Selección curada de sales ahumadas, aceites monovarietales prensados en frío y mezclas botánicas exclusivas.",
        verified: true,
        badges: ["100% Orgánico", "Directo del Productor"]
    },
    {
        id: "loc-6",
        name: "Estudio Cerámica & Barro Negro",
        slug: "ceramica-barro-negro",
        tagline: "Vajillas artesanales, piezas de barro negro y objetos de diseño interior",
        localNumber: "Local 42 - Pasillo de Artesanías y Hogar",
        category: "hogar",
        rating: 4.9,
        reviewsCount: 110,
        establishedYear: 2019,
        phone: "+52 55 9012 3381",
        schedule: "Lun - Dom: 10:30 - 19:30",
        avatar: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=300&q=80",
        banner: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80",
        description: "Piezas utilitarias y escultóricas modeladas a torno y horneadas a alta temperatura con esmaltes seguros para alimentos.",
        verified: true,
        badges: ["Edición Limitada", "Apto Microondas"]
    }
];

const INITIAL_CATEGORIES = [
    { id: "all", name: "Todos los Productos", count: 18 },
    { id: "gourmet", name: "Gourmet & Café", count: 6 },
    { id: "moda", name: "Moda & Calzado", count: 4 },
    { id: "joyeria", name: "Joyería & Plata", count: 3 },
    { id: "tecnologia", name: "Tecnología & Audio", count: 3 },
    { id: "hogar", name: "Hogar & Cerámica", count: 2 }
];

const INITIAL_PRODUCTS = [
    {
        id: "prod-101",
        storeId: "loc-1",
        name: "Café Geisha Especialidad 500g (Grano o Molido)",
        category: "gourmet",
        price: 385,
        originalPrice: 440,
        rating: 4.9,
        reviewsCount: 52,
        stock: 24,
        sku: "CAF-GEI-500",
        image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
        ],
        badge: "Más Vendido",
        description: "Varietal Geisha cultivado a 1,650 msnm en la Sierra Madre de Chiapas. Notas florales a jazmín, bergamota, durazno maduro y acidez cítrica brillante. Tostado bajo perfil para resaltar sus atributos aromáticos.",
        specs: [
            { label: "Origen", value: "Tapachula, Chiapas" },
            { label: "Altura", value: "1,650 msnm" },
            { label: "Proceso", value: "Lavado tradicional" },
            { label: "Tueste", value: "Medio claro" }
        ],
        featured: true,
        active: true
    },
    {
        id: "prod-102",
        storeId: "loc-1",
        name: "Prensa Francesa Acero Inoxidable Doble Pared 800ml",
        category: "gourmet",
        price: 520,
        originalPrice: 600,
        rating: 4.8,
        reviewsCount: 39,
        stock: 15,
        sku: "ACC-PRE-800",
        image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80"
        ],
        badge: "Garantía Local",
        description: "Cafetera de émbolo de alta durabilidad construida en acero inoxidable 304 con aislamiento térmico que mantiene el café caliente hasta por 2 horas sin riesgo de quiebre.",
        specs: [
            { label: "Capacidad", value: "800 ml (aprox. 4 tazas)" },
            { label: "Material", value: "Acero Inoxidable Grado Alimenticio" },
            { label: "Filtro", value: "Malla ultra fina de 3 capas" }
        ],
        featured: true,
        active: true
    },
    {
        id: "prod-103",
        storeId: "loc-2",
        name: "Portafolio Ejecutivo Piel Genuina Curtido Vegetal",
        category: "moda",
        price: 2450,
        originalPrice: 2890,
        rating: 5.0,
        reviewsCount: 44,
        stock: 8,
        sku: "MOD-MAL-01",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
        ],
        badge: "Artesanal",
        description: "Confeccionado íntegramente con piel de res mexicana de curtido vegetal que envejece con una pátina distinguida. Compartimento acolchado para laptops de hasta 15.6 pulgadas y herrajes de latón macizo.",
        specs: [
            { label: "Material", value: "Piel Vacuna 100% Genuina" },
            { label: "Capacidad", value: "Laptop 15.6\" + Documentos" },
            { label: "Correa", value: "Ajustable y desmontable" },
            { label: "Color", value: "Café Coñac" }
        ],
        featured: true,
        active: true
    },
    {
        id: "prod-104",
        storeId: "loc-2",
        name: "Botín Chelsea Cuero Vacuno Suela Vibran",
        category: "moda",
        price: 1890,
        originalPrice: 2150,
        rating: 4.8,
        reviewsCount: 68,
        stock: 12,
        sku: "CAL-BOT-CHL",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
        ],
        badge: "Envío Gratis",
        description: "Botas estilo Chelsea con elásticos laterales y tirador posterior. Suela antiderrapante con amortiguación ligera para caminatas prolongadas en la ciudad.",
        specs: [
            { label: "Tallas Disponibles", value: "25 al 29.5 MX" },
            { label: "Construcción", value: "Cosido Goodyear Welt artesanal" },
            { label: "Color", value: "Negro Mate" }
        ],
        featured: true,
        active: true
    },
    {
        id: "prod-105",
        storeId: "loc-3",
        name: "Anillo Geométrico Plata Ley .925 con Obsidiana Dorada",
        category: "joyeria",
        price: 890,
        originalPrice: 1050,
        rating: 4.9,
        reviewsCount: 31,
        stock: 10,
        sku: "JOY-ANI-OBS",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"
        ],
        badge: "Pieza Única",
        description: "Diseño minimalista fundido en plata fina .925 montado con cabujón de obsidiana dorada de Teotihuacán pulida a mano con reflejos tornasolados.",
        specs: [
            { label: "Metal", value: "Plata Ley .925 Certificada" },
            { label: "Piedra", value: "Obsidiana volcánica dorada" },
            { label: "Acabado", value: "Pulido espejo y cepillado suave" }
        ],
        featured: true,
        active: true
    },
    {
        id: "prod-106",
        storeId: "loc-3",
        name: "Cadena Eslabón Cubano Plata Maciza .925 55cm",
        category: "joyeria",
        price: 1420,
        originalPrice: 1650,
        rating: 5.0,
        reviewsCount: 57,
        stock: 14,
        sku: "JOY-CAD-CUB",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
        ],
        badge: "Más Vendido",
        description: "Cadena de eslabones compactos pulidos a corte diamante para máxima refracción luminosa. Broche de caja con doble traba de seguridad.",
        specs: [
            { label: "Largo", value: "55 cm" },
            { label: "Grosor", value: "4.5 mm" },
            { label: "Peso", value: "28 gramos aprox." }
        ],
        featured: false,
        active: true
    },
    {
        id: "prod-107",
        storeId: "loc-4",
        name: "Auriculares Studio Monitor Hi-Res Bluetooth 5.3",
        category: "tecnologia",
        price: 1980,
        originalPrice: 2400,
        rating: 4.8,
        reviewsCount: 118,
        stock: 19,
        sku: "TEC-AUD-HIFI",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
        ],
        badge: "Envío Exprés",
        description: "Controladores de neodimio de 40mm ajustados para curva de respuesta plana de estudio. Cancelación pasiva superior, almohadillas viscoelásticas y autonomía de 45 horas.",
        specs: [
            { label: "Conectividad", value: "Bluetooth 5.3 + Cable Jack 3.5mm" },
            { label: "Batería", value: "45 horas de reproducción continua" },
            { label: "Códecs", value: "AAC, aptX HD, SBC" }
        ],
        featured: true,
        active: true
    },
    {
        id: "prod-108",
        storeId: "loc-4",
        name: "Base de Carga Rápida 3 en 1 MagSafe de Aluminio",
        category: "tecnologia",
        price: 760,
        originalPrice: 890,
        rating: 4.7,
        reviewsCount: 82,
        stock: 22,
        sku: "TEC-MAG-3IN1",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
        ],
        badge: "Stock Disponible",
        description: "Estación de escritorio fabricada en aleación de aluminio aeroespacial mecanizado CNC. Carga simultánea y segura para smartphone, smartwatch y auriculares inalámbricos.",
        specs: [
            { label: "Potencia Total", value: "25W con protección térmica" },
            { label: "Material", value: "Aluminio anodizado cepillado" },
            { label: "Conector", value: "USB Tipo C PD" }
        ],
        featured: false,
        active: true
    },
    {
        id: "prod-109",
        storeId: "loc-5",
        name: "Caja Degustación 4 Sales Gourmet Ahumadas con Leña de Manzano",
        category: "gourmet",
        price: 340,
        originalPrice: 390,
        rating: 4.9,
        reviewsCount: 77,
        stock: 30,
        sku: "ALM-SAL-4PK",
        image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=800&q=80"
        ],
        badge: "Gourmet",
        description: "Set de cuatro frascos herméticos con sal de manantial de Colima ahumada pacientemente durante 72 horas. Incluye sal negra, chile de árbol seco, romero silvestre y ajo tostado.",
        specs: [
            { label: "Contenido", value: "4 frascos de 90g c/u" },
            { label: "Ahumado", value: "Leña de manzano y mezquite" },
            { label: "Conservadores", value: "100% Libre de químicos" }
        ],
        featured: true,
        active: true
    },
    {
        id: "prod-110",
        storeId: "loc-5",
        name: "Aceite de Oliva Extra Virgen Monovarietal Arbequina 500ml",
        category: "gourmet",
        price: 295,
        originalPrice: 330,
        rating: 4.9,
        reviewsCount: 63,
        stock: 25,
        sku: "ALM-ACE-500",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
        ],
        badge: "Cosecha Temprana",
        description: "Prensado en frío a menos de 24°C dentro de las 6 horas posteriores a la cosecha en Valle de Guadalupe. Acidez menor a 0.2% con notas de almendra verde y tomate recién cortado.",
        specs: [
            { label: "Volumen", value: "500 ml botella oscura UV" },
            { label: "Acidez", value: "< 0.2%" },
            { label: "Origen", value: "Valle de Guadalupe, BC" }
        ],
        featured: false,
        active: true
    },
    {
        id: "prod-111",
        storeId: "loc-6",
        name: "Juego de 4 Tazas Cerámica de Alta Temperatura Hechas a Mano",
        category: "hogar",
        price: 680,
        originalPrice: 790,
        rating: 4.9,
        reviewsCount: 48,
        stock: 11,
        sku: "HOG-TAZ-4ST",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
        ],
        badge: "Edición Limitada",
        description: "Tazas de 320ml moldeadas a mano en torno por artesanos locales. Horneadas a 1280°C con esmaltes reactivos únicos que hacen que ninguna pieza sea idéntica a otra.",
        specs: [
            { label: "Capacidad", value: "320 ml c/u" },
            { label: "Uso", value: "Apto para lavavajillas y microondas" },
            { label: "Acabado", value: "Gres esmaltado mate táctil" }
        ],
        featured: true,
        active: true
    },
    {
        id: "prod-112",
        storeId: "loc-6",
        name: "Florero Minimalista de Barro Negro Calado Oaxaqueño",
        category: "hogar",
        price: 920,
        originalPrice: 1100,
        rating: 5.0,
        reviewsCount: 29,
        stock: 7,
        sku: "HOG-FLO-BAR",
        image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80"
        ],
        badge: "Tradición Viva",
        description: "Pieza ornamental esculpida en San Bartolo Coyotepec utilizando el proceso tradicional de pulido con cuarzo antes de la quema en fosa subterránea que otorga su brillo metálico natural.",
        specs: [
            { label: "Dimensiones", value: "28 cm altura x 14 cm diámetro" },
            { label: "Técnica", value: "Bruñido con piedra de cuarzo" },
            { label: "Origen", value: "San Bartolo Coyotepec, Oaxaca" }
        ],
        featured: false,
        active: true
    }
];

const INITIAL_ORDERS = [
    {
        id: "ORD-94021",
        date: "2026-10-24 16:42",
        clientName: "Valeria Mendoza",
        clientEmail: "valeria.m@example.com",
        clientPhone: "+52 55 9812 4433",
        deliveryType: "pickup", // 'pickup' en local o 'shipping' a domicilio
        pickupStore: "Café & Tostador de Altura (Local 22)",
        shippingAddress: "Pasillo Central, Local 22 - Recoger a las 18:00 hrs",
        paymentMethod: "Tarjeta de Crédito / Débito (En línea)",
        status: "listo", // 'pendiente', 'preparacion', 'listo', 'entregado'
        items: [
            {
                productId: "prod-101",
                name: "Café Geisha Especialidad 500g (Grano o Molido)",
                storeName: "Café & Tostador de Altura",
                storeId: "loc-1",
                price: 385,
                quantity: 2
            }
        ],
        subtotal: 770,
        deliveryFee: 0,
        total: 770
    },
    {
        id: "ORD-93882",
        date: "2026-10-23 11:15",
        clientName: "Rodrigo Morales",
        clientEmail: "r.morales@example.com",
        clientPhone: "+52 55 1204 7761",
        deliveryType: "shipping",
        shippingAddress: "Av. Insurgentes Sur 1450, Piso 8, Del Valle, CDMX",
        paymentMethod: "Transferencia SPEI",
        status: "entregado",
        items: [
            {
                productId: "prod-103",
                name: "Portafolio Ejecutivo Piel Genuina Curtido Vegetal",
                storeName: "Taller Piel & Calzado Condesa",
                storeId: "loc-2",
                price: 2450,
                quantity: 1
            }
        ],
        subtotal: 2450,
        deliveryFee: 120,
        total: 2570
    }
];

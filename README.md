# MERCADO URBANO

> Plataforma web de comercio electrónico que conecta directamente a locatarios de mercados y plazas comerciales con clientes compradores.

[![Licencia](https://img.shields.io/badge/Licencia-MIT-amber.svg)](#licencia)
[![Estado](https://img.shields.io/badge/Estado-Producci%C3%B3n-emerald.svg)](#)
[![Estilo](https://img.shields.io/badge/Dise%C3%B1o-100%25%20Vector%20SVG-blue.svg)](#)
[![Mobile](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-purple.svg)](#)

---

## Características Principales

### Para Compradores
- **Catálogo de Productos**: Exploración por categorías (*Gourmet & Café, Moda & Calzado, Joyería & Plata, Tecnología & Audio, Hogar & Cerámica*).
- **Búsqueda Instantánea & Filtros**: Búsqueda en tiempo real por término, número de local o descripción con selector de ordenación por precio o calificación.
- **Ficha Técnica & Vista Previa**: Galería fotográfica interactiva, especificaciones de manufactura y stock disponible.
- **Cajón de Carrito Deslizable**: Control dinámico de cantidades, subtotales y cálculo automático.
- **Checkout Flexible**:
  - Modalidad de entrega: **Recoger en Mostrador (Gratis)** o **Envío Local a Domicilio ($65 MXN)**.
  - Métodos de pago: Tarjeta de crédito/débito, Transferencia SPEI y Efectivo contra entrega.
- **Seguimiento de Pedidos**: Historial de órdenes con etiquetas de estado en tiempo real.
- **Lista de Deseos**: Guardado de artículos favoritos con un clic.
- **Atención Directa**: Chat en vivo con los locatarios para resolver dudas sobre existencias o entregas.

### Para Locatarios (Dueños de Local)
- **Modo Locatario / Comprador**: Alternador de rol rápido en el encabezado y navegación móvil.
- **Panel de Control Analítico**: Resumen de ventas acumuladas, pedidos activos, artículos en catálogo y reputación.
- **Gestor de Inventario**: Publicación de nuevos productos, edición, pausado/activación y eliminación.
- **Gestión de Pedidos Recibidos**: Actualización de estatus de pedidos (*Pendiente*, *En Preparación*, *Listo para Retiro*, *Entregado*).
- **Perfil Comercial del Local**: Edición de número de local, teléfono/WhatsApp, horarios y descripción del establecimiento.

---

## Diseño & Estética
- **Cero Emojis**: 100% iconografía vectorial SVG (estilo Feather/Lucide).
- **Tema Ejecutivo Oscuro**: Paleta slate obsidian con acentos en oro cálido (`#F59E0B`), esmeralda verificado (`#10B981`) y superficies con desenfoque de cristal.
- **Diseño Mobile-First**: Barra inferior de navegación dedicada en smartphones, accesos rápidos y layouts fluidos en cuadrícula adaptativa.

---

## Estructura de Archivos

```
├── index.html          # Interfaz principal, modales y navegación accesible
├── css/
│   └── styles.css      # Sistema de diseño, variables y responsividad
├── js/
│   ├── icons.js        # Diccionario de iconos vectoriales SVG
│   ├── data.js         # Datos semilla iniciales (locales, productos, categorías)
│   ├── store.js        # Gestor de estado con persistencia en localStorage
│   └── app.js          # Lógica interactiva de compras, pedidos y panel
└── README.md           # Documentación del proyecto
```

---

## Ejecución Local

No requiere dependencias externas ni compiladores. Puedes ejecutarlo con cualquier servidor HTTP local:

```bash
# Con Python
python -m http.server 8090

# Con Node / npx
npx serve .
```

O abrir directamente el archivo `index.html` en cualquier navegador web moderno.

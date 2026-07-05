# Directorio comercial 5 Continentes

Adaptación en React de la plantilla Drophut para un directorio multi-tienda. No incluye carrito, precios, checkout ni pasarela de pago: cada producto funciona como una ficha informativa y dirige al WhatsApp del establecimiento.

## Ejecutar

```bash
npm install
npm run dev
```

Compilación de producción:

```bash
npm run build
```

## Flujos incluidos

- Portada del centro comercial.
- Búsqueda por producto, tienda o categoría.
- Directorio de establecimientos.
- Perfil público de cada negocio con pabellón, tienda y horario.
- Ficha informativa del producto sin precio.
- Contacto por WhatsApp con mensaje contextual.
- Panel responsive para el encargado del establecimiento.
- Formulario de personalización del negocio.
- Administración visual de productos.

## Estructura

- `src/App.jsx`: páginas, rutas y componentes del MVP.
- `src/data.js`: datos de demostración y construcción de enlaces de WhatsApp.
- `src/styles.css`: sistema visual responsive.
- `assets/`: recursos heredados de la plantilla original.

## Para operar con 600 tiendas

La interfaz ya está separada por entidades de tienda y producto, pero los datos actuales son demostrativos. Antes de producción debe conectarse a un backend:

- Autenticación y roles: administrador general y encargado de establecimiento.
- Base de datos: centros comerciales, tiendas, usuarios, categorías, productos e imágenes.
- API paginada con búsqueda del lado del servidor.
- Almacenamiento de imágenes en un servicio de objetos/CDN.
- Moderación y estados de publicación.
- Métricas de visitas y clics en WhatsApp.

Una base adecuada puede ser PostgreSQL con una API Node/NestJS, o Supabase si se busca salir más rápido. La aplicación React consumiría esa API sin cambiar el modelo de navegación actual.

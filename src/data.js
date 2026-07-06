import earbudsImage from '../assets/img/catalog/audifonos-pro.jpg';
import lampImage from '../assets/img/catalog/lampara-nordica.jpg';
import backpackImage from '../assets/img/catalog/mochila-city.jpg';
import organizerImage from '../assets/img/catalog/organizador-modular.jpg';
import skincareImage from '../assets/img/catalog/set-cuidado-facial.jpg';
import smartwatchImage from '../assets/img/catalog/smartwatch-fit.jpg';
import sneakersImage from '../assets/img/catalog/zapatillas-urban.jpg';

export const categories = [
  { id: 'tecnologia', name: 'Tecnología', icon: 'Laptop', color: '#e8f3ff' },
  { id: 'moda', name: 'Moda', icon: 'Shirt', color: '#fff0eb' },
  { id: 'hogar', name: 'Hogar', icon: 'Armchair', color: '#eef9ef' },
  { id: 'belleza', name: 'Belleza', icon: 'Sparkles', color: '#fff1f6' },
  { id: 'deportes', name: 'Deportes', icon: 'Dumbbell', color: '#fff7e6' },
  { id: 'accesorios', name: 'Accesorios', icon: 'Watch', color: '#f2efff' },
];

export const stores = [
  {
    id: 'tech-zone',
    name: 'Tech Zone Perú',
    category: 'Tecnología',
    location: 'Pabellón A · Tienda 114',
    floor: 'Primer piso',
    phone: '51987654321',
    schedule: 'Lun. a dom. · 10:00 a. m. – 8:00 p. m.',
    description: 'Tecnología, accesorios y soluciones para tu día a día.',
    initials: 'TZ',
    color: '#1769e0',
    verified: true,
  },
  {
    id: 'urban-style',
    name: 'Urban Style',
    category: 'Moda',
    location: 'Pabellón B · Tienda 208',
    floor: 'Segundo piso',
    phone: '51976543210',
    schedule: 'Lun. a sáb. · 10:00 a. m. – 8:00 p. m.',
    description: 'Moda urbana, zapatillas y prendas para todos los estilos.',
    initials: 'US',
    color: '#e4572e',
    verified: true,
  },
  {
    id: 'casa-viva',
    name: 'Casa Viva',
    category: 'Hogar',
    location: 'Pabellón C · Tienda 032',
    floor: 'Primer piso',
    phone: '51965432109',
    schedule: 'Lun. a dom. · 9:30 a. m. – 7:30 p. m.',
    description: 'Detalles prácticos y modernos para transformar tus espacios.',
    initials: 'CV',
    color: '#2e8b57',
    verified: true,
  },
  {
    id: 'bella-lima',
    name: 'Bella Lima',
    category: 'Belleza',
    location: 'Pabellón D · Tienda 401',
    floor: 'Cuarto piso',
    phone: '51954321098',
    schedule: 'Lun. a sáb. · 10:00 a. m. – 7:00 p. m.',
    description: 'Cuidado personal, maquillaje y belleza para cada ocasión.',
    initials: 'BL',
    color: '#d6487e',
    verified: false,
  },
  {
    id: 'distrito-5',
    name: 'Distrito 5',
    category: 'Moda',
    location: 'Pabellón B · Tienda 214',
    floor: 'Segundo piso',
    phone: '51943210987',
    schedule: 'Lun. a dom. · 10:00 a. m. – 8:00 p. m.',
    description: 'Zapatillas urbanas y modelos exclusivos para todos los días.',
    initials: 'D5',
    color: '#166b91',
    verified: true,
  },
  {
    id: 'paso-firme',
    name: 'Paso Firme',
    category: 'Moda',
    location: 'Pabellón C · Tienda 307',
    floor: 'Primer piso',
    phone: '51932109876',
    schedule: 'Lun. a sáb. · 10:00 a. m. – 7:30 p. m.',
    description: 'Calzado cómodo, urbano y casual con atención personalizada.',
    initials: 'PF',
    color: '#9a6a19',
    verified: true,
  },
];

export const products = [
  {
    id: 'audifonos-pro',
    storeId: 'tech-zone',
    name: 'Audífonos inalámbricos Pro',
    category: 'Tecnología',
    image: earbudsImage,
    summary: 'Sonido envolvente, conexión Bluetooth y estuche de carga compacto.',
    details: ['Bluetooth 5.3', 'Micrófono integrado', 'Hasta 24 horas con el estuche'],
    featured: true,
  },
  {
    id: 'smartwatch-fit',
    storeId: 'tech-zone',
    name: 'Smartwatch Fit X2',
    category: 'Tecnología',
    image: smartwatchImage,
    summary: 'Monitorea tu actividad y recibe notificaciones desde tu muñeca.',
    details: ['Pantalla táctil', 'Monitor de actividad', 'Resistencia al agua'],
    featured: true,
  },
  {
    id: 'zapatillas-urban',
    storeId: 'urban-style',
    name: 'Zapatillas Urban Classic',
    category: 'Moda',
    image: sneakersImage,
    summary: 'Diseño urbano cómodo para acompañarte todos los días.',
    details: ['Suela antideslizante', 'Material respirable', 'Diversas tallas'],
    featured: true,
  },
  {
    id: 'mochila-city',
    storeId: 'urban-style',
    name: 'Mochila City',
    category: 'Accesorios',
    image: backpackImage,
    summary: 'Espaciosa, resistente y diseñada para el ritmo de la ciudad.',
    details: ['Compartimento para laptop', 'Tela impermeable', 'Correas acolchadas'],
    featured: false,
  },
  {
    id: 'lampara-nordica',
    storeId: 'casa-viva',
    name: 'Lámpara Nórdica',
    category: 'Hogar',
    image: lampImage,
    summary: 'Iluminación cálida con un diseño limpio para tu hogar u oficina.',
    details: ['Luz cálida', 'Bajo consumo', 'Base antideslizante'],
    featured: true,
  },
  {
    id: 'organizador-modular',
    storeId: 'casa-viva',
    name: 'Organizador modular',
    category: 'Hogar',
    image: organizerImage,
    summary: 'Organiza tus ambientes con módulos fáciles de combinar.',
    details: ['Armado sencillo', 'Material resistente', 'Diseño modular'],
    featured: false,
  },
  {
    id: 'set-cuidado',
    storeId: 'bella-lima',
    name: 'Set de cuidado facial',
    category: 'Belleza',
    image: skincareImage,
    summary: 'Rutina práctica para limpiar, hidratar y proteger tu piel.',
    details: ['Uso diario', 'Tres pasos', 'Para todo tipo de piel'],
    featured: true,
  },
];

export function getStore(storeId) {
  return stores.find((store) => store.id === storeId);
}

export function whatsappUrl(phone, productName, storeName) {
  const message = `Hola, vi ${productName} de ${storeName} en el directorio de 5 Continentes. ¿Podrían darme más información?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

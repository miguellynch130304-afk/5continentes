import beautyPhoto from '../../../assets/img/tour/tour-bella-lima.jpg';
import homePhoto from '../../../assets/img/tour/tour-casa-viva.jpg';
import techPhoto from '../../../assets/img/tour/tour-tech-zone.jpg';
import fashionPhoto from '../../../assets/img/tour/tour-urban-style.jpg';

export const tourStops = [
  {
    id: 'tech-zone',
    image: techPhoto,
    aisle: 'Pasillo A',
    local: 'A-114',
    title: 'Tech Zone Perú',
    category: 'Tecnología',
    updatedAt: 'Hoy · 10:18 a. m.',
    freshness: 'Foto del día',
    caption: 'Llegaron audífonos, cargadores, cases y accesorios para celulares.',
    mood: 'Mucho accesorio visible en vitrina',
    highlights: ['Audífonos y parlantes', 'Cases para celulares', 'Cargadores y cables', 'Vitrina atendida'],
    hotSpots: [
      { label: 'Audífonos', x: 36, y: 28 },
      { label: 'Cases', x: 22, y: 50 },
      { label: 'Vitrina', x: 45, y: 68 },
    ],
  },
  {
    id: 'urban-style',
    image: fashionPhoto,
    aisle: 'Pasillo B',
    local: 'B-208',
    title: 'Urban Style',
    category: 'Moda',
    updatedAt: 'Hoy · 11:05 a. m.',
    freshness: 'Nueva vitrina',
    caption: 'Zapatillas, polos, casacas y mochilas urbanas en exhibición.',
    mood: 'Pared completa de zapatillas',
    highlights: ['Zapatillas urbanas', 'Polos y casacas', 'Gorras', 'Mochilas'],
    hotSpots: [
      { label: 'Zapatillas', x: 33, y: 34 },
      { label: 'Polos', x: 53, y: 47 },
      { label: 'Gorras', x: 57, y: 22 },
    ],
  },
  {
    id: 'casa-viva',
    image: homePhoto,
    aisle: 'Pasillo C',
    local: 'C-032',
    title: 'Casa Viva',
    category: 'Hogar',
    updatedAt: 'Hoy · 9:42 a. m.',
    freshness: 'Ambiente actualizado',
    caption: 'Lámparas, organizadores, textiles y detalles prácticos para casa.',
    mood: 'Tienda abierta con productos de hogar al frente',
    highlights: ['Lámparas', 'Organizadores', 'Textiles', 'Decoración compacta'],
    hotSpots: [
      { label: 'Lámparas', x: 16, y: 30 },
      { label: 'Organizadores', x: 47, y: 71 },
      { label: 'Textiles', x: 20, y: 59 },
    ],
  },
  {
    id: 'bella-lima',
    image: beautyPhoto,
    aisle: 'Pasillo D',
    local: 'D-401',
    title: 'Bella Lima',
    category: 'Belleza',
    updatedAt: 'Hoy · 12:12 p. m.',
    freshness: 'Mostrador del día',
    caption: 'Maquillaje, cuidado facial, perfumes y productos de belleza.',
    mood: 'Mostrador iluminado y tienda atendida',
    highlights: ['Maquillaje', 'Skincare', 'Perfumes', 'Mostrador iluminado'],
    hotSpots: [
      { label: 'Maquillaje', x: 43, y: 58 },
      { label: 'Skincare', x: 20, y: 45 },
      { label: 'Espejo', x: 54, y: 31 },
    ],
  },
];

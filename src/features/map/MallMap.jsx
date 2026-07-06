import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  CircleDot,
  Coffee,
  DoorOpen,
  Info,
  LocateFixed,
  MapPin,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  Utensils,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const floorSpaces = {
  'Piso 1': [
    { id: 'A-101', name: 'Smart Point', category: 'Tecnología', area: 'a101' },
    { id: 'A-108', name: 'Mundo Móvil', category: 'Tecnología', area: 'a108' },
    { id: 'A-114', name: 'Tech Zone Perú', category: 'Tecnología', area: 'a114' },
    { id: 'C-301', name: 'Casa Viva', category: 'Hogar', area: 'c301' },
    { id: 'C-307', name: 'Paso Firme', category: 'Moda', area: 'c307' },
    { id: 'D-401', name: 'Bella Lima', category: 'Belleza', area: 'd401' },
    { id: 'D-408', name: 'Zona Kids', category: 'Niños', area: 'd408' },
    { id: 'E-01', name: 'Ingreso principal', category: 'Acceso', area: 'entrance', type: 'access' },
    { id: 'S-01', name: 'Servicios', category: 'Información', area: 'services', type: 'service' },
  ],
  'Piso 2': [
    { id: 'B-201', name: 'Denim House', category: 'Moda', area: 'a101' },
    { id: 'B-208', name: 'Urban Style', category: 'Moda', area: 'a108' },
    { id: 'B-214', name: 'Distrito 5', category: 'Moda', area: 'a114' },
    { id: 'B-221', name: 'Pasarela Perú', category: 'Moda', area: 'c301' },
    { id: 'B-230', name: 'Sport Center', category: 'Deportes', area: 'c307' },
    { id: 'F-201', name: 'Sabor 5', category: 'Comida', area: 'd401', type: 'food' },
    { id: 'F-208', name: 'Coffee Point', category: 'Cafetería', area: 'd408', type: 'food' },
    { id: 'E-02', name: 'Escaleras', category: 'Acceso', area: 'entrance', type: 'access' },
    { id: 'S-02', name: 'Baños', category: 'Servicios', area: 'services', type: 'service' },
  ],
};

function SpaceIcon({ type }) {
  if (type === 'food') return <Utensils />;
  if (type === 'access') return <DoorOpen />;
  if (type === 'service') return <Info />;
  return <ShoppingBag />;
}

export default function MallMapPage({ Layout }) {
  const [params] = useSearchParams();
  const requested = params.get('local');
  const initialFloor = floorSpaces['Piso 2'].some((space) => space.id === requested) ? 'Piso 2' : 'Piso 1';
  const [floor, setFloor] = useState(initialFloor);
  const [selected, setSelected] = useState(requested || 'A-114');
  const [query, setQuery] = useState('');
  const spaces = floorSpaces[floor];
  const selectedSpace = useMemo(
    () => Object.values(floorSpaces).flat().find((space) => space.id === selected),
    [selected],
  );
  const results = spaces.filter((space) => `${space.name} ${space.id} ${space.category}`.toLowerCase().includes(query.toLowerCase()));

  const locate = (space) => {
    setSelected(space.id);
    if (!spaces.some((current) => current.id === space.id)) {
      setFloor(floorSpaces['Piso 1'].includes(space) ? 'Piso 1' : 'Piso 2');
    }
  };

  return (
    <Layout>
      <section className="map-page">
        <div className="container">
          <Link className="back-link" to="/"><ArrowLeft size={17} /> Volver al inicio</Link>
          <div className="map-heading">
            <div><span className="eyebrow">Mapa interactivo · Demo</span><h1>Ubica tu tienda sin dar vueltas</h1><p>Explora por piso, busca un establecimiento y encuentra el camino desde el ingreso.</p></div>
            <div className="floor-switch">{Object.keys(floorSpaces).map((item) => <button className={floor === item ? 'active' : ''} onClick={() => setFloor(item)} key={item}>{item}</button>)}</div>
          </div>
          <div className="map-layout">
            <aside className="map-sidebar">
              <label className="map-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar tienda o local..." /></label>
              <div className="map-results"><span>{results.length} lugares en {floor}</span>{results.map((space) => <button className={selected === space.id ? 'active' : ''} onClick={() => locate(space)} key={space.id}><span><SpaceIcon type={space.type} /></span><div><strong>{space.name}</strong><small>{space.id} · {space.category}</small></div><ChevronRight /></button>)}</div>
            </aside>
            <div className="mall-map-wrap">
              <div className="map-topbar"><span><CircleDot /> Estás en: ingreso principal</span><span><LocateFixed /> {floor}</span></div>
              <div className="mall-map" aria-label={`Plano demostrativo de ${floor}`}>
                <div className="map-corridor map-corridor--horizontal"><span>Pasillo central</span></div>
                <div className="map-corridor map-corridor--vertical-top"></div>
                <div className="map-corridor map-corridor--vertical-bottom"></div>
                <div className="map-you-are-here"><MapPin /><span>Estás aquí</span></div>
                {spaces.map((space) => (
                  <button
                    key={space.id}
                    className={`map-space map-space--${space.type || 'store'} ${selected === space.id ? 'active' : ''}`}
                    style={{ gridArea: space.area }}
                    onClick={() => setSelected(space.id)}
                    title={space.name}
                  >
                    <SpaceIcon type={space.type} /><strong>{space.name}</strong><small>{space.id}</small>
                  </button>
                ))}
              </div>
              <div className="map-legend"><span><i className="legend-store"></i> Tiendas</span><span><i className="legend-selected"></i> Seleccionado</span><span><i className="legend-service"></i> Servicios</span><em>Plano referencial para la demo</em></div>
            </div>
          </div>
          {selectedSpace && (
            <div className="map-selection">
              <div className="store-avatar" style={{ background: '#b72435' }}>{selectedSpace.name.slice(0, 2).toUpperCase()}</div>
              <div><span className="eyebrow">Seleccionado</span><h2>{selectedSpace.name}</h2><p>{selectedSpace.id} · {selectedSpace.category} · {floor}</p></div>
              <div className="map-route"><span><DoorOpen /> Ingreso principal</span><i></i><span><Store /> Pasillo central</span><i></i><strong><MapPin /> {selectedSpace.id}</strong></div>
              {!selectedSpace.type && <Link className="button button--primary" to={`/explorar?q=${encodeURIComponent(selectedSpace.name)}`}>Ver tienda <ChevronRight /></Link>}
            </div>
          )}
          <div className="map-note"><Sparkles /><div><strong>El mapa puede crecer con el proyecto</strong><p>Cuando tengan el plano real, reemplazaremos esta distribución conservando la búsqueda, los pisos y las rutas interactivas.</p></div></div>
        </div>
      </section>
    </Layout>
  );
}

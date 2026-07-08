import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Camera,
  Clock3,
  Eye,
  ImageUp,
  MapPin,
  MessageCircle,
  MousePointer2,
  Search,
  Sparkles,
  Store,
  UploadCloud,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { getStore, whatsappUrl } from '../../data';
import { tourStops } from './tourData';

function clampIndex(index) {
  if (index < 0) return tourStops.length - 1;
  if (index >= tourStops.length) return 0;
  return index;
}

export default function VirtualTourPage({ Layout }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStop = searchParams.get('local');
  const initialIndex = Math.max(0, tourStops.findIndex((stop) => stop.local === initialStop || stop.id === initialStop));
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [query, setQuery] = useState('');
  const [immersive, setImmersive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [look, setLook] = useState({ x: 50, y: 50 });
  const activeStop = tourStops[activeIndex];
  const activeStore = getStore(activeStop.id);

  const filteredStops = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return tourStops;
    return tourStops.filter((stop) => `${stop.title} ${stop.category} ${stop.local} ${stop.caption} ${stop.highlights.join(' ')}`.toLowerCase().includes(value));
  }, [query]);

  const selectStop = (stop) => {
    const nextIndex = tourStops.findIndex((item) => item.id === stop.id);
    setActiveIndex(nextIndex);
    setLook({ x: 50, y: 50 });
    setSearchParams({ local: stop.local });
  };

  const move = (direction) => {
    const nextIndex = clampIndex(activeIndex + direction);
    setActiveIndex(nextIndex);
    setLook({ x: 50, y: 50 });
    setSearchParams({ local: tourStops[nextIndex].local });
  };

  const isInteractiveTarget = (target) => target.closest('button, a, input, textarea, select, label');

  const updateLook = (event) => {
    if (isInteractiveTarget(event.target)) return;
    if (!immersive && !dragging) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100));
    setLook({ x: Math.round(x), y: Math.round(y) });
  };

  const startLook = (event) => {
    if (!immersive || isInteractiveTarget(event.target) || event.pointerType === 'touch') return;
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updateLook(event);
  };

  const stopLook = () => setDragging(false);

  return (
    <Layout>
      <section className="tour-hero">
        <div className="container tour-hero__grid">
          <div>
            <span className="pill"><Camera size={16} /> Recorrido virtual diario</span>
            <h1>Camina por las tiendas antes de ir.</h1>
            <p>Una vitrina viva: cada negocio puede subir la foto de su puesto del día para mostrar novedades reales, sin obligarlo a crear un catálogo perfecto.</p>
            <div className="tour-hero__actions">
              <a href="#recorrido" className="button button--primary">Iniciar recorrido <ArrowRight size={18} /></a>
              <Link to="/panel" className="button button--outline">Subir foto como tienda <UploadCloud size={18} /></Link>
            </div>
          </div>
          <div className="tour-business-case">
            <span><Sparkles size={18} /> Diferencial de 5 Continentes</span>
            <h2>No es solo ver productos: es ver qué está pasando hoy en cada local.</h2>
            <p>El comprador descubre vitrinas, detecta algo que le llama la atención y escribe por WhatsApp sin tener que recorrer todo el centro comercial a ciegas.</p>
          </div>
        </div>
      </section>

      <section className="section tour-section" id="recorrido">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Modo visitante</span>
              <h2>Recorrido por pasillos</h2>
              <p>Vista referencial del flujo. En producción, cada tienda subiría su foto diaria desde el panel.</p>
            </div>
            <div className="tour-counter"><Eye size={16} /> {activeIndex + 1} de {tourStops.length} locales visibles</div>
          </div>

          <div className="tour-layout">
            <aside className="tour-sidebar">
              <label className="tour-search">
                <Search size={17} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar tienda, producto o pasillo" />
              </label>
              <div className="tour-stop-list">
                {filteredStops.map((stop) => (
                  <button className={stop.id === activeStop.id ? 'active' : ''} key={stop.id} onClick={() => selectStop(stop)}>
                    <img src={stop.image} alt="" />
                    <span>
                      <strong>{stop.title}</strong>
                      <small>{stop.aisle} · Local {stop.local}</small>
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="tour-viewer">
              <div
                className={`tour-photo-card ${immersive ? 'tour-photo-card--immersive' : ''} ${dragging ? 'is-dragging' : ''}`}
                onPointerDown={startLook}
                onPointerMove={updateLook}
                onPointerUp={stopLook}
                onPointerCancel={stopLook}
                onPointerLeave={stopLook}
              >
                <div className="tour-immersive-bar">
                  <span><MousePointer2 size={14} /> {immersive ? 'Mueve el cursor para mirar' : 'Vista normal para explorar'}</span>
                  <button
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={(event) => { event.stopPropagation(); setImmersive((value) => !value); }}
                  >
                    {immersive ? 'Vista normal' : 'Modo inmersivo'}
                  </button>
                </div>
                <img
                  src={activeStop.image}
                  alt={`Foto diaria de ${activeStop.title}`}
                  style={{ objectPosition: `${look.x}% ${Math.min(72, Math.max(30, look.y))}%` }}
                  draggable="false"
                />
                <div className="tour-photo-gradient"></div>
                {activeStop.hotSpots.map((spot) => (
                  <button
                    className="tour-hotspot"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    key={spot.label}
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    <span></span>{spot.label}
                  </button>
                ))}
                <button className="tour-nav tour-nav--left" onPointerDown={(event) => event.stopPropagation()} onClick={() => move(-1)} aria-label="Local anterior"><ArrowLeft /></button>
                <button className="tour-nav tour-nav--right" onPointerDown={(event) => event.stopPropagation()} onClick={() => move(1)} aria-label="Siguiente local"><ArrowRight /></button>
                <div className="tour-photo-caption">
                  <span>{activeStop.freshness}</span>
                  <strong>{activeStop.title}</strong>
                  <small>{activeStop.updatedAt}</small>
                </div>
              </div>

              <div className="tour-path">
                <span className="tour-path__label">Ruta del pasillo</span>
                {tourStops.map((stop, index) => (
                  <button className={stop.id === activeStop.id ? 'active' : ''} key={stop.id} onClick={() => selectStop(stop)}>
                    <i>{index + 1}</i>
                    <strong>{stop.local}</strong>
                    <small>{stop.title}</small>
                  </button>
                ))}
              </div>

              <div className="tour-info-grid">
                <article className="tour-info-card tour-info-card--main">
                  <div className="tour-store-line">
                    <span className="store-avatar" style={{ background: activeStore.color }}>{activeStore.initials}</span>
                    <div>
                      <span className="eyebrow">{activeStop.category}</span>
                      <h3>{activeStop.title} {activeStore.verified && <BadgeCheck size={17} />}</h3>
                    </div>
                  </div>
                  <p>{activeStop.caption}</p>
                  <div className="tour-meta">
                    <span><MapPin size={15} /> {activeStop.aisle} · Local {activeStop.local}</span>
                    <span><Clock3 size={15} /> {activeStop.updatedAt}</span>
                  </div>
                  <div className="tour-actions">
                    <a className="button button--whatsapp" href={whatsappUrl(activeStore.phone, `la foto del local ${activeStop.local}`, activeStore.name)} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Preguntar por WhatsApp</a>
                    <Link className="button button--outline" to={`/tienda/${activeStore.id}`}><Store size={18} /> Ver tienda</Link>
                  </div>
                </article>

                <article className="tour-info-card">
                  <span className="eyebrow">Qué mirar en la foto</span>
                  <h3>{activeStop.mood}</h3>
                  <ul className="tour-highlights">
                    {activeStop.highlights.map((item) => <li key={item}><MousePointer2 size={14} /> {item}</li>)}
                  </ul>
                </article>

                <article className="tour-info-card tour-upload-preview">
                  <span><ImageUp size={18} /></span>
                  <h3>Foto diaria del negociante</h3>
                  <p>La tienda podría cambiar esta imagen todos los días para mostrar “lo nuevo”, promociones visuales o productos recién llegados.</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

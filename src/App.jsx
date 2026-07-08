import { useMemo, useState } from 'react';
import {
  Armchair,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  Building2,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  Dumbbell,
  Eye,
  Facebook,
  Instagram,
  Inbox,
  ImageUp,
  Laptop,
  LayoutDashboard,
  MapPin,
  MapPinned,
  Menu,
  MessageCircle,
  Package,
  Pencil,
  Plus,
  Search,
  Shirt,
  ShoppingBag,
  Sparkles,
  Store,
  ThumbsDown,
  ThumbsUp,
  UserRound,
  Watch,
  X,
} from 'lucide-react';
import { Link, NavLink, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { categories, getStore, products, stores, whatsappUrl } from './data';
import facadeImage from '../assets/img/brand/fachada-5-continentes.png';
import RadarPage from './features/radar/RadarPage';
import MallMapPage from './features/map/MallMap';
import VirtualTourPage from './features/tour/VirtualTour';
import { merchantLeads } from './features/radar/demoData';
import { tourStops } from './features/tour/tourData';

const categoryIcons = { Laptop, Shirt, Armchair, Sparkles, Dumbbell, Watch };

function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label="5 Continentes - Inicio">
      <span className="logo__mark"><i>5</i></span>
      <span className="logo__words">
        <strong><b>5</b> Continentes</strong>
        <small>Moda internacional</small>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [term, setTerm] = useState('');

  const search = (event) => {
    event.preventDefault();
    navigate(`/radar?buscar=${encodeURIComponent(term)}`);
    setOpen(false);
  };

  return (
    <>
      <div className="announcement">Encuentra lo que buscas y conversa directamente con cada tienda</div>
      <header className="header">
        <div className="container header__inner">
          <Logo />
          <form className="header-search" onSubmit={search}>
            <Search size={19} />
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Buscar productos, tiendas o categorías"
              aria-label="Buscar"
            />
            <button type="submit">Buscar</button>
          </form>
          <nav className={`nav ${open ? 'nav--open' : ''}`}>
            <NavLink to="/" onClick={() => setOpen(false)}>Inicio</NavLink>
            <NavLink to="/explorar" onClick={() => setOpen(false)}>Tiendas</NavLink>
            <NavLink to="/mapa" onClick={() => setOpen(false)}>Mapa</NavLink>
            <NavLink to="/recorrido" onClick={() => setOpen(false)}>Recorrido</NavLink>
            <NavLink to="/radar" className="nav__live" onClick={() => setOpen(false)}><span></span> 5C Ahora</NavLink>
            <NavLink to="/panel" className="nav__admin" onClick={() => setOpen(false)}>
              <UserRound size={17} /> Mi negocio
            </NavLink>
          </nav>
          <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label="Abrir menú">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo light />
          <p>La vitrina digital del Centro Comercial 5 Continentes.</p>
          <div className="socials"><a href="#" aria-label="Facebook"><Facebook size={18} /></a><a href="#" aria-label="Instagram"><Instagram size={18} /></a></div>
        </div>
        <div><h4>Explora</h4><Link to="/explorar">Todas las tiendas</Link><Link to="/explorar?categoria=Tecnología">Tecnología</Link><Link to="/explorar?categoria=Moda">Moda</Link></div>
        <div><h4>Centro comercial</h4><Link to="/radar">5C Ahora</Link><Link to="/recorrido">Recorrido virtual</Link><Link to="/mapa">Mapa del centro</Link><Link to="/panel">Acceso para tiendas</Link></div>
        <div><h4>Visítanos</h4><p><MapPin size={16} /> Av. Argentina 3093, Lima</p><p><Clock3 size={16} /> Lun. a dom. · 9:00 a. m. – 8:00 p. m.</p></div>
      </div>
      <div className="container footer__bottom">© 2026 Centro Comercial 5 Continentes <span>Privacidad · Términos</span></div>
    </footer>
  );
}

function Layout({ children }) {
  return <><Header /><main>{children}</main><Footer /></>;
}

function CategoryCard({ category }) {
  const Icon = categoryIcons[category.icon];
  return (
    <Link to={`/explorar?categoria=${encodeURIComponent(category.name)}`} className="category-card">
      <span className="category-card__icon" style={{ background: category.color }}><Icon size={27} /></span>
      <span>{category.name}</span><ChevronRight size={17} />
    </Link>
  );
}

function ProductCard({ product }) {
  const store = getStore(product.storeId);
  return (
    <article className="product-card">
      <Link to={`/producto/${product.id}`} className="product-card__image">
        <img src={product.image} alt={product.name} />
        <span className="product-card__tag">{product.category}</span>
      </Link>
      <div className="product-card__body">
        <Link to={`/tienda/${store.id}`} className="product-card__store">{store.name} {store.verified && <BadgeCheck size={14} />}</Link>
        <h3><Link to={`/producto/${product.id}`}>{product.name}</Link></h3>
        <p>{product.summary}</p>
        <div className="product-card__actions">
          <Link to={`/producto/${product.id}`} className="text-link">Ver información <ArrowRight size={16} /></Link>
          <a className="whatsapp-icon" href={whatsappUrl(store.phone, product.name, store.name)} target="_blank" rel="noreferrer" aria-label="Consultar por WhatsApp"><MessageCircle size={19} /></a>
        </div>
      </div>
    </article>
  );
}

function StoreCard({ store }) {
  const count = products.filter((product) => product.storeId === store.id).length;
  return (
    <article className="store-card">
      <div className="store-avatar" style={{ background: store.color }}>{store.initials}</div>
      <div className="store-card__content">
        <span className="eyebrow">{store.category}</span>
        <h3>{store.name} {store.verified && <BadgeCheck size={17} />}</h3>
        <p>{store.description}</p>
        <span className="location"><MapPin size={15} /> {store.location}</span>
      </div>
      <div className="store-card__aside">
        <span>{count} productos visibles</span>
        <Link className="button button--outline" to={`/tienda/${store.id}`}>Visitar tienda</Link>
      </div>
    </article>
  );
}

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const featured = products.filter((product) => product.featured).slice(0, 4);

  const submit = (event) => {
    event.preventDefault();
    navigate(`/radar?buscar=${encodeURIComponent(query)}`);
  };

  return (
    <Layout>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <span className="pill"><Building2 size={16} /> 600+ negocios en un solo lugar</span>
            <h1>Todo lo que buscas, <em>más cerca de ti.</em></h1>
            <p>Dinos qué necesitas y las tiendas te confirman si lo tienen. Sin recorrer cientos de catálogos ni perder tiempo.</p>
            <form className="hero-search" onSubmit={submit}>
              <Search size={21} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="¿Qué estás buscando hoy?" />
              <button>Buscar en vivo</button>
            </form>
            <div className="hero__hints"><span>Búsquedas frecuentes:</span><Link to="/explorar?q=audífonos">Audífonos</Link><Link to="/explorar?q=zapatillas">Zapatillas</Link><Link to="/explorar?q=hogar">Hogar</Link></div>
          </div>
          <div className="hero__visual">
            <div className="hero__shape"></div>
            <img src={facadeImage} alt="Fachada del Centro Comercial 5 Continentes" />
            <div className="floating-card floating-card--top"><span><Store size={19} /></span><div><strong>600+</strong><small>tiendas para descubrir</small></div></div>
            <div className="floating-card floating-card--bottom"><span><BellRing size={19} /></span><div><strong>Confirmado ahora</strong><small>por cada negocio</small></div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">Explora a tu manera</span><h2>¿Qué estás buscando?</h2></div><Link className="text-link" to="/explorar">Ver todas <ArrowRight size={17} /></Link></div>
          <div className="categories-grid">{categories.map((category) => <CategoryCard category={category} key={category.id} />)}</div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">Para descubrir</span><h2>Productos destacados</h2><p>Conoce algunas de las novedades disponibles en nuestras tiendas.</p></div><Link className="text-link" to="/explorar">Explorar productos <ArrowRight size={17} /></Link></div>
          <div className="products-grid">{featured.map((product) => <ProductCard product={product} key={product.id} />)}</div>
        </div>
      </section>

      <section className="section" id="como-funciona">
        <div className="container">
          <div className="section-heading section-heading--center"><div><span className="eyebrow">Así funciona 5C Ahora</span><h2>Pregunta. Recibe respuestas. Visita.</h2></div></div>
          <div className="steps">
            <div className="step"><span>1</span><Search /><h3>Cuenta qué estás buscando</h3><p>Describe el producto, talla, color o cualquier detalle importante.</p></div>
            <div className="step"><span>2</span><BellRing /><h3>Las tiendas responden</h3><p>Recibe disponibilidad confirmada y alternativas en pocos minutos.</p></div>
            <div className="step"><span>3</span><MapPinned /><h3>Sepáralo y encuéntralo</h3><p>Reserva temporalmente y sigue el mapa hasta el local.</p></div>
          </div>
          <div className="steps-cta"><Link className="button button--primary" to="/radar">Probar 5C Ahora <ArrowRight /></Link><Link className="button button--outline" to="/mapa">Explorar el mapa <MapPin /></Link></div>
        </div>
      </section>

      <section className="section tour-promo-section">
        <div className="container tour-promo">
          <div className="tour-promo__copy">
            <span className="pill"><Camera size={16} /> Nueva vitrina viva</span>
            <h2>Recorre las tiendas con fotos del día.</h2>
            <p>Antes de ir, mira cómo está el puesto hoy: vitrinas, productos recién llegados y novedades visuales subidas por cada negociante.</p>
            <div className="tour-promo__actions">
              <Link className="button button--primary" to="/recorrido">Ver recorrido virtual <ArrowRight size={18} /></Link>
              <Link className="button button--outline" to="/panel">Actualizar mi foto <ImageUp size={18} /></Link>
            </div>
          </div>
          <div className="tour-promo__stack">
            {tourStops.slice(0, 3).map((stop) => (
              <Link to={`/recorrido?local=${stop.local}`} className="tour-promo-card" key={stop.id}>
                <img src={stop.image} alt={`Foto diaria de ${stop.title}`} />
                <span>{stop.local}</span>
                <strong>{stop.title}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="business-cta">
        <div className="container business-cta__inner"><div><span className="pill pill--dark"><Store size={16} /> ¿Tienes una tienda aquí?</span><h2>Haz visible tu negocio en 5 Continentes</h2><p>Personaliza tu perfil, publica productos y recibe consultas de nuevos clientes.</p></div><Link to="/panel" className="button button--light">Administrar mi tienda <ArrowRight size={18} /></Link></div>
      </section>
    </Layout>
  );
}

function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('categoria') || 'Todas';
  const [view, setView] = useState('products');

  const filteredProducts = useMemo(() => products.filter((product) => {
    const store = getStore(product.storeId);
    const haystack = `${product.name} ${product.category} ${product.summary} ${store.name}`.toLowerCase();
    return (category === 'Todas' || product.category === category || store.category === category) && haystack.includes(query.toLowerCase());
  }), [query, category]);

  const filteredStores = useMemo(() => stores.filter((store) => {
    const haystack = `${store.name} ${store.category} ${store.description}`.toLowerCase();
    return (category === 'Todas' || store.category === category) && haystack.includes(query.toLowerCase());
  }), [query, category]);

  const updateQuery = (value) => {
    const next = new URLSearchParams(searchParams);
    value ? next.set('q', value) : next.delete('q');
    setSearchParams(next);
  };

  const updateCategory = (value) => {
    const next = new URLSearchParams(searchParams);
    value === 'Todas' ? next.delete('categoria') : next.set('categoria', value);
    setSearchParams(next);
  };

  return (
    <Layout>
      <section className="page-hero"><div className="container"><span className="eyebrow">Directorio comercial</span><h1>Explora 5 Continentes</h1><p>Productos y tiendas para descubrir. La compra se coordina directamente con cada negocio.</p></div></section>
      <section className="section">
        <div className="container">
          <div className="explore-toolbar">
            <label className="explore-search"><Search size={19} /><input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Buscar productos o tiendas..." /></label>
            <div className="view-tabs"><button className={view === 'products' ? 'active' : ''} onClick={() => setView('products')}><Package size={17} /> Productos</button><button className={view === 'stores' ? 'active' : ''} onClick={() => setView('stores')}><Store size={17} /> Tiendas</button></div>
          </div>
          <div className="filter-chips">
            {['Todas', ...categories.map((item) => item.name)].map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => updateCategory(item)}>{item}</button>)}
          </div>
          <div className="results-meta"><strong>{view === 'products' ? filteredProducts.length : filteredStores.length} resultados</strong><span>Información publicada por cada establecimiento</span></div>
          {view === 'products'
            ? <div className="products-grid">{filteredProducts.map((product) => <ProductCard product={product} key={product.id} />)}</div>
            : <div className="stores-list">{filteredStores.map((store) => <StoreCard store={store} key={store.id} />)}</div>}
          {((view === 'products' && !filteredProducts.length) || (view === 'stores' && !filteredStores.length)) && <div className="empty-state"><Search size={34} /><h3>No encontramos coincidencias</h3><p>Prueba con otra palabra o selecciona todas las categorías.</p></div>}
        </div>
      </section>
    </Layout>
  );
}

function StorePage() {
  const { storeId } = useParams();
  const store = getStore(storeId);
  if (!store) return <NotFound />;
  const storeProducts = products.filter((product) => product.storeId === store.id);
  return (
    <Layout>
      <section className="store-hero">
        <div className="container">
          <Link to="/explorar" className="back-link"><ArrowLeft size={17} /> Volver a tiendas</Link>
          <div className="store-profile">
            <div className="store-avatar store-avatar--large" style={{ background: store.color }}>{store.initials}</div>
            <div className="store-profile__main"><span className="eyebrow">{store.category}</span><h1>{store.name} {store.verified && <BadgeCheck size={24} />}</h1><p>{store.description}</p></div>
            <a className="button button--whatsapp" href={whatsappUrl(store.phone, 'sus productos', store.name)} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Contactar por WhatsApp</a>
          </div>
          <div className="store-details"><span><MapPin /> <strong>{store.location}</strong><small>{store.floor}</small></span><span><Clock3 /> <strong>Horario de atención</strong><small>{store.schedule}</small></span><span><Package /> <strong>{storeProducts.length} productos</strong><small>publicados en el directorio</small></span></div>
        </div>
      </section>
      <section className="section"><div className="container"><div className="section-heading"><div><span className="eyebrow">Catálogo informativo</span><h2>Productos de {store.name}</h2><p>Consulta disponibilidad y detalles directamente con la tienda.</p></div></div><div className="products-grid">{storeProducts.map((product) => <ProductCard product={product} key={product.id} />)}</div></div></section>
    </Layout>
  );
}

function ProductPage() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);
  if (!product) return <NotFound />;
  const store = getStore(product.storeId);
  const related = products.filter((item) => item.storeId === store.id && item.id !== product.id);
  return (
    <Layout>
      <section className="section product-detail">
        <div className="container">
          <div className="breadcrumbs"><Link to="/">Inicio</Link><ChevronRight /><Link to="/explorar">Productos</Link><ChevronRight /><span>{product.name}</span></div>
          <div className="product-detail__grid">
            <div className="product-detail__image"><img src={product.image} alt={product.name} /><span>{product.category}</span></div>
            <div className="product-detail__info">
              <Link className="store-mini" to={`/tienda/${store.id}`}><span className="store-avatar" style={{ background: store.color }}>{store.initials}</span><span><small>Vendido por</small><strong>{store.name} {store.verified && <BadgeCheck size={15} />}</strong></span><ChevronRight /></Link>
              <span className="eyebrow">{product.category}</span><h1>{product.name}</h1><p className="lead">{product.summary}</p>
              <div className="info-notice"><Eye size={20} /><div><strong>Producto informativo</strong><p>El precio y la disponibilidad se consultan directamente con la tienda.</p></div></div>
              <h3>Características</h3><ul className="feature-list">{product.details.map((detail) => <li key={detail}><Check size={16} /> {detail}</li>)}</ul>
              <a className="button button--whatsapp button--wide" href={whatsappUrl(store.phone, product.name, store.name)} target="_blank" rel="noreferrer"><MessageCircle size={20} /> Consultar por WhatsApp</a>
              <span className="contact-hint">Se abrirá una conversación con un mensaje preparado. No se realiza ningún pago en esta web.</span>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && <section className="section section--soft"><div className="container"><div className="section-heading"><div><h2>También en {store.name}</h2></div></div><div className="products-grid">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div></div></section>}
    </Layout>
  );
}

function Dashboard() {
  const [active, setActive] = useState('resumen');
  const [saved, setSaved] = useState(false);
  const [dailyPhotoUpdated, setDailyPhotoUpdated] = useState(false);
  const [leadStatuses, setLeadStatuses] = useState({});
  const store = stores[0];
  const storeProducts = products.filter((product) => product.storeId === store.id);
  const storeTourStop = tourStops.find((stop) => stop.id === store.id) || tourStops[0];
  const save = (event) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <Logo light />
        <div className="dashboard-business"><div className="store-avatar" style={{ background: store.color }}>{store.initials}</div><div><small>Mi establecimiento</small><strong>{store.name}</strong></div></div>
        <nav>
          <button className={active === 'resumen' ? 'active' : ''} onClick={() => setActive('resumen')}><LayoutDashboard /> Resumen</button>
          <button className={active === 'perfil' ? 'active' : ''} onClick={() => setActive('perfil')}><Store /> Perfil del negocio</button>
          <button className={active === 'vitrina' ? 'active' : ''} onClick={() => setActive('vitrina')}><Camera /> Foto diaria</button>
          <button className={active === 'productos' ? 'active' : ''} onClick={() => setActive('productos')}><Package /> Mis productos <span>{storeProducts.length}</span></button>
          <button className={active === 'solicitudes' ? 'active' : ''} onClick={() => setActive('solicitudes')}><Inbox /> Solicitudes <span>{merchantLeads.length}</span></button>
          <Link to={`/tienda/${store.id}`}><Eye /> Ver tienda pública</Link>
        </nav>
        <Link className="dashboard-exit" to="/"><ArrowLeft /> Volver al directorio</Link>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header"><div><span>Panel del establecimiento</span><strong>Hola, encargado de {store.name}</strong></div><div className="user-badge">ER</div></header>
        <div className="dashboard-content">
          {saved && <div className="toast"><Check /> Cambios guardados correctamente</div>}
          {active === 'resumen' && <>
            <div className="dashboard-title"><div><h1>Resumen</h1><p>Así se está mostrando tu negocio en el directorio.</p></div><Link to={`/tienda/${store.id}`} className="button button--outline"><Eye size={18} /> Ver perfil público</Link></div>
            <div className="stats"><div><span><Eye /></span><small>Visitas al perfil</small><strong>1,284</strong><em>+18% este mes</em></div><div><span><MessageCircle /></span><small>Clics en WhatsApp</small><strong>236</strong><em>+12% este mes</em></div><div><span><Package /></span><small>Productos visibles</small><strong>{storeProducts.length}</strong><em>Perfil activo</em></div></div>
            <div className="dashboard-grid">
              <section className="panel-card"><div className="panel-card__heading"><div><h2>Productos publicados</h2><p>Mantén tu vitrina actualizada.</p></div><button className="text-link" onClick={() => setActive('productos')}>Administrar <ArrowRight /></button></div>{storeProducts.map((product) => <div className="dashboard-product" key={product.id}><img src={product.image} alt="" /><div><strong>{product.name}</strong><span>{product.category}</span></div><span className="status"><i></i> Visible</span></div>)}</section>
              <section className="panel-card checklist"><h2>Completa tu perfil</h2><p>Un perfil completo genera más confianza.</p><div><span><Check /></span><strong>Información del negocio<small>Nombre, descripción y categoría</small></strong></div><div><span><Check /></span><strong>WhatsApp de contacto<small>Listo para recibir consultas</small></strong></div><div><span>3</span><strong>Agrega más productos<small>Te recomendamos al menos 5</small></strong></div><button className="button button--primary" onClick={() => setActive('productos')}>Agregar producto</button></section>
            </div>
          </>}
          {active === 'perfil' && <form className="editor panel-card" onSubmit={save}><div className="dashboard-title"><div><h1>Perfil del negocio</h1><p>Esta información será visible para todos los visitantes.</p></div><button className="button button--primary" type="submit">Guardar cambios</button></div><div className="form-grid"><label>Nombre comercial<input defaultValue={store.name} /></label><label>Categoría<select defaultValue={store.category}>{categories.map((item) => <option key={item.id}>{item.name}</option>)}</select></label><label className="form-wide">Descripción<textarea defaultValue={store.description} rows="4" /></label><label>WhatsApp<input defaultValue={`+${store.phone}`} /></label><label>Ubicación<input defaultValue={store.location} /></label><label>Horario<input defaultValue={store.schedule} /></label><label>Piso<input defaultValue={store.floor} /></label></div></form>}
          {active === 'vitrina' && <section className="panel-card daily-photo-panel">
            <div className="dashboard-title">
              <div><h1>Foto diaria del local</h1><p>Esta imagen alimentaría el recorrido virtual para que los compradores vean novedades reales del día.</p></div>
              <Link to={`/recorrido?local=${storeTourStop.local}`} className="button button--outline"><Eye size={18} /> Ver en recorrido</Link>
            </div>
            <div className="daily-photo-grid">
              <div className="daily-photo-preview">
                <img src={storeTourStop.image} alt={`Foto diaria de ${store.name}`} />
                <span>{dailyPhotoUpdated ? 'Actualizado hace unos segundos' : storeTourStop.updatedAt}</span>
              </div>
              <div className="daily-photo-editor">
                <span className="eyebrow">Demo sin base de datos</span>
                <h2>Sube una foto de tu puesto cada día</h2>
                <p>En la versión real, el encargado tomaría una foto desde su celular, escribiría una nota corta y quedaría visible en el recorrido.</p>
                <label>Mensaje del día<textarea rows="4" defaultValue={storeTourStop.caption} /></label>
                <label className="fake-upload"><ImageUp /><span><strong>Seleccionar foto del local</strong><small>JPG o PNG desde el celular del negociante</small></span><input type="file" accept="image/*" /></label>
                <button className="button button--primary" onClick={() => { setDailyPhotoUpdated(true); setSaved(true); window.setTimeout(() => setSaved(false), 2500); }}>Publicar foto de hoy</button>
              </div>
            </div>
          </section>}
          {active === 'productos' && <><div className="dashboard-title"><div><h1>Mis productos</h1><p>Publica información útil, sin precio ni carrito de compra.</p></div><button className="button button--primary"><Plus size={18} /> Nuevo producto</button></div><div className="products-table panel-card"><div className="table-head"><span>Producto</span><span>Categoría</span><span>Estado</span><span>Acciones</span></div>{storeProducts.map((product) => <div className="table-row" key={product.id}><span><img src={product.image} alt="" /><strong>{product.name}</strong></span><span>{product.category}</span><span className="status"><i></i> Visible</span><span><Link to={`/producto/${product.id}`} aria-label="Ver"><Eye /></Link><button aria-label="Editar"><Pencil /></button></span></div>)}</div></>}
          {active === 'solicitudes' && <>
            <div className="dashboard-title"><div><span className="live-pill"><span className="live-dot"></span> 5C Ahora</span><h1>Solicitudes de clientes</h1><p>Responde rápido para aparecer entre las opciones confirmadas.</p></div><span className="response-score"><strong>92%</strong> tasa de respuesta</span></div>
            <div className="lead-list">{merchantLeads.map((lead) => {
              const status = leadStatuses[lead.id];
              return <article className={`lead-card ${status ? `lead-card--${status}` : ''}`} key={lead.id}>
                <div className="lead-card__icon"><BellRing /></div>
                <div className="lead-card__content"><div><span>{lead.category}</span><time>{lead.time}</time></div><h2>{lead.query}</h2><p>{lead.detail}</p><small>Solicitud de {lead.customer}</small></div>
                <div className="lead-card__actions">
                  {!status ? <><button className="button button--primary" onClick={() => setLeadStatuses((current) => ({ ...current, [lead.id]: 'yes' }))}><ThumbsUp /> Sí, lo tengo</button><button className="button button--outline" onClick={() => setLeadStatuses((current) => ({ ...current, [lead.id]: 'similar' }))}><Sparkles /> Tengo algo similar</button><button className="lead-no" onClick={() => setLeadStatuses((current) => ({ ...current, [lead.id]: 'no' }))}><ThumbsDown /> No disponible</button></> : <div className="lead-answer"><Check /> <span><strong>{status === 'yes' ? 'Disponibilidad confirmada' : status === 'similar' ? 'Alternativa ofrecida' : 'Marcado no disponible'}</strong><button onClick={() => setLeadStatuses((current) => ({ ...current, [lead.id]: '' }))}>Cambiar respuesta</button></span></div>}
                </div>
              </article>;
            })}</div>
          </>}
        </div>
      </main>
    </div>
  );
}

function NotFound() {
  return <Layout><section className="not-found"><ShoppingBag size={55} /><h1>Página no encontrada</h1><p>El contenido que buscas no está disponible.</p><Link className="button button--primary" to="/">Volver al inicio</Link></section></Layout>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explorar" element={<Explore />} />
      <Route path="/tienda/:storeId" element={<StorePage />} />
      <Route path="/producto/:productId" element={<ProductPage />} />
      <Route path="/radar" element={<RadarPage Layout={Layout} />} />
      <Route path="/mapa" element={<MallMapPage Layout={Layout} />} />
      <Route path="/recorrido" element={<VirtualTourPage Layout={Layout} />} />
      <Route path="/panel" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

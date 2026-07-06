import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  Radio,
  Search,
  Send,
  ShieldCheck,
  Store,
  TimerReset,
  Zap,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../../data';
import { demoOffers } from './demoData';

const examples = ['Zapatillas negras talla 42', 'Audífonos con Bluetooth', 'Mochila para laptop'];

export default function RadarPage({ Layout }) {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('buscar') || '');
  const [category, setCategory] = useState('Moda');
  const [stage, setStage] = useState('form');
  const [reserved, setReserved] = useState('');
  const [sentCount, setSentCount] = useState(0);

  useEffect(() => {
    if (stage !== 'matching') return undefined;
    const first = window.setTimeout(() => setSentCount(8), 450);
    const second = window.setTimeout(() => setSentCount(12), 900);
    const finish = window.setTimeout(() => setStage('results'), 1600);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
      window.clearTimeout(finish);
    };
  }, [stage]);

  const submit = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    setSentCount(3);
    setStage('matching');
  };

  return (
    <Layout>
      <section className="radar-page">
        <div className="container">
          <Link className="back-link" to="/"><ArrowLeft size={17} /> Volver al inicio</Link>
          {stage === 'form' && (
            <div className="radar-intro">
              <div className="radar-copy">
                <span className="live-pill"><Radio size={15} /> 5C Ahora · Demo</span>
                <h1>Dinos qué buscas.<br /><em>Las tiendas te responden.</em></h1>
                <p>No revises cientos de catálogos. Enviamos tu solicitud a los negocios adecuados y te mostramos quién confirmó disponibilidad.</p>
                <div className="radar-benefits">
                  <span><Zap /> Respuestas rápidas</span>
                  <span><ShieldCheck /> Disponibilidad confirmada</span>
                  <span><MapPin /> Ubicación exacta</span>
                </div>
              </div>
              <form className="radar-form" onSubmit={submit}>
                <div className="radar-form__heading"><span><Search /></span><div><h2>¿Qué necesitas encontrar?</h2><p>Descríbelo con todos los detalles que recuerdes.</p></div></div>
                <label>Producto o necesidad<textarea rows="4" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ejemplo: zapatillas urbanas negras, talla 42..." /></label>
                <div className="radar-examples">{examples.map((example) => <button type="button" key={example} onClick={() => setQuery(example)}>{example}</button>)}</div>
                <label>Categoría<select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item.id}>{item.name}</option>)}</select></label>
                <div className="privacy-note"><ShieldCheck /><span><strong>Tu solicitud es privada</strong><small>Solo la reciben tiendas de la categoría seleccionada.</small></span></div>
                <button className="button button--primary radar-submit" type="submit" disabled={!query.trim()}><Send /> Preguntar a las tiendas</button>
              </form>
            </div>
          )}

          {stage === 'matching' && (
            <div className="matching-state">
              <div className="matching-radar"><span><Search /></span><i></i><i></i><i></i></div>
              <span className="live-pill"><Radio size={14} /> Solicitud activa</span>
              <h1>Buscando quién lo tiene…</h1>
              <p>Estamos consultando a las tiendas de <strong>{category}</strong>.</p>
              <div className="matching-progress"><span style={{ width: `${Math.min((sentCount / 12) * 100, 100)}%` }}></span></div>
              <strong>{sentCount} de 12 tiendas notificadas</strong>
              <div className="matching-query">“{query}”</div>
            </div>
          )}

          {stage === 'results' && (
            <div className="radar-results">
              <div className="radar-results__heading">
                <div><span className="live-pill live-pill--success"><CheckCircle2 /> 3 tiendas respondieron</span><h1>¡Lo encontramos!</h1><p>Disponibilidad confirmada para: <strong>“{query}”</strong></p></div>
                <button className="button button--outline" onClick={() => { setStage('form'); setReserved(''); }}><Search /> Nueva búsqueda</button>
              </div>
              <div className="response-summary"><BellRing /><div><strong>Respuestas verificadas recientemente</strong><span>Estas confirmaciones expiran en 2 horas para mantener la información actualizada.</span></div><TimerReset /></div>
              <div className="offer-list">
                {demoOffers.map((offer, index) => (
                  <article className={`offer-card ${reserved === offer.id ? 'offer-card--reserved' : ''}`} key={offer.id}>
                    <span className="offer-card__number">{index + 1}</span>
                    <div className="store-avatar" style={{ background: offer.color }}>{offer.initials}</div>
                    <div className="offer-card__main">
                      <span className="offer-card__time"><CheckCircle2 /> {offer.confirmed}</span>
                      <h2>{offer.product}</h2>
                      <Link to={`/tienda/${offer.storeId}`}>{offer.store} <ChevronRight /></Link>
                      <p>{offer.detail}</p>
                      <div className="offer-card__meta"><span><MapPin /> {offer.location}</span><strong>{offer.availability}</strong></div>
                    </div>
                    <div className="offer-card__actions">
                      {reserved === offer.id ? (
                        <div className="reservation-code"><Check /><span><strong>Separado por 1 hora</strong><small>Código: 5C-184</small></span></div>
                      ) : <button className="button button--primary" onClick={() => setReserved(offer.id)}><Clock3 /> Separar 1 hora</button>}
                      <Link className="button button--outline" to={`/mapa?local=${offer.mapId}`}><MapPin /> Ver en el mapa</Link>
                      <a className="offer-whatsapp" href={`https://wa.me/51976543210?text=${encodeURIComponent(`Hola, vi su respuesta en 5C Ahora sobre ${query}.`)}`} target="_blank" rel="noreferrer"><MessageCircle /> Consultar por WhatsApp</a>
                    </div>
                  </article>
                ))}
              </div>
              <div className="demo-disclaimer"><Store /><div><strong>Así funcionará con tiendas reales</strong><p>En esta demo las respuestas son simuladas. Con Supabase, cada encargado recibirá la solicitud y responderá desde su panel en tiempo real.</p></div><ArrowRight /></div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

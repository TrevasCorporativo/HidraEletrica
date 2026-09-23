import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Droplet,
  Zap,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onNavigate: (view: 'home' | 'loja' | 'sobre') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { storeSettings, categories, setActiveCategory } = useStore();
  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  const mapsQuery = encodeURIComponent(
    `${storeSettings.address_street}, ${storeSettings.address_neighborhood}, ${storeSettings.address_city} - ${storeSettings.address_state}`
  );

  return (
    <footer style={{ background: '#07090d', borderTop: '2px solid var(--border-yellow)', paddingTop: '4rem', color: 'var(--text-main)', position: 'relative' }}>
      <div className="container">
        
        {/* Grid de 4 Colunas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '3.5rem' }}>
          
          {/* Coluna 1: Marca & Missão */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                background: 'linear-gradient(135deg, #1e2430 0%, #11141a 100%)',
                border: '2px solid var(--yellow-400)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <Droplet size={18} color="#38bdf8" style={{ position: 'absolute', left: '7px', bottom: '8px' }} />
                <Zap size={20} color="#facc15" style={{ position: 'absolute', right: '6px', top: '7px' }} />
              </div>
              <div>
                <span style={{ fontSize: '1.3rem', fontWeight: 900, fontFamily: 'Outfit', color: '#fff' }}>HIDRA</span>
                <span style={{ fontSize: '1.3rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--yellow-400)' }}>ELÉTRICA</span>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Distribuição e varejo de materiais elétricos e hidráulicos com pronta entrega, alta qualidade técnica e garantia total para sua obra ou indústria.
            </p>

            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Gostaria de falar com o atendimento da HidraElétrica.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '0.65rem 1.2rem', fontSize: '0.85rem' }}
            >
              <MessageSquare size={16} />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>

          {/* Coluna 2: Categorias Rápidas */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--yellow-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
              Catálogo de Materiais
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat.id);
                      onNavigate('loja');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: 0,
                      fontSize: 'inherit'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--yellow-400)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    <ChevronRight size={14} color="var(--yellow-500)" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Endereço & Horários da Loja Física */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--yellow-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
              Loja Física & Atendimento
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <MapPin size={18} color="var(--yellow-400)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#fff', display: 'block' }}>{storeSettings.address_street}</strong>
                  <span>{storeSettings.address_neighborhood}, {storeSettings.address_city} - {storeSettings.address_state}</span>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-dim)' }}>CEP: {storeSettings.address_zip}</span>
                  
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      color: 'var(--yellow-400)',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      marginTop: '0.35rem'
                    }}
                  >
                    <span>Abrir no Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <Clock size={18} color="var(--yellow-400)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#fff', display: 'block' }}>Horário de Funcionamento:</strong>
                  <span>{storeSettings.business_hours_weekday}</span>
                  <span style={{ display: 'block' }}>{storeSettings.business_hours_saturday}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Coluna 4: Contatos & Dados Fiscais */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--yellow-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
              Canais Diretos & Pix
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={16} color="var(--yellow-400)" />
                <span>{storeSettings.phone}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={16} color="var(--yellow-400)" />
                <span>{storeSettings.email}</span>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fff', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                  <CreditCard size={15} color="var(--yellow-400)" />
                  <span>Chave Pix Oficial da Loja:</span>
                </div>
                <code style={{ fontSize: '0.78rem', color: 'var(--yellow-300)', background: '#090b0f', padding: '0.2rem 0.5rem', borderRadius: '4px', display: 'block', wordBreak: 'break-all' }}>
                  {storeSettings.pix_key}
                </code>
              </div>

            </div>
          </div>

        </div>

        {/* Rodapé Inferior */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '1.75rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-dim)'
        }}>
          <div>
            © {new Date().getFullYear()} <strong>{storeSettings.store_name}</strong> - CNPJ: {storeSettings.cnpj}. Todos os direitos reservados.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span>⚡ Alta Performance Elétrica & Hidráulica</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>Ambiente Seguro</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

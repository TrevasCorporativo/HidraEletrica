import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  ExternalLink,
  ChevronRight,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';
import { HidraIcon } from './HidraIcon';
import { InstagramIcon } from './SocialIcons';

interface FooterProps {
  onNavigate: (view: 'home' | 'loja' | 'missao' | 'sobre') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { storeSettings, categories, setActiveCategory } = useStore();
  const { isDark } = useTheme();
  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  const mapsQuery = encodeURIComponent(
    `${storeSettings.address_street}, ${storeSettings.address_neighborhood}, ${storeSettings.address_city} - ${storeSettings.address_state}`
  );

  return (
    <footer style={{
      background: isDark ? '#0b0e14' : '#f8fafc',
      borderTop: isDark ? '2px solid var(--border-yellow)' : '2px solid #eab308',
      paddingTop: '4rem',
      color: 'var(--text-main)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Grid de 4 Colunas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '3.5rem' }}>
          
          {/* Coluna 1: Marca & Missão & Redes */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <HidraIcon size={40} />
              <div>
                <span style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--text-main)' }}>Hidra</span>
                <span style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'Outfit', color: isDark ? 'var(--yellow-400)' : '#d97706' }}>Elétrica</span>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Distribuição e varejo de materiais elétricos e hidráulicos com pronta entrega, alta qualidade técnica e garantia total para sua obra ou indústria.
            </p>

            {/* Presença em Marketplaces e Instagram */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: isDark ? 'var(--yellow-400)' : '#b45309', display: 'block', marginBottom: '0.5rem' }}>
                Nossos Canais Oficiais:
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <a
                  href="https://www.mercadolivre.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="announcement-pill"
                  style={{ background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
                  title="Loja Oficial Mercado Livre"
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }}></span>
                  <span>Mercado Livre</span>
                  <ExternalLink size={11} />
                </a>

                <a
                  href="https://shopee.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="announcement-pill"
                  style={{ background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
                  title="Loja Oficial Shopee"
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ee4d2d' }}></span>
                  <span>Shopee</span>
                  <ExternalLink size={11} />
                </a>

                <a
                  href="https://www.instagram.com/hidra.eletrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="announcement-pill"
                  style={{ background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
                  title="Instagram Oficial"
                >
                  <InstagramIcon size={13} color="#c026d3" />
                  <span>@hidra.eletrica</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

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
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: isDark ? 'var(--yellow-400)' : '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
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
                      fontSize: 'inherit',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = isDark ? 'var(--yellow-400)' : '#d97706')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    <ChevronRight size={14} color={isDark ? 'var(--yellow-500)' : '#d97706'} />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Endereço & Horários da Loja Física */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: isDark ? 'var(--yellow-400)' : '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
              Loja Física & Atendimento
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <MapPin size={18} color={isDark ? 'var(--yellow-400)' : '#d97706'} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--text-main)', display: 'block' }}>{storeSettings.address_street}</strong>
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
                      color: isDark ? 'var(--yellow-400)' : '#b45309',
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
                <Clock size={18} color={isDark ? 'var(--yellow-400)' : '#d97706'} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--text-main)', display: 'block' }}>Horário de Funcionamento:</strong>
                  <span>{storeSettings.business_hours_weekday}</span>
                  <span style={{ display: 'block' }}>{storeSettings.business_hours_saturday}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Coluna 4: Contatos & Dados Fiscais */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: isDark ? 'var(--yellow-400)' : '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
              Canais Diretos & Pix
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={16} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
                <span>{storeSettings.phone}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={16} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
                <span>{storeSettings.email}</span>
              </div>

              <div style={{ background: isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                  <CreditCard size={15} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
                  <span>Chave Pix Oficial da Loja:</span>
                </div>
                <code style={{ fontSize: '0.78rem', color: isDark ? 'var(--yellow-300)' : '#b45309', background: isDark ? '#090b0f' : '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'block', wordBreak: 'break-all' }}>
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

          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span>⚡ Alta Performance Elétrica & Hidráulica</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>Mercado Livre Oficial</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>Shopee Oficial</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>@hidra.eletrica</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

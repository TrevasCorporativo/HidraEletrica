import React from 'react';
import {
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Truck,
  Droplet,
  Search,
  Zap,
  Droplets,
  Lightbulb,
  Wrench,
  CheckCircle,
  ExternalLink,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';
import { HidraIcon } from './HidraIcon';
import { InstagramIcon } from './SocialIcons';

interface HeroProps {
  onGoToStore: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onGoToStore, onSelectCategory }) => {
  const { storeSettings, searchQuery, setSearchQuery } = useStore();
  const { isDark } = useTheme();
  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  const heroBadge = storeSettings.hero_badge || 'Distribuidora & Varejo Especializado';
  const heroTitle = storeSettings.hero_title || 'A Força da Hidráulica e a Potência da Elétrica';
  const heroSubtitle = storeSettings.hero_subtitle || 'Cabos elétricos normatizados, disjuntores, quadros, tubos, conexões e iluminação industrial de alta durabilidade. Pronta entrega imediata para obras e indústrias.';
  const ctaPrimary = storeSettings.hero_cta_primary || 'Explorar Catálogo';
  const ctaWhatsapp = storeSettings.hero_cta_whatsapp || 'Orçamento via WhatsApp';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGoToStore();
  };

  return (
    <section style={{
      position: 'relative',
      padding: '3rem 0 2.5rem 0',
      overflow: 'hidden'
    }}>
      {/* Luz ambiente suave de fundo */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '20%',
        width: '500px',
        height: '400px',
        background: isDark
          ? 'radial-gradient(circle, rgba(250, 204, 21, 0.1) 0%, rgba(0, 0, 0, 0) 70%)'
          : 'radial-gradient(circle, rgba(234, 179, 8, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* LAYOUT MODERNO EM 2 COLUNAS (DESEMBOLADO & HARMONIOSO) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          
          {/* COLUNA ESQUERDA: APRESENTAÇÃO, BUSCA & CTAS */}
          <div>
            {/* Badge de Identificação */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1.25rem',
              background: isDark ? 'rgba(250, 204, 21, 0.08)' : '#fef3c7',
              border: isDark ? '1px solid rgba(250, 204, 21, 0.3)' : '1px solid #fde047',
              padding: '0.4rem 1rem',
              borderRadius: 'var(--radius-full)'
            }}>
              <HidraIcon size={18} />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isDark ? 'var(--yellow-400)' : '#b45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {heroBadge}
              </span>
            </div>

            {/* Título Principal de Alto Impacto */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              letterSpacing: '-0.03em'
            }}>
              {heroTitle.includes('Hidráulica') && heroTitle.includes('Elétrica') ? (
                <>
                  A Força da <span style={{ color: '#0284c7' }}>Hidráulica</span> e a Potência da <span className="text-gradient-yellow">Elétrica</span>
                </>
              ) : (
                heroTitle
              )}
            </h1>

            {/* Subtítulo Espaçado e Limpo */}
            <p style={{
              fontSize: 'clamp(0.98rem, 1.8vw, 1.12rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              marginBottom: '1.75rem',
              maxWidth: '560px'
            }}>
              {heroSubtitle}
            </p>

            {/* Barra de Busca Integrada & Desembolada */}
            <form
              onSubmit={handleSearchSubmit}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem',
                maxWidth: '540px'
              }}
            >
              <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '16px', zIndex: 2 }} />
              <input
                type="text"
                placeholder="O que você precisa hoje? (Ex: Cabo 2,5mm, Tubo 25mm, Disjuntor...)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: isDark ? 'rgba(21, 25, 34, 0.9)' : '#f8fafc',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #cbd5e1',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.85rem 7.5rem 0.85rem 2.8rem',
                  fontSize: '0.9rem',
                  color: 'var(--text-main)',
                  outline: 'none',
                  boxShadow: 'var(--shadow-sm)'
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{
                  position: 'absolute',
                  right: '5px',
                  padding: '0.55rem 1.1rem',
                  fontSize: '0.84rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                Buscar
              </button>
            </form>

            {/* Botões de Ação Principais */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              <button
                onClick={onGoToStore}
                className="btn-primary"
                style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
              >
                <span>{ctaPrimary}</span>
                <ArrowRight size={17} />
              </button>

              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Gostaria de fazer uma cotação de materiais elétricos e hidráulicos.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
              >
                <MessageSquare size={17} />
                <span>{ctaWhatsapp}</span>
              </a>
            </div>

            {/* Presença Multi-Canal (Mercado Livre, Shopee e Instagram) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Disponível também em:
              </span>

              <a
                href="https://www.mercadolivre.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="announcement-pill"
                style={{ background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', color: 'var(--text-main)' }}
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
                style={{ background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', color: 'var(--text-main)' }}
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
                style={{ background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff', color: 'var(--text-main)' }}
              >
                <InstagramIcon size={13} color="#c026d3" />
                <span>@hidra.eletrica</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* COLUNA DIREITA: VITRINE TÉCNICA E CARD DE PRONTA ENTREGA */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '440px',
                padding: '2rem',
                borderRadius: 'var(--radius-xl)',
                border: isDark ? '1px solid rgba(250, 204, 21, 0.3)' : '1px solid #e2e8f0',
                background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
                boxShadow: isDark ? '0 16px 40px rgba(0, 0, 0, 0.5)' : '0 12px 30px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* Header do Card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <HidraIcon size={32} />
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, lineHeight: 1.1 }}>HidraElétrica</h3>
                    <span style={{ fontSize: '0.72rem', color: isDark ? 'var(--yellow-400)' : '#d97706', fontWeight: 700 }}>
                      Centro de Distribuição & Loja
                    </span>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  ● Pronta Entrega
                </span>
              </div>

              {/* Destaques Técnicos */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
                  <ShieldCheck size={20} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
                  <div>
                    <strong style={{ fontSize: '0.85rem', display: 'block' }}>100% Certificado Inmetro & NBR</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cabos antichama e conexões padronizadas</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
                  <Truck size={20} color="#10b981" />
                  <div>
                    <strong style={{ fontSize: '0.85rem', display: 'block' }}>Entrega Expressa até 24 Horas</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Frota rápida para sua obra não atrasar</span>
                  </div>
                </div>
              </div>

              {/* Atalhos Diretos para os 4 Departamentos */}
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.75rem' }}>
                  Acesso Direto por Categoria:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    onClick={() => onSelectCategory ? onSelectCategory('eletrica') : onGoToStore()}
                    style={{
                      background: isDark ? 'rgba(250, 204, 21, 0.08)' : '#fef9c3',
                      border: isDark ? '1px solid rgba(250, 204, 21, 0.2)' : '1px solid #fde047',
                      color: isDark ? 'var(--yellow-400)' : '#b45309',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      textAlign: 'left'
                    }}
                  >
                    <Zap size={15} />
                    <span>Elétrica</span>
                  </button>

                  <button
                    onClick={() => onSelectCategory ? onSelectCategory('hidraulica') : onGoToStore()}
                    style={{
                      background: isDark ? 'rgba(56, 189, 248, 0.08)' : '#e0f2fe',
                      border: isDark ? '1px solid rgba(56, 189, 248, 0.2)' : '1px solid #bae6fd',
                      color: '#0284c7',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      textAlign: 'left'
                    }}
                  >
                    <Droplets size={15} />
                    <span>Hidráulica</span>
                  </button>

                  <button
                    onClick={() => onSelectCategory ? onSelectCategory('iluminacao') : onGoToStore()}
                    style={{
                      background: isDark ? 'rgba(251, 191, 36, 0.08)' : '#fef3c7',
                      border: isDark ? '1px solid rgba(251, 191, 36, 0.2)' : '1px solid #fde68a',
                      color: '#d97706',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      textAlign: 'left'
                    }}
                  >
                    <Lightbulb size={15} />
                    <span>Iluminação</span>
                  </button>

                  <button
                    onClick={() => onSelectCategory ? onSelectCategory('ferramentas') : onGoToStore()}
                    style={{
                      background: isDark ? 'rgba(16, 185, 129, 0.08)' : '#dcfce7',
                      border: isDark ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid #bbf7d0',
                      color: '#16a34a',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      textAlign: 'left'
                    }}
                  >
                    <Wrench size={15} />
                    <span>Ferramentas</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* FAIXA DE CONFIANÇA EM LINHA (TRUST STRIP - LIMPA & ORGANIZADA) */}
        <div style={{
          background: isDark ? 'rgba(18, 22, 31, 0.6)' : '#f8fafc',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.75rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: isDark ? 'rgba(250, 204, 21, 0.12)' : '#fef3c7', color: isDark ? 'var(--yellow-400)' : '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 800 }}>Normas ABNT & Inmetro</h4>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Procedência e segurança atestada</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Truck size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 800 }}>Entrega Rápida em 24h</h4>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Logística ágil para atender sua obra</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.12)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 800 }}>Faturamento para PJ</h4>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Condições especiais para CNPJ e atacado</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(238, 77, 45, 0.12)', color: '#ee4d2d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShoppingBag size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 800 }}>Site, ML & Shopee</h4>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Compre onde for mais conveniente</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

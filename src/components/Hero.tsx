import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Truck, Droplet, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { HidraIcon } from './HidraIcon';

interface HeroProps {
  onGoToStore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGoToStore }) => {
  const { storeSettings, searchQuery, setSearchQuery } = useStore();
  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  const heroBadge = storeSettings.hero_badge || 'Distribuidora & Varejo Especializado';
  const heroTitle = storeSettings.hero_title || 'A Força da Hidráulica e a Potência da Elétrica';
  const heroSubtitle = storeSettings.hero_subtitle || 'Cabos elétricos, disjuntores, quadros, tubos, conexões e iluminação industrial de alta performance. Pronta entrega para construtoras, instaladores e indústrias.';
  const ctaPrimary = storeSettings.hero_cta_primary || 'Explorar Produtos';
  const ctaWhatsapp = storeSettings.hero_cta_whatsapp || 'Orçamento via WhatsApp';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGoToStore();
  };

  return (
    <section style={{
      position: 'relative',
      padding: '4.5rem 0 3.5rem 0',
      overflow: 'hidden'
    }}>
      {/* Luz ambiente suave de fundo */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(250, 204, 21, 0.12) 0%, rgba(0, 0, 0, 0) 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Badge superior limpa com o ícone oficial */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', background: 'rgba(250, 204, 21, 0.08)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '0.4rem 1.1rem', borderRadius: 'var(--radius-full)' }}>
            <HidraIcon size={20} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--yellow-400)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {heroBadge}
            </span>
          </div>

          {/* Título Principal com tipografia refinada */}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            letterSpacing: '-0.03em'
          }}>
            {heroTitle.includes('Hidráulica') && heroTitle.includes('Elétrica') ? (
              <>
                A Força da <span style={{ color: '#38bdf8' }}>Hidráulica</span> e a Potência da <span className="text-gradient-yellow">Elétrica</span>
              </>
            ) : (
              heroTitle
            )}
          </h1>

          {/* Subtítulo Limpo */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.18rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            marginBottom: '2.2rem',
            maxWidth: '680px',
            margin: '0 auto 2.2rem auto'
          }}>
            {heroSubtitle}
          </p>

          {/* Barra de Busca Rápida Integrada */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              maxWidth: '560px',
              margin: '0 auto 2rem auto',
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
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
                background: 'var(--bg-card)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-full)',
                padding: '0.9rem 7.5rem 0.9rem 2.8rem',
                fontSize: '0.92rem',
                color: 'var(--text-main)',
                outline: 'none',
                boxShadow: 'var(--shadow-md)'
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{
                position: 'absolute',
                right: '6px',
                padding: '0.55rem 1.1rem',
                fontSize: '0.84rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              Buscar
            </button>
          </form>

          {/* Botões de Ação */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <button
              onClick={onGoToStore}
              className="btn-primary"
              style={{ padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
            >
              <span>{ctaPrimary}</span>
              <ArrowRight size={17} />
            </button>

            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Gostaria de cotar materiais elétricos e hidráulicos na HidraElétrica.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
            >
              <MessageSquare size={18} />
              <span>{ctaWhatsapp}</span>
            </a>
          </div>

          {/* Faixa de Confiança Minimalista e Organizada */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1.75rem',
            padding: '1.25rem 2rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <ShieldCheck size={17} color="var(--yellow-400)" />
              <strong style={{ color: 'var(--text-main)' }}>Normas ABNT & Inmetro</strong>
            </div>

            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-dim)', opacity: 0.5 }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Truck size={17} color="#38bdf8" />
              <strong style={{ color: 'var(--text-main)' }}>Entrega em 24h p/ Obras</strong>
            </div>

            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-dim)', opacity: 0.5 }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Droplet size={17} color="#34d399" />
              <strong style={{ color: 'var(--text-main)' }}>Faturamento Especial PJ</strong>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

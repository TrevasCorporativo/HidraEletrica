import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Truck, Building2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';
import { HidraIcon } from './HidraIcon';

interface HeroProps {
  onGoToStore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGoToStore }) => {
  const { storeSettings } = useStore();
  const { isDark } = useTheme();
  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  const heroBadge = storeSettings.hero_badge || 'Distribuidora & Varejo Especializado';
  const heroTitle = storeSettings.hero_title && storeSettings.hero_title !== 'A Força da Hidráulica e a Potência da Elétrica'
    ? storeSettings.hero_title
    : 'Tudo para sua Obra e Reforma com Pronta Entrega e Preço Justo';
  const heroSubtitle = storeSettings.hero_subtitle && !storeSettings.hero_subtitle.includes('normatizados')
    ? storeSettings.hero_subtitle
    : 'Linha completa em materiais elétricos, hidráulicos, iluminação LED e ferramentas das melhores marcas do mercado. Atendimento técnico e condições especiais para você e sua empresa.';
  const ctaPrimary = storeSettings.hero_cta_primary || 'Ver Catálogo de Produtos';
  const ctaWhatsapp = storeSettings.hero_cta_whatsapp || 'Falar com Vendedor no WhatsApp';

  return (
    <section style={{
      position: 'relative',
      padding: '4.5rem 0 3.5rem 0',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      {/* Luz ambiente suave */}
      <div style={{
        position: 'absolute',
        top: '0%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '640px',
        height: '320px',
        background: isDark
          ? 'radial-gradient(circle, rgba(250, 204, 21, 0.08) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(234, 179, 8, 0.1) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '840px' }}>
        
        {/* Pill de Identificação */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.25rem',
          background: isDark ? 'rgba(250, 204, 21, 0.08)' : '#fef3c7',
          border: isDark ? '1px solid rgba(250, 204, 21, 0.25)' : '1px solid #fde047',
          padding: '0.35rem 0.95rem',
          borderRadius: 'var(--radius-full)'
        }}>
          <HidraIcon size={18} />
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isDark ? 'var(--yellow-400)' : '#b45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {heroBadge}
          </span>
        </div>

        {/* Título Principal */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
          fontWeight: 900,
          lineHeight: 1.18,
          marginBottom: '1.2rem',
          letterSpacing: '-0.03em'
        }}>
          {heroTitle.includes('Obra e Reforma') ? (
            <>
              Tudo para sua <span className="text-gradient-yellow">Obra e Reforma</span> com Pronta Entrega e Preço Justo
            </>
          ) : (
            heroTitle
          )}
        </h1>

        {/* Subtítulo Limpo */}
        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.12rem)',
          color: 'var(--text-muted)',
          lineHeight: 1.65,
          marginBottom: '2.5rem',
          maxWidth: '680px',
          margin: '0 auto 2.5rem auto'
        }}>
          {heroSubtitle}
        </p>

        {/* Apenas Dois Botões de Ação Diretos e Objetivos */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <button
            onClick={onGoToStore}
            className="btn-primary"
            style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}
          >
            <span>{ctaPrimary}</span>
            <ArrowRight size={18} />
          </button>

          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Gostaria de falar com um vendedor da HidraElétrica para cotar materiais.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}
          >
            <MessageSquare size={18} />
            <span>{ctaWhatsapp}</span>
          </a>
        </div>

        {/* Faixa Sutil de Confiança em 1 Linha (Benefícios Claros e Reais) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.75rem',
          flexWrap: 'wrap',
          fontSize: '0.84rem',
          color: 'var(--text-muted)',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Truck size={17} color="#16a34a" />
            <strong style={{ color: 'var(--text-main)' }}>Entrega Rápida no seu Endereço</strong>
          </span>
          <span style={{ opacity: 0.25 }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Building2 size={17} color="#0284c7" />
            <strong style={{ color: 'var(--text-main)' }}>Faturamento Especial para Empresas e PJ</strong>
          </span>
          <span style={{ opacity: 0.25 }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={17} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
            <strong style={{ color: 'var(--text-main)' }}>Produtos 100% Originais com Garantia</strong>
          </span>
        </div>

      </div>
    </section>
  );
};

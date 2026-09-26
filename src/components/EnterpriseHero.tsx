import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, CheckCircle2, Award, Users, PackageCheck, Star, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';
import { HidraIcon } from './HidraIcon';

interface EnterpriseHeroProps {
  onGoToStore: () => void;
  onSelectCategory?: (category: string) => void;
}

export const EnterpriseHero: React.FC<EnterpriseHeroProps> = ({ onGoToStore }) => {
  const { storeSettings } = useStore();
  const { isDark } = useTheme();
  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  const heroBadge = storeSettings.hero_badge || 'Loja Especializada em Elétrica & Hidráulica';
  const heroTitle = storeSettings.hero_title || 'Tudo para sua Obra e Reforma com Pronta Entrega e Preço Justo';
  const heroSubtitle = storeSettings.hero_subtitle || 'Materiais elétricos, hidráulicos, iluminação técnica e ferramentas das melhores marcas do mercado. Mais de 6 anos de solidez, procedência garantida e atendimento dedicado.';

  const m1Val = storeSettings.metric_1_val || '+6 Anos';
  const m1Lbl = storeSettings.metric_1_lbl || 'De Mercado & Tradição';

  const m2Val = storeSettings.metric_2_val || '+15.000';
  const m2Lbl = storeSettings.metric_2_lbl || 'Clientes Atendidos';

  const m3Val = storeSettings.metric_3_val || '+50.000';
  const m3Lbl = storeSettings.metric_3_lbl || 'Produtos Entregues';

  const m4Val = storeSettings.metric_4_val || '99.8%';
  const m4Lbl = storeSettings.metric_4_lbl || 'Avaliação Positiva';

  return (
    <section style={{
      position: 'relative',
      padding: '3.5rem 0 2.5rem 0',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      {/* Luz ambiente suave de fundo */}
      <div style={{
        position: 'absolute',
        top: '0%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '280px',
        background: isDark
          ? 'radial-gradient(circle, rgba(250, 204, 21, 0.08) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '880px' }}>
        
        {/* Chip de Identificação Minimalista */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.25rem',
          padding: '0.35rem 0.95rem',
          borderRadius: 'var(--radius-full)',
          background: isDark ? 'rgba(250, 204, 21, 0.08)' : '#fef3c7',
          border: isDark ? '1px solid rgba(250, 204, 21, 0.25)' : '1px solid #fde047'
        }}>
          <HidraIcon size={16} />
          <span style={{
            fontSize: '0.76rem',
            fontWeight: 800,
            color: isDark ? 'var(--yellow-400)' : '#b45309',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {heroBadge} • +6 Anos de Mercado
          </span>
        </div>

        {/* Título Principal */}
        <h1 style={{
          fontSize: 'clamp(2.1rem, 4.2vw, 3.2rem)',
          fontWeight: 900,
          lineHeight: 1.18,
          letterSpacing: '-0.03em',
          marginBottom: '1.25rem',
          color: 'var(--text-main)'
        }}>
          Tudo para sua <span className="text-gradient-yellow">Obra e Reforma</span> com Pronta Entrega e Preço Justo
        </h1>

        {/* Subtítulo Conciso */}
        <p style={{
          fontSize: 'clamp(0.98rem, 1.8vw, 1.1rem)',
          color: 'var(--text-muted)',
          lineHeight: 1.65,
          marginBottom: '2.25rem',
          maxWidth: '680px',
          margin: '0 auto 2.25rem auto'
        }}>
          {heroSubtitle}
        </p>

        {/* Botões de Ação */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2.25rem'
        }}>
          <button
            onClick={onGoToStore}
            className="btn-primary"
            style={{ padding: '0.85rem 2rem', fontSize: '0.98rem' }}
          >
            <span>Explorar Catálogo</span>
            <ArrowRight size={17} />
          </button>

          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Gostaria de fazer um orçamento de materiais na HidraElétrica.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ padding: '0.85rem 2rem', fontSize: '0.98rem' }}
          >
            <MessageSquare size={17} />
            <span>Orçamento no WhatsApp</span>
          </a>
        </div>

        {/* Pilares de Confiança em 1 Linha Discreta */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          paddingBottom: '2.5rem'
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <CheckCircle2 size={15} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
            <strong style={{ color: 'var(--text-main)' }}>Pronta Entrega Real</strong>
          </span>
          <span style={{ opacity: 0.3 }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <CheckCircle2 size={15} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
            <strong style={{ color: 'var(--text-main)' }}>Produtos 100% Originais</strong>
          </span>
          <span style={{ opacity: 0.3 }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <CheckCircle2 size={15} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
            <strong style={{ color: 'var(--text-main)' }}>Atendimento Especializado</strong>
          </span>
        </div>

        {/* Faixa de Métricas (4 Cards Menores que o Usuário Elogiou) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          padding: '1.5rem',
          borderRadius: 'var(--radius-xl)',
          background: isDark ? 'rgba(16, 20, 28, 0.75)' : '#ffffff',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
          boxShadow: isDark ? '0 8px 24px rgba(0, 0, 0, 0.3)' : '0 4px 16px rgba(0, 0, 0, 0.04)',
          textAlign: 'left'
        }}>
          {/* Métrica 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: isDark ? 'rgba(250, 204, 21, 0.12)' : '#fef3c7',
              color: isDark ? 'var(--yellow-400)' : '#b45309',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Award size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--text-main)', lineHeight: 1.1 }}>
                {m1Val}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {m1Lbl}
              </div>
            </div>
          </div>

          {/* Métrica 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: isDark ? 'rgba(56, 189, 248, 0.12)' : '#e0f2fe',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Users size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--text-main)', lineHeight: 1.1 }}>
                {m2Val}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {m2Lbl}
              </div>
            </div>
          </div>

          {/* Métrica 3 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: isDark ? 'rgba(34, 197, 94, 0.12)' : '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <PackageCheck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--text-main)', lineHeight: 1.1 }}>
                {m3Val}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {m3Lbl}
              </div>
            </div>
          </div>

          {/* Métrica 4 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: isDark ? 'rgba(251, 191, 36, 0.12)' : '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Star size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--text-main)', lineHeight: 1.1 }}>
                {m4Val}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {m4Lbl}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

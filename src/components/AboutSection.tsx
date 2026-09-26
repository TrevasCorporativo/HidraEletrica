import React from 'react';
import { Award, ArrowRight, Zap, Droplet, Truck, ShieldCheck, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';
import { HidraIcon } from './HidraIcon';

interface AboutSectionProps {
  onGoToStore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onGoToStore }) => {
  const { storeSettings } = useStore();
  const { isDark } = useTheme();

  const feat1Title = storeSettings.feature_1_title || 'Mais de 6 Anos de Tradição';
  const feat1Desc = storeSettings.feature_1_desc || 'Atuando há mais de 6 anos com seriedade, compromisso e sólida parceria com profissionais, instaladores e empresas de construção.';

  const feat2Title = storeSettings.feature_2_title || 'Qualidade Certificada & Procedência';
  const feat2Desc = storeSettings.feature_2_desc || 'Trabalhamos exclusivamente com produtos 100% originais das melhores marcas do país, com garantia de fábrica e conformidade ABNT/Inmetro.';

  const feat3Title = storeSettings.feature_3_title || 'Estoque Pronta Entrega & PJ';
  const feat3Desc = storeSettings.feature_3_desc || 'Amplo estoque à pronta entrega, agilidade logística para sua obra não parar e condições especiais com faturamento facilitado para empresas.';

  const m1Val = storeSettings.metric_1_val || '+6 Anos';
  const m1Lbl = storeSettings.metric_1_lbl || 'De Mercado & Tradição';

  const m2Val = storeSettings.metric_2_val || '+15.000';
  const m2Lbl = storeSettings.metric_2_lbl || 'Clientes Atendidos';

  const m3Val = storeSettings.metric_3_val || '+50.000';
  const m3Lbl = storeSettings.metric_3_lbl || 'Produtos Vendidos';

  const m4Val = storeSettings.metric_4_val || '99.8%';
  const m4Lbl = storeSettings.metric_4_lbl || 'Satisfação e Avaliações';

  return (
    <section style={{ padding: '4rem 0 5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Banner Superior */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            background: isDark ? 'rgba(250, 204, 21, 0.08)' : '#fef3c7',
            border: isDark ? '1px solid rgba(250, 204, 21, 0.25)' : '1px solid #fde047',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-full)'
          }}>
            <HidraIcon size={16} />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isDark ? 'var(--yellow-400)' : '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tradição, Agilidade e Confiança Técnica
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', fontWeight: 900, marginBottom: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
            Especialistas em Materiais <span className="text-gradient-yellow">Elétricos & Hidráulicos</span>
          </h1>
          <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            A <strong>{storeSettings.store_name}</strong> consolidou-se como referência no fornecimento de materiais para construção civil, reformas, profissionais liberais e indústrias que exigem garantia de procedência, velocidade e atendimento técnico.
          </p>
        </div>

        {/* Grid dos 3 Diferenciais */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
          
          <div className="glass-panel" style={{
            padding: '2.2rem 2rem',
            borderRadius: 'var(--radius-xl)',
            position: 'relative',
            background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
            border: isDark ? '1px solid rgba(250, 204, 21, 0.2)' : '1px solid #e2e8f0',
            boxShadow: isDark ? 'var(--shadow-sm)' : '0 4px 16px rgba(0,0,0,0.04)'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: isDark ? 'rgba(250, 204, 21, 0.15)' : '#fef3c7', color: isDark ? 'var(--yellow-400)' : '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Award size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.65rem', color: 'var(--text-main)' }}>
              {feat1Title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {feat1Desc}
            </p>
          </div>

          <div className="glass-panel" style={{
            padding: '2.2rem 2rem',
            borderRadius: 'var(--radius-xl)',
            position: 'relative',
            background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
            border: isDark ? '1px solid rgba(56, 189, 248, 0.2)' : '1px solid #e2e8f0',
            boxShadow: isDark ? 'var(--shadow-sm)' : '0 4px 16px rgba(0,0,0,0.04)'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.65rem', color: 'var(--text-main)' }}>
              {feat2Title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {feat2Desc}
            </p>
          </div>

          <div className="glass-panel" style={{
            padding: '2.2rem 2rem',
            borderRadius: 'var(--radius-xl)',
            position: 'relative',
            background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
            border: isDark ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid #e2e8f0',
            boxShadow: isDark ? 'var(--shadow-sm)' : '0 4px 16px rgba(0,0,0,0.04)'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: isDark ? 'rgba(16, 185, 129, 0.15)' : '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Truck size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.65rem', color: 'var(--text-main)' }}>
              {feat3Title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {feat3Desc}
            </p>
          </div>

        </div>

        {/* Quadro de Números Organizado */}
        <div style={{
          background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
          border: isDark ? '1px solid rgba(250, 204, 21, 0.25)' : '1px solid #e2e8f0',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
          boxShadow: isDark ? 'var(--shadow-md)' : '0 6px 24px rgba(0, 0, 0, 0.04)'
        }}>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: isDark ? 'var(--yellow-400)' : '#d97706', fontFamily: 'Outfit' }}>{m1Val}</div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{m1Lbl}</span>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text-main)', fontFamily: 'Outfit' }}>{m2Val}</div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{m2Lbl}</span>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0284c7', fontFamily: 'Outfit' }}>{m3Val}</div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{m3Lbl}</span>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#16a34a', fontFamily: 'Outfit' }}>{m4Val}</div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{m4Lbl}</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={onGoToStore} className="btn-primary" style={{ padding: '0.85rem 2.2rem', fontSize: '0.98rem' }}>
            <span>Conhecer Nossos Materiais</span>
            <ArrowRight size={17} />
          </button>
        </div>

      </div>
    </section>
  );
};

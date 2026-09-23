import React from 'react';
import { Award, ArrowRight, Zap, Droplet, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { HidraIcon } from './HidraIcon';

interface AboutSectionProps {
  onGoToStore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onGoToStore }) => {
  const { storeSettings } = useStore();

  const feat1Title = storeSettings.feature_1_title || 'Elétrica de Alta Performance';
  const feat1Desc = storeSettings.feature_1_desc || 'Condutores elétricos de cobre 99,9% puro e dispositivos de proteção termomagnética e diferencial que cumprem rigorosamente a NBR 5410.';

  const feat2Title = storeSettings.feature_2_title || 'Hidráulica Sem Vazamentos';
  const feat2Desc = storeSettings.feature_2_desc || 'Linhas completas de água fria soldável, esgoto série normal e reforçada, e tecnologia PPR para água quente das marcas líderes.';

  const feat3Title = storeSettings.feature_3_title || 'Logística Dedicada à Sua Obra';
  const feat3Desc = storeSettings.feature_3_desc || 'Estoque a pronta entrega com despachos diários expressos para obras residenciais, prediais e industriais em toda a região.';

  const m1Val = storeSettings.metric_1_val || '+10.000';
  const m1Lbl = storeSettings.metric_1_lbl || 'Itens em Estoque';

  const m2Val = storeSettings.metric_2_val || '+5.000';
  const m2Lbl = storeSettings.metric_2_lbl || 'Obras Abastecidas';

  const m3Val = storeSettings.metric_3_val || '24h';
  const m3Lbl = storeSettings.metric_3_lbl || 'Entrega Regional';

  return (
    <section style={{ padding: '4.5rem 0 5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Banner Superior */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', background: 'rgba(250, 204, 21, 0.08)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '0.35rem 0.95rem', borderRadius: 'var(--radius-full)' }}>
            <HidraIcon size={16} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--yellow-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tradição e Segurança Técnica
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', fontWeight: 800, marginBottom: '1.1rem', letterSpacing: '-0.02em' }}>
            Construindo Confiança em Cada Metro de <span className="text-gradient-yellow">Fio e Tubo</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            A <strong>{storeSettings.store_name}</strong> nasceu para suprir a demanda de profissionais da construção civil, instaladores elétricos, encanadores e indústrias que exigem conformidade técnica, qualidade e velocidade.
          </p>
        </div>

        {/* Grid dos 3 Diferenciais */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
          
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', position: 'relative' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(250, 204, 21, 0.15)', color: 'var(--yellow-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Zap size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.65rem' }}>
              {feat1Title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {feat1Desc}
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', position: 'relative' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Droplet size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.65rem' }}>
              {feat2Title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {feat2Desc}
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', position: 'relative' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Truck size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.65rem' }}>
              {feat3Title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {feat3Desc}
            </p>
          </div>

        </div>

        {/* Quadro de Números Organizado */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--yellow-400)', fontFamily: 'Outfit' }}>{m1Val}</div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{m1Lbl}</span>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', fontFamily: 'Outfit' }}>{m2Val}</div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{m2Lbl}</span>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#38bdf8', fontFamily: 'Outfit' }}>100%</div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Conformidade Técnica</span>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#34d399', fontFamily: 'Outfit' }}>{m3Val}</div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{m3Lbl}</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={onGoToStore} className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}>
            <span>Conhecer Nossos Materiais</span>
            <ArrowRight size={17} />
          </button>
        </div>

      </div>
    </section>
  );
};

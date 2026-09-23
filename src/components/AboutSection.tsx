import React from 'react';
import { ShieldCheck, Truck, Users, Award, CheckCircle, ArrowRight, Zap, Droplet } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface AboutSectionProps {
  onGoToStore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onGoToStore }) => {
  const { storeSettings } = useStore();

  return (
    <section style={{ padding: '4rem 0 5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Banner Superior com Estatísticas */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge-yellow" style={{ marginBottom: '1rem' }}>
            <Award size={14} /> Tradição e Excelência Técnica
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '1.25rem' }}>
            Construindo Confiança em Cada Metro de <span className="text-gradient-yellow">Fio e Tubo</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            A <strong>HidraElétrica</strong> nasceu para suprir a demanda de profissionais da construção civil, instaladores elétricos, encanadores e indústrias que não abrem mão de segurança, normas técnicas e pontualidade no abastecimento.
          </p>
        </div>

        {/* Grid de 3 Pilares */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', marginBottom: '4rem' }}>
          
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(250, 204, 21, 0.15)', color: 'var(--yellow-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Zap size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Elétrica de Alta Performance
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Trabalhamos exclusivamente com condutores elétricos de cobre 99,9% puro (Sil, Cobrecom) e dispositivos de proteção termomagnética e diferencial (Schneider, Steck) que cumprem rigorosamente a NBR 5410.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Droplet size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Hidráulica Sem Vazamentos
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Linhas completas de água fria soldável, esgoto série normal e reforçada, e tecnologia de termofusão PPR para água quente das marcas líderes como Tigre, Amanco e Deca.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Truck size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Logística Dedicada à Sua Obra
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Sabemos que obra parada custa caro. Por isso mantemos um dos maiores estoques a pronta entrega da região com despachos diários expressos para obras residenciais e corporativas.
            </p>
          </div>

        </div>

        {/* Quadro Institucional de Números */}
        <div style={{
          background: 'linear-gradient(135deg, #181d26 0%, #12151d 100%)',
          border: '1px solid var(--border-yellow)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)'
        }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--yellow-400)', fontFamily: 'Outfit' }}>+10.000</div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Itens a Pronta Entrega</span>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', fontFamily: 'Outfit' }}>+5.000</div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Obras Abastecidas</span>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#38bdf8', fontFamily: 'Outfit' }}>100%</div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Certificação ABNT / Inmetro</span>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#34d399', fontFamily: 'Outfit' }}>24h</div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Entrega Expressa Regional</span>
          </div>
        </div>

        {/* CTA Interno */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button onClick={onGoToStore} className="btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}>
            <span>Conhecer Nossos Materiais</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};

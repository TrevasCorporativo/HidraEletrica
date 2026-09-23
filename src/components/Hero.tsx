import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Truck, Award, Zap, Droplet } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeroProps {
  onGoToStore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGoToStore }) => {
  const { storeSettings } = useStore();
  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  return (
    <section style={{
      position: 'relative',
      padding: '4rem 0 5rem 0',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      {/* Luz ambiente de fundo */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '650px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, rgba(10, 12, 16, 0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Badge superior */}
          <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
            <span className="badge-yellow" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>
              <Zap size={14} /> Distribuidora & Varejo Especializado
            </span>
          </div>

          {/* Título Principal */}
          <h1 style={{
            fontSize: 'clamp(2.3rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em'
          }}>
            A Força da <span style={{ color: '#38bdf8' }}>Hidráulica</span> e a Potência da <span className="text-gradient-yellow">Elétrica</span> em um Só Lugar
          </h1>

          {/* Subtítulo */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '720px',
            margin: '0 auto 2.5rem auto'
          }}>
            Cabos elétricos, disjuntores, quadros, tubos, conexões e iluminação industrial. 
            Soluções completas com pronta entrega para construtoras, eletricistas, encanadores e consumidores exigentes.
          </p>

          {/* Botões de Ação */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <button
              onClick={onGoToStore}
              className="btn-primary"
              style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}
            >
              <span>Explorar Catálogo Completo</span>
              <ArrowRight size={18} />
            </button>

            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Gostaria de solicitar um orçamento de materiais elétricos e hidráulicos.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem' }}
            >
              <MessageSquare size={19} />
              <span>Orçamento via WhatsApp</span>
            </a>
          </div>

          {/* Grid de Diferenciais e Confiabilidade */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            textAlign: 'left'
          }}>
            <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(250, 204, 21, 0.15)', color: 'var(--yellow-400)' }}>
                  <ShieldCheck size={20} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Normas ABNT</h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Materiais 100% certificados pelo Inmetro com garantia de segurança total.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                  <Truck size={20} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Entrega em 24h</h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Frota própria ágil para abastecer sua obra ou reforma sem atrasos.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                  <Award size={20} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Melhores Marcas</h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Parceria direta com Tigre, Schneider, Deca, Sil Fios e Steck.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(234, 179, 8, 0.15)', color: 'var(--yellow-400)' }}>
                  <Droplet size={20} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Faturamento PJ</h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Condições exclusivas para empresas, empreiteiras e instaladores.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Award, Users, PackageCheck, Star, ShieldCheck, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';

export const MetricsSection: React.FC = () => {
  const { storeSettings } = useStore();
  const { isDark } = useTheme();

  const metrics = [
    {
      val: storeSettings.metric_1_val || '+6 Anos',
      lbl: storeSettings.metric_1_lbl || 'De Mercado & Tradição',
      desc: 'Mais de 6 anos de solidez e referência em materiais elétricos e hidráulicos.',
      icon: Award,
      badge: 'Desde 2018'
    },
    {
      val: storeSettings.metric_2_val || '+15.000',
      lbl: storeSettings.metric_2_lbl || 'Clientes Atendidos',
      desc: 'Eletricistas, engenheiros, construtoras e consumidores residenciais satisfeitos.',
      icon: Users,
      badge: 'Base Ativa'
    },
    {
      val: storeSettings.metric_3_val || '+50.000',
      lbl: storeSettings.metric_3_lbl || 'Produtos Vendidos',
      desc: 'Materiais com procedência garantida, pronta entrega e notas fiscais emitidas.',
      icon: PackageCheck,
      badge: 'Pronta Entrega'
    },
    {
      val: storeSettings.metric_4_val || '99.8%',
      lbl: storeSettings.metric_4_lbl || 'Avaliação Positiva',
      desc: 'Excelência no atendimento consultivo, suporte pós-venda e cumprimento de prazos.',
      icon: Star,
      badge: 'Nota Máxima'
    }
  ];

  return (
    <section style={{
      padding: '2.5rem 0',
      position: 'relative',
      borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #e2e8f0',
      borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #e2e8f0',
      background: isDark
        ? 'linear-gradient(180deg, rgba(15, 19, 28, 0.6) 0%, rgba(9, 11, 14, 0.95) 100%)'
        : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
    }}>
      <div className="container">
        
        {/* Cabeçalho da Seção de Métricas */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge-yellow">
                ⭐ Confiabilidade Comprovada
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                • Indicadores Oficiais
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
              Por que a <span className="text-gradient-yellow">HidraElétrica</span> é a Escolha Certa para sua Obra
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={16} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
              <span>Garantia de Fábrica</span>
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={16} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
              <span>Agilidade no Envio</span>
            </span>
          </div>
        </div>

        {/* Grid de 4 Métricas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}>
          {metrics.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="glass-panel"
                style={{
                  padding: '1.75rem 1.5rem',
                  borderRadius: 'var(--radius-xl)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  border: isDark ? '1px solid rgba(250, 204, 21, 0.15)' : '1px solid #e2e8f0',
                  background: isDark ? 'rgba(18, 22, 31, 0.75)' : '#ffffff',
                  boxShadow: isDark ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 4px 16px rgba(0, 0, 0, 0.04)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'var(--yellow-400)';
                  e.currentTarget.style.boxShadow = isDark ? '0 10px 24px rgba(250, 204, 21, 0.15)' : '0 10px 24px rgba(234, 179, 8, 0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = isDark ? 'rgba(250, 204, 21, 0.15)' : '#e2e8f0';
                  e.currentTarget.style.boxShadow = isDark ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 4px 16px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Linha Amarela Superior Sutil */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, var(--yellow-400), #f59e0b)',
                  opacity: 0.8
                }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: isDark ? 'rgba(250, 204, 21, 0.12)' : '#fef3c7',
                    color: isDark ? 'var(--yellow-400)' : '#b45309',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={22} />
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9',
                    color: isDark ? 'var(--yellow-400)' : '#b45309'
                  }}>
                    {item.badge}
                  </span>
                </div>

                {/* Número da Métrica em Destaque */}
                <div style={{
                  fontSize: 'clamp(2rem, 3.2vw, 2.5rem)',
                  fontWeight: 900,
                  fontFamily: 'Outfit',
                  color: isDark ? '#ffffff' : '#0f172a',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  marginBottom: '0.35rem'
                }}>
                  {item.val}
                </div>

                {/* Título da Métrica */}
                <div style={{
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  color: isDark ? 'var(--yellow-400)' : '#d97706',
                  marginBottom: '0.45rem'
                }}>
                  {item.lbl}
                </div>

                {/* Descrição Curta */}
                <p style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

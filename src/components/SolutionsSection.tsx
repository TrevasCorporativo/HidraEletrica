import React from 'react';
import { Wrench, Building2, Home, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../context/StoreContext';

interface SolutionsSectionProps {
  onGoToStore: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onGoToStore }) => {
  const { isDark } = useTheme();
  const { storeSettings } = useStore();
  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  const solutions = [
    {
      title: 'Para Eletricistas & Encanadores',
      tag: 'Profissionais do Setor',
      icon: Wrench,
      iconColor: isDark ? 'var(--yellow-400)' : '#d97706',
      iconBg: isDark ? 'rgba(250, 204, 21, 0.12)' : '#fef3c7',
      desc: 'Agilidade máxima no seu dia a dia de trabalho com materiais de primeira linha e atendimento técnico direto.',
      benefits: [
        'Reserva antecipada de materiais via WhatsApp',
        'Atendimento prioritário para retirada no balcão',
        'Suporte técnico em dimensionamento e normas'
      ],
      ctaText: 'Falar com Atendente Técnico'
    },
    {
      title: 'Para Construtoras & Reformas',
      tag: 'Empresas & Engenharia',
      icon: Building2,
      iconColor: '#0284c7',
      iconBg: isDark ? 'rgba(56, 189, 248, 0.12)' : '#e0f2fe',
      desc: 'Abastecimento contínuo para canteiros de obras residenciais, prediais e comerciais com pontualidade.',
      benefits: [
        'Faturamento facilitado para CNPJ com boleto',
        'Cotação rápida de planilhas e projetos em PDF',
        'Entregas programadas diretamente no local da obra'
      ],
      ctaText: 'Solicitar Abertura de Cadastro PJ'
    },
    {
      title: 'Para sua Casa ou Apartamento',
      tag: 'Proprietários & Reformas',
      icon: Home,
      iconColor: '#16a34a',
      iconBg: isDark ? 'rgba(34, 197, 94, 0.12)' : '#dcfce7',
      desc: 'Compre com segurança para a reforma do seu imóvel sem surpresas ou materiais de procedência duvidosa.',
      benefits: [
        'Orientação clara sem complicação técnica',
        'Apenas materiais 100% originais com nota e garantia',
        'Economia real com compras completas para sua obra'
      ],
      ctaText: 'Conferir Linha Residencial'
    }
  ];

  return (
    <section style={{ padding: '3.5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Cabeçalho da Seção */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem auto' }}>
          <span className="badge-yellow" style={{ marginBottom: '0.5rem' }}>
            Soluções para Todo Porte
          </span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Como a HidraElétrica atende sua necessidade
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Condições personalizadas para cada perfil de cliente, com seriedade, velocidade e respeito aos seus prazos:
          </p>
        </div>

        {/* Grid de 3 Colunas Minimalistas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1.5rem'
        }}>
          {solutions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                style={{
                  background: isDark ? 'rgba(16, 20, 28, 0.7)' : '#ffffff',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = isDark ? 'rgba(250, 204, 21, 0.3)' : '#cbd5e1';
                  e.currentTarget.style.boxShadow = isDark ? '0 10px 24px rgba(0, 0, 0, 0.3)' : '0 8px 20px rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  {/* Topo do Card */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: item.iconBg,
                      color: item.iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={22} />
                    </div>

                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9',
                      color: 'var(--text-muted)'
                    }}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Título & Descrição */}
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                    {item.desc}
                  </p>

                  {/* Benefícios em Lista */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {item.benefits.map((b, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        <Check size={15} color={item.iconColor} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botão de Ação */}
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Olá! Tenho interesse nas condições da HidraElétrica para ${item.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #cbd5e1',
                    color: 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--yellow-400)';
                    e.currentTarget.style.color = isDark ? 'var(--yellow-400)' : '#b45309';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1';
                    e.currentTarget.style.color = 'var(--text-main)';
                  }}
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight size={14} />
                </a>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

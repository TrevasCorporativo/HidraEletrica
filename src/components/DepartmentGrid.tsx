import React from 'react';
import { Zap, Droplets, Lightbulb, Wrench, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface DepartmentGridProps {
  onSelectDepartment: (catId: string) => void;
}

export const DepartmentGrid: React.FC<DepartmentGridProps> = ({ onSelectDepartment }) => {
  const { isDark } = useTheme();

  const departments = [
    {
      id: 'eletrica',
      name: 'Linha Elétrica',
      subtitle: 'Cabos 750V, Disjuntores DIN, Quadros e Conduítes',
      items: ['Cabos Sil e Corfio 1,5mm a 16mm', 'Disjuntores Steck e Schneider', 'Quadros de Distribuição e Barramentos'],
      count: '+500 itens',
      icon: Zap,
      color: isDark ? 'var(--yellow-400)' : '#d97706',
      bg: isDark ? 'rgba(250, 204, 21, 0.12)' : '#fef3c7',
      hoverBorder: 'var(--yellow-400)'
    },
    {
      id: 'hidraulica',
      name: 'Linha Hidráulica',
      subtitle: 'Tubos Soldáveis Tigre, Registros Deca e Esgoto',
      items: ['Tubos marrom e soldáveis 20mm a 110mm', 'Registros de gaveta e pressão Deca', 'Linha de esgoto série normal e reforçada'],
      count: '+400 itens',
      icon: Droplets,
      color: '#0284c7',
      bg: isDark ? 'rgba(56, 189, 248, 0.12)' : '#e0f2fe',
      hoverBorder: '#0284c7'
    },
    {
      id: 'iluminacao',
      name: 'Iluminação LED',
      subtitle: 'Refletores IP66, Painéis Slim e Lâmpadas',
      items: ['Refletores LED externos 50W a 200W', 'Painéis de embutir e sobrepor slim', 'Fitas LED e lâmpadas econômicas'],
      count: '+300 itens',
      icon: Lightbulb,
      color: '#d97706',
      bg: isDark ? 'rgba(251, 191, 36, 0.12)' : '#fef3c7',
      hoverBorder: '#d97706'
    },
    {
      id: 'ferramentas',
      name: 'Ferramentas & Bombas',
      subtitle: 'Multímetros True RMS, Alicates e Motobombas',
      items: ['Alicates amperímetros e de crimpagem', 'Motobombas periféricas e autoaspirantes', 'Ferramentas manuais para instalação'],
      count: '+200 itens',
      icon: Wrench,
      color: '#16a34a',
      bg: isDark ? 'rgba(34, 197, 94, 0.12)' : '#dcfce7',
      hoverBorder: '#16a34a'
    }
  ];

  return (
    <section style={{ padding: '2.5rem 0 3.5rem 0' }}>
      <div className="container">
        
        {/* Título da Seção */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge-yellow" style={{ marginBottom: '0.4rem' }}>
              Departamentos
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: 'var(--text-main)' }}>
              Nossos Segmentos Especializados
            </h2>
          </div>

          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Selecione uma categoria para explorar os materiais técnicos
          </span>
        </div>

        {/* Grid de 4 Colunas (2 no celular, 4 no desktop) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.25rem'
        }}>
          {departments.map(dept => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.id}
                onClick={() => onSelectDepartment(dept.id)}
                style={{
                  background: isDark ? 'rgba(16, 20, 28, 0.7)' : '#ffffff',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.75rem 1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = dept.hoverBorder;
                  e.currentTarget.style.boxShadow = isDark ? '0 10px 24px rgba(0,0,0,0.35)' : '0 8px 20px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: dept.bg,
                      color: dept.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={20} />
                    </div>

                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9',
                      color: 'var(--text-muted)'
                    }}>
                      {dept.count}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                    {dept.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.1rem' }}>
                    {dept.subtitle}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                    {dept.items.map((it, i) => (
                      <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: dept.color }} />
                        <span>{it}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  color: dept.color,
                  paddingTop: '0.85rem',
                  borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #f1f5f9'
                }}>
                  <span>Acessar Produtos</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

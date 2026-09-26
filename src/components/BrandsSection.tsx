import React from 'react';
import { Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const BRANDS = [
  { name: 'Tigre', segment: 'Tubos & Conexões' },
  { name: 'Schneider Electric', segment: 'Disjuntores' },
  { name: 'Deca', segment: 'Registros & Válvulas' },
  { name: 'Sil Fios', segment: 'Cabos & Condutores' },
  { name: 'Steck', segment: 'Quadros & Tomadas' },
  { name: 'Amanco Wavin', segment: 'Sistemas Prediais' },
  { name: 'Tramontina Pro', segment: 'Ferramentas' },
  { name: 'Avant', segment: 'Iluminação LED' },
  { name: 'Dancor', segment: 'Motobombas' }
];

export const BrandsSection: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section style={{
      padding: '2rem 0',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      background: isDark ? 'rgba(12, 15, 22, 0.5)' : '#f8fafc'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        
        <p style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--text-muted)',
          fontWeight: 700,
          marginBottom: '1rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <Award size={14} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
          Revendedor Autorizado • Produtos 100% Originais com Garantia
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.75rem',
          flexWrap: 'wrap',
          opacity: isDark ? 0.85 : 0.75
        }}>
          {BRANDS.map(brand => (
            <div
              key={brand.name}
              style={{
                fontSize: '0.92rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                letterSpacing: '-0.01em',
                transition: 'all 0.2s ease',
                cursor: 'default'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = isDark ? 'var(--yellow-400)' : '#b45309';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-main)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {brand.name}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

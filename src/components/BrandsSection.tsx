import React from 'react';
import { Award } from 'lucide-react';

const BRANDS = [
  { name: 'Tigre', segment: 'Tubos & Conexões' },
  { name: 'Schneider Electric', segment: 'Disjuntores & Quadros' },
  { name: 'Deca', segment: 'Registros & Válvulas' },
  { name: 'Sil Fios', segment: 'Cabos & Condutores' },
  { name: 'Steck', segment: 'Tomadas & Dispositivos DR' },
  { name: 'Amanco Wavin', segment: 'Sistemas Prediais & PPR' },
  { name: 'Tramontina Pro', segment: 'Ferramentas Técnicas' },
  { name: 'Lorenzetti', segment: 'Pressurizadores & Metais' },
  { name: 'Avant', segment: 'Iluminação & Painéis LED' },
  { name: 'Dancor', segment: 'Bombas & Motobombas' }
];

export const BrandsSection: React.FC = () => {
  return (
    <section style={{ padding: '3.5rem 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(14, 17, 24, 0.4)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--yellow-400)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Award size={15} /> As Melhores Marcas do Mercado Mundial
          </span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.3rem' }}>
            Parceiros Oficiais e Produtos 100% Originais
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '1rem'
        }}>
          {BRANDS.map(brand => (
            <div
              key={brand.name}
              className="glass-panel"
              style={{
                padding: '1.25rem 1rem',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                border: '1px solid var(--border-card)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--yellow-400)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-card)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', display: 'block', marginBottom: '0.25rem' }}>
                {brand.name}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--yellow-400)', fontWeight: 600 }}>
                {brand.segment}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Layers, Zap, Droplets, Lightbulb, Wrench, Gauge } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const getCategoryIcon = (iconName: string, size = 18) => {
  switch (iconName) {
    case 'Zap':
      return <Zap size={size} />;
    case 'Droplets':
      return <Droplets size={size} />;
    case 'Lightbulb':
      return <Lightbulb size={size} />;
    case 'Wrench':
      return <Wrench size={size} />;
    case 'Gauge':
      return <Gauge size={size} />;
    default:
      return <Layers size={size} />;
  }
};

export const CategoryFilter: React.FC = () => {
  const { categories, activeCategory, setActiveCategory } = useStore();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.65rem',
      overflowX: 'auto',
      paddingBottom: '0.75rem',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }}>
      {categories.map(cat => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.15rem',
              borderRadius: 'var(--radius-full)',
              background: isActive ? 'var(--yellow-500)' : 'var(--bg-tertiary)',
              color: isActive ? '#090b0e' : 'var(--text-main)',
              border: isActive ? '1px solid var(--yellow-400)' : '1px solid var(--border-card)',
              fontWeight: isActive ? 700 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: isActive ? '0 0 14px rgba(250, 204, 21, 0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {getCategoryIcon(cat.icon, 16)}
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};

import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Zap, Droplets, Lightbulb, Wrench, CheckCircle2, Award, Users, PackageCheck, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';
import { HidraIcon } from './HidraIcon';

interface EnterpriseHeroProps {
  onGoToStore: () => void;
  onSelectCategory: (category: string) => void;
}

export const EnterpriseHero: React.FC<EnterpriseHeroProps> = ({ onGoToStore, onSelectCategory }) => {
  const { storeSettings } = useStore();
  const { isDark } = useTheme();
  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  const heroBadge = storeSettings.hero_badge || 'Loja Especializada em Elétrica & Hidráulica';
  const heroTitle = storeSettings.hero_title || 'Eficiência e Procedência para sua Obra e Reforma';
  const heroSubtitle = storeSettings.hero_subtitle || 'Materiais elétricos, hidráulicos, iluminação técnica e ferramentas das melhores marcas do mercado. Mais de 6 anos de solidez, atendimento consultivo e pronta entrega.';

  const m1Val = storeSettings.metric_1_val || '+6 Anos';
  const m1Lbl = storeSettings.metric_1_lbl || 'De Mercado';

  const m2Val = storeSettings.metric_2_val || '+15.000';
  const m2Lbl = storeSettings.metric_2_lbl || 'Clientes Atendidos';

  const m3Val = storeSettings.metric_3_val || '+50.000';
  const m3Lbl = storeSettings.metric_3_lbl || 'Produtos Entregues';

  const m4Val = storeSettings.metric_4_val || '99.8%';
  const m4Lbl = storeSettings.metric_4_lbl || 'Avaliação Positiva';

  return (
    <section style={{
      position: 'relative',
      padding: '3.5rem 0 2rem 0',
      overflow: 'hidden'
    }}>
      <div className="container">
        
        {/* Bloco Principal em 2 Colunas Limpas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          
          {/* COLUNA ESQUERDA: Tipografia e Ações */}
          <div>
            {/* Chip de Identificação Minimalista */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '1.25rem',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              background: isDark ? 'rgba(250, 204, 21, 0.08)' : '#fef3c7',
              border: isDark ? '1px solid rgba(250, 204, 21, 0.25)' : '1px solid #fde047'
            }}>
              <HidraIcon size={16} />
              <span style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                color: isDark ? 'var(--yellow-400)' : '#b45309',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                {heroBadge} • +6 Anos
              </span>
            </div>

            {/* Título Principal */}
            <h1 style={{
              fontSize: 'clamp(2.1rem, 3.6vw, 3.1rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1.2rem',
              color: 'var(--text-main)'
            }}>
              A base sólida e confiável para sua <span className="text-gradient-yellow">Obra & Reforma</span>
            </h1>

            {/* Subtítulo Conciso */}
            <p style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '540px'
            }}>
              {heroSubtitle}
            </p>

            {/* Botões de Ação */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.25rem' }}>
              <button
                onClick={onGoToStore}
                className="btn-primary"
                style={{ padding: '0.85rem 1.85rem', fontSize: '0.95rem' }}
              >
                <span>Explorar Catálogo</span>
                <ArrowRight size={17} />
              </button>

              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Gostaria de cotar uma lista de materiais na HidraElétrica.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ padding: '0.85rem 1.85rem', fontSize: '0.95rem' }}
              >
                <MessageSquare size={17} />
                <span>Cotação WhatsApp</span>
              </a>
            </div>

            {/* Pilares em 1 linha limpa */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              fontSize: '0.82rem',
              color: 'var(--text-muted)'
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={15} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
                <strong style={{ color: 'var(--text-main)' }}>Pronta Entrega Real</strong>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={15} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
                <strong style={{ color: 'var(--text-main)' }}>Faturamento PJ c/ NF-e</strong>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={15} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
                <strong style={{ color: 'var(--text-main)' }}>Garantia de Procedência</strong>
              </span>
            </div>

          </div>

          {/* COLUNA DIREITA: Card Showcase Interativo e Moderno */}
          <div>
            <div style={{
              background: isDark ? 'rgba(16, 20, 28, 0.85)' : '#ffffff',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
              boxShadow: isDark ? '0 10px 30px rgba(0, 0, 0, 0.4)' : '0 8px 24px rgba(0, 0, 0, 0.05)'
            }}>
              {/* Header do Card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0' }}>
                <div>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                    Departamentos Oficiais
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Clique para navegar nos materiais
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: isDark ? 'rgba(34, 197, 94, 0.12)' : '#dcfce7', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#16a34a' }}>
                    Atendimento Online
                  </span>
                </div>
              </div>

              {/* 4 Atalhos de Departamentos em 2x2 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <button
                  onClick={() => onSelectCategory('eletrica')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    color: 'var(--text-main)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--yellow-400)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.06)' : '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: isDark ? 'rgba(250, 204, 21, 0.15)' : '#fef3c7', color: isDark ? 'var(--yellow-400)' : '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800 }}>Linha Elétrica</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Fios, Disjuntores</div>
                  </div>
                </button>

                <button
                  onClick={() => onSelectCategory('hidraulica')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    color: 'var(--text-main)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#0284c7';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.06)' : '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Droplets size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800 }}>Linha Hidráulica</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Tubos, Registros</div>
                  </div>
                </button>

                <button
                  onClick={() => onSelectCategory('iluminacao')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    color: 'var(--text-main)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#d97706';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.06)' : '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: isDark ? 'rgba(251, 191, 36, 0.15)' : '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Lightbulb size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800 }}>Iluminação LED</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Painéis, Refletores</div>
                  </div>
                </button>

                <button
                  onClick={() => onSelectCategory('ferramentas')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    color: 'var(--text-main)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#16a34a';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.06)' : '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: isDark ? 'rgba(16, 185, 129, 0.15)' : '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Wrench size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800 }}>Ferramentas</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Bombas, Alicates</div>
                  </div>
                </button>
              </div>

              {/* Caixa Direta de Cotação de Planilha/Foto */}
              <div style={{
                background: isDark ? 'rgba(250, 204, 21, 0.05)' : '#fefce8',
                border: isDark ? '1px solid rgba(250, 204, 21, 0.2)' : '1px solid #fde047',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <ShieldCheck size={18} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Cotação Expressa de Lista ou Projeto
                  </span>
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '0.75rem' }}>
                  Envie sua planilha ou foto da lista pelo WhatsApp. Nossa equipe responde em minutos.
                </p>
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Tenho uma lista de materiais para cotar na HidraElétrica.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.6rem 1rem', fontSize: '0.84rem' }}
                >
                  <MessageSquare size={15} />
                  <span>Enviar Lista no WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Faixa de Métricas Minimalista (4 Colunas no Desktop / 2x2 no Mobile) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          padding: '1.5rem',
          borderRadius: 'var(--radius-xl)',
          background: isDark ? 'rgba(16, 20, 28, 0.6)' : '#f8fafc',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0'
        }}>
          {/* Métrica 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isDark ? 'rgba(250, 204, 21, 0.12)' : '#fef3c7', color: isDark ? 'var(--yellow-400)' : '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Award size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--text-main)', lineHeight: 1 }}>{m1Val}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{m1Lbl}</div>
            </div>
          </div>

          {/* Métrica 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isDark ? 'rgba(56, 189, 248, 0.12)' : '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--text-main)', lineHeight: 1 }}>{m2Val}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{m2Lbl}</div>
            </div>
          </div>

          {/* Métrica 3 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isDark ? 'rgba(34, 197, 94, 0.12)' : '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <PackageCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--text-main)', lineHeight: 1 }}>{m3Val}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{m3Lbl}</div>
            </div>
          </div>

          {/* Métrica 4 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isDark ? 'rgba(251, 191, 36, 0.12)' : '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Star size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--text-main)', lineHeight: 1 }}>{m4Val}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{m4Lbl}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

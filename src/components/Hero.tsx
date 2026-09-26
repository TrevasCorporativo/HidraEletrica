import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Truck, Building2, Zap, Droplets, Lightbulb, Wrench, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';
import { HidraIcon } from './HidraIcon';

interface HeroProps {
  onGoToStore: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onGoToStore, onSelectCategory }) => {
  const { storeSettings } = useStore();
  const { isDark } = useTheme();
  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  const heroBadge = storeSettings.hero_badge || 'Loja Especializada em Elétrica & Hidráulica';
  const heroTitle = storeSettings.hero_title || 'Tudo para sua Obra e Reforma com Pronta Entrega e Preço Justo';
  const heroSubtitle = storeSettings.hero_subtitle || 'Materiais elétricos e hidráulicos de alta qualidade para engenheiros, eletricistas, construtoras e reformas. Mais de 6 anos de tradição, atendimento técnico e as melhores marcas do mercado.';
  const ctaPrimary = storeSettings.hero_cta_primary || 'Explorar Catálogo';
  const ctaWhatsapp = storeSettings.hero_cta_whatsapp || 'Orçamento no WhatsApp';

  return (
    <section style={{
      position: 'relative',
      padding: '3.5rem 0 3.5rem 0',
      overflow: 'hidden'
    }}>
      {/* Luz ambiente de fundo */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '15%',
        width: '500px',
        height: '400px',
        background: isDark
          ? 'radial-gradient(circle, rgba(250, 204, 21, 0.07) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>
          
          {/* COLUNA ESQUERDA: Proposta de Valor Forte & Ações */}
          <div>
            
            {/* Badge de Tradição e Especialidade */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem',
              background: isDark ? 'rgba(250, 204, 21, 0.08)' : '#fef3c7',
              border: isDark ? '1px solid rgba(250, 204, 21, 0.25)' : '1px solid #fde047',
              padding: '0.4rem 0.95rem',
              borderRadius: 'var(--radius-full)'
            }}>
              <HidraIcon size={18} />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isDark ? 'var(--yellow-400)' : '#b45309', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {heroBadge} • +6 Anos de Mercado
              </span>
            </div>

            {/* Título Principal */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              letterSpacing: '-0.03em',
              color: 'var(--text-main)'
            }}>
              Tudo para sua <span className="text-gradient-yellow">Obra e Instalações</span> com Pronta Entrega e Preço Justo
            </h1>

            {/* Subtítulo Limpo */}
            <p style={{
              fontSize: 'clamp(0.98rem, 1.6vw, 1.08rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              marginBottom: '2rem',
              maxWidth: '560px'
            }}>
              {heroSubtitle}
            </p>

            {/* Botões de Ação */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button
                onClick={onGoToStore}
                className="btn-primary"
                style={{ padding: '0.85rem 1.85rem', fontSize: '0.98rem' }}
              >
                <span>{ctaPrimary}</span>
                <ArrowRight size={18} />
              </button>

              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Gostaria de fazer um orçamento de materiais na HidraElétrica.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ padding: '0.85rem 1.85rem', fontSize: '0.98rem' }}
              >
                <MessageSquare size={18} />
                <span>{ctaWhatsapp}</span>
              </a>
            </div>

            {/* Pilares de Confiança em Destaque */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              paddingTop: '1.25rem',
              borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0'
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
                <strong style={{ color: 'var(--text-main)' }}>Pronta Entrega Real</strong>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
                <strong style={{ color: 'var(--text-main)' }}>Faturamento PJ & NF-e</strong>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color={isDark ? 'var(--yellow-400)' : '#d97706'} />
                <strong style={{ color: 'var(--text-main)' }}>Produtos 100% Originais</strong>
              </span>
            </div>

          </div>

          {/* COLUNA DIREITA: Card Showcase & Cotação Rápida */}
          <div>
            <div className="glass-panel" style={{
              padding: '2rem',
              borderRadius: 'var(--radius-2xl)',
              border: isDark ? '1px solid rgba(250, 204, 21, 0.25)' : '1px solid #e2e8f0',
              background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
              boxShadow: isDark ? '0 12px 36px rgba(0, 0, 0, 0.4)' : '0 12px 36px rgba(0, 0, 0, 0.06)',
              position: 'relative'
            }}>
              
              {/* Header do Card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <HidraIcon size={28} />
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                      Central de Materiais
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Loja Física & Televendas
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: isDark ? 'rgba(34, 197, 94, 0.12)' : '#dcfce7', padding: '0.3rem 0.65rem', borderRadius: 'var(--radius-full)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#16a34a' }}>
                    Atendimento Online
                  </span>
                </div>
              </div>

              {/* Atalhos Rápidos para Categorias */}
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
                Acesso Rápido por Departamento:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => onSelectCategory ? onSelectCategory('eletrica') : onGoToStore()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.75rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    color: 'var(--text-main)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--yellow-400)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: isDark ? 'rgba(250, 204, 21, 0.15)' : '#fef3c7', color: isDark ? 'var(--yellow-400)' : '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>Elétrica</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Fios, Disjuntores</div>
                  </div>
                </button>

                <button
                  onClick={() => onSelectCategory ? onSelectCategory('hidraulica') : onGoToStore()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.75rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    color: 'var(--text-main)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#0284c7';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Droplets size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>Hidráulica</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Tubos, Conexões</div>
                  </div>
                </button>

                <button
                  onClick={() => onSelectCategory ? onSelectCategory('iluminacao') : onGoToStore()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.75rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    color: 'var(--text-main)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#d97706';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: isDark ? 'rgba(251, 191, 36, 0.15)' : '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Lightbulb size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>Iluminação</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>LED, Refletores</div>
                  </div>
                </button>

                <button
                  onClick={() => onSelectCategory ? onSelectCategory('ferramentas') : onGoToStore()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.75rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    color: 'var(--text-main)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#16a34a';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: isDark ? 'rgba(16, 185, 129, 0.15)' : '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Wrench size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800 }}>Ferramentas</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Bombas, Alicates</div>
                  </div>
                </button>
              </div>

              {/* Bloco de Cotação Direta */}
              <div style={{
                background: isDark ? 'rgba(250, 204, 21, 0.05)' : '#fefce8',
                border: isDark ? '1px solid rgba(250, 204, 21, 0.2)' : '1px solid #fde047',
                borderRadius: 'var(--radius-lg)',
                padding: '1.1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', marginBottom: '0.75rem' }}>
                  <ShieldCheck size={20} color={isDark ? 'var(--yellow-400)' : '#d97706'} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, display: 'block', color: 'var(--text-main)' }}>
                      Tem uma lista de materiais pronta?
                    </span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      Envie foto ou PDF no WhatsApp para cotação imediata com descontos especiais.
                    </span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Tenho uma lista de materiais e gostaria de cotar os melhores preços com a HidraElétrica.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.65rem 1rem', fontSize: '0.86rem' }}
                >
                  <MessageSquare size={16} />
                  <span>Enviar Lista para Cotação</span>
                </a>
              </div>

              {/* Rodapé do Card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                <span>🔒 Compra 100% Segura</span>
                <span>📋 Nota Fiscal em Todos os Pedidos</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

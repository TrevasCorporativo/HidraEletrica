import React from 'react';
import { ExternalLink, ShoppingBag, Truck, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { InstagramIcon } from './SocialIcons';

export const MarketplacesSection: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section style={{ padding: '3.5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Cabeçalho da Seção */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2.5rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: isDark ? 'rgba(250, 204, 21, 0.1)' : '#fef3c7',
            border: isDark ? '1px solid rgba(250, 204, 21, 0.25)' : '1px solid #fde047',
            color: isDark ? 'var(--yellow-400)' : '#b45309',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem'
          }}>
            <Sparkles size={14} /> Multi-Canais de Venda Oficiais
          </div>

          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.2vw, 2.3rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '0.65rem'
          }}>
            Presentes Onde For Mais Prático Para Você
          </h2>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Compre direto conosco pelo WhatsApp, retire em nossa loja física ou aproveite a comodidade e cupons dos maiores marketplaces do Brasil.
          </p>
        </div>

        {/* Grade com 3 Cards Bonitos e Desembolados */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          
          {/* Card 1: Mercado Livre */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem 1.75rem',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              border: isDark ? '1px solid rgba(250, 204, 21, 0.3)' : '1px solid #e2e8f0',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div>
              {/* Header do Card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #ffe600 0%, #facc15 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(250, 204, 21, 0.3)'
                }}>
                  <ShoppingBag size={26} color="#000000" />
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(37, 99, 235, 0.12)',
                  color: '#2563eb',
                  border: '1px solid rgba(37, 99, 235, 0.25)'
                }}>
                  Envio Full
                </span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Mercado Livre
              </h3>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                Acesse nossa loja oficial no Mercado Livre com pronta entrega, opções de frete grátis e a segurança do Mercado Pago.
              </p>

              {/* Vantagens */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="#16a34a" />
                  <span>Entrega expressa com Mercado Envios</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="#16a34a" />
                  <span>Parcelamento em até 12x no cartão</span>
                </li>
              </ul>
            </div>

            <a
              href="https://www.mercadolivre.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '0.88rem',
                justifyContent: 'center'
              }}
            >
              <span>Ir para o Mercado Livre</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Card 2: Shopee */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem 1.75rem',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              border: isDark ? '1px solid rgba(238, 77, 45, 0.3)' : '1px solid #e2e8f0',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div>
              {/* Header do Card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #ff5722 0%, #ee4d2d 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(238, 77, 45, 0.3)'
                }}>
                  <ShoppingBag size={26} color="#ffffff" />
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(238, 77, 45, 0.12)',
                  color: '#ee4d2d',
                  border: '1px solid rgba(238, 77, 45, 0.25)'
                }}>
                  Cupons & Frete
                </span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Shopee
              </h3>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                Compre nossos produtos técnicos na Shopee aproveitando cupons de desconto, moedas Shopee e promoções relâmpago.
              </p>

              {/* Vantagens */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="#16a34a" />
                  <span>Cupons de frete grátis do aplicativo</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="#16a34a" />
                  <span>Garantia Shopee com reembolso seguro</span>
                </li>
              </ul>
            </div>

            <a
              href="https://shopee.com.br"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #ff5722 0%, #ee4d2d 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.88rem',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(238, 77, 45, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Ir para a Shopee</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Card 3: Instagram Oficial @hidra.eletrica */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem 1.75rem',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              border: isDark ? '1px solid rgba(192, 38, 211, 0.3)' : '1px solid #e2e8f0',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div>
              {/* Header do Card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(225, 48, 108, 0.35)'
                }}>
                  <InstagramIcon size={26} color="#ffffff" />
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(192, 38, 211, 0.12)',
                  color: '#c026d3',
                  border: '1px solid rgba(192, 38, 211, 0.25)'
                }}>
                  Rede Oficial
                </span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                @hidra.eletrica
              </h3>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                Acompanhe o dia a dia da loja, novos lotes de materiais, promoções relâmpago e dicas técnicas para eletricistas e encanadores.
              </p>

              {/* Vantagens */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="#16a34a" />
                  <span>Dicas práticas e vídeos de produtos</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="#16a34a" />
                  <span>Atendimento ágil também por Direct</span>
                </li>
              </ul>
            </div>

            <a
              href="https://www.instagram.com/hidra.eletrica"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #833ab4 0%, #e1306c 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.88rem',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(225, 48, 108, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <InstagramIcon size={16} color="#ffffff" />
              <span>Seguir @hidra.eletrica</span>
              <ExternalLink size={14} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

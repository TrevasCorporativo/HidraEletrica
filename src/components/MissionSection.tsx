import React from 'react';
import { Target, Eye, HeartHandshake, ShieldCheck, Clock, Users, ArrowRight, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../context/StoreContext';
import { HidraIcon } from './HidraIcon';

interface MissionSectionProps {
  onGoToStore: () => void;
}

export const MissionSection: React.FC<MissionSectionProps> = ({ onGoToStore }) => {
  const { isDark } = useTheme();
  const { storeSettings } = useStore();
  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  return (
    <section style={{ padding: '3.5rem 0 5rem 0' }}>
      <div className="container">
        
        {/* Cabeçalho da Página / Seção */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            background: isDark ? 'rgba(250, 204, 21, 0.1)' : '#fef3c7',
            border: isDark ? '1px solid rgba(250, 204, 21, 0.25)' : '1px solid #fde047',
            padding: '0.35rem 0.95rem',
            borderRadius: 'var(--radius-full)'
          }}>
            <HidraIcon size={16} />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isDark ? 'var(--yellow-400)' : '#b45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Identidade & Propósito
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.1rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Nossa Missão na <span className="text-gradient-yellow">HidraElétrica</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            Mais do que comercializar cabos, canos e conexões, nossa missão diária é ser o parceiro mais confiável e ágil para quem projeta, constrói, reforma e instala.
          </p>
        </div>

        {/* Grid dos 3 Pilares Principais (Missão, Visão, Valores) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          
          {/* Card 1: Missão */}
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem 2rem',
              borderRadius: 'var(--radius-xl)',
              border: isDark ? '1px solid rgba(250, 204, 21, 0.25)' : '1px solid #e2e8f0',
              background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
              boxShadow: isDark ? 'var(--shadow-md)' : '0 8px 24px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'var(--yellow-400)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(250, 204, 21, 0.25)' : '#e2e8f0';
            }}
          >
            <div>
              <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: isDark ? 'rgba(250, 204, 21, 0.15)' : '#fef3c7', color: isDark ? 'var(--yellow-400)' : '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Target size={28} />
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.85rem' }}>
                Nossa Missão
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Entregar soluções completas em materiais elétricos e hidráulicos com transparência total, orientação técnica correta e rapidez incomparável, assegurando que obras residenciais, prediais e industriais nunca parem por falta de material.
              </p>
            </div>

            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.82rem', fontWeight: 700, color: isDark ? 'var(--yellow-400)' : '#b45309' }}>
              🎯 Compromisso com o Sucesso da sua Obra
            </div>
          </div>

          {/* Card 2: Visão */}
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem 2rem',
              borderRadius: 'var(--radius-xl)',
              border: isDark ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid #e2e8f0',
              background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
              boxShadow: isDark ? 'var(--shadow-md)' : '0 8px 24px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#0284c7';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(56, 189, 248, 0.25)' : '#e2e8f0';
            }}
          >
            <div>
              <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Eye size={28} />
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.85rem' }}>
                Nossa Visão
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Ser reconhecida como a loja especializada e referência número 1 em confiança, velocidade logística e bom atendimento em toda a região, consolidando parcerias de longo prazo com eletricistas, instaladores hidráulicos e construtoras.
              </p>
            </div>

            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.82rem', fontWeight: 700, color: '#0284c7' }}>
              👁️ Referência Regional em Confiança
            </div>
          </div>

          {/* Card 3: Valores */}
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem 2rem',
              borderRadius: 'var(--radius-xl)',
              border: isDark ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid #e2e8f0',
              background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
              boxShadow: isDark ? 'var(--shadow-md)' : '0 8px 24px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#16a34a';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(16, 185, 129, 0.25)' : '#e2e8f0';
            }}
          >
            <div>
              <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: isDark ? 'rgba(16, 185, 129, 0.15)' : '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <HeartHandshake size={28} />
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.85rem' }}>
                Nossos Valores
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-main)' }}>• Honestidade no Balcão:</strong> Sem empurrar itens desnecessários.
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-main)' }}>• Agilidade & Respeito ao Prazo:</strong> Sua obra não pode esperar.
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-main)' }}>• Produtos Originais:</strong> Qualidade garantida de fábrica.
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-main)' }}>• Parceria Duradoura:</strong> Crescemos junto com nossos clientes.
                </li>
              </ul>
            </div>

            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.82rem', fontWeight: 700, color: '#16a34a' }}>
              💎 Ética e Parceria em Primeiro Lugar
            </div>
          </div>

        </div>

        {/* Banner de Ação / Contato */}
        <div style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(26, 31, 44, 0.95) 0%, rgba(15, 18, 25, 0.98) 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #fefce8 100%)',
          border: isDark ? '1px solid rgba(250, 204, 21, 0.35)' : '1px solid #fde047',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div>
            <span className="badge-yellow" style={{ marginBottom: '0.5rem' }}>
              Atendimento Especializado
            </span>
            <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 800, marginBottom: '0.35rem' }}>
              Quer economizar na sua lista de materiais?
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
              Fale agora com nossa equipe ou navegue pelo catálogo completo de produtos com pronta entrega.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={onGoToStore}
              className="btn-primary"
              style={{ padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
            >
              <span>Ver Produtos</span>
              <ArrowRight size={17} />
            </button>

            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Li sobre a missão da HidraElétrica e gostaria de fazer um orçamento.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
            >
              <MessageSquare size={17} />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import {
  ShoppingCart,
  User,
  ShieldCheck,
  Search,
  Menu,
  X,
  Phone,
  Sun,
  Moon,
  ExternalLink,
  Zap,
  Droplets,
  Lightbulb,
  Wrench,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';
import { HidraIcon } from './HidraIcon';
import { InstagramIcon } from './SocialIcons';

interface HeaderProps {
  onOpenAuth: () => void;
  currentView: 'home' | 'loja' | 'missao' | 'sobre' | 'admin' | 'buyer';
  setCurrentView: (view: 'home' | 'loja' | 'missao' | 'sobre' | 'admin' | 'buyer') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAuth,
  currentView,
  setCurrentView
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { currentUser, isStoreAdmin, isBuyer, logout } = useAuth();
  const { storeSettings, searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useStore();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    setCurrentView('loja');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      {/* 1. BARRA SUPERIOR AMARELA - SLIM, ELEGANTE & DIRETA COM INFORMAÇÕES ÚTEIS */}
      <div className="announcement-bar" style={{ padding: '0.35rem 1rem', fontSize: '0.78rem' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '1rem', flexWrap: 'wrap' }}>
          
          {/* Identificação */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 800, letterSpacing: '0.02em' }}>
              ⚡ HIDRAELÉTRICA
            </span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span style={{ fontWeight: 700 }} className="desktop-tagline">
              +6 Anos de Excelência em Elétrica & Hidráulica
            </span>
          </div>

          {/* Informações Úteis de Contato & Entrega */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.76rem' }}>
            <span style={{ fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              📦 Pronta Entrega para sua Obra
            </span>
            <span style={{ opacity: 0.4 }}>•</span>
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#000000', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              💬 Televendas: {storeSettings.phone || storeSettings.whatsapp_number}
            </a>
            <span style={{ opacity: 0.4 }}>•</span>
            <span style={{ fontWeight: 700 }}>
              🔒 Produtos 100% Originais
            </span>
          </div>

        </div>
      </div>

      {/* 2. BARRA DE NAVEGAÇÃO PRINCIPAL (MENUS ALINHADOS À ESQUERDA) */}
      <nav style={{
        background: isDark ? 'rgba(11, 14, 20, 0.98)' : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(16px)',
        borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
        transition: 'all 0.25s ease'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.5rem', gap: '2rem' }}>
          
          {/* GRUPO ESQUERDA: Logo + Menus Alinhados à Esquerda */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            {/* Logo da HidraElétrica */}
            <div
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', userSelect: 'none', flexShrink: 0 }}
            >
              <HidraIcon size={38} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', lineHeight: 1.1 }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
                    Hidra
                  </span>
                  <span style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'Outfit', color: isDark ? 'var(--yellow-400)' : '#d97706', letterSpacing: '-0.03em' }}>
                    Elétrica
                  </span>
                </div>
                <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>
                  Materiais Elétricos & Hidráulicos
                </span>
              </div>
            </div>

            {/* Menus Começando da Esquerda (ao lado do logo) */}
            <div style={{ display: 'none', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
              <button
                onClick={() => setCurrentView('home')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentView === 'home' ? (isDark ? 'var(--yellow-400)' : '#b45309') : 'var(--text-main)',
                  fontWeight: currentView === 'home' ? 800 : 600,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  borderBottom: currentView === 'home' ? `2px solid ${isDark ? 'var(--yellow-400)' : '#b45309'}` : '2px solid transparent',
                  paddingBottom: '3px',
                  transition: 'all 0.15s ease'
                }}
              >
                Início
              </button>

              <button
                onClick={() => { setActiveCategory('todos'); setCurrentView('loja'); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentView === 'loja' ? (isDark ? 'var(--yellow-400)' : '#b45309') : 'var(--text-main)',
                  fontWeight: currentView === 'loja' ? 800 : 600,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  borderBottom: currentView === 'loja' ? `2px solid ${isDark ? 'var(--yellow-400)' : '#b45309'}` : '2px solid transparent',
                  paddingBottom: '3px',
                  transition: 'all 0.15s ease'
                }}
              >
                Produtos
              </button>

              <button
                onClick={() => setCurrentView('missao')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentView === 'missao' ? (isDark ? 'var(--yellow-400)' : '#b45309') : 'var(--text-main)',
                  fontWeight: currentView === 'missao' ? 800 : 600,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  borderBottom: currentView === 'missao' ? `2px solid ${isDark ? 'var(--yellow-400)' : '#b45309'}` : '2px solid transparent',
                  paddingBottom: '3px',
                  transition: 'all 0.15s ease'
                }}
              >
                Nossa Missão
              </button>

              <button
                onClick={() => setCurrentView('sobre')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentView === 'sobre' ? (isDark ? 'var(--yellow-400)' : '#b45309') : 'var(--text-main)',
                  fontWeight: currentView === 'sobre' ? 800 : 600,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  borderBottom: currentView === 'sobre' ? `2px solid ${isDark ? 'var(--yellow-400)' : '#b45309'}` : '2px solid transparent',
                  paddingBottom: '3px',
                  transition: 'all 0.15s ease'
                }}
              >
                Sobre Nós
              </button>
            </div>
          </div>

          {/* Busca visível no Header apenas quando estiver navegando no catálogo da Loja para não poluir a Home */}
          {currentView === 'loja' && (
            <div style={{ position: 'relative', flex: '1', maxWidth: '320px', display: 'none' }} className="desktop-search">
              <Search size={15} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Filtrar materiais..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: isDark ? 'rgba(21, 25, 34, 0.9)' : '#f1f5f9',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #cbd5e1',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.5rem 1rem 0.5rem 2.2rem',
                  fontSize: '0.84rem',
                  color: 'var(--text-main)',
                  outline: 'none'
                }}
              />
            </div>
          )}

          {/* Ações da Direita */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            
            {/* Botão Entrar ou Painel */}
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {isStoreAdmin ? (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="btn-outline-yellow"
                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                  >
                    <ShieldCheck size={16} />
                    <span>Painel Loja</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentView('buyer')}
                    className="btn-secondary"
                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                  >
                    <User size={16} />
                    <span>Minhas Compras</span>
                  </button>
                )}
                <button
                  onClick={logout}
                  title="Sair"
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-dim)',
                    padding: '0.45rem 0.65rem',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: '0.78rem'
                  }}
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="btn-secondary"
                style={{ fontSize: '0.84rem', padding: '0.5rem 0.95rem' }}
              >
                <User size={15} />
                <span>Entrar</span>
              </button>
            )}

            {/* Alternador de Tema Escuro / Claro */}
            <button
              onClick={toggleTheme}
              style={{
                background: isDark ? 'rgba(255, 255, 255, 0.06)' : '#f1f5f9',
                border: isDark ? '1px solid rgba(250, 204, 21, 0.25)' : '1px solid #cbd5e1',
                color: isDark ? 'var(--yellow-400)' : '#d97706',
                borderRadius: 'var(--radius-md)',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title={isDark ? 'Tema Claro' : 'Tema Escuro'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Botão Carrinho de Compras */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-primary"
              style={{
                padding: '0.55rem 1rem',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <ShoppingCart size={18} />
              <span style={{ display: 'none' }} className="desktop-cart-label">Carrinho</span>
              {totalItems > 0 && (
                <span
                  style={{
                    background: '#0b0d12',
                    color: 'var(--yellow-400)',
                    fontWeight: 900,
                    fontSize: '0.74rem',
                    borderRadius: '999px',
                    padding: '0.1rem 0.45rem',
                    border: '1px solid var(--yellow-400)'
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Menu Hamburger Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-main)',
                display: 'block',
                cursor: 'pointer',
                padding: '0.3rem'
              }}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

          </div>
        </div>

        {/* 3. SUB-NAV BAR DE DEPARTAMENTOS RÁPIDOS: VISÍVEL SOMENTE NA VIEW DA LOJA */}
        {currentView === 'loja' && (
          <div className="sub-nav-bar">
            <div className="container" style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', gap: '0.5rem', scrollbarWidth: 'none' }}>
              <button
                onClick={() => handleCategoryClick('todos')}
                className={`sub-nav-link ${activeCategory === 'todos' ? 'active' : ''}`}
              >
                <ShoppingBag size={14} />
                <span>Todos os Produtos</span>
              </button>

              <button
                onClick={() => handleCategoryClick('eletrica')}
                className={`sub-nav-link ${activeCategory === 'eletrica' ? 'active' : ''}`}
              >
                <Zap size={14} color="#facc15" />
                <span>Elétrica</span>
              </button>

              <button
                onClick={() => handleCategoryClick('hidraulica')}
                className={`sub-nav-link ${activeCategory === 'hidraulica' ? 'active' : ''}`}
              >
                <Droplets size={14} color="#38bdf8" />
                <span>Hidráulica</span>
              </button>

              <button
                onClick={() => handleCategoryClick('iluminacao')}
                className={`sub-nav-link ${activeCategory === 'iluminacao' ? 'active' : ''}`}
              >
                <Lightbulb size={14} color="#fbbf24" />
                <span>Iluminação</span>
              </button>

              <button
                onClick={() => handleCategoryClick('ferramentas')}
                className={`sub-nav-link ${activeCategory === 'ferramentas' ? 'active' : ''}`}
              >
                <Wrench size={14} color="#34d399" />
                <span>Ferramentas</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. MENU RETRÁTIL MOBILE */}
        {mobileMenuOpen && (
          <div style={{
            background: isDark ? 'rgba(11, 14, 20, 0.98)' : '#ffffff',
            borderTop: '1px solid var(--border-subtle)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <button
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-main)', textAlign: 'left', fontSize: '1rem', fontWeight: 600, padding: '0.4rem 0' }}
            >
              🏠 Início
            </button>
            <button
              onClick={() => { setActiveCategory('todos'); setCurrentView('loja'); setMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-main)', textAlign: 'left', fontSize: '1rem', fontWeight: 600, padding: '0.4rem 0' }}
            >
              📦 Produtos
            </button>
            <button
              onClick={() => { setCurrentView('missao'); setMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-main)', textAlign: 'left', fontSize: '1rem', fontWeight: 600, padding: '0.4rem 0' }}
            >
              🎯 Nossa Missão
            </button>
            <button
              onClick={() => { setCurrentView('sobre'); setMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-main)', textAlign: 'left', fontSize: '1rem', fontWeight: 600, padding: '0.4rem 0' }}
            >
              ℹ️ Sobre Nós
            </button>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              <a href="https://www.mercadolivre.com.br" target="_blank" rel="noopener noreferrer" className="announcement-pill">
                Mercado Livre
              </a>
              <a href="https://shopee.com.br" target="_blank" rel="noopener noreferrer" className="announcement-pill">
                Shopee
              </a>
              <a href="https://www.instagram.com/hidra.eletrica" target="_blank" rel="noopener noreferrer" className="announcement-pill">
                <InstagramIcon size={12} color="#c026d3" /> @hidra.eletrica
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Breakpoints CSS */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .desktop-search { display: block !important; }
          .desktop-cart-label { display: inline !important; }
          .desktop-tagline { display: inline !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};

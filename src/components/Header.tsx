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
  currentView: 'home' | 'loja' | 'sobre' | 'admin' | 'buyer';
  setCurrentView: (view: 'home' | 'loja' | 'sobre' | 'admin' | 'buyer') => void;
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
    <header style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}>
      {/* 1. BARRA SUPERIOR AMARELA VIBRANTE COM MERCADO LIVRE, SHOPEE E INSTAGRAM */}
      <div className="announcement-bar">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '0.6rem' }}>
          
          {/* Lado Esquerdo: Identificação Oficial */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.02em' }}>
              ⚡ LOJA OFICIAL HIDRAELÉTRICA
            </span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, display: 'none' }} className="desktop-tagline">
              Materiais Elétricos & Hidráulicos com Pronta Entrega
            </span>
          </div>

          {/* Centro: Presença em Marketplaces (Mercado Livre & Shopee) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, opacity: 0.9 }}>
              Compre também no:
            </span>
            
            {/* Atalho Mercado Livre */}
            <a
              href="https://www.mercadolivre.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="announcement-pill"
              title="Visitar nossa loja no Mercado Livre"
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb', display: 'inline-block' }}></span>
              <span>Mercado Livre</span>
              <ExternalLink size={11} />
            </a>

            {/* Atalho Shopee */}
            <a
              href="https://shopee.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="announcement-pill"
              title="Visitar nossa loja na Shopee"
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ee4d2d', display: 'inline-block' }}></span>
              <span>Shopee</span>
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Lado Direito: Instagram @hidra.eletrica e WhatsApp */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href="https://www.instagram.com/hidra.eletrica"
              target="_blank"
              rel="noopener noreferrer"
              className="announcement-pill"
              style={{ fontWeight: 800 }}
              title="Instagram Oficial da HidraElétrica"
            >
              <InstagramIcon size={13} color="#c026d3" />
              <span>@hidra.eletrica</span>
            </a>

            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="announcement-pill"
              title="Atendimento via WhatsApp"
            >
              <Phone size={12} color="#15803d" />
              <span>{storeSettings.phone}</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. BARRA DE NAVEGAÇÃO PRINCIPAL (ARRUMADA, MODERNA & ALINHADA) */}
      <nav style={{
        background: isDark ? 'rgba(11, 14, 20, 0.97)' : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isDark ? '1px solid rgba(250, 204, 21, 0.15)' : '1px solid #e2e8f0',
        transition: 'background-color 0.25s ease, border-color 0.25s ease'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.5rem', gap: '1.25rem' }}>
          
          {/* Logo da HidraElétrica com Ícone Oficial */}
          <div
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', userSelect: 'none', flexShrink: 0 }}
          >
            <HidraIcon size={42} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', lineHeight: 1.1 }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
                  Hidra
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'Outfit', color: isDark ? 'var(--yellow-400)' : '#d97706', letterSpacing: '-0.03em' }}>
                  Elétrica
                </span>
              </div>
              <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)', letterSpacing: '0.09em', textTransform: 'uppercase', display: 'block', fontWeight: 600 }}>
                Materiais Elétricos & Hidráulicos
              </span>
            </div>
          </div>

          {/* Barra de Busca Central Moderna & Arrumada */}
          <div style={{ position: 'relative', flex: '1', maxWidth: '420px', display: 'none' }} className="desktop-search">
            <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Buscar cabos, tubos, disjuntores, lâmpadas..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                if (currentView !== 'loja') setCurrentView('loja');
              }}
              style={{
                width: '100%',
                background: isDark ? 'rgba(21, 25, 34, 0.95)' : '#f1f5f9',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #cbd5e1',
                borderRadius: 'var(--radius-full)',
                padding: '0.6rem 1rem 0.6rem 2.4rem',
                fontSize: '0.88rem',
                color: 'var(--text-main)',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = isDark ? 'var(--yellow-400)' : '#d97706';
                e.currentTarget.style.boxShadow = isDark ? '0 0 0 3px rgba(250, 204, 21, 0.2)' : '0 0 0 3px rgba(217, 119, 6, 0.15)';
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Menus Principais Desktop */}
          <div style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
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
                transition: 'color 0.2s ease'
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
                transition: 'color 0.2s ease'
              }}
            >
              Produtos / Loja
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
                transition: 'color 0.2s ease'
              }}
            >
              Sobre Nós
            </button>

            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Gostaria de solicitar um orçamento de materiais.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#16a34a',
                fontWeight: 700,
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.25)'
              }}
            >
              <Phone size={13} />
              <span>Cotação WhatsApp</span>
            </a>
          </div>

          {/* Ações da Direita: Autenticação, Tema e Carrinho */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            
            {/* Botão Entrar ou Painel */}
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {isStoreAdmin ? (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="btn-outline-yellow"
                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                    title="Acessar o Painel da Loja"
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
                  title="Sair da conta"
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
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
              title={isDark ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Botão Carrinho de Compras */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-primary"
              style={{
                padding: '0.55rem 1.1rem',
                fontSize: '0.88rem',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              title="Abrir Carrinho"
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
                    border: '1px solid var(--yellow-400)',
                    minWidth: '20px',
                    textAlign: 'center'
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
              title="Menu de Navegação"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

          </div>
        </div>

        {/* 3. SUB-NAV BAR DE DEPARTAMENTOS RÁPIDOS (ARRUMADO & ACESSÍVEL) */}
        <div className="sub-nav-bar">
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto', gap: '0.5rem', scrollbarWidth: 'none' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap' }}>
              <button
                onClick={() => handleCategoryClick('todos')}
                className={`sub-nav-link ${currentView === 'loja' && activeCategory === 'todos' ? 'active' : ''}`}
              >
                <ShoppingBag size={14} />
                <span>Todos os Produtos</span>
              </button>

              <button
                onClick={() => handleCategoryClick('eletrica')}
                className={`sub-nav-link ${currentView === 'loja' && activeCategory === 'eletrica' ? 'active' : ''}`}
              >
                <Zap size={14} color="#facc15" />
                <span>Elétrica & Cabos</span>
              </button>

              <button
                onClick={() => handleCategoryClick('hidraulica')}
                className={`sub-nav-link ${currentView === 'loja' && activeCategory === 'hidraulica' ? 'active' : ''}`}
              >
                <Droplets size={14} color="#38bdf8" />
                <span>Hidráulica & Tubos</span>
              </button>

              <button
                onClick={() => handleCategoryClick('iluminacao')}
                className={`sub-nav-link ${currentView === 'loja' && activeCategory === 'iluminacao' ? 'active' : ''}`}
              >
                <Lightbulb size={14} color="#fbbf24" />
                <span>Iluminação LED</span>
              </button>

              <button
                onClick={() => handleCategoryClick('ferramentas')}
                className={`sub-nav-link ${currentView === 'loja' && activeCategory === 'ferramentas' ? 'active' : ''}`}
              >
                <Wrench size={14} color="#34d399" />
                <span>Ferramentas & Bombas</span>
              </button>
            </div>

            {/* Destaque rápido à direita do Sub-nav */}
            <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem', whiteSpace: 'nowrap' }} className="desktop-subnav-links">
              <a
                href="https://www.instagram.com/hidra.eletrica"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}
              >
                <InstagramIcon size={13} color="#e1306c" />
                <span>Instagram: @hidra.eletrica</span>
              </a>
              <span style={{ opacity: 0.3 }}>|</span>
              <span style={{ fontSize: '0.78rem', color: isDark ? 'var(--yellow-400)' : '#d97706', fontWeight: 700 }}>
                📦 Pronta Entrega para Obras
              </span>
            </div>

          </div>
        </div>

        {/* 4. MENU RETRÁTIL MOBILE COMPLETO */}
        {mobileMenuOpen && (
          <div style={{
            background: isDark ? 'rgba(11, 14, 20, 0.98)' : '#ffffff',
            borderTop: '1px solid var(--border-subtle)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-lg)'
          }}>
            {/* Busca Mobile */}
            <input
              type="text"
              placeholder="Buscar materiais..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentView('loja');
              }}
              className="form-input"
              style={{ fontSize: '0.9rem' }}
            />

            {/* Links de Páginas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
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
                📦 Todos os Produtos / Loja
              </button>
              <button
                onClick={() => { setCurrentView('sobre'); setMobileMenuOpen(false); }}
                style={{ background: 'none', border: 'none', color: 'var(--text-main)', textAlign: 'left', fontSize: '1rem', fontWeight: 600, padding: '0.4rem 0' }}
              >
                ℹ️ Sobre Nós
              </button>
            </div>

            {/* Categorias Rápidas Mobile */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--yellow-400)' }}>
                Departamentos
              </span>
              <button
                onClick={() => handleCategoryClick('eletrica')}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', textAlign: 'left', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                ⚡ Elétrica & Cabos
              </button>
              <button
                onClick={() => handleCategoryClick('hidraulica')}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', textAlign: 'left', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                💧 Hidráulica & Tubos
              </button>
              <button
                onClick={() => handleCategoryClick('iluminacao')}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', textAlign: 'left', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                💡 Iluminação LED
              </button>
              <button
                onClick={() => handleCategoryClick('ferramentas')}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', textAlign: 'left', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                🛠️ Ferramentas & Bombas
              </button>
            </div>

            {/* Marketplaces & Redes Mobile */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--yellow-400)' }}>
                Canais de Venda Oficiais
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <a
                  href="https://www.mercadolivre.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="announcement-pill"
                >
                  Mercado Livre <ExternalLink size={11} />
                </a>
                <a
                  href="https://shopee.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="announcement-pill"
                >
                  Shopee <ExternalLink size={11} />
                </a>
                <a
                  href="https://www.instagram.com/hidra.eletrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="announcement-pill"
                >
                  <InstagramIcon size={12} color="#c026d3" /> @hidra.eletrica
                </a>
              </div>
            </div>

            {/* Ações de Conta */}
            {currentUser && isStoreAdmin && (
              <button
                onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
                style={{ background: 'none', border: 'none', color: 'var(--yellow-400)', textAlign: 'left', fontSize: '1rem', fontWeight: 700, padding: '0.5rem 0' }}
              >
                ⚙️ Painel da Loja (Admin)
              </button>
            )}
            {currentUser && isBuyer && (
              <button
                onClick={() => { setCurrentView('buyer'); setMobileMenuOpen(false); }}
                style={{ background: 'none', border: 'none', color: 'var(--yellow-400)', textAlign: 'left', fontSize: '1rem', fontWeight: 700, padding: '0.5rem 0' }}
              >
                📋 Minhas Compras
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Breakpoints CSS para menus organizados */}
      <style>{`
        @media (min-width: 960px) {
          .desktop-nav { display: flex !important; }
          .desktop-search { display: block !important; }
          .desktop-cart-label { display: inline !important; }
          .desktop-tagline { display: inline !important; }
          .desktop-subnav-links { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};

import React, { useState } from 'react';
import { ShoppingCart, User, ShieldCheck, Search, Menu, X, Phone, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';
import { HidraIcon } from './HidraIcon';

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
  const { storeSettings, searchQuery, setSearchQuery } = useStore();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%' }}>
      {/* Faixa superior de avisos e contato */}
      <div className="announcement-bar">
        <span>{storeSettings.announcement_banner}</span>
        <span style={{ opacity: 0.5, margin: '0 0.5rem' }}>|</span>
        <a 
          href={`https://wa.me/${cleanPhone}`} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--yellow-400)' }}
        >
          <Phone size={13} />
          <span>WhatsApp: {storeSettings.phone}</span>
        </a>
      </div>

      {/* Barra de Navegação Principal */}
      <nav className="glass-panel" style={{ borderBottom: '1px solid var(--border-subtle)', background: 'rgba(10, 12, 16, 0.92)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1.5rem', gap: '1.5rem' }}>
          
          {/* Logo da HidraElétrica com Ícone Oficial */}
          <div 
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', userSelect: 'none' }}
          >
            <HidraIcon size={40} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <span style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
                  Hidra
                </span>
                <span style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--yellow-400)', letterSpacing: '-0.03em' }}>
                  Elétrica
                </span>
              </div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginTop: '-3px' }}>
                Materiais Técnicos & Obra
              </span>
            </div>
          </div>

          {/* Links de navegação Desktop */}
          <div style={{ display: 'none', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
            <button
              onClick={() => setCurrentView('home')}
              style={{
                background: 'none',
                border: 'none',
                color: currentView === 'home' ? 'var(--yellow-400)' : 'var(--text-main)',
                fontWeight: currentView === 'home' ? 700 : 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                borderBottom: currentView === 'home' ? '2px solid var(--yellow-400)' : '2px solid transparent',
                paddingBottom: '4px'
              }}
            >
              Início
            </button>
            <button
              onClick={() => setCurrentView('loja')}
              style={{
                background: 'none',
                border: 'none',
                color: currentView === 'loja' ? 'var(--yellow-400)' : 'var(--text-main)',
                fontWeight: currentView === 'loja' ? 700 : 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                borderBottom: currentView === 'loja' ? '2px solid var(--yellow-400)' : '2px solid transparent',
                paddingBottom: '4px'
              }}
            >
              Catálogo / Loja
            </button>
            <button
              onClick={() => setCurrentView('sobre')}
              style={{
                background: 'none',
                border: 'none',
                color: currentView === 'sobre' ? 'var(--yellow-400)' : 'var(--text-main)',
                fontWeight: currentView === 'sobre' ? 700 : 500,
                fontSize: '0.95rem',
                cursor: 'pointer',
                borderBottom: currentView === 'sobre' ? '2px solid var(--yellow-400)' : '2px solid transparent',
                paddingBottom: '4px'
              }}
            >
              Sobre Nós
            </button>
          </div>

          {/* Barra de busca rápida */}
          <div style={{ position: 'relative', flex: '1', maxWidth: '320px', display: 'none' }} className="desktop-search">
            <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar tubos, fios, disjuntores..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                if (currentView !== 'loja') setCurrentView('loja');
              }}
              style={{
                width: '100%',
                background: 'rgba(21, 25, 34, 0.9)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-full)',
                padding: '0.55rem 1rem 0.55rem 2.2rem',
                fontSize: '0.85rem',
                color: '#fff',
                outline: 'none'
              }}
            />
          </div>

          {/* Ações: Painel/Login e Carrinho */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {isStoreAdmin ? (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="btn-outline-yellow"
                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                  >
                    <ShieldCheck size={16} />
                    <span>Painel da Loja</span>
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
                style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
              >
                <User size={16} />
                <span>Entrar</span>
              </button>
            )}

            {/* Alternador de Tema Escuro / Claro */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-card)',
                color: isDark ? 'var(--yellow-400)' : '#b45309',
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
              {isDark ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {/* Botão Carrinho */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-primary"
              style={{
                padding: '0.55rem 1.1rem',
                fontSize: '0.9rem',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              title="Abrir Carrinho de Compras"
            >
              <ShoppingCart size={19} />
              <span style={{ display: 'none' }} className="desktop-cart-label">Carrinho</span>
              {totalItems > 0 && (
                <span
                  style={{
                    background: '#0b0d12',
                    color: 'var(--yellow-400)',
                    fontWeight: 800,
                    fontSize: '0.75rem',
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
                cursor: 'pointer'
              }}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Menu Retrátil Mobile */}
        {mobileMenuOpen && (
          <div style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
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
            <button
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontSize: '1rem', fontWeight: 600, padding: '0.5rem 0' }}
            >
              Início
            </button>
            <button
              onClick={() => { setCurrentView('loja'); setMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontSize: '1rem', fontWeight: 600, padding: '0.5rem 0' }}
            >
              Catálogo / Loja
            </button>
            <button
              onClick={() => { setCurrentView('sobre'); setMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontSize: '1rem', fontWeight: 600, padding: '0.5rem 0' }}
            >
              Sobre Nós
            </button>
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

      {/* Responsividade CSS embutida para breakpoints */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .desktop-search { display: block !important; }
          .desktop-cart-label { display: inline !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};

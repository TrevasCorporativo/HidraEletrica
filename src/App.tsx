import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider, useStore } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { AboutSection } from './components/AboutSection';
import { BrandsSection } from './components/BrandsSection';
import { Footer } from './components/Footer';
import { MarketplacesSection } from './components/MarketplacesSection';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { BuyerDashboard } from './components/buyer/BuyerDashboard';
import { Product, UserRole } from './types';
import { ArrowRight, MessageSquare, Zap, Filter, Search, Droplets, Lightbulb, Wrench, Sparkles, Star } from 'lucide-react';
import { HidraIcon } from './components/HidraIcon';
import { useTheme } from './context/ThemeContext';

const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'loja' | 'sobre' | 'admin' | 'buyer'>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortOption, setSortOption] = useState<'relevancia' | 'menor_preco' | 'maior_preco' | 'nome'>('relevancia');
  const [homeCategoryFilter, setHomeCategoryFilter] = useState<string>('todos');

  const { isStoreAdmin, isBuyer } = useAuth();
  const { isDark } = useTheme();
  const { activeProducts, activeCategory, setActiveCategory, searchQuery, setSearchQuery, storeSettings } = useStore();

  // Filtragem dos produtos ativos para a loja
  let displayedProducts = activeProducts.filter(p => {
    // Filtro por categoria
    if (activeCategory !== 'todos' && p.category_id !== activeCategory) {
      return false;
    }
    // Filtro por busca
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      return matchName || matchBrand || matchSku || matchDesc;
    }
    return true;
  });

  // Ordenação
  displayedProducts.sort((a, b) => {
    if (sortOption === 'menor_preco') return a.price - b.price;
    if (sortOption === 'maior_preco') return b.price - a.price;
    if (sortOption === 'nome') return a.name.localeCompare(b.name);
    return 0;
  });

  // Produtos em destaque para a home com filtro dinâmico
  const homeFeaturedProducts = activeProducts.filter(p => {
    if (homeCategoryFilter !== 'todos' && p.category_id !== homeCategoryFilter) {
      return false;
    }
    return p.featured || homeCategoryFilter !== 'todos';
  }).slice(0, 8);

  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  const quoteTitle = storeSettings.quote_banner_title || 'Tem uma lista de materiais ou projeto em mãos?';
  const quoteDesc = storeSettings.quote_banner_desc || 'Envie sua planilha ou foto da lista diretamente pelo WhatsApp. Nossa equipe de orçamentos calcula as melhores condições com entrega ágil para sua obra.';

  const handleAuthSuccess = (role: UserRole) => {
    if (role === 'loja') {
      setCurrentView('admin');
    } else {
      setCurrentView('buyer');
    }
  };

  const handleSelectDepartment = (catId: string) => {
    setActiveCategory(catId);
    setCurrentView('loja');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Cabeçalho */}
      <Header
        onOpenAuth={() => setIsAuthModalOpen(true)}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Conteúdo Principal Conforme a View Ativa */}
      <main style={{ flex: 1 }}>
        
        {/* VIEW 1: HOME / LANDING PAGE (DESEMBOLADA, MODERNA & ORGANIZADA) */}
        {currentView === 'home' && (
          <div>
            {/* 1. Hero Principal com 2 Colunas, Barra de Busca e Atalhos */}
            <Hero
              onGoToStore={() => { setCurrentView('loja'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onSelectCategory={handleSelectDepartment}
            />

            {/* 2. Presença em Marketplaces (Mercado Livre, Shopee e Instagram @hidra.eletrica) */}
            <MarketplacesSection />

            {/* 3. Departamentos Técnicos Principais */}
            <section style={{ padding: '3.5rem 0 2rem 0' }}>
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <span className="badge-yellow" style={{ marginBottom: '0.5rem' }}>
                    Departamentos Técnicos
                  </span>
                  <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.3rem)', fontWeight: 800 }}>
                    Soluções Completas para sua Obra
                  </h2>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                    Navegue pelas principais categorias de materiais a pronta entrega
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.25rem'
                }}>
                  {/* Card Elétrica */}
                  <div
                    onClick={() => handleSelectDepartment('eletrica')}
                    className="glass-panel"
                    style={{
                      padding: '1.75rem',
                      borderRadius: 'var(--radius-xl)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      border: isDark ? '1px solid rgba(250, 204, 21, 0.25)' : '1px solid #e2e8f0',
                      background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
                      boxShadow: isDark ? 'none' : '0 4px 16px rgba(0, 0, 0, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = 'var(--yellow-400)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-yellow)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = isDark ? 'rgba(250, 204, 21, 0.25)' : '#e2e8f0';
                      e.currentTarget.style.boxShadow = isDark ? 'none' : '0 4px 16px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    <div>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: isDark ? 'rgba(250, 204, 21, 0.15)' : '#fef3c7', color: isDark ? 'var(--yellow-400)' : '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Zap size={24} />
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                        Elétrica Predial & Industrial
                      </h3>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                        Cabos flexíveis antichama, disjuntores DIN, quadros, conduítes e tomadas Steck/Schneider.
                      </p>
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: isDark ? 'var(--yellow-400)' : '#b45309', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      Ver Produtos Elétricos <ArrowRight size={14} />
                    </span>
                  </div>

                  {/* Card Hidráulica */}
                  <div
                    onClick={() => handleSelectDepartment('hidraulica')}
                    className="glass-panel"
                    style={{
                      padding: '1.75rem',
                      borderRadius: 'var(--radius-xl)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      border: isDark ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid #e2e8f0',
                      background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
                      boxShadow: isDark ? 'none' : '0 4px 16px rgba(0, 0, 0, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = '#0284c7';
                      e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(2, 132, 199, 0.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = isDark ? 'rgba(56, 189, 248, 0.25)' : '#e2e8f0';
                      e.currentTarget.style.boxShadow = isDark ? 'none' : '0 4px 16px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    <div>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Droplets size={24} />
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                        Hidráulica & Conexões
                      </h3>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                        Tubos soldáveis marrom, conexões PVC/PPR, caixas d’água e registros Deca e Tigre.
                      </p>
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0284c7', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      Ver Produtos Hidráulicos <ArrowRight size={14} />
                    </span>
                  </div>

                  {/* Card Iluminação */}
                  <div
                    onClick={() => handleSelectDepartment('iluminacao')}
                    className="glass-panel"
                    style={{
                      padding: '1.75rem',
                      borderRadius: 'var(--radius-xl)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      border: isDark ? '1px solid rgba(251, 191, 36, 0.25)' : '1px solid #e2e8f0',
                      background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
                      boxShadow: isDark ? 'none' : '0 4px 16px rgba(0, 0, 0, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = '#d97706';
                      e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(217, 119, 6, 0.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = isDark ? 'rgba(251, 191, 36, 0.25)' : '#e2e8f0';
                      e.currentTarget.style.boxShadow = isDark ? 'none' : '0 4px 16px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    <div>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: isDark ? 'rgba(251, 191, 36, 0.15)' : '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Lightbulb size={24} />
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                        Iluminação LED Técnica
                      </h3>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                        Refletores industriais IP66, painéis plafon slim e iluminação eficiente de alta durabilidade.
                      </p>
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#d97706', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      Ver Iluminação <ArrowRight size={14} />
                    </span>
                  </div>

                  {/* Card Ferramentas & Bombas */}
                  <div
                    onClick={() => handleSelectDepartment('ferramentas')}
                    className="glass-panel"
                    style={{
                      padding: '1.75rem',
                      borderRadius: 'var(--radius-xl)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      border: isDark ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid #e2e8f0',
                      background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
                      boxShadow: isDark ? 'none' : '0 4px 16px rgba(0, 0, 0, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = '#16a34a';
                      e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(22, 163, 74, 0.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = isDark ? 'rgba(16, 185, 129, 0.25)' : '#e2e8f0';
                      e.currentTarget.style.boxShadow = isDark ? 'none' : '0 4px 16px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    <div>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: isDark ? 'rgba(16, 185, 129, 0.15)' : '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Wrench size={24} />
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                        Ferramentas, EPIs & Bombas
                      </h3>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                        Multímetros digitais True RMS, alicates de precisão e pressurizadores de água automáticos.
                      </p>
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      Ver Ferramentas <ArrowRight size={14} />
                    </span>
                  </div>
                </div>

              </div>
            </section>

            {/* 4. Vitrine de Destaques com Seletor Rápido de Categorias (Sem Bagunça) */}
            <section style={{ padding: '3.5rem 0' }}>
              <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span className="badge-yellow" style={{ marginBottom: '0.5rem' }}>
                      <Star size={14} /> Mais Procurados na Loja
                    </span>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.3rem)', fontWeight: 800 }}>
                      Destaques da HidraElétrica
                    </h2>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                      Materiais de primeira linha prontos para envio imediato.
                    </p>
                  </div>

                  <button
                    onClick={() => { setActiveCategory('todos'); setCurrentView('loja'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="btn-outline-yellow"
                    style={{ fontSize: '0.9rem' }}
                  >
                    <span>Ver Catálogo Geral</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* Abas Rápidas de Filtragem na Home para Deixar Super Arrumado */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  overflowX: 'auto',
                  paddingBottom: '0.5rem',
                  marginBottom: '2rem',
                  scrollbarWidth: 'none'
                }}>
                  <button
                    onClick={() => setHomeCategoryFilter('todos')}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      border: homeCategoryFilter === 'todos' ? 'none' : '1px solid var(--border-card)',
                      background: homeCategoryFilter === 'todos' ? (isDark ? 'var(--yellow-400)' : '#d97706') : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
                      color: homeCategoryFilter === 'todos' ? (isDark ? '#000000' : '#ffffff') : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Star size={14} />
                    <span>Todos os Destaques</span>
                  </button>

                  <button
                    onClick={() => setHomeCategoryFilter('eletrica')}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      border: homeCategoryFilter === 'eletrica' ? 'none' : '1px solid var(--border-card)',
                      background: homeCategoryFilter === 'eletrica' ? (isDark ? 'var(--yellow-400)' : '#d97706') : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
                      color: homeCategoryFilter === 'eletrica' ? (isDark ? '#000000' : '#ffffff') : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Zap size={14} />
                    <span>Elétrica</span>
                  </button>

                  <button
                    onClick={() => setHomeCategoryFilter('hidraulica')}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      border: homeCategoryFilter === 'hidraulica' ? 'none' : '1px solid var(--border-card)',
                      background: homeCategoryFilter === 'hidraulica' ? '#0284c7' : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
                      color: homeCategoryFilter === 'hidraulica' ? '#ffffff' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Droplets size={14} />
                    <span>Hidráulica</span>
                  </button>

                  <button
                    onClick={() => setHomeCategoryFilter('iluminacao')}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      border: homeCategoryFilter === 'iluminacao' ? 'none' : '1px solid var(--border-card)',
                      background: homeCategoryFilter === 'iluminacao' ? (isDark ? 'var(--yellow-400)' : '#d97706') : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
                      color: homeCategoryFilter === 'iluminacao' ? (isDark ? '#000000' : '#ffffff') : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Lightbulb size={14} />
                    <span>Iluminação</span>
                  </button>

                  <button
                    onClick={() => setHomeCategoryFilter('ferramentas')}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      border: homeCategoryFilter === 'ferramentas' ? 'none' : '1px solid var(--border-card)',
                      background: homeCategoryFilter === 'ferramentas' ? '#16a34a' : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
                      color: homeCategoryFilter === 'ferramentas' ? '#ffffff' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Wrench size={14} />
                    <span>Ferramentas</span>
                  </button>
                </div>

                {/* Grid de Cards dos Produtos */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {homeFeaturedProducts.map(prod => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onSelectProduct={setSelectedProduct}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 5. Banner de Orçamento WhatsApp (Clean, Sofisticado & Focado) */}
            <section style={{ padding: '1rem 0 4rem 0' }}>
              <div className="container">
                <div style={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(22, 26, 35, 0.95) 0%, rgba(15, 18, 24, 0.98) 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #fefce8 100%)',
                  border: isDark ? '1px solid rgba(250, 204, 21, 0.35)' : '1px solid #fde047',
                  borderRadius: 'var(--radius-xl)',
                  padding: '3rem 2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '2rem',
                  boxShadow: isDark ? 'var(--shadow-md)' : '0 10px 30px rgba(0, 0, 0, 0.06)'
                }}>
                  <div style={{ maxWidth: '620px' }}>
                    <span className="badge-yellow" style={{ marginBottom: '0.75rem' }}>
                      Atendimento Especializado para Obras
                    </span>
                    <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.6rem' }}>
                      {quoteTitle}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {quoteDesc}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Tenho uma lista de materiais para cotar na HidraElétrica.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                    style={{ padding: '1rem 2rem', fontSize: '1.05rem', whiteSpace: 'nowrap' }}
                  >
                    <MessageSquare size={20} />
                    <span>Enviar Lista pelo WhatsApp</span>
                  </a>
                </div>
              </div>
            </section>

            {/* 6. Marcas Parceiras Oficiais */}
            <BrandsSection />

            {/* 7. Diferenciais e Tradição (AboutSection) */}
            <AboutSection onGoToStore={() => { setCurrentView('loja'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />

          </div>
        )}

        {/* VIEW 2: LOJA / CATÁLOGO COMPLETO */}
        {currentView === 'loja' && (
          <div style={{ padding: '3rem 0 5rem 0' }}>
            <div className="container">
              
              {/* Cabeçalho da Loja */}
              <div style={{ marginBottom: '2rem' }}>
                <span className="badge-yellow" style={{ marginBottom: '0.5rem' }}>
                  Catálogo Oficial
                </span>
                <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Loja de Materiais Elétricos & Hidráulicos
                </h1>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  Selecione os itens para sua obra e envie o pedido diretamente para o WhatsApp da loja.
                </p>
              </div>

              {/* Filtro de Categorias */}
              <div style={{ marginBottom: '2rem' }}>
                <CategoryFilter />
              </div>

              {/* Barra de Busca e Ordenação */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2rem',
                padding: '1rem',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
                  <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Buscar por nome, marca ou código SKU..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.3rem' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Ordenar por:</span>
                  <select
                    value={sortOption}
                    onChange={e => setSortOption(e.target.value as any)}
                    className="form-select"
                    style={{ width: 'auto', padding: '0.45rem 1rem' }}
                  >
                    <option value="relevancia">Relevância / Destaques</option>
                    <option value="menor_preco">Menor Preço</option>
                    <option value="maior_preco">Maior Preço</option>
                    <option value="nome">Nome (A - Z)</option>
                  </select>
                </div>
              </div>

              {/* Grid de Produtos da Loja */}
              {displayedProducts.length === 0 ? (
                <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 1.5rem', borderRadius: 'var(--radius-xl)' }}>
                  <Filter size={40} style={{ margin: '0 auto 1rem auto', color: 'var(--text-dim)' }} />
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Nenhum material encontrado</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Tente buscar por termos mais genéricos ou selecione outra categoria.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('todos'); }}
                    className="btn-outline-yellow"
                    style={{ fontSize: '0.88rem' }}
                  >
                    Limpar Filtros de Busca
                  </button>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1.75rem'
                }}>
                  {displayedProducts.map(prod => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onSelectProduct={setSelectedProduct}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {/* VIEW 3: SOBRE NÓS */}
        {currentView === 'sobre' && (
          <div>
            <AboutSection onGoToStore={() => { setCurrentView('loja'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
            <BrandsSection />
          </div>
        )}

        {/* VIEW 4: PAINEL DA LOJA (ADMIN) */}
        {currentView === 'admin' && (
          isStoreAdmin ? (
            <AdminDashboard onBackToStore={() => setCurrentView('loja')} />
          ) : (
            <div style={{ padding: '5rem 0', textAlign: 'center' }}>
              <div className="container" style={{ maxWidth: '480px' }}>
                <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: 'var(--radius-xl)' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <HidraIcon size={44} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Acesso Restrito ao Lojista</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Para gerenciar produtos, cadastrar itens, alterar estoque ou ver pedidos, faça login com o perfil da loja.
                  </p>
                  <button onClick={() => setIsAuthModalOpen(true)} className="btn-primary" style={{ width: '100%' }}>
                    Entrar como Lojista
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {/* VIEW 5: ÁREA DO COMPRADOR */}
        {currentView === 'buyer' && (
          isBuyer ? (
            <BuyerDashboard onBackToStore={() => setCurrentView('loja')} />
          ) : (
            <div style={{ padding: '5rem 0', textAlign: 'center' }}>
              <div className="container" style={{ maxWidth: '480px' }}>
                <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: 'var(--radius-xl)' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <HidraIcon size={44} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Acesso do Comprador</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Faça login como comprador para acompanhar seus pedidos e consultar históricos de compras.
                  </p>
                  <button onClick={() => setIsAuthModalOpen(true)} className="btn-primary" style={{ width: '100%' }}>
                    Entrar como Comprador
                  </button>
                </div>
              </div>
            </div>
          )
        )}

      </main>

      {/* Rodapé Geral */}
      <Footer onNavigate={view => setCurrentView(view)} />

      {/* Gaveta do Carrinho e Checkout WhatsApp */}
      <CartDrawer />

      {/* Modal de Detalhes Técnicos do Produto */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Modal de Autenticação (Loja vs Comprador) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StoreProvider>
          <CartProvider>
            <MainLayout />
          </CartProvider>
        </StoreProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

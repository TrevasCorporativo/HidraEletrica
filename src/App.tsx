import React, { useState } from 'react';
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
import { AdminDashboard } from './components/admin/AdminDashboard';
import { BuyerDashboard } from './components/buyer/BuyerDashboard';
import { Product, UserRole } from './types';
import { ArrowRight, MessageSquare, Zap, Filter, Search } from 'lucide-react';

const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'loja' | 'sobre' | 'admin' | 'buyer'>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortOption, setSortOption] = useState<'relevancia' | 'menor_preco' | 'maior_preco' | 'nome'>('relevancia');

  const { isStoreAdmin, isBuyer } = useAuth();
  const { activeProducts, activeCategory, searchQuery, setSearchQuery, storeSettings } = useStore();

  // Filtragem dos produtos ativos
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
    return 0; // relevância padrão
  });

  // Produtos em destaque para a home
  const featuredProducts = activeProducts.filter(p => p.featured).slice(0, 8);

  const cleanPhone = storeSettings.whatsapp_number.replace(/\D/g, '');

  const handleAuthSuccess = (role: UserRole) => {
    if (role === 'loja') {
      setCurrentView('admin');
    } else {
      setCurrentView('buyer');
    }
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
        
        {/* VIEW 1: HOME / LANDING PAGE */}
        {currentView === 'home' && (
          <div>
            <Hero onGoToStore={() => { setCurrentView('loja'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />

            {/* Seção de Marcas */}
            <BrandsSection />

            {/* Vitrine de Produtos em Destaque na Home */}
            <section style={{ padding: '4.5rem 0' }}>
              <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span className="badge-yellow" style={{ marginBottom: '0.5rem' }}>
                      <Zap size={14} /> Ofertas & Mais Vendidos
                    </span>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Destaques da HidraElétrica</h2>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                      Materiais elétricos e hidráulicos de primeira linha para sua obra.
                    </p>
                  </div>

                  <button
                    onClick={() => { setCurrentView('loja'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="btn-outline-yellow"
                    style={{ fontSize: '0.92rem' }}
                  >
                    <span>Ver Catálogo Completo</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* Grid de Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {featuredProducts.map(prod => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onSelectProduct={setSelectedProduct}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Banner de Orçamento Rápido via WhatsApp */}
            <section style={{ padding: '2rem 0 4.5rem 0' }}>
              <div className="container">
                <div style={{
                  background: 'linear-gradient(135deg, #181d27 0%, #11141b 100%)',
                  border: '1px solid var(--border-yellow)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '3rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '2rem',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.7)'
                }}>
                  <div style={{ maxWidth: '600px' }}>
                    <span className="badge-yellow" style={{ marginBottom: '0.75rem' }}>
                      Atendimento Especializado
                    </span>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.6rem' }}>
                      Tem uma lista de materiais ou projeto em mãos?
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      Envie sua planilha ou foto da lista diretamente pelo WhatsApp. Nossa equipe de orçamentos calcula as melhores condições com entrega ágil para sua obra.
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Tenho uma lista de materiais para cotar na HidraElétrica.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                    style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}
                  >
                    <MessageSquare size={20} />
                    <span>Enviar Lista pelo WhatsApp</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Seção Sobre Nós na Home */}
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
                    onClick={() => { setSearchQuery(''); }}
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
    <AuthProvider>
      <StoreProvider>
        <CartProvider>
          <MainLayout />
        </CartProvider>
      </StoreProvider>
    </AuthProvider>
  );
};

export default App;

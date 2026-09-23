import React, { useState } from 'react';
import {
  Package,
  Settings,
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Search,
  Layers,
  ArrowLeft,
  FileText
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, OrderStatus } from '../../types';
import { ProductFormModal } from './ProductFormModal';
import { StoreSettingsView } from './StoreSettingsView';

interface AdminDashboardProps {
  onBackToStore: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToStore }) => {
  const {
    products,
    deleteProduct,
    toggleProductActive,
    toggleStockVisibility,
    orders,
    updateOrderStatus
  } = useStore();

  const [activeTab, setActiveTab] = useState<'produtos' | 'configuracoes' | 'pedidos'>('produtos');
  const [filterSearch, setFilterSearch] = useState('');
  const [selectedProductToEdit, setSelectedProductToEdit] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtro de produtos para o painel
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(filterSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(filterSearch.toLowerCase())
  );

  const activeCount = products.filter(p => p.is_active).length;
  const inactiveCount = products.filter(p => !p.is_active).length;
  const lowStockCount = products.filter(p => p.stock_quantity < 15).length;

  const handleOpenNew = () => {
    setSelectedProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setSelectedProductToEdit(p);
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem 0', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Cabeçalho do Painel */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
              <button
                onClick={onBackToStore}
                className="btn-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              >
                <ArrowLeft size={14} /> Voltar à Loja
              </button>
              <span className="badge-yellow">Painel Administrativo da Loja</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Gestão Geral HidraElétrica</h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Controle produtos, estoque, visibilidade para o cliente e configurações da loja.
            </p>
          </div>

          {activeTab === 'produtos' && (
            <button onClick={handleOpenNew} className="btn-primary" style={{ padding: '0.85rem 1.6rem' }}>
              <Plus size={18} />
              <span>Cadastrar Novo Produto</span>
            </button>
          )}
        </div>

        {/* Cartões de Métricas Rápidas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Cadastrado</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: '0.3rem 0' }}>
              {products.length}
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Materiais no sistema</span>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ativos na Vitrine</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--status-success)', margin: '0.3rem 0' }}>
              {activeCount}
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Visíveis para compra</span>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Inativos (Pausados)</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--yellow-400)', margin: '0.3rem 0' }}>
              {inactiveCount}
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Ocultos dos clientes</span>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pedidos Registrados</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', margin: '0.3rem 0' }}>
              {orders.length}
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Orçamentos gerados</span>
          </div>
        </div>

        {/* Navegação entre Abas */}
        <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setActiveTab('produtos')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'produtos' ? 'var(--yellow-500)' : 'transparent',
              color: activeTab === 'produtos' ? '#0b0d12' : 'var(--text-main)',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer'
            }}
          >
            <Package size={18} />
            <span>Produtos & Estoque ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('configuracoes')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'configuracoes' ? 'var(--yellow-500)' : 'transparent',
              color: activeTab === 'configuracoes' ? '#0b0d12' : 'var(--text-main)',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer'
            }}
          >
            <Settings size={18} />
            <span>Configurações da Loja</span>
          </button>

          <button
            onClick={() => setActiveTab('pedidos')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'pedidos' ? 'var(--yellow-500)' : 'transparent',
              color: activeTab === 'pedidos' ? '#0b0d12' : 'var(--text-main)',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer'
            }}
          >
            <ShoppingBag size={18} />
            <span>Pedidos & Orçamentos ({orders.length})</span>
          </button>
        </div>

        {/* CONTEÚDO DA ABA 1: PRODUTOS & ESTOQUE */}
        {activeTab === 'produtos' && (
          <div>
            {/* Barra de Filtro de Busca */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
                <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Filtrar por nome, marca ou SKU..."
                  value={filterSearch}
                  onChange={e => setFilterSearch(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.3rem' }}
                />
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Exibindo <strong>{filteredProducts.length}</strong> de {products.length} itens
              </div>
            </div>

            {/* Tabela de Produtos */}
            <div className="glass-panel" style={{ borderRadius: 'var(--radius-xl)', overflowX: 'auto', border: '1px solid var(--border-card)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '1rem 1.25rem' }}>Produto</th>
                    <th style={{ padding: '1rem' }}>Preço</th>
                    <th style={{ padding: '1rem' }}>Qtd Estoque</th>
                    <th style={{ padding: '1rem' }}>Exibir Qtd ao Cliente?</th>
                    <th style={{ padding: '1rem' }}>Status Vitrine</th>
                    <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Nenhum produto encontrado com os filtros aplicados.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map(p => (
                      <tr
                        key={p.id}
                        style={{
                          borderBottom: '1px solid var(--border-subtle)',
                          background: p.is_active ? 'transparent' : 'rgba(239, 68, 68, 0.03)',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        {/* Imagem + Nome + SKU */}
                        <td style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <img
                            src={p.image_url}
                            alt={p.name}
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
                          />
                          <div>
                            <strong style={{ fontSize: '0.9rem', color: p.is_active ? '#fff' : 'var(--text-muted)', display: 'block' }}>
                              {p.name}
                            </strong>
                            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                              {p.brand} | SKU: {p.sku}
                            </span>
                          </div>
                        </td>

                        {/* Preço */}
                        <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>
                          <strong style={{ fontSize: '0.95rem', color: 'var(--yellow-400)' }}>
                            {p.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </strong>
                        </td>

                        {/* Quantidade em Estoque */}
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.25rem 0.6rem',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            background: p.stock_quantity < 15 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                            color: p.stock_quantity < 15 ? '#fca5a5' : '#86efac'
                          }}>
                            {p.stock_quantity} un
                          </span>
                        </td>

                        {/* Toggle: Exibir Quantidade ao Comprador */}
                        <td style={{ padding: '1rem' }}>
                          <button
                            onClick={() => toggleStockVisibility(p.id)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              padding: '0.35rem 0.75rem',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: 'none',
                              background: p.show_stock_to_buyer ? 'rgba(250, 204, 21, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                              color: p.show_stock_to_buyer ? 'var(--yellow-400)' : 'var(--text-muted)'
                            }}
                            title="Clique para alternar a exibição da quantidade exata para o comprador"
                          >
                            {p.show_stock_to_buyer ? <Eye size={13} /> : <EyeOff size={13} />}
                            <span>{p.show_stock_to_buyer ? 'Exibindo Qtd' : 'Ocultando Qtd'}</span>
                          </button>
                        </td>

                        {/* Toggle: Ativar / Inativar Produto */}
                        <td style={{ padding: '1rem' }}>
                          <button
                            onClick={() => toggleProductActive(p.id)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              padding: '0.35rem 0.75rem',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: 'none',
                              background: p.is_active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                              color: p.is_active ? '#34d399' : '#f87171'
                            }}
                            title="Clique para Ativar ou Inativar o produto na vitrine pública da loja"
                          >
                            {p.is_active ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                            <span>{p.is_active ? 'Ativo na Loja' : 'Inativado (Oculto)'}</span>
                          </button>
                        </td>

                        {/* Ações (Editar, Excluir) */}
                        <td style={{ padding: '1rem 1.25rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <button
                            onClick={() => handleOpenEdit(p)}
                            title="Editar produto"
                            style={{
                              background: 'rgba(255, 255, 255, 0.06)',
                              border: '1px solid var(--border-subtle)',
                              color: '#fff',
                              padding: '0.4rem 0.6rem',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              marginRight: '0.5rem'
                            }}
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Tem certeza que deseja remover "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            title="Excluir produto"
                            style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.25)',
                              color: 'var(--status-danger)',
                              padding: '0.4rem 0.6rem',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA 2: CONFIGURAÇÕES DA LOJA */}
        {activeTab === 'configuracoes' && (
          <StoreSettingsView />
        )}

        {/* CONTEÚDO DA ABA 3: PEDIDOS RECEBIDOS */}
        {activeTab === 'pedidos' && (
          <div className="glass-panel" style={{ borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Histórico de Pedidos & Orçamentos do WhatsApp
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Acompanhe os pedidos gerados pelos clientes na loja virtual.
            </p>

            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-dim)' }}>
                <ShoppingBag size={40} style={{ margin: '0 auto 0.75rem auto', opacity: 0.5 }} />
                <h4>Nenhum pedido recebido ainda</h4>
                <p style={{ fontSize: '0.85rem' }}>
                  Quando os clientes montarem pedidos no carrinho e enviarem pelo WhatsApp, eles aparecerão aqui.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {orders.map(order => (
                  <div
                    key={order.id}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.85rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                      <div>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--yellow-400)' }}>
                          Pedido #{order.id}
                        </strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginLeft: '0.75rem' }}>
                          {new Date(order.created_at).toLocaleString('pt-BR')}
                        </span>
                      </div>

                      {/* Seletor de Status */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Status:</span>
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="form-select"
                          style={{ padding: '0.3rem 0.7rem', fontSize: '0.82rem', width: 'auto' }}
                        >
                          <option value="pendente">Pendente</option>
                          <option value="em_separacao">Em Separação</option>
                          <option value="enviado">Enviado / Saiu p/ Entrega</option>
                          <option value="concluido">Concluído</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </div>
                    </div>

                    {/* Dados do Comprador */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: '0.84rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                      <div>
                        <strong style={{ color: '#fff' }}>Cliente:</strong> {order.buyer_name}
                      </div>
                      <div>
                        <strong style={{ color: '#fff' }}>Telefone:</strong> {order.buyer_phone}
                      </div>
                      <div>
                        <strong style={{ color: '#fff' }}>Entrega:</strong> {order.delivery_address}
                      </div>
                      <div>
                        <strong style={{ color: '#fff' }}>Pagamento:</strong> {order.payment_method.toUpperCase()}
                      </div>
                    </div>

                    {/* Itens */}
                    <div style={{ background: '#0a0d13', borderRadius: 'var(--radius-md)', padding: '0.85rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                        Itens Solicitados:
                      </span>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem', padding: '0.2rem 0' }}>
                          <span>{item.quantity}x {item.product.name} ({item.product.brand})</span>
                          <strong>
                            {(item.product.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </strong>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {order.whatsapp_url ? (
                        <a
                          href={order.whatsapp_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-whatsapp"
                          style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                        >
                          Abrir Conversa do WhatsApp
                        </a>
                      ) : <div />}

                      <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginRight: '0.4rem' }}>Total do Pedido:</span>
                        <span style={{ color: 'var(--yellow-400)' }}>
                          {order.total_amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Modal de Cadastro/Edição de Produto */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={selectedProductToEdit}
      />
    </div>
  );
};

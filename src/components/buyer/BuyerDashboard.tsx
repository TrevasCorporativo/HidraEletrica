import React, { useState } from 'react';
import {
  ShoppingBag,
  User,
  MapPin,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowLeft,
  Save
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types';

interface BuyerDashboardProps {
  onBackToStore: () => void;
}

const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case 'concluido':
      return { label: 'Concluído', color: '#34d399', bg: 'rgba(16, 185, 129, 0.15)', icon: <CheckCircle2 size={13} /> };
    case 'enviado':
      return { label: 'Saiu para Entrega', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', icon: <Truck size={13} /> };
    case 'em_separacao':
      return { label: 'Em Separação no Depósito', color: '#fbbf24', bg: 'rgba(245, 158, 11, 0.15)', icon: <Clock size={13} /> };
    case 'cancelado':
      return { label: 'Cancelado', color: '#f87171', bg: 'rgba(239, 68, 68, 0.15)', icon: <AlertCircle size={13} /> };
    default:
      return { label: 'Orçamento Enviado (Pendente)', color: 'var(--yellow-400)', bg: 'rgba(250, 204, 21, 0.15)', icon: <MessageSquare size={13} /> };
  }
};

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ onBackToStore }) => {
  const { currentUser, updateProfile } = useAuth();
  const { orders } = useStore();

  const [fullName, setFullName] = useState(currentUser?.full_name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [companyName, setCompanyName] = useState(currentUser?.company_name || '');
  const [addressStreet, setAddressStreet] = useState(currentUser?.address_street || '');
  const [addressCity, setAddressCity] = useState(currentUser?.address_city || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Filtrar pedidos deste comprador (ou todos os pedidos se fez nesta sessão de teste)
  const myOrders = orders.filter(
    o => o.buyer_id === currentUser?.id || o.buyer_name.toLowerCase() === currentUser?.full_name.toLowerCase()
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      full_name: fullName,
      phone,
      company_name: companyName,
      address_street: addressStreet,
      address_city: addressCity
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem 0', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Top Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
            <button
              onClick={onBackToStore}
              className="btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            >
              <ArrowLeft size={14} /> Voltar à Loja
            </button>
            <span className="badge-yellow">Painel do Comprador</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Minhas Compras & Entregas</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Acompanhe o andamento dos seus pedidos de materiais e mantenha seu endereço de obra atualizado.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'flex-start' }}>
          
          {/* Coluna 1: Histórico de Compras */}
          <div style={{ flex: 2 }}>
            <div className="glass-panel" style={{ borderRadius: 'var(--radius-xl)', padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                    <ShoppingBag size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Histórico de Pedidos ({myOrders.length})</h3>
                </div>
              </div>

              {myOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-dim)' }}>
                  <ShoppingBag size={44} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
                  <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.4rem' }}>
                    Você ainda não fez nenhum pedido
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Adicione materiais ao carrinho e conclua via WhatsApp para registrar suas compras aqui.
                  </p>
                  <button onClick={onBackToStore} className="btn-primary" style={{ fontSize: '0.88rem' }}>
                    Explorar Catálogo de Materiais
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {myOrders.map(order => {
                    const statusInfo = getStatusBadge(order.status);
                    return (
                      <div
                        key={order.id}
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-card)',
                          borderRadius: 'var(--radius-lg)',
                          padding: '1.25rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          <div>
                            <strong style={{ fontSize: '1rem', color: '#fff' }}>Pedido #{order.id}</strong>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: '0.6rem' }}>
                              {new Date(order.created_at).toLocaleDateString('pt-BR')} às {new Date(order.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              padding: '0.25rem 0.65rem',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: statusInfo.bg,
                              color: statusInfo.color
                            }}
                          >
                            {statusInfo.icon}
                            <span>{statusInfo.label}</span>
                          </span>
                        </div>

                        {/* Itens */}
                        <div style={{ background: '#090b0e', borderRadius: 'var(--radius-md)', padding: '0.75rem', marginBottom: '0.85rem' }}>
                          {order.items.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '0.25rem 0' }}>
                              <span style={{ color: 'var(--text-muted)' }}>
                                {item.quantity}x {item.product.name}
                              </span>
                              <strong style={{ color: '#fff' }}>
                                {(item.product.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                              </strong>
                            </div>
                          ))}
                        </div>

                        {/* Endereço e Total */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                            <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} />
                            <span>Entrega: {order.delivery_address}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--yellow-400)' }}>
                              Total: {order.total_amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>

                            {order.whatsapp_url && (
                              <a
                                href={order.whatsapp_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp"
                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                              >
                                Reabrir no WhatsApp
                              </a>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Coluna 2: Dados do Comprador e Endereço */}
          <div style={{ flex: 1 }}>
            <div className="glass-panel" style={{ borderRadius: 'var(--radius-xl)', padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(250, 204, 21, 0.15)', color: 'var(--yellow-400)' }}>
                  <User size={20} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Dados de Entrega Salvos</h3>
              </div>

              {savedSuccess && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--status-success)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1rem' }}>
                  <CheckCircle2 size={16} />
                  <span>Dados atualizados com sucesso!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Nome Completo</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Construtora / Empresa (Opcional)</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">WhatsApp de Contato</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Endereço Principal da Obra</label>
                  <input
                    type="text"
                    placeholder="Rua, número, complemento"
                    value={addressStreet}
                    onChange={e => setAddressStreet(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Cidade / Estado</label>
                  <input
                    type="text"
                    placeholder="São Paulo, SP"
                    value={addressCity}
                    onChange={e => setAddressCity(e.target.value)}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
                  <Save size={16} />
                  <span>Salvar Dados de Entrega</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

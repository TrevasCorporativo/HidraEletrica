import React, { useState } from 'react';
import { Save, CheckCircle2, MessageSquare, MapPin, Clock, CreditCard, Building } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { StoreSettings } from '../../types';

export const StoreSettingsView: React.FC = () => {
  const { storeSettings, updateStoreSettings } = useStore();
  const [formData, setFormData] = useState<StoreSettings>({ ...storeSettings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: keyof StoreSettings, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSavedSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="glass-panel" style={{ borderRadius: 'var(--radius-xl)', padding: '2rem', maxWidth: '850px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Configurações Gerais da Loja</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Atualize o WhatsApp de recebimento de pedidos, endereço da loja física e horários de atendimento.
          </p>
        </div>
        {savedSuccess && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--status-success)', fontSize: '0.85rem', fontWeight: 700 }}>
            <CheckCircle2 size={18} />
            <span>Configurações salvas com sucesso!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* Seção 1: WhatsApp Oficial e Atendimento */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--yellow-400)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <MessageSquare size={18} /> WhatsApp de Vendas & Pedidos
          </h4>
          <div style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.25)', padding: '0.9rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.82rem', color: '#86efac' }}>
            <strong>Atenção:</strong> Todos os pedidos finalizados no carrinho do site serão enviados diretamente para este número de WhatsApp formatado com código do país (Ex: 5511999998888).
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Número do WhatsApp Comercial (Somente números com DDD) *</label>
              <input
                type="text"
                required
                placeholder="5511999998888"
                value={formData.whatsapp_number}
                onChange={e => handleChange('whatsapp_number', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Telefone Fixo / Exibição</label>
              <input
                type="text"
                placeholder="(11) 3456-7890"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Seção 2: Dados Empresariais */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--yellow-400)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Building size={18} /> Dados Cadastrais & Loja
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Nome da Loja</label>
              <input
                type="text"
                value={formData.store_name}
                onChange={e => handleChange('store_name', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">CNPJ</label>
              <input
                type="text"
                value={formData.cnpj}
                onChange={e => handleChange('cnpj', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">E-mail Comercial</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {/* Seção 3: Endereço da Loja Física (Rodapé) */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--yellow-400)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <MapPin size={18} /> Endereço da Loja Física (Exibido no Rodapé e Contato)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Logradouro e Número</label>
              <input
                type="text"
                value={formData.address_street}
                onChange={e => handleChange('address_street', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Bairro</label>
              <input
                type="text"
                value={formData.address_neighborhood}
                onChange={e => handleChange('address_neighborhood', e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Cidade</label>
              <input
                type="text"
                value={formData.address_city}
                onChange={e => handleChange('address_city', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Estado (UF)</label>
              <input
                type="text"
                value={formData.address_state}
                onChange={e => handleChange('address_state', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">CEP</label>
              <input
                type="text"
                value={formData.address_zip}
                onChange={e => handleChange('address_zip', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Seção 4: Horários de Atendimento */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--yellow-400)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Clock size={18} /> Horários de Atendimento ao Público
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Segunda a Sexta</label>
              <input
                type="text"
                value={formData.business_hours_weekday}
                onChange={e => handleChange('business_hours_weekday', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Sábado</label>
              <input
                type="text"
                value={formData.business_hours_saturday}
                onChange={e => handleChange('business_hours_saturday', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Seção 5: Pix */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--yellow-400)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <CreditCard size={18} /> Chave Pix da Loja para Pagamento
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Chave Pix</label>
              <input
                type="text"
                value={formData.pix_key}
                onChange={e => handleChange('pix_key', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tipo de Chave</label>
              <input
                type="text"
                value={formData.pix_key_type}
                onChange={e => handleChange('pix_key_type', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Botão Salvar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
            <Save size={18} />
            <span>Salvar Todas as Configurações</span>
          </button>
        </div>

      </form>
    </div>
  );
};

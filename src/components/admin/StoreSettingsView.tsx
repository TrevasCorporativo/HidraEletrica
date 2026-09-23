import React, { useState } from 'react';
import {
  Save,
  CheckCircle2,
  MessageSquare,
  MapPin,
  Clock,
  CreditCard,
  Building,
  Layout,
  Type,
  Sparkles,
  Zap
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { StoreSettings } from '../../types';

export const StoreSettingsView: React.FC = () => {
  const { storeSettings, updateStoreSettings } = useStore();
  const [formData, setFormData] = useState<StoreSettings>({ ...storeSettings });
  const [subTab, setSubTab] = useState<'geral' | 'landing'>('geral');
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
      
      {/* Cabeçalho */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Configurações & Conteúdo da Loja</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Gerencie os dados de atendimento, WhatsApp oficial e todos os textos da página inicial.
          </p>
        </div>
        {savedSuccess && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--status-success)', fontSize: '0.85rem', fontWeight: 700 }}>
            <CheckCircle2 size={18} />
            <span>Alterações salvas com sucesso!</span>
          </div>
        )}
      </div>

      {/* Alternador de Sub-Abas */}
      <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem' }}>
        <button
          type="button"
          onClick={() => setSubTab('geral')}
          className={subTab === 'geral' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '0.55rem 1.2rem', fontSize: '0.86rem' }}
        >
          <Building size={16} />
          <span>Dados Comerciais & WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('landing')}
          className={subTab === 'landing' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '0.55rem 1.2rem', fontSize: '0.86rem' }}
        >
          <Layout size={16} />
          <span>🎨 Textos & Frases da Landing Page</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* SUB-ABA 1: DADOS GERAIS, WHATSAPP, ENDEREÇO */}
        {subTab === 'geral' && (
          <div>
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
                <Building size={18} /> Dados Cadastrais da Loja
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
          </div>
        )}

        {/* SUB-ABA 2: EDITOR COMPLETO DA LANDING PAGE */}
        {subTab === 'landing' && (
          <div>
            <div style={{ background: 'rgba(250, 204, 21, 0.08)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.75rem', fontSize: '0.84rem', color: 'var(--yellow-300)' }}>
              <strong>Editor Visual da Página Inicial:</strong> Altere os títulos, slogans, chamadas de ação e diferenciais exibidos na Landing Page. Ao salvar, as mudanças entram no ar imediatamente.
            </div>

            {/* Faixa do Topo (Aviso) */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--yellow-400)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Zap size={18} /> Faixa Superior de Avisos (Announcement Bar)
              </h4>
              <div className="form-group">
                <label className="form-label">Texto da Faixa Superior do Site</label>
                <input
                  type="text"
                  value={formData.announcement_banner || ''}
                  onChange={e => handleChange('announcement_banner', e.target.value)}
                  className="form-input"
                  placeholder="⚡ Entrega expressa para obras e indústrias em até 24h na região!"
                />
              </div>
            </div>

            {/* Seção Hero */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--yellow-400)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Type size={18} /> Seção Principal (Hero da Home)
              </h4>

              <div className="form-group">
                <label className="form-label">Selo Superior (Badge)</label>
                <input
                  type="text"
                  value={formData.hero_badge || ''}
                  onChange={e => handleChange('hero_badge', e.target.value)}
                  className="form-input"
                  placeholder="Distribuidora & Varejo Especializado"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Título Principal de Destaque *</label>
                <input
                  type="text"
                  required
                  value={formData.hero_title || ''}
                  onChange={e => handleChange('hero_title', e.target.value)}
                  className="form-input"
                  placeholder="A Força da Hidráulica e a Potência da Elétrica"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subtítulo / Descrição da Home</label>
                <textarea
                  rows={3}
                  value={formData.hero_subtitle || ''}
                  onChange={e => handleChange('hero_subtitle', e.target.value)}
                  className="form-textarea"
                  placeholder="Descrição sobre os materiais, pronta entrega e benefícios..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Texto do Botão 1 (Catálogo)</label>
                  <input
                    type="text"
                    value={formData.hero_cta_primary || ''}
                    onChange={e => handleChange('hero_cta_primary', e.target.value)}
                    className="form-input"
                    placeholder="Explorar Produtos"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Texto do Botão 2 (WhatsApp)</label>
                  <input
                    type="text"
                    value={formData.hero_cta_whatsapp || ''}
                    onChange={e => handleChange('hero_cta_whatsapp', e.target.value)}
                    className="form-input"
                    placeholder="Orçamento via WhatsApp"
                  />
                </div>
              </div>
            </div>

            {/* Os 3 Diferenciais */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--yellow-400)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Sparkles size={18} /> Os 3 Diferenciais da Loja
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <label className="form-label">Diferencial 1</label>
                  <input
                    type="text"
                    value={formData.feature_1_title || ''}
                    onChange={e => handleChange('feature_1_title', e.target.value)}
                    className="form-input"
                    placeholder="Normatização Rigorosa ABNT"
                    style={{ marginBottom: '0.5rem' }}
                  />
                  <textarea
                    rows={2}
                    value={formData.feature_1_desc || ''}
                    onChange={e => handleChange('feature_1_desc', e.target.value)}
                    className="form-textarea"
                    placeholder="Descrição do diferencial 1..."
                  />
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <label className="form-label">Diferencial 2</label>
                  <input
                    type="text"
                    value={formData.feature_2_title || ''}
                    onChange={e => handleChange('feature_2_title', e.target.value)}
                    className="form-input"
                    placeholder="Entrega Rápida em até 24h"
                    style={{ marginBottom: '0.5rem' }}
                  />
                  <textarea
                    rows={2}
                    value={formData.feature_2_desc || ''}
                    onChange={e => handleChange('feature_2_desc', e.target.value)}
                    className="form-textarea"
                    placeholder="Descrição do diferencial 2..."
                  />
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <label className="form-label">Diferencial 3</label>
                  <input
                    type="text"
                    value={formData.feature_3_title || ''}
                    onChange={e => handleChange('feature_3_title', e.target.value)}
                    className="form-input"
                    placeholder="Condições Especiais para PJ"
                    style={{ marginBottom: '0.5rem' }}
                  />
                  <textarea
                    rows={2}
                    value={formData.feature_3_desc || ''}
                    onChange={e => handleChange('feature_3_desc', e.target.value)}
                    className="form-textarea"
                    placeholder="Descrição do diferencial 3..."
                  />
                </div>
              </div>
            </div>

            {/* Números e Métricas da Empresa */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--yellow-400)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                📊 Métricas da Empresa
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Métrica 1 (Número + Rótulo)</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={formData.metric_1_val || ''}
                      onChange={e => handleChange('metric_1_val', e.target.value)}
                      className="form-input"
                      placeholder="+10.000"
                      style={{ maxWidth: '100px' }}
                    />
                    <input
                      type="text"
                      value={formData.metric_1_lbl || ''}
                      onChange={e => handleChange('metric_1_lbl', e.target.value)}
                      className="form-input"
                      placeholder="Itens em Estoque"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Métrica 2 (Número + Rótulo)</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={formData.metric_2_val || ''}
                      onChange={e => handleChange('metric_2_val', e.target.value)}
                      className="form-input"
                      placeholder="+5.000"
                      style={{ maxWidth: '100px' }}
                    />
                    <input
                      type="text"
                      value={formData.metric_2_lbl || ''}
                      onChange={e => handleChange('metric_2_lbl', e.target.value)}
                      className="form-input"
                      placeholder="Obras Abastecidas"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Métrica 3 (Número + Rótulo)</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={formData.metric_3_val || ''}
                      onChange={e => handleChange('metric_3_val', e.target.value)}
                      className="form-input"
                      placeholder="24h"
                      style={{ maxWidth: '100px' }}
                    />
                    <input
                      type="text"
                      value={formData.metric_3_lbl || ''}
                      onChange={e => handleChange('metric_3_lbl', e.target.value)}
                      className="form-input"
                      placeholder="Entrega Regional"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Banner de Cotação Rápida WhatsApp */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--yellow-400)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                💬 Banner de Orçamento WhatsApp
              </h4>
              <div className="form-group">
                <label className="form-label">Título do Banner</label>
                <input
                  type="text"
                  value={formData.quote_banner_title || ''}
                  onChange={e => handleChange('quote_banner_title', e.target.value)}
                  className="form-input"
                  placeholder="Tem uma lista de materiais ou projeto em mãos?"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Texto Explicativo</label>
                <textarea
                  rows={2}
                  value={formData.quote_banner_desc || ''}
                  onChange={e => handleChange('quote_banner_desc', e.target.value)}
                  className="form-textarea"
                  placeholder="Envie sua planilha ou foto da lista direto pelo WhatsApp da loja..."
                />
              </div>
            </div>

          </div>
        )}

        {/* Botão Salvar Todas as Configurações */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', marginTop: '1rem' }}>
          <button type="submit" className="btn-primary" style={{ padding: '0.85rem 2.2rem' }}>
            <Save size={18} />
            <span>Salvar Todas as Configurações</span>
          </button>
        </div>

      </form>
    </div>
  );
};

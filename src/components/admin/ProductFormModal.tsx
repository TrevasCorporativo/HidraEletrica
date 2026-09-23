import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Image as ImageIcon, Upload, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { convertFileToDataUrl, generateProductImage } from '../../utils/imageHelper';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  productToEdit
}) => {
  const { categories, addProduct, updateProduct } = useStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('eletrica');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [sku, setSku] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [stockQuantity, setStockQuantity] = useState('10');
  const [showStockToBuyer, setShowStockToBuyer] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setCategoryId(productToEdit.category_id);
      setPrice(productToEdit.price.toString());
      setOriginalPrice(productToEdit.original_price ? productToEdit.original_price.toString() : '');
      setBrand(productToEdit.brand);
      setSku(productToEdit.sku);
      setImageUrl(productToEdit.image_url);
      setStockQuantity(productToEdit.stock_quantity.toString());
      setShowStockToBuyer(productToEdit.show_stock_to_buyer);
      setIsActive(productToEdit.is_active);
    } else {
      setName('');
      setDescription('');
      setCategoryId('eletrica');
      setPrice('');
      setOriginalPrice('');
      setBrand('');
      setSku('SKU-' + Math.floor(1000 + Math.random() * 9000));
      setImageUrl('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80');
      setStockQuantity('25');
      setShowStockToBuyer(true);
      setIsActive(true);
    }
    setError('');
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Informe o nome do material.');
      return;
    }
    const numPrice = parseFloat(price.replace(',', '.'));
    if (isNaN(numPrice) || numPrice <= 0) {
      setError('Informe um preço válido maior que zero.');
      return;
    }
    const numStock = parseInt(stockQuantity, 10);
    if (isNaN(numStock) || numStock < 0) {
      setError('Informe uma quantidade de estoque válida (0 ou maior).');
      return;
    }

    const numOriginalPrice = originalPrice ? parseFloat(originalPrice.replace(',', '.')) : undefined;

    const finalImageUrl = imageUrl.trim() || generateProductImage(name.trim(), categoryId);

    if (productToEdit) {
      updateProduct(productToEdit.id, {
        name: name.trim(),
        description: description.trim(),
        category_id: categoryId,
        price: numPrice,
        original_price: numOriginalPrice,
        brand: brand.trim() || 'HidraElétrica',
        sku: sku.trim(),
        image_url: finalImageUrl,
        stock_quantity: numStock,
        show_stock_to_buyer: showStockToBuyer,
        is_active: isActive
      });
    } else {
      addProduct({
        name: name.trim(),
        description: description.trim(),
        category_id: categoryId,
        price: numPrice,
        original_price: numOriginalPrice,
        brand: brand.trim() || 'HidraElétrica',
        sku: sku.trim(),
        image_url: finalImageUrl,
        stock_quantity: numStock,
        show_stock_to_buyer: showStockToBuyer,
        is_active: isActive,
        featured: false
      });
    }

    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 350,
        background: 'rgba(5, 7, 10, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '750px',
          maxHeight: '92vh',
          borderRadius: 'var(--radius-xl)',
          overflowY: 'auto',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-yellow)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 25px rgba(250, 204, 21, 0.2)',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
              {productToEdit ? 'Editar Produto' : 'Cadastrar Novo Material'}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Configure dados comerciais, foto e regras de estoque
            </span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.75rem', borderRadius: 'var(--radius-md)', color: '#fca5a5', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Nome e SKU */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Nome do Produto / Material *</label>
              <input
                type="text"
                required
                placeholder="Ex: Cabo Flexível 2,5mm 100m Antichama"
                value={name}
                onChange={e => setName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Código / SKU *</label>
              <input
                type="text"
                required
                placeholder="EL-CAB-25"
                value={sku}
                onChange={e => setSku(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Categoria e Marca */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Categoria *</label>
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="form-select"
              >
                {categories.filter(c => c.id !== 'todos').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Marca / Fabricante *</label>
              <input
                type="text"
                placeholder="Ex: Tigre, Schneider, Sil Fios, Deca"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Preços */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Preço de Venda (R$) *</label>
              <input
                type="text"
                required
                placeholder="189,90"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Preço Original / De R$ (Opcional p/ promoção)</label>
              <input
                type="text"
                placeholder="219,00"
                value={originalPrice}
                onChange={e => setOriginalPrice(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Imagem do Produto: Importar, URL ou Gerar Automaticamente */}
          <div className="form-group" style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <label className="form-label" style={{ marginBottom: '0.15rem' }}>Foto do Material</label>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                  Importe do computador, insira link ou gere uma foto realista automaticamente
                </span>
              </div>

              {/* Botões de Ação para Imagem */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="file"
                  id="product-file-import"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const dataUrl = await convertFileToDataUrl(file);
                        setImageUrl(dataUrl);
                      } catch (err: any) {
                        setError(err.message || 'Erro ao importar arquivo.');
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('product-file-import')?.click()}
                  className="btn-secondary"
                  style={{ fontSize: '0.78rem', padding: '0.4rem 0.8rem' }}
                  title="Importar imagem do seu computador"
                >
                  <Upload size={14} />
                  <span>Importar Foto</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const generated = generateProductImage(name || 'material', categoryId);
                    setImageUrl(generated);
                  }}
                  className="btn-outline-yellow"
                  style={{ fontSize: '0.78rem', padding: '0.4rem 0.8rem' }}
                  title="Gera automaticamente uma foto realista de alta definição baseada no nome e categoria"
                >
                  <Sparkles size={14} />
                  <span>Gerar Foto do Material</span>
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '8px',
                background: '#090b0e',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => (e.currentTarget.style.display = 'none')}
                  />
                ) : (
                  <ImageIcon size={24} color="var(--text-dim)" />
                )}
              </div>

              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="URL da imagem (ou use os botões acima para importar/gerar)"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.85rem' }}
                />
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="form-group">
            <label className="form-label">Descrição Técnica e Aplicações</label>
            <textarea
              rows={3}
              placeholder="Especificações, bitola, normas atendidas..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="form-textarea"
            />
          </div>

          {/* REGRAS DE ESTOQUE E STATUS (REQUISITO FUNDAMENTAL) */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--yellow-400)', marginBottom: '1rem' }}>
              📦 Controle de Estoque & Visibilidade para o Comprador
            </h4>

            {/* Quantidade em estoque */}
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Quantidade em Estoque (Unidades / Metros / Barras) *</label>
              <input
                type="number"
                min="0"
                required
                value={stockQuantity}
                onChange={e => setStockQuantity(e.target.value)}
                className="form-input"
                style={{ maxWidth: '200px' }}
              />
            </div>

            {/* Toggle 1: Exibir quantidade para o comprador */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderTop: '1px solid var(--border-subtle)' }}>
              <div>
                <strong style={{ fontSize: '0.88rem', display: 'block' }}>
                  Exibir quantidade em estoque para o comprador?
                </strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {showStockToBuyer
                    ? 'Ativado: O comprador verá o número exato (ex: "42 unidades em estoque").'
                    : 'Desativado: O comprador verá apenas "Pronta Entrega", sem saber a quantidade exata.'}
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={showStockToBuyer}
                  onChange={e => setShowStockToBuyer(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {/* Toggle 2: Ativar / Inativar produto na loja */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderTop: '1px solid var(--border-subtle)' }}>
              <div>
                <strong style={{ fontSize: '0.88rem', display: 'block' }}>
                  Status do Produto na Loja: {isActive ? '🟢 Ativo' : '🔴 Inativo'}
                </strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {isActive
                    ? 'O produto é exibido normalmente na vitrine da loja.'
                    : 'O produto fica inativado e invisível para os clientes, mas preservado no painel da loja.'}
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={e => setIsActive(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

          </div>

          {/* Botões de Ação */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '0.75rem 1.4rem' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0.75rem 1.8rem' }}
            >
              <Save size={18} />
              <span>{productToEdit ? 'Salvar Alterações' : 'Cadastrar Material'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, ShieldCheck, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { HidraIcon } from './HidraIcon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginAs } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('loja');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(
      selectedRole,
      email.trim() || undefined,
      fullName.trim() || undefined
    );
    onSuccess(selectedRole);
    onClose();
  };

  const handleQuickLogin = (role: UserRole) => {
    loginAs(role);
    onSuccess(role);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
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
          maxWidth: '520px',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-yellow)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 25px rgba(250, 204, 21, 0.2)',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.4rem',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {/* Top Header */}
        <div style={{ padding: '2rem 2rem 1.25rem 2rem', textAlign: 'center', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <HidraIcon size={48} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
            Portal HidraElétrica
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Selecione seu perfil de acesso para continuar
          </p>
        </div>

        <div style={{ padding: '1.75rem 2rem' }}>
          
          {/* Alternador de Perfis (Loja vs Comprador) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <button
              type="button"
              onClick={() => setSelectedRole('loja')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '1rem 0.5rem',
                borderRadius: 'var(--radius-lg)',
                background: selectedRole === 'loja' ? 'rgba(250, 204, 21, 0.12)' : 'var(--bg-secondary)',
                border: selectedRole === 'loja' ? '2px solid var(--yellow-400)' : '1px solid var(--border-card)',
                color: selectedRole === 'loja' ? 'var(--yellow-300)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <ShieldCheck size={26} color={selectedRole === 'loja' ? 'var(--yellow-400)' : 'var(--text-dim)'} />
              <strong style={{ fontSize: '0.92rem' }}>Acesso da Loja</strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textAlign: 'center' }}>
                Gestão, estoque e produtos
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('comprador')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '1rem 0.5rem',
                borderRadius: 'var(--radius-lg)',
                background: selectedRole === 'comprador' ? 'rgba(56, 189, 248, 0.12)' : 'var(--bg-secondary)',
                border: selectedRole === 'comprador' ? '2px solid #38bdf8' : '1px solid var(--border-card)',
                color: selectedRole === 'comprador' ? '#7dd3fc' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <User size={26} color={selectedRole === 'comprador' ? '#38bdf8' : 'var(--text-dim)'} />
              <strong style={{ fontSize: '0.92rem' }}>Sou Comprador</strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textAlign: 'center' }}>
                Meus pedidos e entregas
              </span>
            </button>
          </div>

          {/* Atalhos de Demonstração em 1 Clique */}
          <div style={{ marginBottom: '1.5rem', padding: '0.85rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.6rem', textAlign: 'center' }}>
              ⚡ ACESSO RÁPIDO PARA TESTES:
            </span>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={() => handleQuickLogin('loja')}
                className="btn-outline-yellow"
                style={{ flex: 1, fontSize: '0.78rem', padding: '0.5rem' }}
              >
                Entrar como Loja Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('comprador')}
                className="btn-secondary"
                style={{ flex: 1, fontSize: '0.78rem', padding: '0.5rem' }}
              >
                Entrar como Comprador Demo
              </button>
            </div>
          </div>

          {/* Formulário com Email Personalizado */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                {selectedRole === 'loja' ? 'Nome do Administrador / Gestor' : 'Seu Nome ou Construtora'}
              </label>
              <input
                type="text"
                placeholder={selectedRole === 'loja' ? 'Ex: Leonardo Trevas' : 'Ex: João Carlos da Silva'}
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">E-mail</label>
              <input
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <button
              type="submit"
              className={selectedRole === 'loja' ? 'btn-primary' : 'btn-secondary'}
              style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem' }}
            >
              <span>Acessar {selectedRole === 'loja' ? 'Painel Geral da Loja' : 'Minha Conta de Comprador'}</span>
              <ArrowRight size={17} />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, ShieldCheck, User, ArrowRight, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { HidraIcon } from './HidraIcon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginWithCredentials } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('loja');
  const [email, setEmail] = useState('contato@hidraeletrica.com');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await loginWithCredentials(
        email,
        password,
        selectedRole,
        fullName.trim() || undefined
      );

      if (res.success) {
        onSuccess(selectedRole);
        onClose();
      } else {
        setErrorMessage(res.error || 'Falha ao autenticar. Verifique seus dados.');
      }
    } catch {
      setErrorMessage('Erro de conexão ao autenticar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'loja') {
      setEmail('contato@hidraeletrica.com');
    } else {
      setEmail('');
    }
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
          maxWidth: '480px',
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
            <HidraIcon size={46} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--text-main)' }}>
            Portal HidraElétrica
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Selecione seu perfil para acessar a plataforma
          </p>
        </div>

        <div style={{ padding: '1.75rem 2rem' }}>
          
          {/* Alternador de Perfis (Loja vs Comprador) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <button
              type="button"
              onClick={() => handleRoleChange('loja')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.9rem 0.5rem',
                borderRadius: 'var(--radius-lg)',
                background: selectedRole === 'loja' ? 'rgba(250, 204, 21, 0.12)' : 'var(--bg-secondary)',
                border: selectedRole === 'loja' ? '2px solid var(--yellow-400)' : '1px solid var(--border-card)',
                color: selectedRole === 'loja' ? 'var(--yellow-300)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <ShieldCheck size={24} color={selectedRole === 'loja' ? 'var(--yellow-400)' : 'var(--text-dim)'} />
              <strong style={{ fontSize: '0.9rem' }}>Acesso da Loja</strong>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textAlign: 'center' }}>
                Gestão e Estoque
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('comprador')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.9rem 0.5rem',
                borderRadius: 'var(--radius-lg)',
                background: selectedRole === 'comprador' ? 'rgba(56, 189, 248, 0.12)' : 'var(--bg-secondary)',
                border: selectedRole === 'comprador' ? '2px solid #38bdf8' : '1px solid var(--border-card)',
                color: selectedRole === 'comprador' ? '#7dd3fc' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <User size={24} color={selectedRole === 'comprador' ? '#38bdf8' : 'var(--text-dim)'} />
              <strong style={{ fontSize: '0.9rem' }}>Comprador</strong>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textAlign: 'center' }}>
                Histórico de Pedidos
              </span>
            </button>
          </div>

          {/* Mensagem de Erro se houver */}
          {errorMessage && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.82rem',
              marginBottom: '1rem'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Formulário com Autenticação Real */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            
            {selectedRole === 'comprador' && (
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Nome Completo ou Construtora *</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    placeholder="Ex: João da Silva"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.4rem' }}
                  />
                </div>
              </div>
            )}

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">E-mail de Acesso *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  required
                  placeholder="contato@hidraeletrica.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Senha *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  required
                  placeholder="Digite sua senha..."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={selectedRole === 'loja' ? 'btn-primary' : 'btn-secondary'}
              style={{
                width: '100%',
                marginTop: '0.5rem',
                padding: '0.8rem',
                fontSize: '0.92rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  <span>Validando Acesso...</span>
                </>
              ) : (
                <>
                  <span>Entrar {selectedRole === 'loja' ? 'no Painel da Loja' : 'na Minha Conta'}</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

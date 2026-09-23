import React from 'react';

interface HidraIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Ícone oficial HidraElétrica:
 * Círculo bipartido (Vermelho à esquerda, Amarelo à direita)
 * com Raio Branco vazando no centro, fiel à logo da empresa.
 */
export const HidraIcon: React.FC<HidraIconProps> = ({ size = 36, className = '', style }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    >
      <defs>
        {/* Máscara do círculo com corte para o raio */}
        <clipPath id="circle-clip">
          <circle cx="50" cy="50" r="40" />
        </clipPath>
      </defs>

      {/* Metade Esquerda: Vermelho (#E11D24) */}
      <path
        d="M 50 10 A 40 40 0 0 0 50 90 Z"
        fill="#DC2626"
      />

      {/* Metade Direita: Amarelo (#FDE047 / #FFE500) */}
      <path
        d="M 50 10 A 40 40 0 0 1 50 90 Z"
        fill="#FFE500"
      />

      {/* Raio Branco em Destaque Cortando o Círculo com Pontas Salientes */}
      <polygon
        points="
          28,14 
          62,38 
          46,42 
          72,86 
          38,62 
          54,58
        "
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
    </svg>
  );
};

export default HidraIcon;

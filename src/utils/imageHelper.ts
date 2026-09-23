/**
 * Catálogo curado de imagens em alta resolução para materiais elétricos e hidráulicos.
 * Usado para geração automática com base no nome e categoria do material.
 */
const CURATED_IMAGES = {
  // Elétrica
  cabo_fio: [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
  ],
  disjuntor_quadro: [
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80'
  ],
  tomada_interruptor: [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80'
  ],
  // Hidráulica
  tubo_cano: [
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
  ],
  registro_valvula: [
    'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
  ],
  chuveiro_torneira: [
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
  ],
  // Iluminação
  refletor_led: [
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=800&q=80'
  ],
  painel_plafon: [
    'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
  ],
  // Ferramentas
  ferramenta: [
    'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'
  ],
  // Bombas
  bomba: [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80'
  ]
};

/**
 * Analisa o nome e categoria do material e gera a melhor foto profissional correspondente
 */
export function generateProductImage(productName: string, categoryId: string): string {
  const name = productName.toLowerCase();

  // Elétrica
  if (name.includes('cabo') || name.includes('fio') || name.includes('cordão') || name.includes('flexível')) {
    return CURATED_IMAGES.cabo_fio[Math.floor(Math.random() * CURATED_IMAGES.cabo_fio.length)];
  }
  if (name.includes('disjuntor') || name.includes('quadro') || name.includes('dr') || name.includes('dps') || name.includes('barramento')) {
    return CURATED_IMAGES.disjuntor_quadro[Math.floor(Math.random() * CURATED_IMAGES.disjuntor_quadro.length)];
  }
  if (name.includes('tomada') || name.includes('interruptor') || name.includes('placa') || name.includes('módulo')) {
    return CURATED_IMAGES.tomada_interruptor[Math.floor(Math.random() * CURATED_IMAGES.tomada_interruptor.length)];
  }

  // Hidráulica
  if (name.includes('tubo') || name.includes('cano') || name.includes('conexão') || name.includes('joelho') || name.includes('curva') || name.includes('tee') || name.includes('luva')) {
    return CURATED_IMAGES.tubo_cano[Math.floor(Math.random() * CURATED_IMAGES.tubo_cano.length)];
  }
  if (name.includes('registro') || name.includes('válvula') || name.includes('gaveta') || name.includes('esfera')) {
    return CURATED_IMAGES.registro_valvula[Math.floor(Math.random() * CURATED_IMAGES.registro_valvula.length)];
  }
  if (name.includes('chuveiro') || name.includes('ducha') || name.includes('torneira')) {
    return CURATED_IMAGES.chuveiro_torneira[Math.floor(Math.random() * CURATED_IMAGES.chuveiro_torneira.length)];
  }

  // Iluminação
  if (name.includes('refletor') || name.includes('projetor') || name.includes('holofote')) {
    return CURATED_IMAGES.refletor_led[Math.floor(Math.random() * CURATED_IMAGES.refletor_led.length)];
  }
  if (name.includes('painel') || name.includes('plafon') || name.includes('lâmpada') || name.includes('led') || name.includes('fita')) {
    return CURATED_IMAGES.painel_plafon[Math.floor(Math.random() * CURATED_IMAGES.painel_plafon.length)];
  }

  // Ferramentas
  if (name.includes('alicate') || name.includes('multímetro') || name.includes('chave') || name.includes('trena') || name.includes('furadeira') || name.includes('epi')) {
    return CURATED_IMAGES.ferramenta[Math.floor(Math.random() * CURATED_IMAGES.ferramenta.length)];
  }

  // Bombas
  if (name.includes('bomba') || name.includes('pressurizador') || name.includes('motobomba') || name.includes('submersa')) {
    return CURATED_IMAGES.bomba[Math.floor(Math.random() * CURATED_IMAGES.bomba.length)];
  }

  // Fallback por categoria
  if (categoryId === 'hidraulica') return CURATED_IMAGES.tubo_cano[0];
  if (categoryId === 'iluminacao') return CURATED_IMAGES.refletor_led[0];
  if (categoryId === 'ferramentas') return CURATED_IMAGES.ferramenta[0];
  if (categoryId === 'bombas') return CURATED_IMAGES.bomba[0];

  return CURATED_IMAGES.cabo_fio[0];
}

/**
 * Lê um arquivo de imagem selecionado pelo usuário e converte em base64 DataURL
 */
export function convertFileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selecione um arquivo de imagem válido (JPG, PNG, WebP).'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

import { Category, Product, StoreSettings, UserProfile } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'todos',
    name: 'Todos os Materiais',
    icon: 'Layers',
    description: 'Catálogo completo de materiais elétricos e hidráulicos'
  },
  {
    id: 'eletrica',
    name: 'Elétrica',
    icon: 'Zap',
    description: 'Cabos flexíveis, disjuntores, quadros, conduítes e interruptores'
  },
  {
    id: 'hidraulica',
    name: 'Hidráulica',
    icon: 'Droplets',
    description: 'Tubos soldáveis, conexões de PVC e PPR, registros e caixas d’água'
  },
  {
    id: 'iluminacao',
    name: 'Iluminação',
    icon: 'Lightbulb',
    description: 'Painéis LED, refletores potentes, fitas de LED e luminárias técnicas'
  },
  {
    id: 'ferramentas',
    name: 'Ferramentas & EPIs',
    icon: 'Wrench',
    description: 'Alicates, multímetros profissionais, trenas a laser e proteção'
  },
  {
    id: 'bombas',
    name: 'Bombas & Pressurizadores',
    icon: 'Gauge',
    description: 'Bombas periféricas, submersas e pressurizadores automáticos'
  }
];

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  id: 'store-default-1',
  store_name: 'HidraElétrica Materiais',
  whatsapp_number: '5511999998888', // 55 + DDD + Numero (configurável no painel)
  phone: '(11) 3456-7890',
  email: 'comercial@hidraeletrica.com.br',
  cnpj: '38.452.910/0001-44',
  address_street: 'Av. das Indústrias, 1420',
  address_neighborhood: 'Polo Industrial Leste',
  address_city: 'São Paulo',
  address_state: 'SP',
  address_zip: '03100-000',
  business_hours_weekday: 'Segunda a Sexta: 07:30 às 18:00',
  business_hours_saturday: 'Sábado: 08:00 às 13:00',
  pix_key: 'financeiro@hidraeletrica.com.br',
  pix_key_type: 'Chave E-mail',
  announcement_banner: '⚡ Atendimento e orçamento imediato pelo WhatsApp | Entregas em até 24h para obras e construtoras!'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Cabo Flexível 2,5mm² 750V Rolo 100m Antichama Preto',
    description: 'Cabo de cobre puro eletrolítico de alta condutibilidade e flexibilidade classe 5. Capa em composto termoplástico PVC antichama BWF-B. Indicado para circuitos de tomadas e iluminação conforme NBR 5410.',
    category_id: 'eletrica',
    price: 189.90,
    original_price: 229.00,
    brand: 'Sil Fios & Cabos',
    sku: 'SIL-CAB-25-PT',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    stock_quantity: 42,
    show_stock_to_buyer: true,
    is_active: true,
    featured: true,
    specs: {
      'Bitola': '2,5 mm²',
      'Comprimento': '100 metros',
      'Tensão Máxima': '750V',
      'Norma': 'NBR NM 247-3',
      'Material do Condutor': 'Cobre Eletrolítico 99,9%',
      'Capa': 'PVC Antichama'
    }
  },
  {
    id: 'prod-02',
    name: 'Cabo Flexível 4,0mm² 750V Rolo 100m Azul Claro (Neutro)',
    description: 'Cabo flexível condutor em cobre puro, classe 5. Ideal para alimentar circuitos de maior potência como chuveiros 127V, torneiras elétricas e fornos em conformidade com as normas ABNT.',
    category_id: 'eletrica',
    price: 289.00,
    original_price: 330.00,
    brand: 'Sil Fios & Cabos',
    sku: 'SIL-CAB-40-AZ',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    stock_quantity: 18,
    show_stock_to_buyer: true,
    is_active: true,
    featured: true,
    specs: {
      'Bitola': '4,0 mm²',
      'Comprimento': '100 metros',
      'Tensão': '750V',
      'Cor': 'Azul Claro (Neutro)',
      'Garantia': '5 anos do fabricante'
    }
  },
  {
    id: 'prod-03',
    name: 'Disjuntor Bipolar DIN 32A Curva C 3kA',
    description: 'Mini disjuntor termomagnético de resposta rápida contra sobrecarga e curto-circuito. Fixação prática em trilho DIN 35mm. Ideal para chuveiros de 220V, aparelhos de ar-condicionado e circuitos bifásicos.',
    category_id: 'eletrica',
    price: 44.90,
    original_price: 52.00,
    brand: 'Schneider Electric',
    sku: 'SCH-DISJ-2P-32A',
    image_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    stock_quantity: 65,
    show_stock_to_buyer: false, // Configurado pela loja para não mostrar quantidade exata
    is_active: true,
    featured: true,
    specs: {
      'Número de Polos': '2 Polos (Bipolar)',
      'Corrente Nominal': '32A',
      'Curva de Disparo': 'C',
      'Capacidade de Interrupção': '3.000A (3kA)',
      'Fixação': 'Trilho DIN 35mm'
    }
  },
  {
    id: 'prod-04',
    name: 'Dispositivo DR Tetrapolar 63A 30mA Tipo AC',
    description: 'Interruptor Diferencial Residual (IDR) essencial para proteção humana contra choques elétricos e fugas de corrente. Obrigatório pelas normas de instalações elétricas em áreas molhadas.',
    category_id: 'eletrica',
    price: 185.00,
    original_price: 215.00,
    brand: 'Steck',
    sku: 'STK-IDR-4P-63A',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    stock_quantity: 15,
    show_stock_to_buyer: true,
    is_active: true,
    featured: false,
    specs: {
      'Polos': '4 Polos (Tetrapolar)',
      'Corrente Nominal': '63A',
      'Sensibilidade': '30mA (Proteção de Pessoas)',
      'Norma': 'IEC 61008-1'
    }
  },
  {
    id: 'prod-05',
    name: 'Tubo PVC Soldável Marrom 25mm (3/4") Barra 6m Água Fria',
    description: 'Tubo de PVC rígido de alto desempenho hidráulico para redes prediais de distribuição de água potável. Conexão por junta soldável através de adesivo plástico.',
    category_id: 'hidraulica',
    price: 33.50,
    original_price: 39.00,
    brand: 'Tigre',
    sku: 'TIG-TUB-25-6M',
    image_url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    stock_quantity: 140,
    show_stock_to_buyer: true,
    is_active: true,
    featured: true,
    specs: {
      'Diâmetro Nominal': '25mm (3/4")',
      'Comprimento': '6 Metros',
      'Pressão de Serviço': '7,5 kgf/cm² (75 m.c.a.)',
      'Material': 'PVC 100% Virgem',
      'Norma': 'NBR 5648'
    }
  },
  {
    id: 'prod-06',
    name: 'Registro de Gaveta 3/4" DN20 em Bronze com Acabamento C50',
    description: 'Registro de bloqueio integral para manutenção de ramais hidráulicos residenciais ou comerciais. Excelente vedação estanque com sede de latão usinada.',
    category_id: 'hidraulica',
    price: 74.90,
    original_price: 89.90,
    brand: 'Deca',
    sku: 'DEC-REG-GAV-34',
    image_url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    stock_quantity: 26,
    show_stock_to_buyer: true,
    is_active: true,
    featured: true,
    specs: {
      'Bitola': '3/4" (DN20)',
      'Tipo de Mecanismo': 'Gaveta (Totalmente Aberto ou Fechado)',
      'Material': 'Liga de Cobre e Latão',
      'Rosca': 'BSPB NBR 8133'
    }
  },
  {
    id: 'prod-07',
    name: 'Tubo PPR Água Quente PN20 25mm Barra 3m Fusão Térmica',
    description: 'Sistema inovador em polipropileno copolímero random para condução de água quente em alta pressão. União por termofusão molecular a 260°C, eliminando qualquer risco de vazamento nas juntas.',
    category_id: 'hidraulica',
    price: 49.00,
    original_price: 58.00,
    brand: 'Amanco Wavin',
    sku: 'AMA-PPR-25-3M',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    stock_quantity: 50,
    show_stock_to_buyer: false,
    is_active: true,
    featured: false,
    specs: {
      'Diâmetro': '25mm',
      'Comprimento': '3 metros',
      'Pressão Nominal': 'PN20 (20 bar a 20°C)',
      'Temperatura Máxima': '95°C',
      'Tipo de União': 'Termofusão'
    }
  },
  {
    id: 'prod-08',
    name: 'Refletor LED Microled 100W IP66 Bivolt 6500K Branco Frio',
    description: 'Potência luminosa de 9.000 lúmens com corpo em alumínio injetado e pintura eletrostática preta. Grau de proteção IP66 à prova de chuva torrencial e poeira industrial.',
    category_id: 'iluminacao',
    price: 84.90,
    original_price: 110.00,
    brand: 'Avant Iluminação',
    sku: 'AVA-REF-100W-BF',
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    stock_quantity: 38,
    show_stock_to_buyer: true,
    is_active: true,
    featured: true,
    specs: {
      'Potência': '100W',
      'Fluxo Luminoso': '9.000 Lúmens',
      'Temperatura de Cor': '6500K (Luz Branca Fria)',
      'Tensão': 'Bivolt Automático (100-240V)',
      'Proteção': 'IP66'
    }
  },
  {
    id: 'prod-09',
    name: 'Painel Plafon LED Embutir Quadrado 24W 4000K Luz Neutra',
    description: 'Luminária slim de embutir em forro de gesso, madeira ou PVC. Iluminação homogênea com difusor leitoso anti-ofuscamento. Acompanha presilhas de fixação e driver bivolt.',
    category_id: 'iluminacao',
    price: 36.90,
    original_price: 45.00,
    brand: 'G-Light',
    sku: 'GLI-PLAF-24W-4K',
    image_url: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=800&q=80',
    stock_quantity: 70,
    show_stock_to_buyer: true,
    is_active: true,
    featured: false,
    specs: {
      'Potência': '24W',
      'Dimensões': '30cm x 30cm',
      'Temperatura': '4000K (Branco Neutro)',
      'Vida Útil': '25.000 horas'
    }
  },
  {
    id: 'prod-10',
    name: 'Multímetro Digital Profissional True RMS com Lanterna e Teste NCV',
    description: 'Instrumento indispensável para eletricistas de instalações e técnicos de manutenção. Realiza testes de tensão AC/DC até 600V, corrente até 10A, continuidade com alarme sonoro, capacitância e frequência.',
    category_id: 'ferramentas',
    price: 139.90,
    original_price: 169.00,
    brand: 'Minipa',
    sku: 'MIN-ET-1002-TRMS',
    image_url: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80',
    stock_quantity: 14,
    show_stock_to_buyer: true,
    is_active: true,
    featured: true,
    specs: {
      'Categoria de Segurança': 'CAT III 600V',
      'True RMS': 'Sim',
      'Detector de Tensão sem Contato (NCV)': 'Integrado',
      'Display': 'LCD Iluminado 4000 Contagens'
    }
  },
  {
    id: 'prod-11',
    name: 'Alicate Decapador e Crimpador Automático 8" Multifunção',
    description: 'Ferramenta 3 em 1 para cortar, decapar fios de 0,2 a 6,0 mm² e crimpar terminais isolados e não isolados. Regulagem de pressão da lâmina e batente de comprimento ajustável.',
    category_id: 'ferramentas',
    price: 69.90,
    original_price: 85.00,
    brand: 'Tramontina Pro',
    sku: 'TRA-ALI-DEC-8',
    image_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    stock_quantity: 22,
    show_stock_to_buyer: true,
    is_active: true,
    featured: false,
    specs: {
      'Capacidade de Decapagem': '0,2 mm² a 6,0 mm²',
      'Cabo': 'Ergonômico emborrachado',
      'Lâminas': 'Aço Carbono temperado'
    }
  },
  {
    id: 'prod-12',
    name: 'Bomba Periférica 1/2 CV 127V/220V com Rotor em Latão',
    description: 'Bomba de água compacta e de alta pressão para transferência de água limpa de cisternas para caixas superiores de até 32 metros de elevação. Rotor em bronze de alta durabilidade que não enferruja.',
    category_id: 'bombas',
    price: 279.00,
    original_price: 330.00,
    brand: 'Dancor',
    sku: 'DAN-BOMB-PER-HALF',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    stock_quantity: 9,
    show_stock_to_buyer: true,
    is_active: true,
    featured: true,
    specs: {
      'Potência': '1/2 CV (370W)',
      'Vazão Máxima': '2.100 Litros/Hora',
      'Altura Manométrica': 'Até 32 metros (m.c.a.)',
      'Sucção e Recalque': '1" Rosca BSP',
      'Rotor': 'Bronze / Latão Puro'
    }
  }
];

export const MOCK_ADMIN_USER: UserProfile = {
  id: 'usr-admin-1',
  email: 'admin@hidraeletrica.com.br',
  full_name: 'Gerente HidraElétrica',
  role: 'loja',
  phone: '(11) 99999-8888',
  company_name: 'HidraElétrica Comércio de Materiais Ltda',
  cnpj_or_cpf: '38.452.910/0001-44'
};

export const MOCK_BUYER_USER: UserProfile = {
  id: 'usr-buyer-1',
  email: 'joao.engenheiro@construtora.com.br',
  full_name: 'João Carlos Silva (Construtora Horizonte)',
  role: 'comprador',
  phone: '(11) 98765-4321',
  address_street: 'Rua das Palmeiras, 450 - Obra Residencial Alpha',
  address_neighborhood: 'Jardins',
  address_city: 'São Paulo',
  address_state: 'SP',
  address_zip: '01420-001',
  company_name: 'Construtora Horizonte Ltda',
  cnpj_or_cpf: '12.876.543/0001-99'
};

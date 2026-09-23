-- ========================================================
-- BANCO DE DADOS: HIDRAELÉTRICA
-- Projeto Supabase: ctamabgxqlpeyaisonfx
-- ========================================================

-- Habilitar extensão para geração de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABELA DE CONFIGURAÇÕES DA LOJA
CREATE TABLE IF NOT EXISTS store_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_name TEXT NOT NULL DEFAULT 'HidraElétrica Materiais',
    whatsapp_number TEXT NOT NULL DEFAULT '5511999999999',
    phone TEXT DEFAULT '(11) 3456-7890',
    email TEXT DEFAULT 'contato@hidraeletrica.com.br',
    cnpj TEXT DEFAULT '12.345.678/0001-90',
    address_street TEXT DEFAULT 'Av. dos Engenheiros, 1250',
    address_neighborhood TEXT DEFAULT 'Distrito Industrial',
    address_city TEXT DEFAULT 'São Paulo',
    address_state TEXT DEFAULT 'SP',
    address_zip TEXT DEFAULT '04571-000',
    business_hours_weekday TEXT DEFAULT 'Segunda a Sexta: 07:30 às 18:00',
    business_hours_saturday TEXT DEFAULT 'Sábado: 08:00 às 13:00',
    pix_key TEXT DEFAULT 'contato@hidraeletrica.com.br',
    pix_key_type TEXT DEFAULT 'E-mail',
    announcement_banner TEXT DEFAULT '⚡ Entrega expressa para obras e indústrias em até 24h na região!',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir configuração padrão caso não exista
INSERT INTO store_settings (
    id, store_name, whatsapp_number, phone, email, cnpj, 
    address_street, address_neighborhood, address_city, address_state, address_zip,
    business_hours_weekday, business_hours_saturday, pix_key, pix_key_type
) 
SELECT 
    'a0000000-0000-0000-0000-000000000001',
    'HidraElétrica',
    '5511999999999',
    '(11) 3456-7890',
    'contato@hidraeletrica.com.br',
    '12.345.678/0001-90',
    'Av. dos Engenheiros, 1250',
    'Distrito Industrial',
    'São Paulo',
    'SP',
    '04571-000',
    'Segunda a Sexta: 07:30 às 18:00',
    'Sábado: 08:00 às 13:00',
    'financeiro@hidraeletrica.com.br',
    'E-mail'
WHERE NOT EXISTS (SELECT 1 FROM store_settings LIMIT 1);

-- 2. TABELA DE CATEGORIAS
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO categories (id, name, icon, description) VALUES
('eletrica', 'Elétrica', 'Zap', 'Cabos, disjuntores, quadros e componentes de alta e baixa tensão'),
('hidraulica', 'Hidráulica', 'Droplets', 'Tubos, conexões de PVC/PPR, registros e válvulas para água fria e quente'),
('iluminacao', 'Iluminação', 'Lightbulb', 'Painéis LED, refletores de alta potência, lâmpadas industriais e fitas'),
('ferramentas', 'Ferramentas & EPIs', 'Wrench', 'Alicates decapadores, multímetros, trenas, capacetes e luvas isolantes'),
('bombas', 'Bombas & Pressurizadores', 'Gauge', 'Bombas d''água submersas, pressurizadores de rede e motobombas')
ON CONFLICT (id) DO NOTHING;

-- 3. TABELA DE PRODUTOS
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
    price NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    brand TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    image_url TEXT NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    show_stock_to_buyer BOOLEAN NOT NULL DEFAULT true, -- Permite a loja escolher se exibe ou oculta a quantidade ao comprador
    is_active BOOLEAN NOT NULL DEFAULT true,            -- Ativar / Inativar produto na loja
    featured BOOLEAN DEFAULT false,
    specs JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABELA DE PERFIS DE USUÁRIOS (LOJA VS COMPRADOR)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('loja', 'comprador')),
    phone TEXT,
    address_street TEXT,
    address_neighborhood TEXT,
    address_city TEXT,
    address_state TEXT,
    address_zip TEXT,
    company_name TEXT,
    cnpj_or_cpf TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABELA DE PEDIDOS / ORÇAMENTOS
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    buyer_name TEXT NOT NULL,
    buyer_phone TEXT NOT NULL,
    buyer_email TEXT,
    delivery_address TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    notes TEXT,
    items JSONB NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_separacao', 'enviado', 'concluido', 'cancelado')),
    whatsapp_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir produtos de exemplo realistas
INSERT INTO products (name, description, category_id, price, original_price, brand, sku, image_url, stock_quantity, show_stock_to_buyer, is_active, featured, specs)
VALUES
(
    'Cabo Flexível 2,5mm² 750V Rolo 100m Antichama Preto',
    'Cabo de cobre puro eletrolítico de alta qualidade e flexibilidade classe 5. Capa em PVC antichama BWF-B. Indicado para circuitos de tomadas residenciais e comerciais conforme NBR 5410.',
    'eletrica',
    189.90,
    219.00,
    'Sil Fios',
    'EL-CAB-25-PT',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    45,
    true,
    true,
    true,
    '{"Secao": "2,5 mm²", "Comprimento": "100 metros", "Tensao": "750V", "Norma": "NBR NM 247-3", "Material": "Cobre Eletrolítico"}'
),
(
    'Disjuntor Bipolar DIN 32A Curva C 3kA',
    'Proteção confiável contra sobrecargas e curtos-circuitos em instalações elétricas bifásicas ou circuitos dedicados (chuveiros, ar-condicionado). Acionamento magnético e térmico preciso.',
    'eletrica',
    44.50,
    49.90,
    'Schneider Electric',
    'EL-DISJ-2P-32A',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    28,
    false, -- Loja optou por não exibir a quantidade exata para o comprador
    true,
    true,
    '{"Polos": "2 (Bipolar)", "Corrente Nominal": "32A", "Curva": "C", "Capacidade de Ruptura": "3kA", "Fixacao": "Trilho DIN"}'
),
(
    'Tubo PVC Soldável Marrom 25mm (3/4") Barra 6m Água Fria',
    'Tubo de PVC de alta resistência química e mecânica para condução de água fria predial e residencial. Suporta pressão de serviço de até 750 kPa (75 m.c.a.) à temperatura de 20°C.',
    'hidraulica',
    34.90,
    39.90,
    'Tigre',
    'HD-TUB-25-6M',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    120,
    true,
    true,
    true,
    '{"Diametro": "25mm (3/4 pol)", "Comprimento": "6 metros", "Pressao": "7,5 kgf/cm²", "Material": "PVC 100% Virgem", "Norma": "NBR 5648"}'
),
(
    'Registro de Gaveta 3/4" Bruto com Canopla Cromada',
    'Registro de bloqueio total de fluxo para redes hidráulicas de água fria e quente. Corpo em liga de cobre (bronze e latão) de extrema durabilidade e vedação estanque.',
    'hidraulica',
    68.00,
    78.00,
    'Deca',
    'HD-REG-GAV-34',
    'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    19,
    true,
    true,
    true,
    '{"Bitola": "3/4\" (DN20)", "Tipo": "Gaveta (Bloqueio)", "Material": "Liga de Cobre / Latão", "Rosca": "BSPB (NBR 8133)"}'
),
(
    'Quadro de Distribuição Embutir 24 Disjuntores DIN com Barramento',
    'Quadro termoplástico resistente com porta fumê anti-UV, trilhos DIN metálicos e barramento fase/neutro/terra inclusos. Design discreto e amplo espaço interno para cabeamento.',
    'eletrica',
    145.00,
    169.00,
    'Tigre / Steck',
    'EL-QD-EMB-24',
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    14,
    true,
    true,
    false,
    '{"Capacidade": "24 módulos DIN", "Instalacao": "Embutir", "Porta": "Fumê Reversível", "Grau de Protecao": "IP40"}'
),
(
    'Refletor LED Slim 100W IP66 Bivolt 6500K Branco Frio',
    'Refletor de alto rendimento luminoso com corpo em alumínio injetado e dissipador térmico integrado. À prova d''água e intempéries (IP66), ideal para fachadas, galpões e áreas externas.',
    'iluminacao',
    79.90,
    98.00,
    'Avant',
    'IL-REF-100W-BF',
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    35,
    false,
    true,
    true,
    '{"Potencia": "100W", "Temperatura de Cor": "6500K (Branco Frio)", "Fluxo Luminoso": "8500 lm", "Tensao": "100-240V Bivolt", "Protecao": "IP66"}'
),
(
    'Multímetro Digital Profissional com True RMS e Detector NCV',
    'Instrumento indispensável para eletricistas e técnicos de manutenção. Medição de tensão AC/DC até 600V, corrente até 10A, continuidade com bip sonoro, resistência e teste de diodo.',
    'ferramentas',
    129.00,
    155.00,
    'Minipa',
    'FE-MULT-TRMS-01',
    'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80',
    12,
    true,
    true,
    false,
    '{"Display": "LCD 3 5/6 dígitos", "True RMS": "Sim", "Seguranca": "CAT III 600V", "Alimentacao": "2x Pilhas AAA"}'
),
(
    'Bomba Periférica 1/2 CV 127V/220V com Rotor em Bronze',
    'Ideal para poços artesianos rasos, cisternas e elevação de água para caixas d''água até 30 metros de altura. Baixo consumo elétrico e alta vazão de até 2.100 litros/hora.',
    'bombas',
    279.00,
    320.00,
    'Dancor',
    'BM-PERIF-HALF-CV',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    8,
    true,
    true,
    true,
    '{"Potencia": "1/2 CV (370W)", "Vazao Maxima": "2.100 L/h", "Altura Manometrica": "30 m.c.a.", "Succao": "1\" Rosca BSP"}'
)
ON CONFLICT (sku) DO NOTHING;

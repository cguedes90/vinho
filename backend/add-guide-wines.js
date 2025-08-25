require('dotenv').config();
const { query } = require('./db');

async function addGuideWines() {
    try {
        const winesData = [
            // Tintos Encorpados
            {
                nome: 'Malbec Argentino Premium',
                descricao: 'Vinho tinto encorpado da região de Mendoza, ideal para carnes vermelhas e churrasco',
                preco: 89.90,
                tipo: 'Tinto',
                harmonizacao: 'Carnes vermelhas, churrasco, cordeiro',
                estoque: 25,
                lojista_id: 1
            },
            {
                nome: 'Cabernet Sauvignon Chileno',
                descricao: 'Tinto robusto do Vale do Maipo, perfeito para ocasiões especiais',
                preco: 95.50,
                tipo: 'Tinto',
                harmonizacao: 'Bifes, costela, queijos maturados',
                estoque: 18,
                lojista_id: 1
            },
            
            // Tintos Leves e Suaves
            {
                nome: 'Pinot Noir Francês',
                descricao: 'Vinho elegante e suave da Borgonha, ideal para jantares românticos',
                preco: 128.00,
                tipo: 'Tinto',
                harmonizacao: 'Salmão, aves, cogumelos',
                estoque: 12,
                lojista_id: 1
            },
            {
                nome: 'Merlot Brasileiro',
                descricao: 'Tinto macio e aveludado da Serra Gaúcha, versátil para diversas ocasiões',
                preco: 67.90,
                tipo: 'Tinto',
                harmonizacao: 'Massas, pizza, queijos suaves',
                estoque: 30,
                lojista_id: 1
            },
            
            // Brancos Frescos
            {
                nome: 'Sauvignon Blanc Neozelandês',
                descricao: 'Branco refrescante com notas cítricas, perfeito para dias quentes',
                preco: 79.90,
                tipo: 'Branco',
                harmonizacao: 'Peixes, frutos do mar, saladas',
                estoque: 22,
                lojista_id: 1
            },
            {
                nome: 'Pinot Grigio Italiano',
                descricao: 'Vinho leve e mineral do norte da Itália, ideal para aperitivos',
                preco: 73.50,
                tipo: 'Branco',
                harmonizacao: 'Antipasti, peixes brancos, risotto',
                estoque: 20,
                lojista_id: 1
            },
            
            // Brancos Cremosos
            {
                nome: 'Chardonnay com Barrica',
                descricao: 'Branco complexo e cremoso, envelhecido em barricas de carvalho francês',
                preco: 115.00,
                tipo: 'Branco',
                harmonizacao: 'Aves assadas, peixes grelhados, queijos cremosos',
                estoque: 15,
                lojista_id: 1
            },
            
            // Rosés
            {
                nome: 'Rosé de Provence',
                descricao: 'Rosé seco e elegante da França, perfeito para piscina e dias de verão',
                preco: 92.80,
                tipo: 'Rosé',
                harmonizacao: 'Saladas, aperitivos, comida mediterrânea',
                estoque: 18,
                lojista_id: 1
            },
            {
                nome: 'Rosé Português Seco',
                descricao: 'Rosé refrescante do Douro, com acidez equilibrada',
                preco: 58.90,
                tipo: 'Rosé',
                harmonizacao: 'Peixes, saladas, queijos frescos',
                estoque: 25,
                lojista_id: 1
            },
            
            // Espumantes
            {
                nome: 'Espumante Brut Brasileiro',
                descricao: 'Espumante de alta qualidade da Serra Gaúcha, método tradicional',
                preco: 85.00,
                tipo: 'Espumante',
                harmonizacao: 'Aperitivos, sushi, sobremesas',
                estoque: 20,
                lojista_id: 1
            },
            
            // Vinhos Especiais
            {
                nome: 'Sangiovese Toscano',
                descricao: 'Vinho italiano clássico, perfeito para massas com molho vermelho',
                preco: 108.90,
                tipo: 'Tinto',
                harmonizacao: 'Massas com tomate, pizza margherita, carnes grelhadas',
                estoque: 14,
                lojista_id: 1
            },
            {
                nome: 'Vinho do Porto Tawny',
                descricao: 'Vinho fortificado português, ideal para sobremesas',
                preco: 125.50,
                tipo: 'Licoroso',
                harmonizacao: 'Sobremesas, queijos azuis, chocolate',
                estoque: 8,
                lojista_id: 1
            },
            
            // Opções Custo-benefício
            {
                nome: 'Tinto Português do Douro',
                descricao: 'Vinho equilibrado e versátil, sempre uma escolha segura',
                preco: 64.90,
                tipo: 'Tinto',
                harmonizacao: 'Carnes, massas, queijos',
                estoque: 35,
                lojista_id: 1
            }
        ];

        for (const wine of winesData) {
            const result = await query(
                'INSERT INTO vinhos (nome, descricao, preco, tipo, harmonizacao, estoque, lojista_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
                [wine.nome, wine.descricao, wine.preco, wine.tipo, wine.harmonizacao, wine.estoque, wine.lojista_id]
            );
            console.log(`✅ Vinho adicionado: ${wine.nome} (ID: ${result.rows[0].id})`);
        }

        console.log('\n🍷 Todos os vinhos do guia foram adicionados com sucesso!');
        console.log(`📊 Total de vinhos adicionados: ${winesData.length}`);
        
    } catch (error) {
        console.error('❌ Erro ao adicionar vinhos:', error.message);
    }
    
    process.exit(0);
}

addGuideWines();
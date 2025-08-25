require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { query } = require('./db');
const { verifyToken, requireLojista, requireSuperAdmin, requireAdminOrLojista, createUser, authenticateUser, generateToken } = require('./auth');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas de autenticação
app.post('/api/auth/register', async (req, res) => {
	const { nome, email, password, tipoUsuario } = req.body;
	
	if (!nome || !email || !password || !tipoUsuario) {
		return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
	}
	
	if (!['lojista', 'cliente', 'super_admin'].includes(tipoUsuario)) {
		return res.status(400).json({ error: 'Tipo de usuário inválido' });
	}
	
	try {
		const existingUser = await query('SELECT id FROM usuarios WHERE email = $1', [email]);
		if (existingUser.rows.length > 0) {
			return res.status(400).json({ error: 'Email já cadastrado' });
		}
		
		const user = await createUser(nome, email, password, tipoUsuario);
		const token = generateToken(user);
		
		res.json({ user, token });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.post('/api/auth/login', async (req, res) => {
	const { email, password } = req.body;
	
	if (!email || !password) {
		return res.status(400).json({ error: 'Email e senha são obrigatórios' });
	}
	
	try {
		const user = await authenticateUser(email, password);
		if (!user) {
			return res.status(401).json({ error: 'Email ou senha inválidos' });
		}
		
		const token = generateToken(user);
		res.json({ user, token });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get('/api/vinhos', async (req, res) => {
	try {
		const result = await query('SELECT id, nome, descricao, preco, tipo, harmonizacao FROM vinhos ORDER BY id LIMIT 100');
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Rota de diagnóstico para testar conexão com o banco
app.get('/api/ping-db', async (req, res) => {
	try {
		const result = await query('SELECT 1 as ok');
		res.json({ db: 'ok', rows: result.rows });
	} catch (err) {
		res.status(500).json({ db: 'error', error: err.message });
	}
});

app.get('/api/vinhos/search', async (req, res) => {
	const q = req.query.q || '';
	try {
		const sql = `SELECT id, nome, descricao, preco, tipo, harmonizacao FROM vinhos WHERE lower(nome) LIKE $1 OR lower(tipo) LIKE $1 OR lower(descricao) LIKE $1 LIMIT 50`;
		const result = await query(sql, ['%' + q.toLowerCase() + '%']);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get('/api/vinhos/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const result = await query('SELECT * FROM vinhos WHERE id = $1', [id]);
		if (result.rows.length === 0) return res.status(404).json({ error: 'Vinho não encontrado' });
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Endpoint para inicializar o schema a partir do arquivo schema.sql
app.post('/api/init-schema', async (req, res) => {
	try {
		const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
		await query(sql);
		res.json({ ok: true });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Endpoint de recomendações baseado em uma query simples
app.get('/api/recommend', async (req, res) => {
	const q = (req.query.q || '').toLowerCase();
	try {
		const sql = `SELECT id, nome, descricao, preco, tipo, harmonizacao FROM vinhos WHERE lower(nome) LIKE $1 OR lower(tipo) LIKE $1 OR lower(descricao) LIKE $1 LIMIT 100`;
		const result = await query(sql, ['%' + q + '%']);
		const wines = result.rows;

		// Harmonizações únicas
		const harmonizacoes = Array.from(new Set(wines.map(w => w.harmonizacao).filter(Boolean))).slice(0, 10);

		// "Melhores vinhos" - aqui como os mais baratos e os mais caros (simples proxy)
		const topByPriceAsc = wines.slice().sort((a,b)=> parseFloat(a.preco)-parseFloat(b.preco)).slice(0,5);
		const topByPriceDesc = wines.slice().sort((a,b)=> parseFloat(b.preco)-parseFloat(a.preco)).slice(0,5);

		// Estatísticas de preço
		const prices = wines.map(w => parseFloat(w.preco)).filter(p=>!isNaN(p));
		const priceStats = prices.length ? {
			min: Math.min(...prices),
			max: Math.max(...prices),
			avg: prices.reduce((s,v)=>s+v,0)/prices.length
		} : { min: 0, max: 0, avg: 0 };

		res.json({ harmonizacoes, topByPriceAsc, topByPriceDesc, priceStats });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Rotas protegidas para lojistas
app.post('/api/vinhos', verifyToken, requireLojista, async (req, res) => {
	const { nome, descricao, preco, tipo, harmonizacao, estoque } = req.body;
	
	if (!nome || !preco || !tipo) {
		return res.status(400).json({ error: 'Nome, preço e tipo são obrigatórios' });
	}
	
	try {
		const result = await query(
			'INSERT INTO vinhos (nome, descricao, preco, tipo, harmonizacao, estoque, lojista_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
			[nome, descricao, preco, tipo, harmonizacao, estoque || 0, req.user.id]
		);
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.put('/api/vinhos/:id', verifyToken, requireLojista, async (req, res) => {
	const { id } = req.params;
	const { nome, descricao, preco, tipo, harmonizacao, estoque } = req.body;
	
	try {
		const existingWine = await query('SELECT * FROM vinhos WHERE id = $1 AND lojista_id = $2', [id, req.user.id]);
		if (existingWine.rows.length === 0) {
			return res.status(404).json({ error: 'Vinho não encontrado ou não pertence ao usuário' });
		}
		
		const result = await query(
			'UPDATE vinhos SET nome = $1, descricao = $2, preco = $3, tipo = $4, harmonizacao = $5, estoque = $6 WHERE id = $7 AND lojista_id = $8 RETURNING *',
			[nome, descricao, preco, tipo, harmonizacao, estoque, id, req.user.id]
		);
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.delete('/api/vinhos/:id', verifyToken, requireLojista, async (req, res) => {
	const { id } = req.params;
	
	try {
		const result = await query('DELETE FROM vinhos WHERE id = $1 AND lojista_id = $2 RETURNING *', [id, req.user.id]);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'Vinho não encontrado ou não pertence ao usuário' });
		}
		res.json({ message: 'Vinho removido com sucesso' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get('/api/lojista/vinhos', verifyToken, requireLojista, async (req, res) => {
	try {
		const result = await query('SELECT * FROM vinhos WHERE lojista_id = $1 ORDER BY id', [req.user.id]);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Rotas do Super Admin
app.get('/api/admin/dashboard', verifyToken, requireSuperAdmin, async (req, res) => {
	try {
		// Estatísticas gerais
		const totalUsuarios = await query('SELECT COUNT(*) as total FROM usuarios');
		const totalLojistas = await query('SELECT COUNT(*) as total FROM usuarios WHERE tipo_usuario = $1', ['lojista']);
		const totalClientes = await query('SELECT COUNT(*) as total FROM usuarios WHERE tipo_usuario = $1', ['cliente']);
		const totalVinhos = await query('SELECT COUNT(*) as total FROM vinhos');
		
		// Lojistas com mais vinhos
		const topLojistas = await query(`
			SELECT u.nome, u.email, COUNT(v.id) as total_vinhos
			FROM usuarios u 
			LEFT JOIN vinhos v ON u.id = v.lojista_id 
			WHERE u.tipo_usuario = 'lojista'
			GROUP BY u.id, u.nome, u.email
			ORDER BY total_vinhos DESC
			LIMIT 5
		`);
		
		// Vinhos por tipo
		const vinhosPorTipo = await query(`
			SELECT tipo, COUNT(*) as quantidade
			FROM vinhos 
			GROUP BY tipo
			ORDER BY quantidade DESC
		`);
		
		res.json({
			estatisticas: {
				totalUsuarios: totalUsuarios.rows[0].total,
				totalLojistas: totalLojistas.rows[0].total,
				totalClientes: totalClientes.rows[0].total,
				totalVinhos: totalVinhos.rows[0].total
			},
			topLojistas: topLojistas.rows,
			vinhosPorTipo: vinhosPorTipo.rows
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get('/api/admin/usuarios', verifyToken, requireSuperAdmin, async (req, res) => {
	try {
		const usuarios = await query(`
			SELECT 
				u.id, u.nome, u.email, u.tipo_usuario,
				COUNT(v.id) as total_vinhos
			FROM usuarios u 
			LEFT JOIN vinhos v ON u.id = v.lojista_id
			WHERE u.tipo_usuario IN ('lojista', 'cliente')
			GROUP BY u.id, u.nome, u.email, u.tipo_usuario
			ORDER BY u.tipo_usuario DESC, u.nome ASC
		`);
		res.json(usuarios.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get('/api/admin/lojistas', verifyToken, requireSuperAdmin, async (req, res) => {
	try {
		const lojistas = await query(`
			SELECT 
				u.id, u.nome, u.email,
				COUNT(v.id) as total_vinhos,
				COALESCE(SUM(v.estoque), 0) as estoque_total,
				COALESCE(AVG(v.preco), 0) as preco_medio
			FROM usuarios u 
			LEFT JOIN vinhos v ON u.id = v.lojista_id
			WHERE u.tipo_usuario = 'lojista'
			GROUP BY u.id, u.nome, u.email
			ORDER BY total_vinhos DESC, u.nome ASC
		`);
		res.json(lojistas.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get('/api/admin/clientes', verifyToken, requireSuperAdmin, async (req, res) => {
	try {
		const clientes = await query(`
			SELECT id, nome, email
			FROM usuarios 
			WHERE tipo_usuario = 'cliente'
			ORDER BY nome ASC
		`);
		res.json(clientes.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get('/api/admin/vinhos', verifyToken, requireSuperAdmin, async (req, res) => {
	try {
		const vinhos = await query(`
			SELECT 
				v.id, v.nome, v.descricao, v.preco, v.tipo, v.harmonizacao, v.estoque,
				u.nome as lojista_nome, u.email as lojista_email
			FROM vinhos v
			INNER JOIN usuarios u ON v.lojista_id = u.id
			ORDER BY v.id DESC
		`);
		res.json(vinhos.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Rota para deletar usuário (apenas super admin)
app.delete('/api/admin/usuarios/:id', verifyToken, requireSuperAdmin, async (req, res) => {
	const { id } = req.params;
	
	try {
		// Verificar se o usuário existe e não é super_admin
		const user = await query('SELECT tipo_usuario FROM usuarios WHERE id = $1', [id]);
		if (user.rows.length === 0) {
			return res.status(404).json({ error: 'Usuário não encontrado' });
		}
		
		if (user.rows[0].tipo_usuario === 'super_admin') {
			return res.status(403).json({ error: 'Não é possível deletar outro super administrador' });
		}
		
		// Deletar vinhos do lojista primeiro (se houver)
		await query('DELETE FROM vinhos WHERE lojista_id = $1', [id]);
		
		// Deletar o usuário
		await query('DELETE FROM usuarios WHERE id = $1', [id]);
		
		res.json({ message: 'Usuário deletado com sucesso' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor backend rodando na porta ${PORT}`);
});

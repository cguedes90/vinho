-- Tabelas para a aplicação Vitrine de Vinhos
DROP TABLE IF EXISTS avaliacoes;
DROP TABLE IF EXISTS vinhos;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	senha VARCHAR(255) NOT NULL,
	tipo_usuario VARCHAR(20) NOT NULL CHECK (tipo_usuario IN ('lojista', 'cliente'))
);

CREATE TABLE vinhos (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(200) NOT NULL,
	descricao TEXT,
	preco DECIMAL(10,2) NOT NULL DEFAULT 0,
	tipo VARCHAR(50) NOT NULL,
	harmonizacao TEXT,
	estoque INTEGER NOT NULL DEFAULT 0,
	lojista_id INTEGER REFERENCES usuarios(id)
);

CREATE TABLE avaliacoes (
	id SERIAL PRIMARY KEY,
	vinho_id INTEGER REFERENCES vinhos(id),
	usuario_id INTEGER REFERENCES usuarios(id),
	nota INTEGER CHECK (nota >= 1 AND nota <= 5),
	comentario TEXT,
	data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dados iniciais de exemplo
INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES
('Loja de Vinhos Exemplo', 'loja@exemplo.com', 'senha_hash', 'lojista'),
('Cliente Exemplo', 'cliente@exemplo.com', 'senha_hash', 'cliente');

INSERT INTO vinhos (nome, descricao, preco, tipo, harmonizacao, estoque, lojista_id) VALUES
('Vinho Tinto Suave', 'Um vinho suave e frutado, perfeito para iniciantes', 45.90, 'Tinto', 'Carnes vermelhas, queijos', 10, 1),
('Vinho Branco Seco', 'Vinho branco seco com notas cítricas', 55.90, 'Branco', 'Peixes, frutos do mar', 15, 1),
('Vinho Rosé Leve', 'Refrescante e leve, ideal para dias quentes', 49.90, 'Rosé', 'Saladas, aperitivos', 8, 1);


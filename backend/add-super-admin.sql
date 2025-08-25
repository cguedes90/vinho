-- Atualizar o constraint para incluir super_admin
ALTER TABLE usuarios DROP CONSTRAINT usuarios_tipo_usuario_check;
ALTER TABLE usuarios ADD CONSTRAINT usuarios_tipo_usuario_check 
    CHECK (tipo_usuario IN ('lojista', 'cliente', 'super_admin'));

-- Criar usuário super admin
-- Senha: admin123 (hash bcrypt)
INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES 
('Super Admin', 'admin@vitrine-vinhos.com', '$2b$10$rQZ8kZKz1qL.HvP8yGzJAOH8qVr4X4yF3xJ2w8vQz7nF9mK3cL8Ve', 'super_admin');

-- Verificar se foi criado
SELECT id, nome, email, tipo_usuario FROM usuarios WHERE tipo_usuario = 'super_admin';
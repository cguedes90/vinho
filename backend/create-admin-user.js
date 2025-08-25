require('dotenv').config();
const { query } = require('./db');
const bcrypt = require('bcrypt');

async function createSuperAdmin() {
    try {
        // Gerar hash da senha "admin123"
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        // Primeiro, verificar se já existe
        const existingAdmin = await query(
            'SELECT id FROM usuarios WHERE email = $1',
            ['admin@vitrine-vinhos.com']
        );
        
        if (existingAdmin.rows.length > 0) {
            console.log('❌ Super admin já existe!');
            
            // Atualizar a senha se necessário
            await query(
                'UPDATE usuarios SET senha = $1 WHERE email = $2',
                [hashedPassword, 'admin@vitrine-vinhos.com']
            );
            console.log('✅ Senha do super admin atualizada!');
        } else {
            // Criar novo super admin
            const result = await query(
                'INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, tipo_usuario',
                ['Super Admin', 'admin@vitrine-vinhos.com', hashedPassword, 'super_admin']
            );
            
            console.log('✅ Super admin criado:', result.rows[0]);
        }
        
        // Verificar criação
        const admin = await query(
            'SELECT id, nome, email, tipo_usuario FROM usuarios WHERE tipo_usuario = $1',
            ['super_admin']
        );
        
        console.log('\n🔐 DADOS DE ACESSO DO SUPER ADMIN:');
        console.log('Email: admin@vitrine-vinhos.com');
        console.log('Senha: admin123');
        console.log('Tipo: super_admin');
        console.log('\nAdmin encontrado no banco:', admin.rows[0]);
        
    } catch (error) {
        console.error('❌ Erro ao criar super admin:', error.message);
    }
    
    process.exit(0);
}

createSuperAdmin();
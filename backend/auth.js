const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { query } = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_change_this';

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

function generateToken(user) {
    return jwt.sign(
        { 
            id: user.id, 
            email: user.email, 
            tipo_usuario: user.tipo_usuario 
        }, 
        JWT_SECRET, 
        { expiresIn: '24h' }
    );
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}

function requireLojista(req, res, next) {
    if (req.user.tipo_usuario !== 'lojista') {
        return res.status(403).json({ error: 'Acesso negado. Apenas lojistas podem acessar.' });
    }
    next();
}

function requireSuperAdmin(req, res, next) {
    if (req.user.tipo_usuario !== 'super_admin') {
        return res.status(403).json({ error: 'Acesso negado. Apenas super administradores podem acessar.' });
    }
    next();
}

function requireAdminOrLojista(req, res, next) {
    if (req.user.tipo_usuario !== 'super_admin' && req.user.tipo_usuario !== 'lojista') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores ou lojistas podem acessar.' });
    }
    next();
}

async function createUser(nome, email, password, tipoUsuario) {
    const hashedPassword = await hashPassword(password);
    const result = await query(
        'INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, tipo_usuario',
        [nome, email, hashedPassword, tipoUsuario]
    );
    return result.rows[0];
}

async function authenticateUser(email, password) {
    const result = await query('SELECT * FROM usuarios WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
        return null;
    }
    
    const user = result.rows[0];
    const isValid = await validatePassword(password, user.senha);
    
    if (!isValid) {
        return null;
    }
    
    return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo_usuario: user.tipo_usuario
    };
}

module.exports = {
    hashPassword,
    validatePassword,
    generateToken,
    verifyToken,
    requireLojista,
    requireSuperAdmin,
    requireAdminOrLojista,
    createUser,
    authenticateUser
};
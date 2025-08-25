# 🍷 Vitrine de Vinhos

Uma aplicação completa para vitrine de vinhos com dois tipos de usuários: lojistas e clientes convencionais.

## ✨ Funcionalidades

### Para Usuários Convencionais (Clientes)
- **Busca Inteligente**: Digite "vinho branco" e receba sugestões personalizadas
- **Sistema de Recomendações com Abas**:
  - **O Que Comer Com**: Harmonizações sugeridas para o tipo de vinho
  - **Melhores Preços**: Vinhos mais baratos encontrados
  - **Vinhos Premium**: Vinhos de preço mais alto
  - **Faixa de Preço**: Análise estatística com preços mínimo, médio e máximo
- **Navegação Intuitiva**: Interface limpa e responsiva

### Para Lojistas
- **Painel Administrativo**: Gerenciamento completo dos vinhos
- **CRUD Completo**: Criar, editar, visualizar e excluir vinhos
- **Controle de Estoque**: Gerenciamento de quantidades
- **Categorização**: Organização por tipos de vinho

### Sistema de Autenticação
- Login/cadastro para dois tipos de usuários
- Autenticação JWT segura
- Controle de acesso baseado em roles

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** com Express
- **PostgreSQL** (Neon Database)
- **JWT** para autenticação
- **bcrypt** para hash de senhas
- **CORS** para comunicação frontend-backend

### Frontend
- **React 18**
- **Axios** para requisições HTTP
- **Context API** para gerenciamento de estado
- **CSS-in-JS** para estilização
- Interface responsiva sem bibliotecas externas

### Banco de Dados
- **PostgreSQL** hospedado no Neon
- Três tabelas principais: usuários, vinhos, avaliações
- Relacionamentos bem definidos
- Dados de exemplo incluídos

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Acesso à internet (para conectar ao banco PostgreSQL)

## 🛠️ Instalação e Execução

### 1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd vitrine-vinhos
```

### 2. Configurar o Backend
```bash
cd backend
npm install
```

O arquivo `.env` já está configurado com:
```
DATABASE_URL=postgresql://neondb_owner:npg_ZkKA7Cb0zsSy@ep-summer-cake-ac29tuz0-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
PORT=3002
JWT_SECRET=change_this_secret
```

### 3. Inicializar o Banco de Dados
```bash
# O schema já foi aplicado, mas se precisar reaplicar:
node -e "const fs = require('fs'); const {query} = require('./db'); const schema = fs.readFileSync('schema.sql', 'utf8'); query(schema).then(() => console.log('Schema aplicado')).catch(console.error)"
```

### 4. Executar o Backend
```bash
npm start
```
O backend estará rodando em `http://localhost:3002`

### 5. Configurar o Frontend
```bash
cd ../frontend
npm install
```

### 6. Executar o Frontend
```bash
npm start
```
O frontend estará rodando em `http://localhost:3000`

## 📖 Como Usar

### Para Clientes
1. Abra `http://localhost:3000`
2. (Opcional) Registre-se como "Cliente" ou use sem registro
3. Digite um tipo de vinho na busca (ex: "vinho branco", "tinto")
4. Explore as recomendações nas abas:
   - Veja harmonizações sugeridas
   - Compare preços
   - Analise estatísticas de preço

### Para Lojistas
1. Registre-se como "Lojista"
2. Faça login
3. Clique em "Painel Lojista"
4. Gerencie seus vinhos:
   - Adicione novos vinhos
   - Edite informações existentes
   - Controle o estoque
   - Remove vinhos quando necessário

## 🗄️ Estrutura do Banco de Dados

### Usuários
- `id`: Identificador único
- `nome`: Nome do usuário
- `email`: Email (único)
- `senha`: Senha criptografada
- `tipo_usuario`: 'lojista' ou 'cliente'

### Vinhos
- `id`: Identificador único
- `nome`: Nome do vinho
- `descricao`: Descrição detalhada
- `preco`: Preço (DECIMAL)
- `tipo`: Tipo do vinho (Tinto, Branco, Rosé, etc.)
- `harmonizacao`: Sugestões de harmonização
- `estoque`: Quantidade disponível
- `lojista_id`: Referência ao lojista proprietário

### Avaliações (estrutura criada para futuras implementações)
- `id`: Identificador único
- `vinho_id`: Referência ao vinho
- `usuario_id`: Referência ao usuário
- `nota`: Nota de 1 a 5
- `comentario`: Comentário opcional
- `data_avaliacao`: Timestamp da avaliação

## 🔧 API Endpoints

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login

### Vinhos (Público)
- `GET /api/vinhos` - Listar todos os vinhos
- `GET /api/vinhos/search?q=termo` - Buscar vinhos
- `GET /api/vinhos/:id` - Detalhes de um vinho
- `GET /api/recommend?q=termo` - Recomendações

### Vinhos (Lojistas - Requer Autenticação)
- `POST /api/vinhos` - Criar vinho
- `PUT /api/vinhos/:id` - Atualizar vinho
- `DELETE /api/vinhos/:id` - Deletar vinho
- `GET /api/lojista/vinhos` - Listar vinhos do lojista

### Utilitários
- `GET /api/ping-db` - Testar conexão com banco
- `POST /api/init-schema` - Inicializar schema

## 🎯 Funcionalidades Especiais

### Sistema de Recomendações
Quando um usuário busca por "vinho branco", o sistema:
1. Encontra todos os vinhos relacionados
2. Extrai harmonizações únicas
3. Ordena por preço (baratos e caros)
4. Calcula estatísticas de preço (min, max, média)
5. Apresenta tudo em abas organizadas

### Autenticação Segura
- Senhas hasheadas com bcrypt
- Tokens JWT com expiração de 24h
- Middleware de autorização para rotas protegidas
- Verificação de tipo de usuário (lojista vs cliente)

### Interface Responsiva
- Design mobile-first
- CSS-in-JS para melhor performance
- Feedback visual para todas as ações
- Modais para formulários

## 🚦 Status do Projeto

✅ **Completo e Funcionando**

Todas as funcionalidades principais foram implementadas:
- ✅ Autenticação completa
- ✅ Busca e recomendações
- ✅ Painel administrativo
- ✅ CRUD de vinhos
- ✅ Interface responsiva
- ✅ Banco de dados configurado
- ✅ API RESTful completa

## 🤝 Dados de Exemplo

O sistema já vem com dados de exemplo:
- 2 usuários (1 lojista, 1 cliente)
- 3 vinhos variados
- Senhas para teste: "senha_hash" (para desenvolvimento)

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se as portas 3000 (frontend) e 3002 (backend) estão livres
2. Confirme que o banco de dados está acessível
3. Verifique os logs no console para detalhes de erros

## 🔮 Possíveis Melhorias Futuras

- Sistema de avaliações de vinhos
- Filtros avançados (região, safra, etc.)
- Sistema de favoritos
- Integração com APIs de vinhos
- Dashboard analítico para lojistas
- Sistema de notificações
- Upload de imagens dos vinhos
- Carrinho de compras
- Integração com pagamentos
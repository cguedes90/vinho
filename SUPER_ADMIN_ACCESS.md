# 🔧 Super Admin - Acesso Administrativo

## 🔐 Credenciais de Acesso

**Email:** `admin@vitrine-vinhos.com`  
**Senha:** `admin123`  
**Tipo:** Super Admin

## 🎯 Funcionalidades Disponíveis

### 📊 **Dashboard Completo**
- **Estatísticas Gerais**: Total de usuários, lojistas, clientes e vinhos
- **Top Lojistas**: Ranking por quantidade de vinhos cadastrados  
- **Distribuição**: Gráfico de vinhos por tipo (Tinto, Branco, Rosé, etc.)

### 👥 **Gerenciamento de Usuários**
- **Todos Usuários**: Lista completa com lojistas e clientes
- **Lojistas**: Detalhes com estatísticas de vinhos, estoque e preço médio
- **Clientes**: Lista completa de clientes cadastrados
- **Exclusão**: Poder de deletar usuários (exceto outros super admins)

### 🍷 **Supervisão de Vinhos**
- **Catálogo Completo**: Todos os vinhos de todos os lojistas
- **Detalhes**: Nome, preço, tipo, harmonização, estoque
- **Rastreamento**: Qual lojista é proprietário de cada vinho

## 🚀 Como Acessar

### **Opção 1: Login Direto (Recomendado)**
1. Acesse a aplicação: http://localhost:3000
2. Clique em "Entrar"
3. Use as credenciais:
   - **Email:** admin@vitrine-vinhos.com
   - **Senha:** admin123
4. Após o login, clique em "🔧 Admin Dashboard"

### **Opção 2: Registro (Apenas Desenvolvimento)**
- Durante desenvolvimento, é possível registrar novos super admins
- No formulário de cadastro, selecione "Super Admin (Dev Only)"
- ⚠️ **Esta opção é removida em produção por segurança**

## 🎛️ Interface do Dashboard

### **Navegação por Abas:**
- 📊 **Dashboard**: Visão geral e estatísticas
- 👥 **Todos Usuários**: Lista combinada de lojistas e clientes  
- 🏪 **Lojistas**: Foco em dados comerciais dos lojistas
- 👤 **Clientes**: Lista exclusiva de clientes
- 🍷 **Vinhos**: Catálogo completo de vinhos

### **Recursos Especiais:**
- **Exclusão Segura**: Confirmação antes de deletar usuários
- **Proteção**: Impossível deletar outros super admins
- **Limpeza Automática**: Ao deletar lojista, seus vinhos são removidos
- **Atualização Real-time**: Dados atualizados após cada ação

## 📊 Dados Atuais na Aplicação

### **Usuários:**
- 1 Super Admin (admin@vitrine-vinhos.com)
- 1 Lojista (loja@exemplo.com) 
- 1 Cliente (cliente@exemplo.com)

### **Vinhos:**
- 16 vinhos variados no catálogo
- Tipos: Tinto, Branco, Rosé, Espumante, Licoroso
- Preços de R$ 45,90 a R$ 128,00
- Todos vinculados ao lojista padrão

## ⚠️ Considerações de Segurança

### **Produção:**
- Remover opção de registro de super_admin
- Usar senhas mais complexas
- Implementar 2FA se necessário
- Logs de auditoria para ações administrativas

### **Desenvolvimento:**
- Credenciais conhecidas para facilitar testes
- Opção de registro disponível temporariamente
- Banco de teste com dados de exemplo

## 🔒 Permissões por Tipo

| Funcionalidade | Cliente | Lojista | Super Admin |
|---|---|---|---|
| Buscar Vinhos | ✅ | ✅ | ✅ |
| Ver Recomendações | ✅ | ✅ | ✅ |
| Cadastrar Vinhos | ❌ | ✅ | ❌ |
| Gerenciar Próprios Vinhos | ❌ | ✅ | ❌ |
| Ver Dashboard Admin | ❌ | ❌ | ✅ |
| Ver Todos Usuários | ❌ | ❌ | ✅ |
| Deletar Usuários | ❌ | ❌ | ✅ |
| Ver Todos Vinhos | ❌ | ❌ | ✅ |

---

## 🎯 **ACESSO RÁPIDO:**

👉 **URL:** http://localhost:3000  
👉 **Login:** admin@vitrine-vinhos.com  
👉 **Senha:** admin123  
👉 **Dashboard:** Clique em "🔧 Admin Dashboard" após login

**O super admin está pronto e funcionando!** 🚀
# CineLume - Teste Automatizado

Este é um teste automatizado que demonstra o fluxo completo de login da aplicação CineLume.

## 📋 O que o teste faz

1. **Abre o navegador Chrome** automaticamente
2. **Navega para a aplicação** (localhost:3000)  
3. **Vai para a página de login**
4. **Preenche o email**: `mikaelcavalcanti+cinelume@outlook.com`
5. **Preenche a senha**: `Password@123`
6. **Clica no botão Login**
7. **Se necessário, seleciona um perfil**
8. **Tira screenshots** de cada etapa

## 🚀 Como executar

### 1. Instalar dependências (primeira vez)
```bash
npm install
npm run test:install
```

### 2. Iniciar o servidor da aplicação
```bash
npm run dev
```

### 3. Executar o teste (em outro terminal)
```bash
npm run test:e2e
```

## 📸 Screenshots

O teste salva automaticamente screenshots em `tests/screenshots/`:
- `before-login.png` - Tela antes do login
- `after-login.png` - Tela após login  
- `final-page.png` - Página final (dashboard ou profiles)

## 🔧 Configuração

As credenciais de teste estão no arquivo `.env`:
```bash
USER_EMAIL="mikaelcavalcanti+cinelume@outlook.com"
USER_PASSWORD="Password@123"
```

## 📁 Arquivos importantes

- `login-test.spec.ts` - O arquivo de teste principal
- `playwright.config.ts` - Configuração do Playwright
- `.env` - Credenciais de teste

## ✅ Resultado esperado

Se tudo funcionar corretamente:
1. Chrome abre automaticamente
2. Faz login com sucesso
3. Navega para dashboard ou profiles
4. Screenshots são salvos
5. Teste termina com sucesso ✅
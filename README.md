# Site Project

Stack: **Vite** (build/dev server) + **Motion** (animações) + **Lenis** (scroll suave).

## Como correr localmente

```bash
npm install
npm run dev
```

Abre o URL que aparece no terminal (normalmente `http://localhost:5173`).

## Estrutura

```
index.html                     ← estrutura HTML (substitui pelo teu conteúdo)
src/
  main.js                      ← ponto de entrada, liga tudo
  styles/main.css               ← estilos base
  scripts/smooth-scroll.js      ← configuração do Lenis
  scripts/animations.js         ← animações ligadas ao scroll (Motion)
```

Para animar um elemento novo, basta adicionar `data-animate="fade-up"` no HTML.
O script `animations.js` já o vai animar automaticamente quando entrar no ecrã.

## Deploy no GitHub Pages

1. Cria o repositório no GitHub e faz push deste projeto para o branch `main`.
2. **Edita `vite.config.js`** e troca `'/nome-do-repositorio/'` pelo nome real do teu repo
   (ex: `/gta-fan-site/`).
3. Vai a **Settings → Pages** no repositório e, em "Build and deployment",
   escolhe **Source: GitHub Actions**.
4. Faz push — o workflow em `.github/workflows/deploy.yml` faz o build e publica
   automaticamente. O site fica disponível em
   `https://<o-teu-utilizador>.github.io/<nome-do-repositorio>/`.

Não precisas de gerar o `dist/` manualmente nem de branch `gh-pages` — o Actions trata disso.

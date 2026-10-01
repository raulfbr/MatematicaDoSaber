# Matemática do Saber — Professor Raul Novak

Página do combo Matemática do Saber + Tabuada do Saber, preparada para publicação na Vercel com Next.js.

O conteúdo, os componentes da página e os arquivos visuais foram copiados da versão 14 publicada em 30/09/2026. A configuração foi adaptada de Vinext/Cloudflare para Next.js. Referência do código original: `710d06a8f421f506489d82136430bcc6c87f2efc`.

## Desenvolvimento

Use Node.js 22.

```bash
npm ci
npm run dev
```

Para conferir a publicação:

```bash
npm run typecheck
npm run build
npm start
```

## Publicar na Vercel

1. Abra **Add New → Project** e importe `raulfbr/MatematicaDoSaber`.
2. Use a branch `main`, a raiz do repositório e o framework **Next.js**.
3. Mantenha o comando de build `npm run build` e o diretório de saída padrão do Next.js.
4. Clique em **Deploy**.

Esta página não precisa de banco de dados nem de variáveis de ambiente. Após a integração, novos commits na branch de produção geram novas publicações automaticamente.

## Editar o site

- Página, oferta e textos: `app/page.tsx`.
- Estilos e fontes locais: `app/globals.css` e `public/assets/`.
- Título e descrição: `app/layout.tsx`.

Checkout oficial: https://pay.hotmart.com/Y107837627O. O comprador aplica o cupom **LOTE1** manualmente na Hotmart, conforme a instrução exibida na página.

Documentação da integração: https://vercel.com/docs/git.

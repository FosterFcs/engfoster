# Quadro Certo ⚡

**Do cômodo ao disjuntor em minutos.** App de dimensionamento elétrico residencial (NBR 5410) da Foster Tech Soluções.

- **Lê a planta com IA** (foto, imagem ou PDF) e traz os ambientes e as medidas para o projeto
- **Desenha a planta elétrica**: pontos de luz, tomadas, interruptores, QD e circuito de cada ponto, sobre a planta lida pela IA ou em planta esquemática
- **Termo de entrega e ensaios** (NBR 5410, seção 7) com fotos e assinatura do cliente
- "Como calculei": memória passo a passo de cada circuito
- Padrão de entrada por concessionária: Enel SP (rede aérea 127/220 V) ou tabela própria cadastrada pelo eletricista
- Ajuste manual de circuitos e pontos de luz com potência real (LED)
- Quadro de cargas automático (pontos mínimos de luz e tomada por cômodo)
- Alimentador (medidor → quadro), queda de tensão total ≤ 5% e 6 formas de instalação (A1, A2, B1, B2, C, D)
- Memorial descritivo completo + memorial de cálculo em PDF
- Divisão e dimensionamento de circuitos: bitola, disjuntor, queda de tensão, DR
- Balanceamento de fases (A/B/C) com ajuste manual
- Diagrama unifilar automático (PDF e SVG)
- Orçamento de material + mão de obra com preço por ponto
- Proposta, memorial e projeto completo em PDF com a logo do eletricista
- Vários projetos salvos no aparelho, backup e importação
- Funciona offline e pode ser instalado no celular (PWA)
- **Conta, 7 dias grátis e assinatura por Pix** (mensal R$ 59,90 ou anual R$ 479), com liberação automática

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app inteiro |
| `manifest.json` | Nome, cores e ícones do app instalado |
| `sw.js` | Service worker: funcionamento offline |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Ícones |

## Publicar no GitHub Pages

1. Entre em github.com com a conta **FosterFcs** e clique em **New repository**.
2. Nome: `quadro-certo` · deixe **Public** · clique em **Create repository**.
3. Clique em **uploading an existing file**, arraste **todos os arquivos desta pasta** (não a pasta, os arquivos) e clique em **Commit changes**.
4. Vá em **Settings → Pages** → em *Branch* escolha `main` e `/ (root)` → **Save**.
5. Aguarde 1–2 minutos. O app fica em: **https://fosterfcs.github.io/quadro-certo/**

## Testar depois de publicar

- Abra o link no celular → aparece o botão **📲 Instalar app** (ou menu ⋮ → *Instalar app*).
- Aba **Resumo → Projeto completo** → escolha *Salvar como PDF*.
- Coloque o celular em modo avião e abra o app: ele deve funcionar offline.

## Conta, teste grátis e assinatura (já está ligado)

Tudo roda na central Foster (Supabase **foster-calc**), a mesma do Orça, Academia, Obras e VistorIA.
Não precisa configurar nada para funcionar.

- **Cadastro**: e-mail e senha. Quem já tem conta em outro app da Foster Tech entra com a mesma senha.
- **Teste grátis**: 7 dias com tudo liberado, a partir do primeiro acesso. No teste, os PDFs saem
  com a marca "VERSÃO DE TESTE" e a IA lê até 3 plantas.
- **Assinatura**: Pix mensal (R$ 59,90) ou anual (R$ 479). O app gera o QR Code pelo Asaas
  (função `asaas-cobrar`) e libera sozinho quando o Pix cai (função `asaas-webhook`).
  Pagar de novo antes de vencer soma os dias. Não há cobrança automática: o app avisa 5 dias antes de vencer.
- **Sem assinatura**: dá para abrir os projetos e fazer backup; editar, gerar PDF e usar a IA ficam travados.
- **IA da planta**: função `quadro-ia` (chave da Groq só no servidor). Assinante: até 60 leituras por mês.
- **Administrador**: os e-mails cadastrados como admin da Academia Foster têm acesso total, sem pagar.
  Para incluir outros, no SQL do Supabase:
  `insert into qc_config(chave,valor) values('admins','email1@x.com,email2@y.com') on conflict (chave) do update set valor=excluded.valor;`
- **Mudar preços, dias de teste ou limites**: tabela `qc_config` (`preco_mensal`, `preco_anual`, `dias_teste`,
  `limite_ia_teste`, `limite_ia_mes`).
- **Ver assinantes e pagamentos**: tabelas `qc_assinaturas` e `qc_pagamentos`.

A IA aceita chamadas de `fosterfcs.github.io`, `fostercalc.com.br` e de qualquer `*.engfoster.com.br`.

Na prévia dentro do Claude, o app abre em **modo demonstração** (sem login e sem cobrança).

## Atualizar o app

Ao trocar o `index.html`, aumente a versão na 1ª linha útil do `sw.js`
(hoje `quadro-certo-v7` → `quadro-certo-v8`) para os celulares baixarem a versão nova.

## Domínio engfoster (recomendado)

Para centralizar no seu domínio, use por exemplo `quadrocerto.engfoster.com.br`:
1. No repositório: **Settings → Pages → Custom domain** → `quadrocerto.engfoster.com.br` → **Save** (marque **Enforce HTTPS** depois).
2. Na Cloudflare (DNS do engfoster): **Add record** → tipo **CNAME**, nome `quadrocerto`, destino `fosterfcs.github.io`, proxy **desligado** (Somente DNS).
3. No Supabase (Authentication → URL Configuration → Redirect URLs), inclua `https://quadrocerto.engfoster.com.br/**`,
   para os links de confirmação de e-mail e de troca de senha voltarem para o endereço novo.

A IA já aceita qualquer endereço `*.engfoster.com.br`. Quem já instalou pelo github.io precisa
instalar de novo pelo endereço novo (os projetos ficam guardados por endereço: faça backup antes).

---

⚠️ Ferramenta de apoio para pré-dimensionamento. O projeto e a execução devem ser feitos por
profissional habilitado, com ART/TRT, conferindo a NBR 5410 completa e o regulamento da concessionária.

Desenvolvido por Foster Tech Soluções 🇧🇷

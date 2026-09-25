# Feira Conectada — protótipo HTML/CSS/JS

Protótipo estático desenvolvido a partir das telas de referência enviadas.

## Páginas
- `index.html` — Home
- `produtores.html` — busca e filtros de produtores
- `vitrine.html` — busca e filtros de produtos/serviços
- `cadastro.html` — explicação + formulário de cadastro
- `quem-somos.html` — apresentação do projeto

## Como executar
Abra `index.html` no navegador ou sirva a pasta com um servidor local, por exemplo:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

O projeto usa apenas HTML, CSS e JavaScript puro. Os filtros, busca, menu mobile e validação do formulário funcionam no navegador sem backend.


## Envio do formulário
O formulário de cadastro está configurado para enviar os dados para `feiraconectadanh@gmail.com` usando o FormSubmit. Na primeira utilização, o FormSubmit envia um e-mail de ativação para esse endereço. É necessário confirmar esse e-mail uma vez para liberar os envios.


## Últimas alterações implementadas

- `quem-somos.html`: o `<body data-page="sobre">` usa um layout flex em `css/style.css` para manter o footer no fim da tela mesmo quando há pouco conteúdo.
- `cadastro.html`: formulário configurado para enviar Nome, Telefone/WhatsApp e E-mail para `feiraconectadanh@gmail.com`.
- `js/script.js`: valida os campos e envia o formulário por AJAX para o FormSubmit, mostrando mensagens de sucesso/erro sem sair da página.
- Na primeira utilização do FormSubmit, verifique a caixa de entrada de `feiraconectadanh@gmail.com` e confirme a ativação solicitada pelo serviço.

## Testando o formulário de cadastro

O formulário usa o FormSubmit para encaminhar os dados para o e-mail da Feira Conectada.

**Não abra `cadastro.html` diretamente como `file://...`.** O FormSubmit informa que o formulário deve ser acessado por um servidor web.

Exemplos para testar localmente:

```bash
cd feira-conectada-prototipo
python3 -m http.server 5500
```

Depois acesse:

```text
http://localhost:5500/cadastro.html
```

Você também pode usar a extensão **Live Server** do VS Code.

Na primeira submissão, o FormSubmit envia um e-mail de ativação para `feiraconectadanh@gmail.com`. Abra esse e-mail e confirme o formulário. Depois da ativação, faça um novo teste.


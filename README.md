# Gerador de Chaveiros e Cards com Emoji — NuRIA

Aplicação web para criação de peças em SVG a partir de emojis vetoriais, preparada para uso em **corte e gravação a laser**.

A ferramenta permite gerar **chaveiros com contorno baseado no emoji** ou **cards retangulares**, com argola opcional, identificação obrigatória do autor e exportação em arquivo único ou em **dupla camada**.

> Versão atual: **v8**

---

## Funcionalidades

- Seleção de emojis por coleção, categoria ou busca.
- Coleções disponíveis:
  - **Noto Emoji 600**
  - **OpenMoji Black**
- Dois formatos de peça:
  - **Chaveiro**
  - **Card**
- Ajuste do tamanho e do contorno externo do chaveiro.
- Ajuste das dimensões, raio dos cantos e margem interna do card.
- Argola opcional no card.
- Controle do diâmetro do furo, espessura da borda da argola e posição angular.
- Dois estilos de gravação:
  - **Somente contorno azul**
  - **Contorno azul + preenchimento preto**
- Estilo padrão: **Somente contorno azul**.
- Espessura padrão do traço azul: **0,4 mm**.
- Identificação do autor habilitada por padrão.
- O nome do autor é obrigatório para liberar os arquivos de fabricação.
- Nome do autor gravado em azul, **5 mm abaixo da peça**.
- Pré-visualização em grade milimetrada.
- Exportação em SVG.
- Exportação em **dupla camada**, com dois SVGs separados.
- Indicação da versão da ferramenta diretamente na página.

---

## Convenção de cores para corte a laser

Os arquivos utilizam a seguinte convenção:

| Cor | Função |
|---|---|
| **Vermelho** | Corte |
| **Azul** | Gravação vetorial |
| **Preto** | Preenchimento para gravação |

Antes da fabricação, confira se o software da cortadora está configurado para interpretar essas cores corretamente.

---

## Como utilizar

### 1. Escolha o emoji

Na área de controles:

1. Selecione a coleção desejada.
2. Utilize o campo **Buscar** ou escolha uma **Categoria**.
3. Clique no emoji desejado.

A visualização é atualizada automaticamente.

---

### 2. Escolha o formato

A ferramenta oferece dois formatos.

#### Chaveiro

No modo **Chaveiro**, o contorno vermelho acompanha a forma externa do emoji.

É possível configurar:

- **Tamanho** do emoji;
- **Outline**, que determina a distância entre o desenho e o contorno de corte;
- diâmetro do furo;
- espessura da borda da argola;
- posição angular do furo.

#### Card

No modo **Card**, o emoji é centralizado dentro de um cartão.

Os valores iniciais são:

- largura: **38 mm**;
- altura: **50 mm**;
- raio dos cantos: **3 mm**;
- margem interna: **4 mm**.

Também é possível desmarcar **Adicionar argola** para gerar somente o cartão.

---

## 3. Configure a argola

Quando a peça possui argola, podem ser ajustados:

- **Furo** — diâmetro do furo;
- **Borda do furo** — espessura de material ao redor do furo;
- **Posição do furo** — posição angular ao redor da peça.

No chaveiro, a posição inicial é **−45°**.

No card, a posição inicial fica centralizada na parte superior.

---

## 4. Escolha o estilo de gravação

Na versão 8, o antigo modo **Azul preenchido** foi removido.

### Somente contorno azul

É o estilo padrão.

O emoji é exportado sem preenchimento, utilizando linhas azuis.

A espessura inicial do contorno é:

```text
0,4 mm
```

Esse valor pode ser alterado pelo usuário.

### Contorno azul + preenchimento preto

O emoji recebe:

- contorno azul;
- preenchimento preto.

Esse modo pode aumentar o tempo de fabricação, pois inclui gravação de área.

---

## 5. Identifique o autor

A opção **Identificar autor** já vem habilitada.

Para gerar qualquer arquivo de fabricação, é obrigatório preencher o campo:

```text
Nome do autor
```

Enquanto o campo estiver vazio:

- a visualização continua funcionando;
- o botão **Baixar SVG** permanece bloqueado;
- o botão **Baixar 2 SVGs — dupla camada** permanece bloqueado.

Quando preenchido, o nome:

- é incluído em azul no SVG principal;
- fica posicionado **5 mm abaixo da linha de corte**;
- é utilizado no nome dos arquivos exportados.

---

## Exportação normal

O botão:

```text
Baixar SVG
```

gera um único arquivo contendo:

- contorno vermelho de corte;
- desenho azul do emoji;
- preenchimento preto, quando selecionado;
- nome do autor em azul.

### Exemplo — chaveiro

```text
chaveiro-emoji-Herbert.svg
```

### Exemplo — card

```text
emoji-card-Herbert.svg
```

---

## Exportação em dupla camada

O botão:

```text
Baixar 2 SVGs — dupla camada
```

gera dois arquivos.

### Arquivo 1

Contém a peça completa, com:

- corte externo em vermelho;
- emoji em azul;
- preenchimento preto, quando utilizado;
- identificação do autor em azul.

Exemplo:

```text
chaveiro-emoji-Herbert-1.svg
```

### Arquivo 2

Contém somente o desenho correspondente à gravação azul do emoji, convertido para **vermelho**.

Esse arquivo pode ser usado para cortar a segunda camada da peça.

Exemplo:

```text
chaveiro-emoji-Herbert-2.svg
```

Para cards, o padrão equivalente é:

```text
emoji-card-Herbert-1.svg
emoji-card-Herbert-2.svg
```

---

## Pré-visualização

A área de visualização apresenta:

- grade dimensional em milímetros;
- dimensões finais da peça;
- contorno de corte em vermelho;
- desenho do emoji em azul;
- preenchimento preto, quando utilizado;
- nome do autor.

A prévia é atualizada automaticamente após mudanças nos parâmetros.

---

## Teste local

O projeto deve ser executado através de um servidor HTTP local.

Evite abrir o `index.html` diretamente com `file://`, pois a aplicação carrega bibliotecas e SVGs externos dinamicamente.

Na pasta do projeto:

```bash
python3 -m http.server 8000 > servidor.log 2>&1 &
```

Depois acesse:

```text
http://localhost:8000
```

Para verificar o servidor:

```bash
ps aux | grep "http.server 8000"
```

Para acompanhar o log:

```bash
tail -f servidor.log
```

Para encerrar:

```bash
pkill -f "http.server 8000"
```

Se uma alteração não aparecer imediatamente no navegador:

```text
Ctrl + Shift + R
```

---

## Estrutura do projeto

```text
.
├── index.html
├── script.js
├── style.css
└── README.md
```

### `index.html`

Contém:

- interface do gerador;
- controles;
- botões de exportação;
- indicação da versão;
- carregamento das bibliotecas externas.

### `style.css`

Define:

- layout;
- controles;
- grade milimetrada;
- área de visualização;
- botões;
- identificação visual da versão;
- comportamento responsivo.

### `script.js`

Responsável por:

- catálogo e busca de emojis;
- carregamento das coleções;
- conversão dos SVGs para geometria vetorial;
- operações booleanas com PathKit;
- geração do contorno de corte;
- criação da argola;
- criação do card;
- geração da gravação;
- identificação obrigatória do autor;
- pré-visualização;
- exportação normal;
- exportação em dupla camada.

---

## Dependências

O projeto roda diretamente no navegador e não exige instalação de pacotes JavaScript.

Recursos externos utilizados:

- **PathKit WASM**, carregado via jsDelivr;
- arquivos SVG das coleções de emojis.

Por isso, é necessária conexão com a internet durante o uso.

---

## Publicação no GitHub Pages

Os arquivos devem permanecer na raiz do repositório:

```text
index.html
script.js
style.css
README.md
```

No GitHub:

1. Abra **Settings**.
2. Entre em **Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main`.
5. Escolha `/ (root)`.
6. Salve.

Após a publicação, aguarde a atualização do GitHub Pages.

Se a versão antiga ainda aparecer, faça:

```text
Ctrl + Shift + R
```

A versão exibida na página ajuda a confirmar se o navegador já carregou os arquivos atualizados.

---

## Cuidados antes da fabricação

Antes de enviar um SVG para a cortadora laser, confira:

- dimensões finais;
- espessura mínima das partes da peça;
- diâmetro do furo;
- integração da argola com o corpo;
- linhas vermelhas de corte;
- linhas azuis de gravação;
- preenchimentos pretos, quando utilizados;
- nome do autor;
- alinhamento entre as duas camadas, quando utilizada a exportação dupla.

Para materiais ou parâmetros ainda não testados, faça primeiro uma peça de teste.

---

## Versão 8

Principais alterações:

- removido o estilo **Azul preenchido**;
- **Somente contorno azul** passa a ser o padrão;
- espessura padrão do contorno alterada para **0,4 mm**;
- identificação do autor habilitada por padrão;
- nome do autor obrigatório para liberar os downloads;
- versão da aplicação exibida na página;
- inclusão da exportação em **dupla camada**;
- segundo SVG da dupla camada converte o desenho azul do emoji para vermelho.

---

## Créditos

Projeto desenvolvido no contexto do **NuRIA — Núcleo de Pesquisas em Robótica e IA**.

A opção **OpenMoji Black** utiliza a coleção OpenMoji, disponibilizada sob licença **CC BY-SA 4.0**.

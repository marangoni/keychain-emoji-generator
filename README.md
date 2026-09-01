# Gerador de Chaveiros e Cards com Emoji — NuRIA

Aplicação web para criação de peças em SVG a partir de emojis vetoriais, preparada para uso em corte e gravação a laser.

O gerador permite produzir **chaveiros com contorno baseado no emoji** ou **cards retangulares**, com opção de argola, identificação do autor e diferentes estilos de gravação.

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
- Três estilos para o emoji:
  - azul preenchido;
  - somente contorno azul;
  - contorno azul com preenchimento preto.
- Identificação opcional do autor.
- Inclusão do nome do autor em azul no SVG, **5 mm abaixo da peça**.
- Pré-visualização em grade milimetrada.
- Exportação direta em SVG.

## Convenção de cores para a laser

O arquivo exportado utiliza a seguinte convenção:

| Cor | Função |
|---|---|
| **Vermelho** | Corte da peça |
| **Azul** | Gravação vetorial |
| **Preto** | Preenchimento para gravação, quando selecionado |

Antes de enviar o arquivo para a cortadora laser, confira se o software da máquina está configurado para interpretar essas cores da forma desejada.

## Como utilizar

### 1. Escolha o emoji

Na área de controles:

1. Selecione uma coleção de emojis.
2. Utilize o campo **Buscar** ou escolha uma **Categoria**.
3. Clique no emoji desejado.

A prévia é atualizada automaticamente.

### 2. Escolha o formato

O gerador oferece dois formatos.

#### Chaveiro

No modo **Chaveiro**, o contorno vermelho acompanha a forma externa do emoji.

É possível configurar:

- **Tamanho** do emoji;
- **Outline**, que determina a distância entre o desenho e o contorno de corte;
- parâmetros da argola.

#### Card

No modo **Card**, o emoji é centralizado dentro de um cartão.

Por padrão, o card utiliza:

- largura: **38 mm**;
- altura: **50 mm**;
- raio dos cantos: **3 mm**;
- margem interna: **4 mm**.

Esses valores podem ser alterados.

Também é possível desmarcar **Adicionar argola** para gerar somente o cartão, sem furo.

### 3. Configure a argola

Quando a peça possui argola, podem ser ajustados:

- **Furo** — diâmetro do furo;
- **Borda do furo** — espessura de material ao redor do furo;
- **Posição do furo** — posição angular ao redor da peça.

No chaveiro, a posição inicial é **−45°**.

No card, a posição inicial é centralizada no topo.

### 4. Escolha o estilo de gravação

No campo **Estilo do emoji**, escolha uma das opções:

#### Azul preenchido

O emoji é exportado como uma área azul preenchida.

#### Somente contorno azul

O emoji é exportado sem preenchimento, utilizando apenas linhas azuis.

Nesse modo, a espessura do contorno pode ser ajustada.

#### Contorno azul + preenchimento preto

O emoji recebe:

- contorno azul;
- preenchimento preto.

Essa opção pode demandar maior tempo de gravação na máquina.

### 5. Identifique o autor

Para incluir o nome do estudante ou autor:

1. Marque **Identificar autor**.
2. Digite o nome no campo **Nome do autor**.

O nome será:

- incluído em **azul** no SVG;
- posicionado **5 mm abaixo da linha de corte**;
- utilizado no nome do arquivo exportado.

Se a identificação não for ativada, o gerador utiliza automaticamente a palavra **aluno** no nome do arquivo.

## Nome dos arquivos exportados

O formato do nome depende do tipo de peça e da identificação do autor.

### Chaveiro

Com autor:

```text
chaveiro-emoji-Herbert.svg
```

Sem autor:

```text
chaveiro-emoji-aluno.svg
```

### Card

Com autor:

```text
emoji-card-Herbert.svg
```

Sem autor:

```text
emoji-card-aluno.svg
```

Espaços e caracteres incompatíveis com nomes de arquivo são normalizados automaticamente.

## Teste local

O projeto deve ser executado através de um servidor HTTP local. Evite abrir o `index.html` diretamente com `file://`, pois o gerador carrega recursos externos e arquivos SVG dinamicamente.

Na pasta do projeto, execute:

```bash
python3 -m http.server 8000 > servidor.log 2>&1 &
```

Depois acesse no navegador:

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

Caso uma alteração no JavaScript ou CSS não apareça imediatamente, faça uma atualização completa no navegador:

```text
Ctrl + Shift + R
```

## Estrutura do projeto

```text
.
├── index.html
├── script.js
├── style.css
└── README.md
```

### `index.html`

Contém a interface do gerador e carrega o PathKit e os arquivos da aplicação.

### `style.css`

Define a interface, a grade milimetrada, os controles, a pré-visualização e o layout responsivo.

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
- identificação do autor;
- pré-visualização;
- exportação do SVG.

## Dependências

O projeto é executado diretamente no navegador e não necessita de instalação de pacotes JavaScript.

Ele utiliza recursos externos carregados pela internet, incluindo:

- **PathKit WASM** via jsDelivr;
- arquivos vetoriais das coleções de emojis configuradas no projeto.

Por isso, é necessária conexão com a internet durante o uso.

## Publicação no GitHub Pages

O projeto pode ser publicado diretamente pelo GitHub Pages.

Coloque os arquivos na raiz do repositório:

```text
index.html
script.js
style.css
README.md
```

No GitHub:

1. Abra **Settings** do repositório.
2. Entre em **Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch `main`.
5. Selecione `/ (root)`.
6. Salve.

Após a publicação, o gerador poderá ser utilizado diretamente pelo navegador.

## Observação sobre uso em corte a laser

Sempre faça uma conferência do SVG antes da produção definitiva.

Recomenda-se verificar:

- dimensões finais;
- espessura mínima das partes da peça;
- diâmetro do furo;
- integração da argola com o corpo;
- presença das linhas vermelhas de corte;
- presença das linhas ou áreas azuis de gravação;
- preenchimentos pretos, quando utilizados.

Para novos materiais ou novas configurações de potência e velocidade, faça primeiro um teste em uma peça pequena.

## Créditos

Projeto desenvolvido no contexto do **NuRIA — Núcleo de Pesquisas em Robótica e IA**.

A opção **OpenMoji Black** utiliza a coleção OpenMoji, disponibilizada sob licença **CC BY-SA 4.0**.

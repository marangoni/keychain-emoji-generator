# Gerador de chaveiros com emoji - NuRIA

Protótipo vetorial construído a partir da estrutura observada no projeto
**Emoji Keychain** de referência.

## Arquivos

- `index.html`
- `style.css`
- `script.js`

Não há `pathkit.wasm` no repositório. O PathKit é carregado via CDN para manter
o projeto pequeno.

## Como testar

Na pasta:

```bash
python3 -m http.server 8080
```

Abra:

```text
http://localhost:8080
```

Não abra o `index.html` diretamente com `file://`, pois o navegador precisa
usar `fetch()` para carregar os SVGs dos emojis.

## Pipeline geométrico

A versão reproduz a lógica observada no `project.json` do projeto de referência:

### Camada de corte

1. carrega o emoji monocromático;
2. dimensiona pelo parâmetro `size`;
3. expande a geometria (`outline`) com junção redonda;
4. remove vazios internos (`RemoveHoles`);
5. adiciona argola e furo;
6. exporta o resultado como linha vermelha.

### Camada de gravação

Uma segunda cópia do emoji é dimensionada pelo mesmo `size` e mantida sem os
modificadores geométricos.

O modo padrão é **azul preenchido**, equivalente à camada roxa preenchida do
projeto de referência.

Também há dois modos experimentais:

- somente contorno azul;
- contorno azul + preenchimento preto.

## Defaults

Os valores iniciais foram convertidos dos defaults encontrados no projeto:

- `size`: 1.40 in ≈ 35.6 mm
- `outline`: 0.10 in ≈ 2.5 mm
- `holePosition`: -45°
- `holeDiameter`: 0.19 in ≈ 4.8 mm
- `holeOutline`: 0.12 in ≈ 3.0 mm

## Dependências

### PathKit

Carregado de:

```text
https://cdn.jsdelivr.net/npm/pathkit-wasm@1.0.0/bin/
```

O PathKit é a interface WebAssembly para as PathOps do Skia.

### Emojis

Nesta versão de teste, os SVGs são carregados do endpoint identificado no
projeto de referência:

```text
https://assets.cuttle.xyz/noto-emoji-600/<unicode>.svg
```

Isso é adequado para comparar o comportamento visual durante o protótipo,
mas não é uma boa dependência para publicação permanente. Quando o motor
estiver validado, o recomendado é substituir esse endpoint por uma cópia
própria dos assets Noto compatíveis/licenciados.

## Observação

A implementação de `AddHole` e a regra exata usada internamente pela
plataforma para posicionar a argola não estão serializadas no `project.json`;
portanto essa etapa foi reproduzida geometricamente: o centro do furo é
posicionado por ângulo na borda externa e o círculo da argola é unido ao
outline antes de subtrair o furo.


## Versão 2 — preservação de fill e stroke

A camada de gravação agora preserva a semântica original do SVG Noto:

- os `stroke` originais são convertidos em áreas azuis;
- somente as regiões que originalmente tinham `fill` sólido recebem o
  preenchimento preto opcional;
- no modo "Somente contorno azul", apenas essas regiões originalmente
  preenchidas viram contornos azuis.

Isso evita preencher de preto a cabeça inteira quando apenas olhos, marcas,
orelhas, nariz ou outros detalhes sólidos deveriam receber preenchimento.


## Versão 3 — compound paths e `fill-rule="evenodd"`

Alguns Noto Emoji usam um único `path` composto para representar regiões
preenchidas e seus vazios internos. É o caso de figuras em que o cabelo é
preenchido, mas o rosto permanece vazio.

A versão anterior exportava esses paths com `fill-rule="nonzero"`, o que podia
eliminar visualmente os vazios e transformar o desenho numa silhueta sólida.

Agora as regiões originalmente preenchidas são exportadas com
`fill-rule="evenodd"`. Assim:

- o cabelo pode permanecer preenchido;
- o rosto continua vazado;
- olhos, nariz e outros subcontornos internos permanecem coerentes;
- os emojis formados por shapes independentes continuam funcionando da mesma
  forma.


## Versão 4 — catálogo ampliado

O seletor foi ampliado para **218 ícones** distribuídos
entre rostos, pessoas, animais, comida, natureza, símbolos, tecnologia,
transporte, diversão e esportes.

A busca continua filtrando localmente por nome e palavras-chave. As miniaturas
usam `loading="lazy"` para evitar carregar todo o catálogo de uma só vez.


## Versão 5 — duas coleções de emoji

O seletor agora permite alternar entre:

- **Noto Emoji 600** — coleção monocromática usada como referência principal;
- **OpenMoji Black 17.0.0** — coleção monocromática alternativa, com outra
  linguagem visual.

O mesmo catálogo de 218 entradas é reutilizado nas duas coleções. Isso oferece
até 436 variações visuais sem alterar o motor geométrico.

### OpenMoji

Os SVGs são carregados via jsDelivr:

```text
https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/<UNICODE>.svg
```

OpenMoji é licenciado sob **CC BY-SA 4.0** e exige atribuição.

### Cache

O cache agora é separado por `coleção + código Unicode`, evitando que trocar
de Noto para OpenMoji reutilize acidentalmente a geometria da coleção anterior.

### Disponibilidade

Se um código Unicode específico não existir numa coleção, a miniatura é
marcada visualmente como indisponível e a geração mostra uma mensagem clara.


## Versão 6 — correção dos strokes fechados do OpenMoji

Os SVGs Black do OpenMoji usam muitos elementos com `fill="none"` e
`stroke="#000000"`. Alguns desses strokes são caminhos fechados, por exemplo
partes da boca de 😀.

O motor converte os strokes em áreas vetoriais para preservar a espessura
original. Um stroke fechado passa a ter dois contornos: externo e interno.

A visualização anterior usava `fill-rule="nonzero"` para essas áreas. Em
algumas geometrias, isso fazia o contorno interno deixar de funcionar como
vazio, transformando uma linha fechada em uma mancha azul sólida.

Agora os strokes expandidos são renderizados com `fill-rule="evenodd"`.
Assim o interior continua vazado, enquanto os fills reais (como os olhos)
continuam sendo tratados separadamente.

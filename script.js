// =====================================================
// DOM
// =====================================================

const inputBusca =
    document.getElementById("buscaIcone");

const selectCategoria =
    document.getElementById("categoriaIcone");

const gradeIcones =
    document.getElementById("gradeIcones");

const iconeSelecionado =
    document.getElementById("iconeSelecionado");

const nomeIconeSelecionado =
    document.getElementById("nomeIconeSelecionado");


const inputTamanho =
    document.getElementById("tamanhoEmoji");

const inputBorda =
    document.getElementById("borda");

const inputFuro =
    document.getElementById("furo");

const inputEspessuraArgola =
    document.getElementById("espessuraArgola");

const inputPosicaoArgola =
    document.getElementById("posicaoArgola");

const valorPosicaoArgola =
    document.getElementById("valorPosicaoArgola");

const inputIncluirPreenchimento =
    document.getElementById("incluirPreenchimento");


const dimensoesFinais =
    document.getElementById("dimensoesFinais");

const botaoBaixar =
    document.getElementById("baixar");

const mensagem =
    document.getElementById("mensagem");


const mesaMedicao =
    document.getElementById("mesaMedicao");

const reguaHorizontal =
    document.getElementById("reguaHorizontal");

const reguaVertical =
    document.getElementById("reguaVertical");

const areaMedicao =
    document.getElementById("areaMedicao");

const pecaPreview =
    document.getElementById("pecaPreview");

const medidasPreview =
    document.getElementById("medidasPreview");


// =====================================================
// CONFIGURAÇÃO
// =====================================================

const ESCALA_CLIPPER = 1000;

const PX_POR_MM = 5;

const LARGURA_REGUA_VERTICAL = 38;

const ALTURA_REGUA_HORIZONTAL = 30;

const MARGEM_PRANCHETA_MM = 10;


// =====================================================
// ESTADO
// =====================================================

let idIconeSelecionado = "cat";

let svgGerado = "";

let frameAtualizacao = null;


// =====================================================
// FORMAS BÁSICAS
// =====================================================

function poligono(pontos) {

    return pontos.map(
        ([x, y]) => ({
            x,
            y
        })
    );
}


function circulo(
    cx,
    cy,
    raio,
    segmentos = 48
) {

    const pontos = [];


    for (
        let i = 0;
        i < segmentos;
        i++
    ) {

        const a =
            2 *
            Math.PI *
            i /
            segmentos;


        pontos.push({

            x:
                cx +
                raio *
                Math.cos(a),

            y:
                cy +
                raio *
                Math.sin(a)
        });
    }


    return pontos;
}


function elipse(
    cx,
    cy,
    rx,
    ry,
    segmentos = 48
) {

    const pontos = [];


    for (
        let i = 0;
        i < segmentos;
        i++
    ) {

        const a =
            2 *
            Math.PI *
            i /
            segmentos;


        pontos.push({

            x:
                cx +
                rx *
                Math.cos(a),

            y:
                cy +
                ry *
                Math.sin(a)
        });
    }


    return pontos;
}


function retangulo(
    x,
    y,
    largura,
    altura
) {

    return poligono([

        [x, y],

        [
            x + largura,
            y
        ],

        [
            x + largura,
            y + altura
        ],

        [
            x,
            y + altura
        ]
    ]);
}


function estrela(
    cx,
    cy,
    raioExterno,
    raioInterno,
    pontas = 5
) {

    const pontos = [];


    for (
        let i = 0;
        i < pontas * 2;
        i++
    ) {

        const raio =
            i % 2 === 0
                ? raioExterno
                : raioInterno;


        const angulo =
            -Math.PI / 2 +
            i *
            Math.PI /
            pontas;


        pontos.push({

            x:
                cx +
                raio *
                Math.cos(angulo),

            y:
                cy +
                raio *
                Math.sin(angulo)
        });
    }


    return pontos;
}


function coracao(
    cx,
    cy,
    escala = 2
) {

    const pontos = [];


    for (
        let i = 0;
        i < 72;
        i++
    ) {

        const t =
            2 *
            Math.PI *
            i /
            72;


        const x =
            16 *
            Math.pow(
                Math.sin(t),
                3
            );


        const y =
            13 *
            Math.cos(t) -
            5 *
            Math.cos(2 * t) -
            2 *
            Math.cos(3 * t) -
            Math.cos(4 * t);


        pontos.push({

            x:
                cx +
                x *
                escala,

            y:
                cy -
                y *
                escala
        });
    }


    return pontos;
}


function fantasma() {

    const pontos = [];


    for (
        let i = 0;
        i <= 30;
        i++
    ) {

        const a =
            Math.PI +
            Math.PI *
            i /
            30;


        pontos.push({

            x:
                50 +
                30 *
                Math.cos(a),

            y:
                45 +
                30 *
                Math.sin(a)
        });
    }


    pontos.push(

        {
            x: 80,
            y: 78
        },

        {
            x: 70,
            y: 70
        },

        {
            x: 60,
            y: 80
        },

        {
            x: 50,
            y: 70
        },

        {
            x: 40,
            y: 80
        },

        {
            x: 30,
            y: 70
        },

        {
            x: 20,
            y: 78
        }
    );


    return pontos;
}


function melancia() {

    const pontos = [

        {
            x: 18,
            y: 35
        },

        {
            x: 82,
            y: 35
        }
    ];


    for (
        let i = 0;
        i <= 40;
        i++
    ) {

        const a =
            Math.PI *
            i /
            40;


        pontos.push({

            x:
                50 +
                32 *
                Math.cos(a),

            y:
                35 +
                42 *
                Math.sin(a)
        });
    }


    return pontos;
}


// =====================================================
// CATÁLOGO
//
// emoji = somente representação na interface
//
// silhouette = geometria externa da figura
//
// details = linhas internas em azul
// =====================================================

const ICONES = [

    // =================================================
    // GATO
    // =================================================

    {
        id: "cat",

        emoji: "🐱",

        nome: "Gato",

        categoria: "animais",

        keywords:
            "gato cat gatinho animal",

        silhouette: () => [

            elipse(
                50,
                56,
                31,
                30
            ),

            poligono([
                [27, 38],
                [27, 12],
                [44, 31]
            ]),

            poligono([
                [56, 31],
                [73, 12],
                [73, 38]
            ])
        ],

        details: `
            <path d="M32 31 L31 20 L40 32" />
            <path d="M60 32 L69 20 L68 31" />

            <path d="M32 52 Q38 46 44 52" />
            <path d="M56 52 Q62 46 68 52" />

            <path d="M46 61 Q50 64 54 61" />

            <path d="M50 63 L50 67" />

            <path d="M50 67 Q44 73 39 67" />
            <path d="M50 67 Q56 73 61 67" />

            <path d="M38 60 L22 57" />
            <path d="M38 64 L20 65" />

            <path d="M62 60 L78 57" />
            <path d="M62 64 L80 65" />
        `
    },


    // =================================================
    // CACHORRO
    // =================================================

    {
        id: "dog",

        emoji: "🐶",

        nome: "Cachorro",

        categoria: "animais",

        keywords:
            "cachorro cao cão dog animal",

        silhouette: () => [

            elipse(
                50,
                55,
                29,
                30
            ),

            elipse(
                24,
                48,
                12,
                21
            ),

            elipse(
                76,
                48,
                12,
                21
            )
        ],

        details: `
            <circle
                cx="39"
                cy="50"
                r="3"
            />

            <circle
                cx="61"
                cy="50"
                r="3"
            />

            <path d="M44 62 Q50 66 56 62" />

            <path d="M50 65 L50 70" />

            <path d="M42 71 Q50 79 58 71" />
        `
    },


    // =================================================
    // TARTARUGA
    // =================================================

    {
        id: "turtle",

        emoji: "🐢",

        nome: "Tartaruga",

        categoria: "animais",

        keywords:
            "tartaruga turtle animal",

        silhouette: () => [

            elipse(
                47,
                53,
                29,
                22
            ),

            circulo(
                78,
                52,
                10
            ),

            elipse(
                30,
                72,
                10,
                7
            ),

            elipse(
                60,
                72,
                10,
                7
            ),

            poligono([
                [18, 52],
                [8, 47],
                [17, 60]
            ])
        ],

        details: `
            <ellipse
                cx="47"
                cy="53"
                rx="21"
                ry="15"
            />

            <path d="M32 43 L60 63" />

            <path d="M32 63 L60 43" />

            <path d="M47 38 L47 68" />

            <circle
                cx="81"
                cy="49"
                r="2.5"
            />
        `
    },


    // =================================================
    // CORAÇÃO
    // =================================================

    {
        id: "heart",

        emoji: "❤️",

        nome: "Coração",

        categoria: "simbolos",

        keywords:
            "coração coracao heart amor love",

        silhouette: () => [

            coracao(
                50,
                50,
                2
            )
        ],

        details: `
            <path
                d="
                    M50 72
                    C38 61 27 53 27 40
                    C27 31 34 26 42 26
                    C47 26 50 31 50 31
                    C50 31 53 26 58 26
                    C66 26 73 31 73 40
                    C73 53 62 61 50 72
                "
            />
        `
    },


    // =================================================
    // ESTRELA
    // =================================================

    {
        id: "star",

        emoji: "⭐",

        nome: "Estrela",

        categoria: "simbolos",

        keywords:
            "estrela star cinco pontas",

        silhouette: () => [

            estrela(
                50,
                50,
                36,
                17
            )
        ],

        details: `
            <path
                d="
                    M50 27
                    L56 43
                    L73 44
                    L60 55
                    L64 72
                    L50 62
                    L36 72
                    L40 55
                    L27 44
                    L44 43
                    Z
                "
            />
        `
    },


    // =================================================
    // FANTASMA
    // =================================================

    {
        id: "ghost",

        emoji: "👻",

        nome: "Fantasma",

        categoria: "diversao",

        keywords:
            "fantasma ghost halloween",

        silhouette: () => [

            fantasma()
        ],

        details: `
            <ellipse
                cx="39"
                cy="45"
                rx="4"
                ry="7"
            />

            <ellipse
                cx="61"
                cy="45"
                rx="4"
                ry="7"
            />

            <ellipse
                cx="50"
                cy="61"
                rx="7"
                ry="5"
            />
        `
    },


    // =================================================
    // ROBÔ
    // =================================================

    {
        id: "robot",

        emoji: "🤖",

        nome: "Robô",

        categoria: "tecnologia",

        keywords:
            "robo robô robot tecnologia ia inteligencia artificial",

        silhouette: () => [

            retangulo(
                24,
                28,
                52,
                49
            ),

            circulo(
                20,
                49,
                7
            ),

            circulo(
                80,
                49,
                7
            ),

            circulo(
                50,
                21,
                5
            ),

            retangulo(
                48,
                19,
                4,
                12
            )
        ],

        details: `
            <circle
                cx="39"
                cy="47"
                r="4"
            />

            <circle
                cx="61"
                cy="47"
                r="4"
            />

            <rect
                x="34"
                y="59"
                width="32"
                height="9"
            />

            <path d="M42 59 L42 68" />

            <path d="M50 59 L50 68" />

            <path d="M58 59 L58 68" />
        `
    },


    // =================================================
    // MELANCIA
    // =================================================

    {
        id: "watermelon",

        emoji: "🍉",

        nome: "Melancia",

        categoria: "comida",

        keywords:
            "melancia watermelon fruta comida",

        silhouette: () => [

            melancia()
        ],

        details: `
            <path d="M23 42 Q50 72 77 42" />

            <path d="M29 42 Q50 64 71 42" />

            <path d="M38 50 L40 55" />

            <path d="M50 53 L50 59" />

            <path d="M62 50 L60 55" />
        `
    },


    // =================================================
    // PIZZA
    // =================================================

    {
        id: "pizza",

        emoji: "🍕",

        nome: "Pizza",

        categoria: "comida",

        keywords:
            "pizza comida food",

        silhouette: () => [

            poligono([
                [20, 25],
                [80, 25],
                [51, 84]
            ]),

            elipse(
                50,
                25,
                32,
                8
            )
        ],

        details: `
            <path d="M24 31 Q50 40 76 31" />

            <circle
                cx="44"
                cy="48"
                r="5"
            />

            <circle
                cx="61"
                cy="42"
                r="4"
            />

            <circle
                cx="53"
                cy="64"
                r="4"
            />
        `
    },


    // =================================================
    // PATA
    // =================================================

    {
        id: "paw",

        emoji: "🐾",

        nome: "Pata",

        categoria: "animais",

        keywords:
            "pata pegada paw animal cachorro gato",

        silhouette: () => [

            elipse(
                50,
                66,
                23,
                19
            ),

            circulo(
                30,
                46,
                11
            ),

            circulo(
                43,
                38,
                11
            ),

            circulo(
                57,
                38,
                11
            ),

            circulo(
                70,
                46,
                11
            )
        ],

        details: `
            <ellipse
                cx="50"
                cy="66"
                rx="15"
                ry="12"
            />

            <circle
                cx="30"
                cy="46"
                r="6"
            />

            <circle
                cx="43"
                cy="38"
                r="6"
            />

            <circle
                cx="57"
                cy="38"
                r="6"
            />

            <circle
                cx="70"
                cy="46"
                r="6"
            />
        `
    },


    // =================================================
    // SORRISO
    // =================================================

    {
        id: "smile",

        emoji: "😊",

        nome: "Sorriso",

        categoria: "diversao",

        keywords:
            "sorriso smile feliz happy rosto emoji",

        silhouette: () => [

            circulo(
                50,
                50,
                34
            )
        ],

        details: `
            <path d="M33 45 Q38 39 43 45" />

            <path d="M57 45 Q62 39 67 45" />

            <path
                d="
                    M33 60
                    Q50 76
                    67 60
                "
            />
        `
    },


    // =================================================
    // BORBOLETA
    // =================================================

    {
        id: "butterfly",

        emoji: "🦋",

        nome: "Borboleta",

        categoria: "animais",

        keywords:
            "borboleta butterfly animal inseto",

        silhouette: () => [

            elipse(
                34,
                40,
                20,
                24
            ),

            elipse(
                66,
                40,
                20,
                24
            ),

            elipse(
                35,
                66,
                16,
                18
            ),

            elipse(
                65,
                66,
                16,
                18
            ),

            elipse(
                50,
                53,
                7,
                30
            )
        ],

        details: `
            <ellipse
                cx="50"
                cy="53"
                rx="4"
                ry="24"
            />

            <path d="M47 28 Q40 15 34 16" />

            <path d="M53 28 Q60 15 66 16" />

            <path d="M24 36 Q35 47 45 50" />

            <path d="M76 36 Q65 47 55 50" />

            <path d="M26 66 Q35 58 45 56" />

            <path d="M74 66 Q65 58 55 56" />
        `
    }
];


// =====================================================
// CATÁLOGO
// =====================================================

function obterIconeSelecionado() {

    return ICONES.find(
        item =>
            item.id ===
            idIconeSelecionado
    );
}


function atualizarCabecalhoIcone() {

    const item =
        obterIconeSelecionado();


    iconeSelecionado.textContent =
        item.emoji;


    nomeIconeSelecionado.textContent =
        item.nome;
}


function renderizarGradeIcones() {

    const busca =
        inputBusca.value
            .trim()
            .toLowerCase();


    const categoria =
        selectCategoria.value;


    gradeIcones.innerHTML =
        "";


    const filtrados =
        ICONES.filter(
            item => {

                const correspondeCategoria =
                    categoria === "todos" ||
                    item.categoria ===
                    categoria;


                const texto =
                    (
                        item.nome +
                        " " +
                        item.keywords
                    ).toLowerCase();


                const correspondeBusca =
                    !busca ||
                    texto.includes(
                        busca
                    );


                return (
                    correspondeCategoria &&
                    correspondeBusca
                );
            }
        );


    for (
        const item
        of filtrados
    ) {

        const botao =
            document.createElement(
                "button"
            );


        botao.type =
            "button";


        botao.className =
            "botao-icone";


        if (
            item.id ===
            idIconeSelecionado
        ) {

            botao.classList.add(
                "ativo"
            );
        }


        botao.textContent =
            item.emoji;


        botao.title =
            item.nome;


        botao.addEventListener(
            "click",
            () => {

                idIconeSelecionado =
                    item.id;


                atualizarCabecalhoIcone();

                renderizarGradeIcones();

                solicitarAtualizacao();
            }
        );


        gradeIcones.appendChild(
            botao
        );
    }
}


// =====================================================
// CLIPPER
// =====================================================

function converterParaClipper(
    poligonos
) {

    return poligonos.map(
        poligono =>
            poligono.map(
                ponto => ({

                    X:
                        Math.round(
                            ponto.x *
                            ESCALA_CLIPPER
                        ),

                    Y:
                        Math.round(
                            ponto.y *
                            ESCALA_CLIPPER
                        )
                })
            )
    );
}


function unirPaths(
    paths
) {

    const clipper =
        new ClipperLib.Clipper();


    clipper.AddPaths(
        paths,
        ClipperLib.PolyType.ptSubject,
        true
    );


    const resultado =
        [];


    clipper.Execute(
        ClipperLib.ClipType.ctUnion,
        resultado,
        ClipperLib.PolyFillType.pftNonZero,
        ClipperLib.PolyFillType.pftNonZero
    );


    return resultado;
}


function offsetPaths(
    paths,
    distancia
) {

    const offset =
        new ClipperLib.ClipperOffset(
            2,
            0.25 *
            ESCALA_CLIPPER
        );


    offset.AddPaths(
        paths,
        ClipperLib.JoinType.jtRound,
        ClipperLib.EndType.etClosedPolygon
    );


    const resultado =
        [];


    offset.Execute(
        resultado,
        distancia *
        ESCALA_CLIPPER
    );


    return unirPaths(
        resultado
    );
}


// =====================================================
// CONTORNOS EXTERNOS
// =====================================================

function estaDentro(
    path,
    outro
) {

    if (
        !path.length ||
        !outro.length
    ) {

        return false;
    }


    return (
        ClipperLib.Clipper.PointInPolygon(
            path[0],
            outro
        ) !== 0
    );
}


function apenasContornosExternos(
    paths
) {

    return paths.filter(
        (
            path,
            indice
        ) => {

            for (
                let i = 0;
                i < paths.length;
                i++
            ) {

                if (
                    i === indice
                ) {

                    continue;
                }


                if (
                    estaDentro(
                        path,
                        paths[i]
                    )
                ) {

                    return false;
                }
            }


            return true;
        }
    );
}


// =====================================================
// ÁREA
// =====================================================

function areaPath(
    path
) {

    let area = 0;


    for (
        let i = 0;
        i < path.length;
        i++
    ) {

        const p1 =
            path[i];


        const p2 =
            path[
                (
                    i + 1
                ) %
                path.length
            ];


        area +=
            p1.X *
            p2.Y -
            p2.X *
            p1.Y;
    }


    return area / 2;
}


function selecionarContornoPrincipal(
    paths
) {

    let principal =
        paths[0];


    let maiorArea =
        Math.abs(
            areaPath(
                principal
            )
        );


    for (
        let i = 1;
        i < paths.length;
        i++
    ) {

        const area =
            Math.abs(
                areaPath(
                    paths[i]
                )
            );


        if (
            area >
            maiorArea
        ) {

            maiorArea =
                area;


            principal =
                paths[i];
        }
    }


    return principal;
}


// =====================================================
// BOUNDING BOX
// =====================================================

function boundingBoxClipper(
    paths
) {

    let minX =
        Infinity;

    let minY =
        Infinity;

    let maxX =
        -Infinity;

    let maxY =
        -Infinity;


    for (
        const path
        of paths
    ) {

        for (
            const ponto
            of path
        ) {

            const x =
                ponto.X /
                ESCALA_CLIPPER;


            const y =
                ponto.Y /
                ESCALA_CLIPPER;


            minX =
                Math.min(
                    minX,
                    x
                );


            minY =
                Math.min(
                    minY,
                    y
                );


            maxX =
                Math.max(
                    maxX,
                    x
                );


            maxY =
                Math.max(
                    maxY,
                    y
                );
        }
    }


    return {

        minX,

        minY,

        maxX,

        maxY
    };
}


// =====================================================
// SVG PATH
// =====================================================

function clipperParaSvg(
    paths
) {

    let d = "";


    for (
        const path
        of paths
    ) {

        if (
            !path.length
        ) {

            continue;
        }


        d +=
            `M ${
                path[0].X /
                ESCALA_CLIPPER
            } ${
                path[0].Y /
                ESCALA_CLIPPER
            } `;


        for (
            let i = 1;
            i < path.length;
            i++
        ) {

            d +=
                `L ${
                    path[i].X /
                    ESCALA_CLIPPER
                } ${
                    path[i].Y /
                    ESCALA_CLIPPER
                } `;
        }


        d +=
            "Z ";
    }


    return d.trim();
}


function pathClipperParaSvg(
    path
) {

    return clipperParaSvg(
        [path]
    );
}


// =====================================================
// CÍRCULO CLIPPER
// =====================================================

function criarCirculoClipper(
    cx,
    cy,
    raio,
    segmentos = 72
) {

    const path = [];


    for (
        let i = 0;
        i < segmentos;
        i++
    ) {

        const a =
            2 *
            Math.PI *
            i /
            segmentos;


        path.push({

            X:
                Math.round(
                    (
                        cx +
                        raio *
                        Math.cos(a)
                    ) *
                    ESCALA_CLIPPER
                ),

            Y:
                Math.round(
                    (
                        cy +
                        raio *
                        Math.sin(a)
                    ) *
                    ESCALA_CLIPPER
                )
        });
    }


    return path;
}


// =====================================================
// PERÍMETRO
// =====================================================

function iniciarPathPelaEsquerda(
    path
) {

    let menorX =
        Infinity;


    let indice =
        0;


    for (
        let i = 0;
        i < path.length;
        i++
    ) {

        if (
            path[i].X <
            menorX
        ) {

            menorX =
                path[i].X;


            indice =
                i;
        }
    }


    return [

        ...path.slice(
            indice
        ),

        ...path.slice(
            0,
            indice
        )
    ];
}


function construirPerimetro(
    path
) {

    const segmentos = [];

    let total = 0;


    for (
        let i = 0;
        i < path.length;
        i++
    ) {

        const p1 =
            path[i];


        const p2 =
            path[
                (
                    i + 1
                ) %
                path.length
            ];


        const comprimento =
            Math.hypot(
                p2.X - p1.X,
                p2.Y - p1.Y
            );


        if (
            comprimento === 0
        ) {

            continue;
        }


        segmentos.push({

            p1,

            p2,

            inicio:
                total,

            comprimento
        });


        total +=
            comprimento;
    }


    return {

        segmentos,

        comprimentoTotal:
            total
    };
}


function pontoNaDistancia(
    segmentos,
    comprimentoTotal,
    distancia
) {

    let d =
        distancia %
        comprimentoTotal;


    if (
        d < 0
    ) {

        d +=
            comprimentoTotal;
    }


    for (
        const segmento
        of segmentos
    ) {

        const fim =
            segmento.inicio +
            segmento.comprimento;


        if (
            d <= fim
        ) {

            const t =
                (
                    d -
                    segmento.inicio
                ) /
                segmento.comprimento;


            return {

                X:
                    segmento.p1.X +
                    (
                        segmento.p2.X -
                        segmento.p1.X
                    ) *
                    t,

                Y:
                    segmento.p1.Y +
                    (
                        segmento.p2.Y -
                        segmento.p1.Y
                    ) *
                    t
            };
        }
    }


    return {
        ...segmentos[0].p1
    };
}


function normalizar(
    x,
    y
) {

    const tamanho =
        Math.hypot(
            x,
            y
        );


    if (
        tamanho === 0
    ) {

        return {

            x: 1,

            y: 0
        };
    }


    return {

        x:
            x /
            tamanho,

        y:
            y /
            tamanho
    };
}


function pontoNoPerimetro(
    path,
    percentual
) {

    const {

        segmentos,

        comprimentoTotal

    } =
        construirPerimetro(
            path
        );


    const distancia =
        comprimentoTotal *
        percentual /
        100;


    const ponto =
        pontoNaDistancia(
            segmentos,
            comprimentoTotal,
            distancia
        );


    const janela =
        Math.max(

            3 *
            ESCALA_CLIPPER,

            comprimentoTotal *
            0.015
        );


    const anterior =
        pontoNaDistancia(
            segmentos,
            comprimentoTotal,
            distancia -
            janela
        );


    const posterior =
        pontoNaDistancia(
            segmentos,
            comprimentoTotal,
            distancia +
            janela
        );


    const tangente =
        normalizar(

            posterior.X -
            anterior.X,

            posterior.Y -
            anterior.Y
        );


    const area =
        areaPath(
            path
        );


    let normal;


    if (
        area > 0
    ) {

        normal = {

            x:
                tangente.y,

            y:
                -tangente.x
        };
    }

    else {

        normal = {

            x:
                -tangente.y,

            y:
                tangente.x
        };
    }


    return {

        x:
            ponto.X /
            ESCALA_CLIPPER,

        y:
            ponto.Y /
            ESCALA_CLIPPER,

        tangente,

        normal
    };
}


// =====================================================
// CONECTOR DA ARGOLA
// =====================================================

function criarConector(
    ponto,
    centro,
    tangente,
    largura
) {

    const metade =
        largura /
        2;


    const tx =
        tangente.x *
        metade;


    const ty =
        tangente.y *
        metade;


    return [

        {
            X:
                Math.round(
                    (
                        ponto.x -
                        tx
                    ) *
                    ESCALA_CLIPPER
                ),

            Y:
                Math.round(
                    (
                        ponto.y -
                        ty
                    ) *
                    ESCALA_CLIPPER
                )
        },

        {
            X:
                Math.round(
                    (
                        ponto.x +
                        tx
                    ) *
                    ESCALA_CLIPPER
                ),

            Y:
                Math.round(
                    (
                        ponto.y +
                        ty
                    ) *
                    ESCALA_CLIPPER
                )
        },

        {
            X:
                Math.round(
                    (
                        centro.x +
                        tx
                    ) *
                    ESCALA_CLIPPER
                ),

            Y:
                Math.round(
                    (
                        centro.y +
                        ty
                    ) *
                    ESCALA_CLIPPER
                )
        },

        {
            X:
                Math.round(
                    (
                        centro.x -
                        tx
                    ) *
                    ESCALA_CLIPPER
                ),

            Y:
                Math.round(
                    (
                        centro.y -
                        ty
                    ) *
                    ESCALA_CLIPPER
                )
        }
    ];
}


// =====================================================
// RÉGUA HORIZONTAL
// =====================================================

function gerarReguaHorizontal(
    larguraMm
) {

    reguaHorizontal.innerHTML =
        "";


    reguaHorizontal.style.width =
        `${
            larguraMm *
            PX_POR_MM
        }px`;


    for (
        let mm = 0;
        mm <= larguraMm;
        mm++
    ) {

        const marca =
            document.createElement(
                "div"
            );


        marca.className =
            "tick-horizontal";


        if (
            mm % 10 === 0
        ) {

            marca.classList.add(
                "maior"
            );


            const label =
                document.createElement(
                    "span"
                );


            label.className =
                "label";


            label.textContent =
                mm;


            marca.appendChild(
                label
            );
        }

        else if (
            mm % 5 === 0
        ) {

            marca.classList.add(
                "medio"
            );
        }


        marca.style.left =
            `${
                mm *
                PX_POR_MM
            }px`;


        reguaHorizontal.appendChild(
            marca
        );
    }
}


// =====================================================
// RÉGUA VERTICAL
// =====================================================

function gerarReguaVertical(
    alturaMm
) {

    reguaVertical.innerHTML =
        "";


    reguaVertical.style.height =
        `${
            alturaMm *
            PX_POR_MM
        }px`;


    for (
        let mm = 0;
        mm <= alturaMm;
        mm++
    ) {

        const marca =
            document.createElement(
                "div"
            );


        marca.className =
            "tick-vertical";


        if (
            mm % 10 === 0
        ) {

            marca.classList.add(
                "maior"
            );


            const label =
                document.createElement(
                    "span"
                );


            label.className =
                "label";


            label.textContent =
                mm;


            marca.appendChild(
                label
            );
        }

        else if (
            mm % 5 === 0
        ) {

            marca.classList.add(
                "medio"
            );
        }


        marca.style.top =
            `${
                mm *
                PX_POR_MM
            }px`;


        reguaVertical.appendChild(
            marca
        );
    }
}


// =====================================================
// PRANCHETA
// =====================================================

function atualizarPrancheta(
    svgPreview,
    larguraPecaMm,
    alturaPecaMm
) {

    const larguraPranchetaMm =
        Math.max(

            100,

            Math.ceil(
                (
                    larguraPecaMm +
                    MARGEM_PRANCHETA_MM *
                    2
                ) /
                10
            ) *
            10
        );


    const alturaPranchetaMm =
        Math.max(

            70,

            Math.ceil(
                (
                    alturaPecaMm +
                    MARGEM_PRANCHETA_MM *
                    2
                ) /
                10
            ) *
            10
        );


    const larguraPranchetaPx =
        larguraPranchetaMm *
        PX_POR_MM;


    const alturaPranchetaPx =
        alturaPranchetaMm *
        PX_POR_MM;


    mesaMedicao.style.width =
        `${
            larguraPranchetaPx +
            LARGURA_REGUA_VERTICAL
        }px`;


    mesaMedicao.style.height =
        `${
            alturaPranchetaPx +
            ALTURA_REGUA_HORIZONTAL
        }px`;


    areaMedicao.style.width =
        `${larguraPranchetaPx}px`;


    areaMedicao.style.height =
        `${alturaPranchetaPx}px`;


    areaMedicao.style.setProperty(
        "--grid-1",
        `${PX_POR_MM}px`
    );


    areaMedicao.style.setProperty(
        "--grid-5",
        `${
            PX_POR_MM *
            5
        }px`
    );


    areaMedicao.style.setProperty(
        "--grid-10",
        `${
            PX_POR_MM *
            10
        }px`
    );


    const larguraPecaPx =
        larguraPecaMm *
        PX_POR_MM;


    const alturaPecaPx =
        alturaPecaMm *
        PX_POR_MM;


    pecaPreview.style.width =
        `${larguraPecaPx}px`;


    pecaPreview.style.height =
        `${alturaPecaPx}px`;


    pecaPreview.style.left =
        `${
            (
                larguraPranchetaPx -
                larguraPecaPx
            ) /
            2
        }px`;


    pecaPreview.style.top =
        `${
            (
                alturaPranchetaPx -
                alturaPecaPx
            ) /
            2
        }px`;


    pecaPreview.innerHTML =
        svgPreview;


    medidasPreview.textContent =
        `↔ ${
            larguraPecaMm.toFixed(1)
        } mm   ↕ ${
            alturaPecaMm.toFixed(1)
        } mm`;


    gerarReguaHorizontal(
        larguraPranchetaMm
    );


    gerarReguaVertical(
        alturaPranchetaMm
    );
}


// =====================================================
// DESENHO DO EMOJI
//
// Azul = contorno e detalhes
// Preto = preenchimento opcional
// =====================================================

function criarDesenhoEmoji(
    item,
    pathCorpo,
    espessuraLinha,
    incluirPreenchimento
) {

    const preenchimento =
        incluirPreenchimento
            ? "#000000"
            : "none";


    return `
        <!-- ================================= -->
        <!-- CONTORNO PRINCIPAL DO EMOJI       -->
        <!-- ================================= -->

        <path
            id="contorno-emoji"
            d="${pathCorpo}"
            fill="${preenchimento}"
            stroke="#0000FF"
            stroke-width="${espessuraLinha}"
            stroke-linecap="round"
            stroke-linejoin="round"
        />


        <!-- ================================= -->
        <!-- DETALHES INTERNOS                 -->
        <!-- ================================= -->

        <g
            id="detalhes-emoji"
            fill="none"
            stroke="#0000FF"
            stroke-width="${espessuraLinha}"
            stroke-linecap="round"
            stroke-linejoin="round"
        >

            ${item.details}

        </g>
    `;
}


// =====================================================
// GERAÇÃO
// =====================================================

function gerarSvg() {

    const inicio =
        performance.now();


    botaoBaixar.disabled =
        true;


    try {

        const item =
            obterIconeSelecionado();


        const tamanhoMm =
            Number(
                inputTamanho.value
            );


        const bordaMm =
            Number(
                inputBorda.value
            );


        const diametroFuroMm =
            Number(
                inputFuro.value
            );


        const espessuraArgolaMm =
            Number(
                inputEspessuraArgola.value
            );


        const posicaoArgola =
            Number(
                inputPosicaoArgola.value
            );


        const incluirPreenchimento =
            inputIncluirPreenchimento.checked;


        valorPosicaoArgola.textContent =
            `${posicaoArgola.toFixed(1)}%`;


        // =================================================
        // VALIDAÇÃO
        // =================================================

        if (
            !Number.isFinite(
                tamanhoMm
            ) ||
            tamanhoMm <= 0
        ) {

            throw new Error(
                "Altura do desenho inválida."
            );
        }


        if (
            !Number.isFinite(
                bordaMm
            ) ||
            bordaMm <= 0
        ) {

            throw new Error(
                "Borda inválida."
            );
        }


        // =================================================
        // SILHUETA ORIGINAL
        // =================================================

        const poligonos =
            item.silhouette();


        let corpo =
            unirPaths(
                converterParaClipper(
                    poligonos
                )
            );


        const bboxCorpo =
            boundingBoxClipper(
                corpo
            );


        const alturaCorpo =
            bboxCorpo.maxY -
            bboxCorpo.minY;


        // =================================================
        // ESCALA FÍSICA
        // =================================================

        const mmPorUnidade =
            tamanhoMm /
            alturaCorpo;


        // =================================================
        // BORDA EXTERNA PARA CORTE
        // =================================================

        const bordaUnidades =
            bordaMm /
            mmPorUnidade;


        let contorno =
            offsetPaths(
                corpo,
                bordaUnidades
            );


        contorno =
            apenasContornosExternos(
                contorno
            );


        // =================================================
        // POSIÇÃO DA ARGOLA
        // =================================================

        let principal =
            selecionarContornoPrincipal(
                contorno
            );


        principal =
            iniciarPathPelaEsquerda(
                principal
            );


        const posicao =
            pontoNoPerimetro(
                principal,
                posicaoArgola
            );


        // =================================================
        // ARGOLA
        // =================================================

        const raioFuro =
            (
                diametroFuroMm /
                2
            ) /
            mmPorUnidade;


        const espessuraArgola =
            espessuraArgolaMm /
            mmPorUnidade;


        const raioExterno =
            raioFuro +
            espessuraArgola;


        const sobreposicao =
            Math.max(
                1.2,
                espessuraArgolaMm *
                0.65
            ) /
            mmPorUnidade;


        const distanciaCentro =
            raioExterno -
            sobreposicao;


        const centroArgola = {

            x:
                posicao.x +
                posicao.normal.x *
                distanciaCentro,

            y:
                posicao.y +
                posicao.normal.y *
                distanciaCentro
        };


        const circuloExterno =
            criarCirculoClipper(
                centroArgola.x,
                centroArgola.y,
                raioExterno
            );


        const conector =
            criarConector(
                posicao,
                centroArgola,
                posicao.tangente,
                raioExterno *
                1.3
            );


        let pecaCompleta =
            unirPaths([

                ...contorno,

                circuloExterno,

                conector
            ]);


        pecaCompleta =
            apenasContornosExternos(
                pecaCompleta
            );


        const furo =
            criarCirculoClipper(
                centroArgola.x,
                centroArgola.y,
                raioFuro
            );


        // =================================================
        // DIMENSÕES FINAIS
        // =================================================

        const bboxFinal =
            boundingBoxClipper(
                pecaCompleta
            );


        const larguraUnidades =
            bboxFinal.maxX -
            bboxFinal.minX;


        const alturaUnidades =
            bboxFinal.maxY -
            bboxFinal.minY;


        const larguraMm =
            larguraUnidades *
            mmPorUnidade;


        const alturaMm =
            alturaUnidades *
            mmPorUnidade;


        dimensoesFinais.textContent =
            `Dimensões finais: ${
                larguraMm.toFixed(1)
            } × ${
                alturaMm.toFixed(1)
            } mm`;


        // =================================================
        // PATHS
        // =================================================

        const pathCorte =
            clipperParaSvg(
                pecaCompleta
            );


        const pathFuro =
            pathClipperParaSvg(
                furo
            );


        const pathCorpo =
            clipperParaSvg(
                corpo
            );


        // =================================================
        // ESPESSURAS VISUAIS
        // =================================================

        const espessuraCorte =
            0.20 /
            mmPorUnidade;


        const espessuraContorno =
            1.50 /
            mmPorUnidade;


        // =================================================
        // EMOJI
        // =================================================

        const desenhoEmoji =
            criarDesenhoEmoji(
                item,
                pathCorpo,
                espessuraContorno,
                incluirPreenchimento
            );


        // =================================================
        // MARGEM DO ARQUIVO
        // =================================================

        const margemMm =
            2;


        const margem =
            margemMm /
            mmPorUnidade;


        const viewX =
            bboxFinal.minX -
            margem;


        const viewY =
            bboxFinal.minY -
            margem;


        const viewLargura =
            larguraUnidades +
            margem *
            2;


        const viewAltura =
            alturaUnidades +
            margem *
            2;


        const documentoLarguraMm =
            larguraMm +
            margemMm *
            2;


        const documentoAlturaMm =
            alturaMm +
            margemMm *
            2;


        // =================================================
        // SVG PARA DOWNLOAD
        // =================================================

        svgGerado = `
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="${viewX} ${viewY} ${viewLargura} ${viewAltura}"
    width="${documentoLarguraMm.toFixed(3)}mm"
    height="${documentoAlturaMm.toFixed(3)}mm"
    preserveAspectRatio="xMinYMin meet"
>

    <!-- ================================= -->
    <!-- VERMELHO = CORTE                 -->
    <!-- ================================= -->

    <path
        id="corte"
        d="${pathCorte} ${pathFuro}"
        fill="none"
        stroke="#FF0000"
        stroke-width="${espessuraCorte}"
        stroke-linecap="round"
        stroke-linejoin="round"
    />


    <!-- ================================= -->
    <!-- AZUL = CONTORNO DO EMOJI          -->
    <!-- PRETO = PREENCHIMENTO OPCIONAL    -->
    <!-- ================================= -->

    ${desenhoEmoji}

</svg>
        `.trim();


        // =================================================
        // SVG DA PRANCHETA
        // =================================================

        const svgPreview = `
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="${bboxFinal.minX} ${bboxFinal.minY} ${larguraUnidades} ${alturaUnidades}"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid meet"
>

    <!-- CORTE -->

    <path
        d="${pathCorte} ${pathFuro}"
        fill="none"
        stroke="#FF0000"
        stroke-width="${espessuraCorte}"
        stroke-linecap="round"
        stroke-linejoin="round"
    />


    <!-- EMOJI -->

    ${desenhoEmoji}

</svg>
        `.trim();


        // =================================================
        // PRANCHETA
        // =================================================

        atualizarPrancheta(
            svgPreview,
            larguraMm,
            alturaMm
        );


        botaoBaixar.disabled =
            false;


        mensagem.textContent =
            `Atualizado em ${
                (
                    performance.now() -
                    inicio
                ).toFixed(0)
            } ms.`;

    }

    catch (erro) {

        console.error(
            erro
        );


        mensagem.textContent =
            "Erro: " +
            erro.message;


        botaoBaixar.disabled =
            true;
    }
}


// =====================================================
// DOWNLOAD
// =====================================================

function baixarSvg() {

    if (
        !svgGerado
    ) {

        return;
    }


    const item =
        obterIconeSelecionado();


    const nome =
        item.nome
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .replace(
                /\s+/g,
                "_"
            )
            .toLowerCase();


    const conteudo =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        svgGerado;


    const blob =
        new Blob(
            [conteudo],
            {
                type:
                    "image/svg+xml;charset=utf-8"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        `${nome}_chaveiro.svg`;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );
}


// =====================================================
// ATUALIZAÇÃO
// =====================================================

function solicitarAtualizacao() {

    if (
        frameAtualizacao !==
        null
    ) {

        return;
    }


    frameAtualizacao =
        requestAnimationFrame(
            () => {

                frameAtualizacao =
                    null;


                gerarSvg();
            }
        );
}


// =====================================================
// EVENTOS
// =====================================================

inputBusca.addEventListener(
    "input",
    renderizarGradeIcones
);


selectCategoria.addEventListener(
    "change",
    renderizarGradeIcones
);


inputTamanho.addEventListener(
    "input",
    solicitarAtualizacao
);


inputBorda.addEventListener(
    "input",
    solicitarAtualizacao
);


inputFuro.addEventListener(
    "input",
    solicitarAtualizacao
);


inputEspessuraArgola.addEventListener(
    "input",
    solicitarAtualizacao
);


inputPosicaoArgola.addEventListener(
    "input",
    () => {

        valorPosicaoArgola.textContent =
            `${
                Number(
                    inputPosicaoArgola.value
                ).toFixed(1)
            }%`;


        solicitarAtualizacao();
    }
);


inputIncluirPreenchimento.addEventListener(
    "change",
    gerarSvg
);


botaoBaixar.addEventListener(
    "click",
    baixarSvg
);


// =====================================================
// INICIALIZAÇÃO
// =====================================================

window.addEventListener(
    "load",
    () => {

        atualizarCabecalhoIcone();

        renderizarGradeIcones();

        gerarSvg();
    }
);
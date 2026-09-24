// =====================================================
// Gerador de chaveiros e cards com emoji - NuRIA
// Versão 8
//
// vermelho = corte
// azul     = gravação
// preto    = preenchimento opcional
//
// V8:
// - estilo "Azul preenchido" removido
// - padrão: somente contorno azul
// - espessura padrão do contorno: 0,4 mm
// - identificação do autor habilitada por padrão
// - downloads bloqueados sem nome do autor
// - versão exibida na página
// - dupla camada: desenho azul do emoji convertido para vermelho no segundo SVG
//
// V7:
// - Chaveiro ou Card
// - Card com argola opcional
// - Identificação opcional do autor
// - Nome do autor em azul, 5 mm abaixo da peça
// - Nome de arquivo:
//   chaveiro-emoji-Herbert.svg
//   chaveiro-emoji-aluno.svg
//   emoji-card-Herbert.svg
//   emoji-card-aluno.svg
// =====================================================




// =====================================================
// DOM
// =====================================================


const selectColecao = document.getElementById("colecaoEmoji");
const descricaoColecao = document.getElementById("descricaoColecao");
const creditoColecao = document.getElementById("creditoColecao");


const inputBusca = document.getElementById("buscaIcone");
const selectCategoria = document.getElementById("categoriaIcone");
const gradeIcones = document.getElementById("gradeIcones");
const contadorIcones = document.getElementById("contadorIcones");
const iconeSelecionado = document.getElementById("iconeSelecionado");
const nomeIconeSelecionado = document.getElementById("nomeIconeSelecionado");


const formatoChaveiro = document.getElementById("formatoChaveiro");
const formatoCard = document.getElementById("formatoCard");
const controlesChaveiro = document.getElementById("controlesChaveiro");
const controlesCard = document.getElementById("controlesCard");
const controlesArgola = document.getElementById("controlesArgola");


const inputTamanho = document.getElementById("tamanhoEmoji");
const inputBorda = document.getElementById("borda");


const inputCardLargura = document.getElementById("cardLargura");
const inputCardAltura = document.getElementById("cardAltura");
const inputCardRaio = document.getElementById("cardRaio");
const inputCardMargem = document.getElementById("cardMargem");
const inputCardArgola = document.getElementById("cardArgola");


const inputFuro = document.getElementById("furo");
const inputEspessuraArgola = document.getElementById("espessuraArgola");
const inputPosicaoArgola = document.getElementById("posicaoArgola");
const valorPosicaoArgola = document.getElementById("valorPosicaoArgola");


const selectEstiloEmoji = document.getElementById("estiloEmoji");
const inputTracoEmoji = document.getElementById("tracoEmoji");
const controleTraco = document.getElementById("controleTraco");


const inputIdentificarAutor = document.getElementById("identificarAutor");
const inputNomeAutor = document.getElementById("nomeAutor");
const versaoFerramenta = document.getElementById("versaoFerramenta");


const dimensoesFinais = document.getElementById("dimensoesFinais");
const botaoBaixar = document.getElementById("baixar");
const botaoBaixarDuplaCamada = document.getElementById("baixarDuplaCamada");
const mensagem = document.getElementById("mensagem");
const statusPathKit = document.getElementById("statusPathKit");


const mesaMedicao = document.getElementById("mesaMedicao");
const reguaHorizontal = document.getElementById("reguaHorizontal");
const reguaVertical = document.getElementById("reguaVertical");
const areaMedicao = document.getElementById("areaMedicao");
const pecaPreview = document.getElementById("pecaPreview");
const medidasPreview = document.getElementById("medidasPreview");




// =====================================================
// CONFIGURAÇÕES
// =====================================================


const COLECOES = {
    noto: {
        id: "noto",
        nome: "Noto Emoji 600",
        descricao:
            "Noto Emoji monocromático — desenho semelhante ao gerador de referência.",
        credito:
            "Coleção atual: Noto Emoji 600.",
        base:
            "https://assets.cuttle.xyz/noto-emoji-600",
        arquivo:
            hex => `${hex.toLowerCase()}.svg`
    },


    openmoji: {
        id: "openmoji",
        nome: "OpenMoji Black",
        descricao:
            "OpenMoji Black — alternativa monocromática com desenho diferente e ampla variedade.",
        credito:
            "Coleção atual: OpenMoji Black — CC BY-SA 4.0.",
        base:
            "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg",
        arquivo:
            hex => `${hex.toUpperCase()}.svg`
    }
};




const PATHKIT_CDN =
    "https://cdn.jsdelivr.net/npm/pathkit-wasm@1.0.0/bin/";


const PX_POR_MM = 5;


const LARGURA_REGUA_VERTICAL = 38;
const ALTURA_REGUA_HORIZONTAL = 30;


const MARGEM_PRANCHETA_MM = 8;


const ESPESSURA_CORTE_MM = 0.15;
const MARGEM_SVG_DOWNLOAD_MM = 2;
const VERSAO_APP = "8";




// Autor: mesmo padrão usado no gerador de futebol.


const TAMANHO_AUTOR_MM = 2.82;
const TAMANHO_MIN_AUTOR_MM = 1.8;
const DISTANCIA_AUTOR_CORTE_MM = 5;
const MARGEM_AUTOR_LATERAL_MM = 2;




// =====================================================
// CATÁLOGO
// =====================================================


function icone(
    id,
    nome,
    hex,
    categoria,
    keywords = ""
) {
    return {
        id,
        nome,
        hex,
        categoria,
        keywords
    };
}




const ICONES = [


    // ROSTOS
    icone("grinning", "Rosto sorridente", "1f600", "rostos", "grinning sorriso feliz"),
    icone("smiley", "Rosto sorridente com olhos grandes", "1f603", "rostos", "sorriso feliz olhos"),
    icone("smile-open", "Rosto sorridente alegre", "1f604", "rostos", "sorriso feliz"),
    icone("grin", "Sorriso com dentes", "1f601", "rostos", "grin dentes sorriso"),
    icone("laugh", "Rosto rindo", "1f606", "rostos", "rindo risada laugh"),
    icone("sweat-smile", "Sorriso com suor", "1f605", "rostos", "sorriso suor"),
    icone("joy", "Rindo com lágrimas", "1f602", "rostos", "rindo lágrimas alegria"),
    icone("slightly-smile", "Sorriso leve", "1f642", "rostos", "sorriso leve"),
    icone("upside-down", "Rosto de cabeça para baixo", "1f643", "rostos", "cabeça para baixo"),
    icone("wink", "Piscando", "1f609", "rostos", "piscar wink"),
    icone("blush", "Rosto feliz", "1f60a", "rostos", "feliz blush sorriso"),
    icone("halo", "Rosto com auréola", "1f607", "rostos", "anjo aureola"),
    icone("hearts-face", "Rosto apaixonado", "1f970", "rostos", "amor corações apaixonado"),
    icone("heart-eyes", "Olhos de coração", "1f60d", "rostos", "amor coração olhos"),
    icone("star-eyes", "Olhos de estrela", "1f929", "rostos", "estrela olhos"),
    icone("kiss", "Mandando beijo", "1f618", "rostos", "beijo kiss"),
    icone("yum", "Rosto saboreando", "1f60b", "rostos", "língua comida"),
    icone("tongue", "Mostrando a língua", "1f61b", "rostos", "língua"),
    icone("wink-tongue", "Piscando com língua", "1f61c", "rostos", "língua piscar"),
    icone("zany", "Rosto maluco", "1f92a", "rostos", "maluco zany"),
    icone("money-face", "Rosto dinheiro", "1f911", "rostos", "dinheiro money"),
    icone("hug", "Rosto abraçando", "1f917", "rostos", "abraço hug"),
    icone("hand-mouth", "Mão na boca", "1f92d", "rostos", "mão boca"),
    icone("shushing", "Pedindo silêncio", "1f92b", "rostos", "silêncio shh"),
    icone("thinking", "Pensando", "1f914", "rostos", "pensando dúvida"),
    icone("zipper-mouth", "Boca com zíper", "1f910", "rostos", "ziper silêncio"),
    icone("raised-eyebrow", "Sobrancelha levantada", "1f928", "rostos", "sobrancelha dúvida"),
    icone("neutral", "Rosto neutro", "1f610", "rostos", "neutro"),
    icone("expressionless", "Sem expressão", "1f611", "rostos", "sem expressão"),
    icone("smirk", "Sorriso de canto", "1f60f", "rostos", "sorriso canto"),
    icone("unamused", "Descontente", "1f612", "rostos", "descontente"),
    icone("eye-roll", "Revirando os olhos", "1f644", "rostos", "olhos"),
    icone("grimace", "Careta", "1f62c", "rostos", "careta dentes"),
    icone("relieved", "Aliviado", "1f60c", "rostos", "aliviado"),
    icone("sleepy", "Sonolento", "1f62a", "rostos", "sono"),
    icone("sleeping", "Dormindo", "1f634", "rostos", "dormindo sono"),
    icone("mask", "Rosto com máscara", "1f637", "rostos", "máscara"),
    icone("thermometer", "Rosto com termômetro", "1f912", "rostos", "termômetro"),
    icone("cowboy", "Cowboy", "1f920", "rostos", "cowboy chapéu"),
    icone("party", "Rosto festejando", "1f973", "rostos", "festa party"),
    icone("sunglasses", "Óculos escuros", "1f60e", "rostos", "óculos cool"),
    icone("nerd", "Nerd", "1f913", "rostos", "nerd óculos"),
    icone("monocle", "Monóculo", "1f9d0", "rostos", "monóculo"),


    // GATOS
    icone("cat-grin", "Gato sorridente", "1f638", "animais", "gato cat gatinho sorriso sorridente"),
    icone("cat-smile", "Gato feliz", "1f63a", "animais", "gato feliz"),
    icone("cat-joy", "Gato rindo", "1f639", "animais", "gato rindo"),
    icone("cat-heart-eyes", "Gato apaixonado", "1f63b", "animais", "gato amor coração"),
    icone("cat-smirk", "Gato sorrindo de canto", "1f63c", "animais", "gato sorriso"),
    icone("cat-kiss", "Gato beijando", "1f63d", "animais", "gato beijo"),
    icone("cat-scream", "Gato assustado", "1f640", "animais", "gato assustado"),
    icone("cat-cry", "Gato chorando", "1f63f", "animais", "gato choro"),
    icone("cat-angry", "Gato bravo", "1f63e", "animais", "gato bravo"),


    // ANIMAIS
    icone("dog", "Cachorro", "1f436", "animais", "cachorro cao cão dog"),
    icone("cat", "Gato", "1f431", "animais", "gato cat"),
    icone("mouse", "Rato", "1f42d", "animais", "rato mouse"),
    icone("hamster", "Hamster", "1f439", "animais", "hamster"),
    icone("rabbit", "Coelho", "1f430", "animais", "coelho rabbit"),
    icone("fox", "Raposa", "1f98a", "animais", "raposa fox"),
    icone("bear", "Urso", "1f43b", "animais", "urso bear"),
    icone("panda", "Panda", "1f43c", "animais", "panda"),
    icone("koala", "Coala", "1f428", "animais", "coala koala"),
    icone("tiger", "Tigre", "1f42f", "animais", "tigre tiger"),
    icone("lion", "Leão", "1f981", "animais", "leão leao lion"),
    icone("cow", "Vaca", "1f42e", "animais", "vaca cow"),
    icone("pig", "Porco", "1f437", "animais", "porco pig"),
    icone("frog", "Sapo", "1f438", "animais", "sapo frog"),
    icone("monkey", "Macaco", "1f435", "animais", "macaco monkey"),
    icone("chicken", "Galinha", "1f414", "animais", "galinha chicken"),
    icone("penguin", "Pinguim", "1f427", "animais", "pinguim penguin"),
    icone("bird", "Pássaro", "1f426", "animais", "pássaro passaro bird"),
    icone("chick", "Pintinho", "1f424", "animais", "pintinho chick"),
    icone("duck", "Pato", "1f986", "animais", "pato duck"),
    icone("eagle", "Águia", "1f985", "animais", "águia aguia eagle"),
    icone("owl", "Coruja", "1f989", "animais", "coruja owl"),
    icone("bat", "Morcego", "1f987", "animais", "morcego bat"),
    icone("wolf", "Lobo", "1f43a", "animais", "lobo wolf"),
    icone("boar", "Javali", "1f417", "animais", "javali boar"),
    icone("horse", "Cavalo", "1f434", "animais", "cavalo horse"),
    icone("unicorn", "Unicórnio", "1f984", "animais", "unicórnio unicornio unicorn"),
    icone("bee", "Abelha", "1f41d", "animais", "abelha bee"),
    icone("bug", "Inseto", "1f41b", "animais", "inseto bug"),
    icone("butterfly", "Borboleta", "1f98b", "animais", "borboleta butterfly"),
    icone("snail", "Caracol", "1f40c", "animais", "caracol snail"),
    icone("ant", "Formiga", "1f41c", "animais", "formiga ant"),
    icone("spider", "Aranha", "1f577", "animais", "aranha spider"),
    icone("scorpion", "Escorpião", "1f982", "animais", "escorpião escorpiao scorpion"),
    icone("turtle", "Tartaruga", "1f422", "animais", "tartaruga turtle casco"),
    icone("snake", "Cobra", "1f40d", "animais", "cobra snake"),
    icone("lizard", "Lagarto", "1f98e", "animais", "lagarto lizard"),
    icone("octopus", "Polvo", "1f419", "animais", "polvo octopus"),
    icone("squid", "Lula", "1f991", "animais", "lula squid"),
    icone("crab", "Caranguejo", "1f980", "animais", "caranguejo crab"),
    icone("lobster", "Lagosta", "1f99e", "animais", "lagosta lobster"),
    icone("fish", "Peixe", "1f41f", "animais", "peixe fish"),
    icone("dolphin", "Golfinho", "1f42c", "animais", "golfinho dolphin"),
    icone("whale", "Baleia", "1f433", "animais", "baleia whale"),
    icone("shark", "Tubarão", "1f988", "animais", "tubarão tubarao shark"),
    icone("crocodile", "Crocodilo", "1f40a", "animais", "crocodilo"),


    // PESSOAS
    icone("baby", "Bebê", "1f476", "pessoas", "bebê bebe baby"),
    icone("boy", "Menino", "1f466", "pessoas", "menino boy"),
    icone("girl", "Menina", "1f467", "pessoas", "menina girl"),
    icone("man", "Homem", "1f468", "pessoas", "homem man"),
    icone("woman", "Mulher", "1f469", "pessoas", "mulher woman"),
    icone("older-man", "Homem idoso", "1f474", "pessoas", "idoso homem"),
    icone("older-woman", "Mulher idosa", "1f475", "pessoas", "idosa mulher"),
    icone("police", "Policial", "1f46e", "pessoas", "policial polícia policia"),
    icone("construction", "Trabalhador da construção", "1f477", "pessoas", "trabalhador construção capacete"),
    icone("guard", "Guarda", "1f482", "pessoas", "guarda"),
    icone("santa", "Papai Noel", "1f385", "pessoas", "papai noel santa natal"),
    icone("angel", "Anjinho", "1f47c", "pessoas", "anjo angel"),
    icone("princess", "Princesa", "1f478", "pessoas", "princesa princess"),


    // COMIDA
    icone("apple-red", "Maçã", "1f34e", "comida", "maçã maca apple"),
    icone("apple-green", "Maçã verde", "1f34f", "comida", "maçã verde apple"),
    icone("pear", "Pera", "1f350", "comida", "pera pear"),
    icone("orange", "Laranja", "1f34a", "comida", "laranja orange"),
    icone("lemon", "Limão", "1f34b", "comida", "limão limao lemon"),
    icone("banana", "Banana", "1f34c", "comida", "banana"),
    icone("watermelon", "Melancia", "1f349", "comida", "melancia watermelon"),
    icone("grapes", "Uvas", "1f347", "comida", "uva uvas grapes"),
    icone("strawberry", "Morango", "1f353", "comida", "morango strawberry"),
    icone("cherries", "Cerejas", "1f352", "comida", "cereja cherries"),
    icone("peach", "Pêssego", "1f351", "comida", "pêssego pessego peach"),
    icone("pineapple", "Abacaxi", "1f34d", "comida", "abacaxi pineapple"),
    icone("kiwi", "Kiwi", "1f95d", "comida", "kiwi"),
    icone("tomato", "Tomate", "1f345", "comida", "tomate tomato"),
    icone("avocado", "Abacate", "1f951", "comida", "abacate avocado"),
    icone("eggplant", "Berinjela", "1f346", "comida", "berinjela eggplant"),
    icone("potato", "Batata", "1f954", "comida", "batata potato"),
    icone("carrot", "Cenoura", "1f955", "comida", "cenoura carrot"),
    icone("corn", "Milho", "1f33d", "comida", "milho corn"),
    icone("bread", "Pão", "1f35e", "comida", "pão pao bread"),
    icone("cheese", "Queijo", "1f9c0", "comida", "queijo cheese"),
    icone("egg", "Ovo", "1f95a", "comida", "ovo egg"),
    icone("hamburger", "Hambúrguer", "1f354", "comida", "hambúrguer hamburguer burger"),
    icone("fries", "Batata frita", "1f35f", "comida", "batata frita fries"),
    icone("pizza", "Pizza", "1f355", "comida", "pizza"),
    icone("hotdog", "Cachorro-quente", "1f32d", "comida", "cachorro quente hotdog"),
    icone("taco", "Taco", "1f32e", "comida", "taco"),
    icone("burrito", "Burrito", "1f32f", "comida", "burrito"),
    icone("popcorn", "Pipoca", "1f37f", "comida", "pipoca popcorn"),
    icone("donut", "Rosquinha", "1f369", "comida", "donut rosquinha"),
    icone("cookie", "Biscoito", "1f36a", "comida", "biscoito cookie"),
    icone("cake", "Bolo de aniversário", "1f382", "comida", "bolo aniversário aniversario cake"),
    icone("coffee", "Café", "2615", "comida", "café cafe coffee"),


    // NATUREZA
    icone("sun", "Sol", "2600", "natureza", "sol sun"),
    icone("moon", "Lua", "1f319", "natureza", "lua moon"),
    icone("cloud", "Nuvem", "2601", "natureza", "nuvem cloud"),
    icone("rainbow", "Arco-íris", "1f308", "natureza", "arco iris rainbow"),
    icone("snowflake", "Floco de neve", "2744", "natureza", "neve snowflake"),
    icone("umbrella", "Guarda-chuva", "2614", "natureza", "chuva guarda chuva umbrella"),
    icone("flower", "Flor", "1f33c", "natureza", "flor flower"),
    icone("rose", "Rosa", "1f339", "natureza", "rosa rose flor"),
    icone("sunflower", "Girassol", "1f33b", "natureza", "girassol sunflower"),
    icone("tree", "Árvore", "1f333", "natureza", "árvore arvore tree"),
    icone("palm", "Palmeira", "1f334", "natureza", "palmeira palm"),
    icone("cactus", "Cacto", "1f335", "natureza", "cacto cactus"),
    icone("leaf", "Folha", "1f343", "natureza", "folha leaf"),


    // SÍMBOLOS
    icone("heart", "Coração", "2764", "simbolos", "coração coracao heart amor"),
    icone("star", "Estrela", "2b50", "simbolos", "estrela star"),
    icone("sparkles", "Brilhos", "2728", "simbolos", "brilho sparkles"),
    icone("lightning", "Raio", "26a1", "simbolos", "raio lightning energia"),
    icone("fire", "Fogo", "1f525", "simbolos", "fogo fire"),
    icone("check", "Marca de verificação", "2705", "simbolos", "check correto"),
    icone("cross", "X", "274c", "simbolos", "x erro"),
    icone("question", "Interrogação", "2753", "simbolos", "interrogação pergunta"),
    icone("exclamation", "Exclamação", "2757", "simbolos", "exclamação atenção"),
    icone("peace", "Paz", "262e", "simbolos", "paz peace"),
    icone("yin-yang", "Yin-yang", "262f", "simbolos", "yin yang"),
    icone("recycle", "Reciclagem", "267b", "simbolos", "reciclagem recycle"),
    icone("warning", "Atenção", "26a0", "simbolos", "atenção aviso warning"),
    icone("music-note", "Nota musical", "1f3b5", "simbolos", "música musica nota"),
    icone("music-notes", "Notas musicais", "1f3b6", "simbolos", "música musica notas"),
    icone("hundred", "Cem", "1f4af", "simbolos", "100 cem hundred"),


    // TECNOLOGIA / OBJETOS
    icone("robot", "Robô", "1f916", "tecnologia", "robô robo robot ia"),
    icone("bulb", "Lâmpada", "1f4a1", "tecnologia", "lâmpada lampada ideia luz"),
    icone("gear", "Engrenagem", "2699", "tecnologia", "engrenagem gear mecânica mecanica"),
    icone("wrench", "Chave inglesa", "1f527", "tecnologia", "chave ferramenta wrench"),
    icone("hammer", "Martelo", "1f528", "tecnologia", "martelo hammer ferramenta"),
    icone("tools", "Ferramentas", "1f6e0", "tecnologia", "ferramentas tools"),
    icone("battery", "Bateria", "1f50b", "tecnologia", "bateria battery energia"),
    icone("plug", "Plugue", "1f50c", "tecnologia", "plugue tomada plug elétrica eletrica"),
    icone("laptop", "Notebook", "1f4bb", "tecnologia", "notebook computador laptop"),
    icone("keyboard", "Teclado", "2328", "tecnologia", "teclado keyboard"),
    icone("printer", "Impressora", "1f5a8", "tecnologia", "impressora printer"),
    icone("phone", "Celular", "1f4f1", "tecnologia", "celular smartphone phone"),
    icone("camera", "Câmera", "1f4f7", "tecnologia", "câmera camera foto"),
    icone("satellite", "Satélite", "1f6f0", "tecnologia", "satélite satelite satellite"),
    icone("rocket", "Foguete", "1f680", "tecnologia", "foguete rocket espaço espaco"),
    icone("microscope", "Microscópio", "1f52c", "tecnologia", "microscópio microscopio ciência ciencia"),
    icone("telescope", "Telescópio", "1f52d", "tecnologia", "telescópio telescopio astronomia"),


    // TRANSPORTE
    icone("car", "Carro", "1f697", "transporte", "carro car"),
    icone("taxi", "Táxi", "1f695", "transporte", "táxi taxi carro"),
    icone("bus", "Ônibus", "1f68c", "transporte", "ônibus onibus bus"),
    icone("truck", "Caminhão", "1f69a", "transporte", "caminhão caminhao truck"),
    icone("bike", "Bicicleta", "1f6b2", "transporte", "bicicleta bike"),
    icone("motorcycle", "Motocicleta", "1f3cd", "transporte", "moto motocicleta motorcycle"),
    icone("airplane", "Avião", "2708", "transporte", "avião aviao airplane"),
    icone("helicopter", "Helicóptero", "1f681", "transporte", "helicóptero helicoptero"),
    icone("ship", "Navio", "1f6a2", "transporte", "navio ship"),
    icone("train", "Trem", "1f686", "transporte", "trem train"),


    // DIVERSÃO / ESPORTES
    icone("ghost", "Fantasma", "1f47b", "diversao", "fantasma ghost halloween"),
    icone("skull", "Caveira", "1f480", "diversao", "caveira skull"),
    icone("alien", "Alienígena", "1f47d", "diversao", "alien alienígena alienigena"),
    icone("poop", "Cocô", "1f4a9", "diversao", "cocô coco poop"),
    icone("soccer", "Bola de futebol", "26bd", "diversao", "futebol soccer bola"),
    icone("basketball", "Basquete", "1f3c0", "diversao", "basquete basketball bola"),
    icone("american-football", "Futebol americano", "1f3c8", "diversao", "futebol americano football"),
    icone("baseball", "Beisebol", "26be", "diversao", "beisebol baseball"),
    icone("tennis", "Tênis", "1f3be", "diversao", "tênis tenis tennis"),
    icone("volleyball", "Vôlei", "1f3d0", "diversao", "vôlei volei volleyball"),
    icone("bowling", "Boliche", "1f3b3", "diversao", "boliche bowling"),
    icone("trophy", "Troféu", "1f3c6", "diversao", "troféu trofeu trophy"),
    icone("medal", "Medalha", "1f3c5", "diversao", "medalha medal"),
    icone("guitar", "Guitarra", "1f3b8", "diversao", "guitarra guitar música musica"),
    icone("microphone", "Microfone", "1f3a4", "diversao", "microfone microphone música musica"),
    icone("gamepad", "Videogame", "1f3ae", "diversao", "videogame game controle"),
    icone("dice", "Dado", "1f3b2", "diversao", "dado dice jogo"),
    icone("puzzle", "Quebra-cabeça", "1f9e9", "diversao", "quebra cabeça puzzle")
];




// =====================================================
// ESTADO
// =====================================================


let PathKit = null;
let pathKitPromise = null;


let idIconeSelecionado = "cat-grin";


let svgGerado = "";
let svgGeradoCamada2 = "";
let frameAtualizacao = null;
let geracaoAtual = 0;


let ultimoAnguloChaveiro = -45;
let ultimoAnguloCard = -90;




// Cache somente de strings SVG/path.
// Não mantemos SkPath no cache para evitar vazamento
// de memória na heap WASM.


const cacheEmoji = new Map();




// =====================================================
// HELPERS
// =====================================================


function definirMensagem(
    texto,
    erro = false
) {
    mensagem.textContent = texto;


    mensagem.style.color =
        erro
            ? "#a22"
            : "#666";
}




function atualizarStatusMotor(
    texto,
    tipo = ""
) {
    statusPathKit.textContent = texto;


    statusPathKit.classList.remove(
        "ok",
        "erro"
    );


    if (tipo) {
        statusPathKit.classList.add(tipo);
    }
}




function formatoAtual() {
    return formatoCard.checked
        ? "card"
        : "chaveiro";
}




function cardTemArgola() {
    return (
        formatoAtual() === "card" &&
        inputCardArgola.checked
    );
}




function pecaTemArgola() {
    return (
        formatoAtual() === "chaveiro" ||
        cardTemArgola()
    );
}




// =====================================================
// NOME DO ARQUIVO
// =====================================================


function normalizarNomeArquivo(texto) {
    return String(texto || "")
        .trim()
        .replace(/\s+/g, "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Za-z0-9_-]+/g, "")
        .replace(/-{2,}/g, "-")
        .replace(/^[-_]+|[-_]+$/g, "");
}




function obterAutorArquivo() {
    if (!inputIdentificarAutor.checked) {
        return "aluno";
    }


    return (
        normalizarNomeArquivo(
            inputNomeAutor.value
        ) ||
        "aluno"
    );
}




function gerarNomeArquivoDownload() {
    const autor = obterAutorArquivo();
    return formatoAtual() === "card"
        ? `emoji-card-${autor}.svg`
        : `chaveiro-emoji-${autor}.svg`;
}

function gerarNomeArquivoDuplo1() {
    const autor = obterAutorArquivo();
    return formatoAtual() === "card"
        ? `emoji-card-${autor}-1.svg`
        : `chaveiro-emoji-${autor}-1.svg`;
}

function gerarNomeArquivoDuplo2() {
    const autor = obterAutorArquivo();
    return formatoAtual() === "card"
        ? `emoji-card-${autor}-2.svg`
        : `chaveiro-emoji-${autor}-2.svg`;
}




// =====================================================
// AUTOR
// =====================================================


function escaparXml(texto) {
    return String(texto || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}




function obterNomeAutor() {
    if (!inputIdentificarAutor.checked) {
        return "";
    }


    return inputNomeAutor.value
        .trim()
        .replace(/\s+/g, " ");
}




const canvasMedicaoTexto =
    document.createElement("canvas");


const contextoMedicaoTexto =
    canvasMedicaoTexto.getContext("2d");




function calcularFonteAutor(
    texto,
    larguraDisponivelMm
) {
    if (
        !texto ||
        larguraDisponivelMm <= 0
    ) {
        return TAMANHO_AUTOR_MM;
    }


    const fontePx =
        8 * 96 / 72;


    contextoMedicaoTexto.font =
        `${fontePx}px Arial, Helvetica, sans-serif`;


    const larguraPx =
        contextoMedicaoTexto
            .measureText(texto)
            .width;


    const larguraMm =
        larguraPx *
        25.4 /
        96;


    if (
        larguraMm <=
        larguraDisponivelMm
    ) {
        return TAMANHO_AUTOR_MM;
    }


    const escala =
        larguraDisponivelMm /
        larguraMm;


    return Math.max(
        TAMANHO_MIN_AUTOR_MM,
        TAMANHO_AUTOR_MM *
        escala
    );
}




function dadosAutor(
    bounds
) {
    const nome =
        obterNomeAutor();


    if (!nome) {
        return null;
    }


    const larguraDisponivel =
        Math.max(
            1,
            bounds.width -
            MARGEM_AUTOR_LATERAL_MM *
            2
        );


    const tamanhoFonte =
        calcularFonteAutor(
            nome,
            larguraDisponivel
        );


    return {
        nome,
        x:
            bounds.minX +
            bounds.width / 2,
        y:
            bounds.maxY +
            DISTANCIA_AUTOR_CORTE_MM,
        tamanhoFonte
    };
}




function markupAutor(
    bounds
) {
    const dados =
        dadosAutor(bounds);


    if (!dados) {
        return "";
    }


    return `
<text
    id="autor"
    x="${dados.x}"
    y="${dados.y}"
    fill="#0000FF"
    stroke="none"
    font-family="Arial, Helvetica, sans-serif"
    font-size="${dados.tamanhoFonte}"
    font-weight="normal"
    text-anchor="middle"
    dominant-baseline="hanging"
>${escaparXml(dados.nome)}</text>
    `.trim();
}




function boundsVisual(
    boundsCorte
) {
    const autor =
        dadosAutor(boundsCorte);


    if (!autor) {
        return {
            ...boundsCorte
        };
    }


    const maxY =
        autor.y +
        autor.tamanhoFonte +
        1;


    return {
        minX:
            boundsCorte.minX,
        minY:
            boundsCorte.minY,
        maxX:
            boundsCorte.maxX,
        maxY,
        width:
            boundsCorte.width,
        height:
            maxY -
            boundsCorte.minY
    };
}




// =====================================================
// URL / COLEÇÃO
// =====================================================


function obterColecaoSelecionada() {
    return (
        COLECOES[
            selectColecao.value
        ] ||
        COLECOES.noto
    );
}




function chaveCacheEmoji(
    item
) {
    const colecao =
        obterColecaoSelecionada();


    return (
        colecao.id +
        ":" +
        item.hex
    );
}




function urlIcone(
    item
) {
    const colecao =
        obterColecaoSelecionada();


    return (
        colecao.base +
        "/" +
        colecao.arquivo(
            item.hex
        )
    );
}




function atualizarInformacoesColecao() {
    const colecao =
        obterColecaoSelecionada();


    descricaoColecao.textContent =
        colecao.descricao;


    creditoColecao.textContent =
        colecao.credito;
}




// =====================================================
// CATÁLOGO / UI DE ÍCONES
// =====================================================


function obterIconeSelecionado() {
    return ICONES.find(
        item =>
            item.id ===
            idIconeSelecionado
    ) || ICONES[0];
}




function atualizarCabecalhoIcone() {
    const item =
        obterIconeSelecionado();


    nomeIconeSelecionado.textContent =
        item.nome;


    iconeSelecionado.innerHTML =
        `
            <img
                src="${urlIcone(item)}"
                alt="${escaparXml(item.nome)}"
            >
        `;


    const imagem =
        iconeSelecionado.querySelector(
            "img"
        );


    imagem.addEventListener(
        "error",
        () => {
            iconeSelecionado.innerHTML =
                `
                    <div class="icone-indisponivel">
                        Ícone indisponível nesta coleção
                    </div>
                `;
        },
        {
            once: true
        }
    );
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
                const okCategoria =
                    categoria === "todos" ||
                    item.categoria ===
                    categoria;


                const texto =
                    (
                        item.nome +
                        " " +
                        item.keywords
                    )
                        .toLowerCase();


                const okBusca =
                    !busca ||
                    texto.includes(
                        busca
                    );


                return (
                    okCategoria &&
                    okBusca
                );
            }
        );


    contadorIcones.textContent =
        `${filtrados.length} de ${ICONES.length} ícones`;


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


        botao.title =
            item.nome;


        botao.innerHTML =
            `
                <img
                    src="${urlIcone(item)}"
                    alt="${escaparXml(item.nome)}"
                    loading="lazy"
                >
            `;


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


        const miniatura =
            botao.querySelector(
                "img"
            );


        miniatura.addEventListener(
            "error",
            () => {
                botao.classList.add(
                    "indisponivel"
                );


                botao.title =
                    `${item.nome} — indisponível nesta coleção`;
            },
            {
                once: true
            }
        );


        gradeIcones.appendChild(
            botao
        );
    }
}




// =====================================================
// PATHKIT
// =====================================================


async function inicializarPathKit() {
    if (PathKit) {
        return PathKit;
    }


    if (pathKitPromise) {
        return pathKitPromise;
    }


    atualizarStatusMotor(
        "Carregando motor vetorial..."
    );


    if (
        typeof PathKitInit !==
        "function"
    ) {
        throw new Error(
            "PathKit não foi carregado pelo CDN."
        );
    }


    pathKitPromise =
        PathKitInit({
            locateFile:
                file =>
                    PATHKIT_CDN +
                    file
        });


    try {
        PathKit =
            await pathKitPromise;


        atualizarStatusMotor(
            "Motor vetorial pronto",
            "ok"
        );


        return PathKit;
    }


    catch (erro) {
        pathKitPromise = null;


        atualizarStatusMotor(
            "Falha no motor vetorial",
            "erro"
        );


        throw erro;
    }
}




// =====================================================
// CORES
// =====================================================


function corNormalizada(
    valor
) {
    return String(
        valor || ""
    )
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "");
}




function corNenhuma(
    valor
) {
    const v =
        corNormalizada(
            valor
        );


    return (
        !v ||
        v === "none" ||
        v === "transparent" ||
        v === "rgba(0,0,0,0)"
    );
}




function corBranca(
    valor
) {
    const v =
        corNormalizada(
            valor
        );


    return (
        v === "#fff" ||
        v === "#ffffff" ||
        v === "white" ||
        v === "rgb(255,255,255)" ||
        v === "rgba(255,255,255,1)"
    );
}




// =====================================================
// SVG PRIMITIVE -> PATHKIT
// =====================================================


function numeroAtributo(
    elemento,
    nome,
    padrao = 0
) {
    const valor =
        parseFloat(
            elemento.getAttribute(
                nome
            )
        );


    return Number.isFinite(
        valor
    )
        ? valor
        : padrao;
}




function pontosSvg(
    valor
) {
    if (!valor) {
        return [];
    }


    const numeros =
        valor
            .trim()
            .split(/[\s,]+/)
            .map(Number)
            .filter(Number.isFinite);


    const resultado =
        [];


    for (
        let i = 0;
        i + 1 < numeros.length;
        i += 2
    ) {
        resultado.push({
            x:
                numeros[i],
            y:
                numeros[i + 1]
        });
    }


    return resultado;
}




function criarPathElemento(
    elemento
) {
    const tag =
        elemento.tagName
            .toLowerCase();


    if (
        tag === "path"
    ) {
        const d =
            elemento.getAttribute(
                "d"
            );


        if (!d) {
            return null;
        }


        return PathKit.FromSVGString(
            d
        );
    }


    if (
        tag === "circle"
    ) {
        const cx =
            numeroAtributo(
                elemento,
                "cx"
            );


        const cy =
            numeroAtributo(
                elemento,
                "cy"
            );


        const r =
            numeroAtributo(
                elemento,
                "r"
            );


        return PathKit.FromSVGString(`
            M ${cx-r} ${cy}
            A ${r} ${r} 0 1 0 ${cx+r} ${cy}
            A ${r} ${r} 0 1 0 ${cx-r} ${cy}
            Z
        `);
    }


    if (
        tag === "ellipse"
    ) {
        const cx =
            numeroAtributo(
                elemento,
                "cx"
            );


        const cy =
            numeroAtributo(
                elemento,
                "cy"
            );


        const rx =
            numeroAtributo(
                elemento,
                "rx"
            );


        const ry =
            numeroAtributo(
                elemento,
                "ry"
            );


        return PathKit.FromSVGString(`
            M ${cx-rx} ${cy}
            A ${rx} ${ry} 0 1 0 ${cx+rx} ${cy}
            A ${rx} ${ry} 0 1 0 ${cx-rx} ${cy}
            Z
        `);
    }


    if (
        tag === "rect"
    ) {
        const x =
            numeroAtributo(
                elemento,
                "x"
            );


        const y =
            numeroAtributo(
                elemento,
                "y"
            );


        const w =
            numeroAtributo(
                elemento,
                "width"
            );


        const h =
            numeroAtributo(
                elemento,
                "height"
            );


        return PathKit.FromSVGString(`
            M ${x} ${y}
            L ${x+w} ${y}
            L ${x+w} ${y+h}
            L ${x} ${y+h}
            Z
        `);
    }


    if (
        tag === "line"
    ) {
        const x1 =
            numeroAtributo(
                elemento,
                "x1"
            );


        const y1 =
            numeroAtributo(
                elemento,
                "y1"
            );


        const x2 =
            numeroAtributo(
                elemento,
                "x2"
            );


        const y2 =
            numeroAtributo(
                elemento,
                "y2"
            );


        return PathKit.FromSVGString(`
            M ${x1} ${y1}
            L ${x2} ${y2}
        `);
    }


    if (
        tag === "polygon" ||
        tag === "polyline"
    ) {
        const pontos =
            pontosSvg(
                elemento.getAttribute(
                    "points"
                )
            );


        if (!pontos.length) {
            return null;
        }


        let d =
            `M ${pontos[0].x} ${pontos[0].y}`;


        for (
            let i = 1;
            i < pontos.length;
            i++
        ) {
            d +=
                ` L ${pontos[i].x} ${pontos[i].y}`;
        }


        if (
            tag === "polygon"
        ) {
            d += " Z";
        }


        return PathKit.FromSVGString(
            d
        );
    }


    return null;
}




// =====================================================
// MATRIZ RELATIVA
// =====================================================


function matrizRelativa(
    root,
    elemento
) {
    try {
        const rootCTM =
            root.getCTM();


        const elementCTM =
            elemento.getCTM();


        if (
            !rootCTM ||
            !elementCTM
        ) {
            throw new Error(
                "CTM indisponível"
            );
        }


        const relativa =
            rootCTM
                .inverse()
                .multiply(
                    elementCTM
                );


        return [
            relativa.a,
            relativa.c,
            relativa.e,


            relativa.b,
            relativa.d,
            relativa.f,


            0,
            0,
            1
        ];
    }


    catch {
        return [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];
    }
}




// =====================================================
// BOOLEANAS PATHKIT
// =====================================================


function opNovo(
    a,
    b,
    operacao
) {
    if (
        typeof PathKit.MakeFromOp ===
        "function"
    ) {
        const resultado =
            PathKit.MakeFromOp(
                a,
                b,
                operacao
            );


        if (resultado) {
            return resultado;
        }
    }


    const resultado =
        a.copy();


    const ok =
        resultado.op(
            b,
            operacao
        );


    if (ok === false) {
        resultado.delete();


        throw new Error(
            "Falha numa operação geométrica do PathKit."
        );
    }


    return resultado;
}




function unirNoAcumulador(
    acumulado,
    geometria
) {
    if (!acumulado) {
        return geometria.copy();
    }


    const novo =
        opNovo(
            acumulado,
            geometria,
            PathKit.PathOp.UNION
        );


    acumulado.delete();


    return novo;
}




function subtrairDoAcumulador(
    acumulado,
    geometria
) {
    if (!acumulado) {
        return null;
    }


    const novo =
        opNovo(
            acumulado,
            geometria,
            PathKit.PathOp.DIFFERENCE
        );


    acumulado.delete();


    return novo;
}




// =====================================================
// SVG -> GEOMETRIAS PATHKIT
// =====================================================


function svgParaGeometriasPathKit(
    svgText
) {
    if (!PathKit) {
        throw new Error(
            "O motor vetorial ainda não está pronto."
        );
    }


    const parser =
        new DOMParser();


    const doc =
        parser.parseFromString(
            svgText,
            "image/svg+xml"
        );


    if (
        doc.querySelector(
            "parsererror"
        )
    ) {
        throw new Error(
            "O emoji não pôde ser interpretado como SVG."
        );
    }


    const suporte =
        document.createElement(
            "div"
        );


    suporte.style.position =
        "fixed";


    suporte.style.left =
        "-100000px";


    suporte.style.top =
        "0";


    suporte.style.width =
        "1200px";


    suporte.style.height =
        "1200px";


    suporte.style.opacity =
        "0";


    suporte.style.pointerEvents =
        "none";


    suporte.style.overflow =
        "hidden";


    suporte.innerHTML =
        svgText;


    document.body.appendChild(
        suporte
    );


    const root =
        suporte.querySelector(
            "svg"
        );


    if (!root) {
        suporte.remove();


        throw new Error(
            "SVG sem elemento raiz."
        );
    }


    const viewBox =
        (
            root.getAttribute(
                "viewBox"
            ) ||
            "0 0 100 100"
        )
            .trim()
            .split(/[\s,]+/)
            .map(Number);


    const vbW =
        Number.isFinite(
            viewBox[2]
        )
            ? viewBox[2]
            : 100;


    const vbH =
        Number.isFinite(
            viewBox[3]
        )
            ? viewBox[3]
            : 100;


    root.setAttribute(
        "width",
        String(vbW)
    );


    root.setAttribute(
        "height",
        String(vbH)
    );


    root.getBoundingClientRect();


    const elementos =
        Array.from(
            root.querySelectorAll(
                "path,circle,ellipse,rect,line,polygon,polyline"
            )
        );


    let completo =
        null;


    let preenchimentos =
        null;


    let tracos =
        null;




    function aplicarMascaraBranca(
        geometria
    ) {
        completo =
            subtrairDoAcumulador(
                completo,
                geometria
            );


        preenchimentos =
            subtrairDoAcumulador(
                preenchimentos,
                geometria
            );


        tracos =
            subtrairDoAcumulador(
                tracos,
                geometria
            );
    }




    try {
        for (
            const elemento
            of elementos
        ) {
            if (
                elemento.closest(
                    "defs,clipPath,mask,symbol,marker,pattern"
                )
            ) {
                continue;
            }


            const estilo =
                getComputedStyle(
                    elemento
                );


            if (
                estilo.display === "none" ||
                estilo.visibility === "hidden"
            ) {
                continue;
            }


            const opacity =
                parseFloat(
                    estilo.opacity
                );


            if (
                Number.isFinite(opacity) &&
                opacity <= 0
            ) {
                continue;
            }


            const fill =
                estilo.fill;


            const stroke =
                estilo.stroke;


            const fillOpacity =
                parseFloat(
                    estilo.fillOpacity
                );


            const strokeOpacity =
                parseFloat(
                    estilo.strokeOpacity
                );


            const temFill =
                !corNenhuma(fill) &&
                (
                    !Number.isFinite(
                        fillOpacity
                    ) ||
                    fillOpacity > 0
                );


            const larguraStroke =
                parseFloat(
                    estilo.strokeWidth
                );


            const temStroke =
                !corNenhuma(stroke) &&
                (
                    !Number.isFinite(
                        strokeOpacity
                    ) ||
                    strokeOpacity > 0
                ) &&
                Number.isFinite(
                    larguraStroke
                ) &&
                larguraStroke > 0;


            if (
                !temFill &&
                !temStroke
            ) {
                continue;
            }


            const base =
                criarPathElemento(
                    elemento
                );


            if (!base) {
                continue;
            }


            const matriz =
                matrizRelativa(
                    root,
                    elemento
                );


            try {
                if (temFill) {
                    const preenchido =
                        base.copy();


                    preenchido.transform(
                        matriz
                    );


                    if (
                        corBranca(fill)
                    ) {
                        aplicarMascaraBranca(
                            preenchido
                        );
                    }


                    else {
                        preenchimentos =
                            unirNoAcumulador(
                                preenchimentos,
                                preenchido
                            );


                        completo =
                            unirNoAcumulador(
                                completo,
                                preenchido
                            );
                    }


                    preenchido.delete();
                }


                if (temStroke) {
                    const contorno =
                        base.copy();


                    contorno.stroke({
                        width:
                            larguraStroke,


                        join:
                            PathKit
                                .StrokeJoin
                                .ROUND,


                        cap:
                            PathKit
                                .StrokeCap
                                .ROUND,


                        res_scale:
                            2
                    });


                    contorno.transform(
                        matriz
                    );


                    if (
                        corBranca(stroke)
                    ) {
                        aplicarMascaraBranca(
                            contorno
                        );
                    }


                    else {
                        tracos =
                            unirNoAcumulador(
                                tracos,
                                contorno
                            );


                        completo =
                            unirNoAcumulador(
                                completo,
                                contorno
                            );
                    }


                    contorno.delete();
                }
            }


            finally {
                base.delete();
            }
        }


        if (!completo) {
            throw new Error(
                "Nenhuma geometria vetorial utilizável foi encontrada no emoji."
            );
        }


        completo.simplify();


        if (preenchimentos) {
            preenchimentos.simplify();
        }


        if (tracos) {
            tracos.simplify();
        }


        return {
            completo,
            preenchimentos,
            tracos
        };
    }


    finally {
        suporte.remove();
    }
}




// =====================================================
// CACHE DO EMOJI
// =====================================================


async function carregarEmoji(
    item
) {
    const chaveCache =
        chaveCacheEmoji(
            item
        );


    if (
        cacheEmoji.has(
            chaveCache
        )
    ) {
        return cacheEmoji.get(
            chaveCache
        );
    }


    const colecao =
        obterColecaoSelecionada();


    definirMensagem(
        `Carregando ${item.nome} — ${colecao.nome}...`
    );


    const resposta =
        await fetch(
            urlIcone(
                item
            )
        );


    if (!resposta.ok) {
        throw new Error(
            `O ícone ${item.nome} não está disponível em ${colecao.nome} (HTTP ${resposta.status}).`
        );
    }


    const svgText =
        await resposta.text();


    const geometrias =
        svgParaGeometriasPathKit(
            svgText
        );


    try {
        const dCompleto =
            geometrias.completo
                .toSVGString();


        const dPreenchimentos =
            geometrias.preenchimentos
                ? geometrias.preenchimentos
                    .toSVGString()
                : "";


        const dTracos =
            geometrias.tracos
                ? geometrias.tracos
                    .toSVGString()
                : "";


        const bounds =
            geometrias.completo
                .computeTightBounds();


        const resultado = {
            svgText,
            dCompleto,
            dPreenchimentos,
            dTracos,
            bounds
        };


        cacheEmoji.set(
            chaveCache,
            resultado
        );


        return resultado;
    }


    finally {
        geometrias.completo.delete();


        if (
            geometrias.preenchimentos
        ) {
            geometrias.preenchimentos
                .delete();
        }


        if (
            geometrias.tracos
        ) {
            geometrias.tracos
                .delete();
        }
    }
}




// =====================================================
// CONJUNTO DE PATHS
// =====================================================


function reconstruirEmoji(
    dados
) {
    const completo =
        PathKit.FromSVGString(
            dados.dCompleto
        );


    if (!completo) {
        throw new Error(
            "Não foi possível reconstruir o path do emoji."
        );
    }


    const preenchimentos =
        dados.dPreenchimentos
            ? PathKit.FromSVGString(
                dados.dPreenchimentos
            )
            : null;


    const tracos =
        dados.dTracos
            ? PathKit.FromSVGString(
                dados.dTracos
            )
            : null;


    return {
        completo,
        preenchimentos,
        tracos
    };
}




function transformarConjunto(
    conjunto,
    matriz
) {
    conjunto.completo.transform(
        matriz
    );


    if (
        conjunto.preenchimentos
    ) {
        conjunto.preenchimentos
            .transform(
                matriz
            );
    }


    if (
        conjunto.tracos
    ) {
        conjunto.tracos
            .transform(
                matriz
            );
    }


    return conjunto;
}




// =====================================================
// ESCALA DO EMOJI - CHAVEIRO
//
// O maior lado passa a medir "tamanhoMm".
// =====================================================


function criarEmojiEscalado(
    dados,
    tamanhoMm
) {
    const conjunto =
        reconstruirEmoji(
            dados
        );


    const b =
        conjunto.completo
            .computeTightBounds();


    const largura =
        b.fRight -
        b.fLeft;


    const altura =
        b.fBottom -
        b.fTop;


    const maiorLado =
        Math.max(
            largura,
            altura
        );


    if (
        maiorLado <= 0
    ) {
        destruirConjunto(
            conjunto
        );


        throw new Error(
            "Emoji com dimensões inválidas."
        );
    }


    const escala =
        tamanhoMm /
        maiorLado;


    const cx =
        (
            b.fLeft +
            b.fRight
        ) / 2;


    const cy =
        (
            b.fTop +
            b.fBottom
        ) / 2;


    return transformarConjunto(
        conjunto,
        [
            escala,
            0,
            -cx * escala,


            0,
            escala,
            -cy * escala,


            0,
            0,
            1
        ]
    );
}




// =====================================================
// ESCALA DO EMOJI - CARD
// =====================================================


function criarEmojiCard(
    dados,
    larguraCard,
    alturaCard,
    margem
) {
    const conjunto =
        reconstruirEmoji(
            dados
        );


    const b =
        conjunto.completo
            .computeTightBounds();


    const largura =
        b.fRight -
        b.fLeft;


    const altura =
        b.fBottom -
        b.fTop;


    if (
        largura <= 0 ||
        altura <= 0
    ) {
        destruirConjunto(
            conjunto
        );


        throw new Error(
            "Emoji com dimensões inválidas."
        );
    }


    const larguraDisponivel =
        larguraCard -
        margem * 2;


    const alturaDisponivel =
        alturaCard -
        margem * 2;


    if (
        larguraDisponivel <= 0 ||
        alturaDisponivel <= 0
    ) {
        destruirConjunto(
            conjunto
        );


        throw new Error(
            "A margem interna do card é maior que a área disponível."
        );
    }


    const escala =
        Math.min(
            larguraDisponivel /
            largura,
            alturaDisponivel /
            altura
        );


    const cx =
        (
            b.fLeft +
            b.fRight
        ) / 2;


    const cy =
        (
            b.fTop +
            b.fBottom
        ) / 2;


    return transformarConjunto(
        conjunto,
        [
            escala,
            0,
            -cx * escala,


            0,
            escala,
            -cy * escala,


            0,
            0,
            1
        ]
    );
}




function destruirConjunto(
    conjunto
) {
    if (!conjunto) {
        return;
    }


    if (
        conjunto.completo
    ) {
        conjunto.completo.delete();
    }


    if (
        conjunto.preenchimentos
    ) {
        conjunto.preenchimentos.delete();
    }


    if (
        conjunto.tracos
    ) {
        conjunto.tracos.delete();
    }
}




// =====================================================
// EXPAND / OUTLINE
// =====================================================


function expandirPath(
    original,
    distancia
) {
    const expandido =
        original.copy();


    expandido.stroke({
        width:
            distancia * 2,


        join:
            PathKit
                .StrokeJoin
                .ROUND,


        cap:
            PathKit
                .StrokeCap
                .ROUND,


        res_scale:
            2
    });


    const unido =
        opNovo(
            expandido,
            original,
            PathKit.PathOp.UNION
        );


    expandido.delete();


    unido.simplify();


    return unido;
}




// =====================================================
// REMOVE HOLES
// =====================================================


function separarContornos(
    cmds
) {
    const contornos =
        [];


    let atual =
        [];


    for (
        const cmd
        of cmds
    ) {
        if (
            cmd[0] ===
            PathKit.MOVE_VERB &&
            atual.length
        ) {
            contornos.push(
                atual
            );


            atual =
                [];
        }


        atual.push(
            cmd
        );


        if (
            cmd[0] ===
            PathKit.CLOSE_VERB
        ) {
            contornos.push(
                atual
            );


            atual =
                [];
        }
    }


    if (
        atual.length
    ) {
        contornos.push(
            atual
        );
    }


    return contornos;
}




function removerHoles(
    path
) {
    const contornos =
        separarContornos(
            path.toCmds()
        );


    let acumulado =
        null;


    for (
        const cmdsContorno
        of contornos
    ) {
        if (
            cmdsContorno.length < 2
        ) {
            continue;
        }


        const contorno =
            PathKit.FromCmds(
                cmdsContorno
            );


        if (!contorno) {
            continue;
        }


        if (
            PathKit.FillType &&
            PathKit.FillType.WINDING !==
                undefined
        ) {
            contorno.setFillType(
                PathKit.FillType.WINDING
            );
        }


        acumulado =
            unirNoAcumulador(
                acumulado,
                contorno
            );


        contorno.delete();
    }


    if (!acumulado) {
        return path.copy();
    }


    acumulado.simplify();


    return acumulado;
}




// =====================================================
// FORMAS
// =====================================================


function criarCirculo(
    cx,
    cy,
    raio
) {
    return PathKit.FromSVGString(`
        M ${cx-raio} ${cy}
        A ${raio} ${raio} 0 1 0 ${cx+raio} ${cy}
        A ${raio} ${raio} 0 1 0 ${cx-raio} ${cy}
        Z
    `);
}




function criarRetanguloArredondado(
    x,
    y,
    largura,
    altura,
    raio
) {
    const r =
        Math.max(
            0,
            Math.min(
                raio,
                largura / 2,
                altura / 2
            )
        );


    if (
        r <= 0
    ) {
        return PathKit.FromSVGString(`
            M ${x} ${y}
            L ${x+largura} ${y}
            L ${x+largura} ${y+altura}
            L ${x} ${y+altura}
            Z
        `);
    }


    return PathKit.FromSVGString(`
        M ${x+r} ${y}
        L ${x+largura-r} ${y}
        A ${r} ${r} 0 0 1 ${x+largura} ${y+r}
        L ${x+largura} ${y+altura-r}
        A ${r} ${r} 0 0 1 ${x+largura-r} ${y+altura}
        L ${x+r} ${y+altura}
        A ${r} ${r} 0 0 1 ${x} ${y+altura-r}
        L ${x} ${y+r}
        A ${r} ${r} 0 0 1 ${x+r} ${y}
        Z
    `);
}




function criarCard(
    largura,
    altura,
    raio
) {
    return criarRetanguloArredondado(
        -largura / 2,
        -altura / 2,
        largura,
        altura,
        raio
    );
}




// =====================================================
// POSIÇÃO ANGULAR DA ARGOLA
// =====================================================


const contextoHitTest =
    document
        .createElement("canvas")
        .getContext("2d");




function encontrarBordaNoAngulo(
    path,
    anguloGraus
) {
    const bounds =
        path.computeTightBounds();


    const cx =
        (
            bounds.fLeft +
            bounds.fRight
        ) / 2;


    const cy =
        (
            bounds.fTop +
            bounds.fBottom
        ) / 2;


    const rad =
        anguloGraus *
        Math.PI /
        180;


    const dx =
        Math.cos(rad);


    const dy =
        Math.sin(rad);


    const largura =
        bounds.fRight -
        bounds.fLeft;


    const altura =
        bounds.fBottom -
        bounds.fTop;


    const maxDist =
        Math.hypot(
            largura,
            altura
        ) * 1.5 +
        10;


    const path2D =
        path.toPath2D();


    const passos =
        900;


    let ultimoDentro =
        null;


    let primeiroForaDepois =
        null;


    for (
        let i = 0;
        i <= passos;
        i++
    ) {
        const dist =
            maxDist *
            i /
            passos;


        const x =
            cx +
            dx *
            dist;


        const y =
            cy +
            dy *
            dist;


        const dentro =
            contextoHitTest
                .isPointInPath(
                    path2D,
                    x,
                    y,
                    "nonzero"
                );


        if (dentro) {
            ultimoDentro =
                dist;


            primeiroForaDepois =
                null;
        }


        else if (
            ultimoDentro !== null
        ) {
            primeiroForaDepois =
                dist;


            break;
        }
    }


    if (
        ultimoDentro === null
    ) {
        const escala =
            Math.max(
                largura,
                altura
            ) / 2;


        return {
            x:
                cx +
                dx *
                escala,
            y:
                cy +
                dy *
                escala,
            dx,
            dy
        };
    }


    let baixo =
        ultimoDentro;


    let alto =
        primeiroForaDepois ??
        Math.min(
            maxDist,
            ultimoDentro +
            maxDist /
            passos
        );


    for (
        let i = 0;
        i < 24;
        i++
    ) {
        const meio =
            (
                baixo +
                alto
            ) / 2;


        const x =
            cx +
            dx *
            meio;


        const y =
            cy +
            dy *
            meio;


        if (
            contextoHitTest
                .isPointInPath(
                    path2D,
                    x,
                    y,
                    "nonzero"
                )
        ) {
            baixo =
                meio;
        }


        else {
            alto =
                meio;
        }
    }


    return {
        x:
            cx +
            dx *
            baixo,


        y:
            cy +
            dy *
            baixo,


        dx,
        dy
    };
}




// =====================================================
// ARGOLA + FURO
// =====================================================


function adicionarFuro(
    base,
    holeDiameter,
    holeThickness,
    holePosition
) {
    const borda =
        encontrarBordaNoAngulo(
            base,
            holePosition
        );


    const raioInterno =
        holeDiameter / 2;


    const raioExterno =
        raioInterno +
        holeThickness;


    const sobreposicao =
        Math.max(
            0.6,
            holeThickness
        );


    const distanciaCentro =
        Math.max(
            0,
            raioExterno -
            sobreposicao
        );


    const cx =
        borda.x +
        borda.dx *
        distanciaCentro;


    const cy =
        borda.y +
        borda.dy *
        distanciaCentro;


    const externo =
        criarCirculo(
            cx,
            cy,
            raioExterno
        );


    const unido =
        opNovo(
            base,
            externo,
            PathKit.PathOp.UNION
        );


    externo.delete();


    const interno =
        criarCirculo(
            cx,
            cy,
            raioInterno
        );


    const final =
        opNovo(
            unido,
            interno,
            PathKit.PathOp.DIFFERENCE
        );


    unido.delete();


    interno.delete();


    final.simplify();


    return final;
}




// =====================================================
// BOUNDS
// =====================================================


function boundsPath(
    path
) {
    const b =
        path.computeTightBounds();


    return {
        minX:
            b.fLeft,


        minY:
            b.fTop,


        maxX:
            b.fRight,


        maxY:
            b.fBottom,


        width:
            b.fRight -
            b.fLeft,


        height:
            b.fBottom -
            b.fTop
    };
}




// =====================================================
// GRAVAÇÃO DO EMOJI
// =====================================================


function markupEmoji(
    dPreenchimentos,
    dTracos,
    estilo,
    tracoEmoji
) {
    const partes =
        [];


    const paths =
        [];


    if (dPreenchimentos) {
        paths.push(
            dPreenchimentos
        );
    }


    if (dTracos) {
        paths.push(
            dTracos
        );
    }


    if (!paths.length) {
        return "";
    }


    if (
        estilo ===
        "outline-black"
    ) {
        for (
            const d
            of paths
        ) {
            partes.push(`
<path
    class="emoji-gravacao"
    d="${d}"
    fill="#000000"
    stroke="#0000FF"
    stroke-width="${tracoEmoji}"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill-rule="evenodd"
/>
            `);
        }
    }


    else {
        for (
            const d
            of paths
        ) {
            partes.push(`
<path
    class="emoji-gravacao"
    d="${d}"
    fill="none"
    stroke="#0000FF"
    stroke-width="${tracoEmoji}"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill-rule="evenodd"
/>
            `);
        }
    }


    return partes.join(
        "\n"
    );
}




function markupEmojiDuplaCamada(
    dPreenchimentos,
    dTracos,
    tracoEmoji
) {
    const paths = [];
    if (dPreenchimentos) paths.push(dPreenchimentos);
    if (dTracos) paths.push(dTracos);

    return paths.map(
        d => `
<path
    class="emoji-corte-camada-2"
    d="${d}"
    fill="none"
    stroke="#FF0000"
    stroke-width="${tracoEmoji}"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill-rule="evenodd"
/>`.trim()
    ).join("\n");
}

// =====================================================
// RÉGUAS
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
    visualBounds,
    boundsPeca
) {
    const larguraPranchetaMm =
        Math.max(
            60,
            Math.ceil(
                (
                    visualBounds.width +
                    MARGEM_PRANCHETA_MM *
                    2
                ) /
                10
            ) *
            10
        );


    const alturaPranchetaMm =
        Math.max(
            60,
            Math.ceil(
                (
                    visualBounds.height +
                    MARGEM_PRANCHETA_MM *
                    2
                ) /
                10
            ) *
            10
        );


    const larguraPx =
        larguraPranchetaMm *
        PX_POR_MM;


    const alturaPx =
        alturaPranchetaMm *
        PX_POR_MM;


    mesaMedicao.style.width =
        `${
            larguraPx +
            LARGURA_REGUA_VERTICAL
        }px`;


    mesaMedicao.style.height =
        `${
            alturaPx +
            ALTURA_REGUA_HORIZONTAL
        }px`;


    areaMedicao.style.width =
        `${larguraPx}px`;


    areaMedicao.style.height =
        `${alturaPx}px`;


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


    const pecaWidth =
        visualBounds.width *
        PX_POR_MM;


    const pecaHeight =
        visualBounds.height *
        PX_POR_MM;


    pecaPreview.style.width =
        `${pecaWidth}px`;


    pecaPreview.style.height =
        `${pecaHeight}px`;


    pecaPreview.style.left =
        `${
            (
                larguraPx -
                pecaWidth
            ) /
            2
        }px`;


    pecaPreview.style.top =
        `${
            (
                alturaPx -
                pecaHeight
            ) /
            2
        }px`;


    pecaPreview.innerHTML =
        svgPreview;


    medidasPreview.textContent =
        `↔ ${
            boundsPeca.width.toFixed(1)
        } mm   ↕ ${
            boundsPeca.height.toFixed(1)
        } mm`;


    gerarReguaHorizontal(
        larguraPranchetaMm
    );


    gerarReguaVertical(
        alturaPranchetaMm
    );
}




// =====================================================
// VALIDAÇÕES
// =====================================================


function validarNumero(
    valor,
    mensagemErro,
    aceitarZero = false
) {
    if (
        !Number.isFinite(valor) ||
        (
            aceitarZero
                ? valor < 0
                : valor <= 0
        )
    ) {
        throw new Error(
            mensagemErro
        );
    }
}




function validarAutor() {
    if (
        !inputIdentificarAutor.checked ||
        !inputNomeAutor.value.trim()
    ) {
        throw new Error(
            "Informe o nome do autor para gerar os arquivos."
        );
    }
}




// =====================================================
// GERAÇÃO
// =====================================================


async function gerarSvg() {
    await inicializarPathKit();


    const minhaGeracao =
        ++geracaoAtual;


    const inicio =
        performance.now();


    botaoBaixar.disabled =
        true;

    botaoBaixarDuplaCamada.disabled =
        true;

    svgGeradoCamada2 =
        "";


    let emoji =
        null;


    let expandido =
        null;


    let semHoles =
        null;


    let base =
        null;


    let corte =
        null;


    try {
        const item =
            obterIconeSelecionado();


        const formato =
            formatoAtual();


        const tamanho =
            Number(
                inputTamanho.value
            );


        const outline =
            Number(
                inputBorda.value
            );


        const cardLargura =
            Number(
                inputCardLargura.value
            );


        const cardAltura =
            Number(
                inputCardAltura.value
            );


        const cardRaio =
            Number(
                inputCardRaio.value
            );


        const cardMargem =
            Number(
                inputCardMargem.value
            );


        const holeDiameter =
            Number(
                inputFuro.value
            );


        const holeOutline =
            Number(
                inputEspessuraArgola.value
            );


        const holePosition =
            Number(
                inputPosicaoArgola.value
            );


        const estilo =
            selectEstiloEmoji.value;


        const tracoEmoji =
            Number(
                inputTracoEmoji.value
            );


        valorPosicaoArgola.textContent =
            `${holePosition.toFixed(0)}°`;


        if (
            formato === "chaveiro"
        ) {
            validarNumero(
                tamanho,
                "Tamanho inválido."
            );


            validarNumero(
                outline,
                "Outline inválido.",
                true
            );
        }


        else {
            validarNumero(
                cardLargura,
                "Largura do card inválida."
            );


            validarNumero(
                cardAltura,
                "Altura do card inválida."
            );


            validarNumero(
                cardRaio,
                "Raio do card inválido.",
                true
            );


            validarNumero(
                cardMargem,
                "Margem interna inválida."
            );
        }


        if (
            pecaTemArgola()
        ) {
            validarNumero(
                holeDiameter,
                "Diâmetro do furo inválido."
            );


            validarNumero(
                holeOutline,
                "Borda do furo inválida."
            );
        }


        validarNumero(
            tracoEmoji,
            "Espessura do contorno azul inválida."
        );


        const dados =
            await carregarEmoji(
                item
            );


        if (
            minhaGeracao !==
            geracaoAtual
        ) {
            return;
        }


        // =========================================
        // EMOJI / BASE
        // =========================================


        if (
            formato === "chaveiro"
        ) {
            emoji =
                criarEmojiEscalado(
                    dados,
                    tamanho
                );


            expandido =
                expandirPath(
                    emoji.completo,
                    outline
                );


            semHoles =
                removerHoles(
                    expandido
                );


            base =
                semHoles.copy();
        }


        else {
            emoji =
                criarEmojiCard(
                    dados,
                    cardLargura,
                    cardAltura,
                    cardMargem
                );


            base =
                criarCard(
                    cardLargura,
                    cardAltura,
                    cardRaio
                );
        }


        // =========================================
        // CORTE / ARGOLA
        // =========================================


        if (
            pecaTemArgola()
        ) {
            corte =
                adicionarFuro(
                    base,
                    holeDiameter,
                    holeOutline,
                    holePosition
                );
        }


        else {
            corte =
                base.copy();
        }


        const dCorte =
            corte.toSVGString();


        const bounds =
            boundsPath(
                corte
            );


        const dPreenchimentos =
            emoji.preenchimentos
                ? emoji.preenchimentos
                    .toSVGString()
                : "";


        const dTracos =
            emoji.tracos
                ? emoji.tracos
                    .toSVGString()
                : "";


        const emojiMarkup =
            markupEmoji(
                dPreenchimentos,
                dTracos,
                estilo,
                tracoEmoji
            );

        const emojiCamada2Markup =
            markupEmojiDuplaCamada(
                dPreenchimentos,
                dTracos,
                tracoEmoji
            );

        const boundsEmoji =
            boundsPath(
                emoji.completo
            );


        const autorMarkup =
            markupAutor(
                bounds
            );


        const visual =
            boundsVisual(
                bounds
            );


        dimensoesFinais.textContent =
            `Dimensões finais: ${
                bounds.width.toFixed(1)
            } × ${
                bounds.height.toFixed(1)
            } mm`;


        // =========================================
        // PREVIEW
        // =========================================


        const svgPreview =
            `
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="${visual.minX} ${visual.minY} ${visual.width} ${visual.height}"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid meet"
    shape-rendering="geometricPrecision"
>
    <path
        id="corte"
        d="${dCorte}"
        fill="none"
        stroke="#FF0000"
        stroke-width="${ESPESSURA_CORTE_MM}"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill-rule="evenodd"
    />


    ${emojiMarkup}


    ${autorMarkup}
</svg>
            `.trim();


        // =========================================
        // SVG PARA DOWNLOAD
        // =========================================


        const m =
            MARGEM_SVG_DOWNLOAD_MM;


        const viewX =
            visual.minX -
            m;


        const viewY =
            visual.minY -
            m;


        const viewW =
            visual.width +
            m * 2;


        const viewH =
            visual.height +
            m * 2;


        svgGerado =
            `
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="${viewX} ${viewY} ${viewW} ${viewH}"
    width="${viewW.toFixed(3)}mm"
    height="${viewH.toFixed(3)}mm"
    preserveAspectRatio="xMinYMin meet"
    shape-rendering="geometricPrecision"
>
    <!-- VERMELHO = CORTE -->
    <path
        id="corte"
        d="${dCorte}"
        fill="none"
        stroke="#FF0000"
        stroke-width="${ESPESSURA_CORTE_MM}"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill-rule="evenodd"
    />


    <!-- EMOJI = GRAVAÇÃO -->
    ${emojiMarkup}


    <!-- AUTOR = GRAVAÇÃO AZUL -->
    ${autorMarkup}
</svg>
            `.trim();

        const viewEmojiX = boundsEmoji.minX - m;
        const viewEmojiY = boundsEmoji.minY - m;
        const viewEmojiW = boundsEmoji.width + m * 2;
        const viewEmojiH = boundsEmoji.height + m * 2;

        svgGeradoCamada2 =
            `
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="${viewEmojiX} ${viewEmojiY} ${viewEmojiW} ${viewEmojiH}"
    width="${viewEmojiW.toFixed(3)}mm"
    height="${viewEmojiH.toFixed(3)}mm"
    preserveAspectRatio="xMinYMin meet"
    shape-rendering="geometricPrecision"
>
    <!-- CAMADA 2: DESENHO AZUL CONVERTIDO PARA CORTE VERMELHO -->
    ${emojiCamada2Markup}
</svg>
            `.trim();


        if (
            minhaGeracao !==
            geracaoAtual
        ) {
            return;
        }


        atualizarPrancheta(
            svgPreview,
            visual,
            bounds
        );


        // A prévia continua disponível, mas os arquivos de fabricação
        // exigem identificação do autor.
        if (
            !inputIdentificarAutor.checked ||
            !inputNomeAutor.value.trim()
        ) {
            botaoBaixar.disabled = true;
            botaoBaixarDuplaCamada.disabled = true;

            definirMensagem(
                "Informe o nome do autor para liberar os downloads.",
                true
            );
        }
        else {
            botaoBaixar.disabled = false;
            botaoBaixarDuplaCamada.disabled = false;

            definirMensagem(
                `${formato === "card" ? "Card" : "Chaveiro"} atualizado em ${
                    (performance.now() - inicio).toFixed(0)
                } ms. Arquivo: ${gerarNomeArquivoDownload()}`
            );
        }
    }


    catch (erro) {
        console.error(
            erro
        );


        if (
            minhaGeracao ===
            geracaoAtual
        ) {
            botaoBaixar.disabled =
                true;


            svgGerado =
                "";


            definirMensagem(
                "Erro: " +
                erro.message,
                true
            );
        }
    }


    finally {
        if (corte) {
            corte.delete();
        }


        if (base) {
            base.delete();
        }


        if (semHoles) {
            semHoles.delete();
        }


        if (expandido) {
            expandido.delete();
        }


        destruirConjunto(
            emoji
        );
    }
}




// =====================================================
// DOWNLOAD
// =====================================================


function baixarConteudoSvg(svg, nomeArquivo) {
    if (!svg) return;

    const conteudo =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        svg;

    const blob =
        new Blob(
            [conteudo],
            { type: "image/svg+xml;charset=utf-8" }
        );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = nomeArquivo;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}


function baixarSvg() {
    if (!svgGerado) return;

    try {
        validarAutor();
    }
    catch (erro) {
        definirMensagem(erro.message, true);
        inputNomeAutor.focus();
        return;
    }

    baixarConteudoSvg(
        svgGerado,
        gerarNomeArquivoDownload()
    );
}


function baixarDuplaCamada() {
    if (!svgGerado || !svgGeradoCamada2) return;

    try {
        validarAutor();
    }
    catch (erro) {
        definirMensagem(erro.message, true);
        inputNomeAutor.focus();
        return;
    }

    baixarConteudoSvg(
        svgGerado,
        gerarNomeArquivoDuplo1()
    );

    baixarConteudoSvg(
        svgGeradoCamada2,
        gerarNomeArquivoDuplo2()
    );

    definirMensagem(
        `Gerados: ${gerarNomeArquivoDuplo1()} e ${gerarNomeArquivoDuplo2()}`
    );
}


// =====================================================
// UI
// =====================================================


function atualizarVisibilidadeTraco() {
    controleTraco.classList.remove("escondido");
}




function atualizarInterfaceFormato() {
    const card =
        formatoAtual() === "card";


    controlesCard.classList.toggle(
        "hidden",
        !card
    );


    controlesChaveiro.classList.toggle(
        "hidden",
        card
    );


    if (card) {
        ultimoAnguloChaveiro =
            Number(
                inputPosicaoArgola.value
            );


        inputPosicaoArgola.value =
            String(
                ultimoAnguloCard
            );
    }


    else {
        ultimoAnguloCard =
            Number(
                inputPosicaoArgola.value
            );


        inputPosicaoArgola.value =
            String(
                ultimoAnguloChaveiro
            );
    }


    valorPosicaoArgola.textContent =
        `${
            Number(
                inputPosicaoArgola.value
            ).toFixed(0)
        }°`;


    atualizarInterfaceArgola();


    solicitarAtualizacao();
}




function atualizarInterfaceArgola() {
    controlesArgola.classList.toggle(
        "hidden",
        !pecaTemArgola()
    );
}




function solicitarAtualizacao() {
    if (
        frameAtualizacao !==
        null
    ) {
        return;
    }


    frameAtualizacao =
        requestAnimationFrame(
            async () => {
                frameAtualizacao =
                    null;


                await gerarSvg();
            }
        );
}




// =====================================================
// EVENTOS
// =====================================================


selectColecao.addEventListener(
    "change",
    () => {
        atualizarInformacoesColecao();


        atualizarCabecalhoIcone();


        renderizarGradeIcones();


        solicitarAtualizacao();
    }
);




inputBusca.addEventListener(
    "input",
    renderizarGradeIcones
);




selectCategoria.addEventListener(
    "change",
    renderizarGradeIcones
);




formatoChaveiro.addEventListener(
    "change",
    atualizarInterfaceFormato
);




formatoCard.addEventListener(
    "change",
    atualizarInterfaceFormato
);




inputCardArgola.addEventListener(
    "change",
    () => {
        atualizarInterfaceArgola();


        solicitarAtualizacao();
    }
);




[
    inputTamanho,
    inputBorda,
    inputCardLargura,
    inputCardAltura,
    inputCardRaio,
    inputCardMargem,
    inputFuro,
    inputEspessuraArgola,
    inputTracoEmoji
]
.forEach(
    input => {
        input.addEventListener(
            "input",
            solicitarAtualizacao
        );
    }
);




inputPosicaoArgola.addEventListener(
    "input",
    () => {
        const valor =
            Number(
                inputPosicaoArgola.value
            );


        valorPosicaoArgola.textContent =
            `${valor.toFixed(0)}°`;


        if (
            formatoAtual() === "card"
        ) {
            ultimoAnguloCard =
                valor;
        }


        else {
            ultimoAnguloChaveiro =
                valor;
        }


        solicitarAtualizacao();
    }
);




selectEstiloEmoji.addEventListener(
    "change",
    () => {
        atualizarVisibilidadeTraco();


        solicitarAtualizacao();
    }
);




inputIdentificarAutor.addEventListener(
    "change",
    () => {
        inputNomeAutor.disabled =
            !inputIdentificarAutor.checked;


        if (
            inputIdentificarAutor.checked
        ) {
            inputNomeAutor.focus();
        }


        solicitarAtualizacao();
    }
);




inputNomeAutor.addEventListener(
    "input",
    () => {
        inputNomeAutor.value =
            inputNomeAutor.value
                .replace(
                    /[\r\n]+/g,
                    " "
                );


        solicitarAtualizacao();
    }
);




botaoBaixar.addEventListener(
    "click",
    baixarSvg
);

botaoBaixarDuplaCamada.addEventListener(
    "click",
    baixarDuplaCamada
);




// =====================================================
// INICIALIZAÇÃO
// =====================================================


window.addEventListener(
    "load",
    async () => {
        if (versaoFerramenta) {
            versaoFerramenta.textContent =
                `v${VERSAO_APP}`;
        }

        inputNomeAutor.disabled =
            !inputIdentificarAutor.checked;


        atualizarInformacoesColecao();


        atualizarCabecalhoIcone();


        renderizarGradeIcones();


        atualizarVisibilidadeTraco();


        atualizarInterfaceArgola();


        valorPosicaoArgola.textContent =
            `${
                Number(
                    inputPosicaoArgola.value
                ).toFixed(0)
            }°`;


        try {
            await inicializarPathKit();


            await gerarSvg();
        }


        catch (erro) {
            console.error(
                erro
            );


            atualizarStatusMotor(
                "Falha ao carregar o motor vetorial",
                "erro"
            );


            definirMensagem(
                "Erro: " +
                erro.message,
                true
            );
        }
    }
);
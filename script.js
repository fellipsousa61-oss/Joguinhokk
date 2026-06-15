const galaxy = document.querySelector(".galaxy");
const heart = document.querySelector(".core");

// estrelas/corações da galáxia
for(let i=0; i<180; i++){
    let star = document.createElement("div");
    star.innerHTML = Math.random() > 0.5 ? "❤" : "✦";
    star.className = "star";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.fontSize = Math.random() * 18 + 5 + "px";
    star.style.animationDuration = Math.random() * 4 + 2 + "s";
    galaxy.appendChild(star);
}

// clique no coração central
heart.addEventListener("click", () => {
    for(let i=0; i<35; i++){
        let text = document.createElement("div");
        let frases = [
            "EU TE AMO ❤️",
            "TE VIVO 💖",
            "TE QUERO ❤️",
            "MEU AMOR 💕",
            "VOCÊ É ESPECIAL ✨"
        ];

        text.innerHTML = frases[Math.floor(Math.random() * frases.length)];
        text.className = "love";
        text.style.left = Math.random() * 75 + 12 + "vw";
        text.style.animationDuration = Math.random() * 5 + 5 + "s";
        text.style.fontSize = Math.random() * 15 + 20 + "px";

        galaxy.appendChild(text);

        setTimeout(() => {
            text.remove();
        }, 10000);
    }
});

// estilos extras
let css = document.createElement("style");
css.innerHTML = `
.star{
    position:absolute;
    color:#ff4fa3;
    text-shadow: 0 0 15px #ff008c, 0 0 40px #ff00ff;
    animation:twinkle infinite alternate;
}
@keyframes twinkle{
    50%{ opacity:.2; transform:scale(1.5); }
}
.love{
    position:absolute;
    top:-60px;
    color:#fff;
    font-weight:bold;
    letter-spacing:3px;
    margin:40px;
    text-align:center;
    text-shadow: 0 0 15px #ff008c, 0 0 50px #ff00ff;
    z-index:30;
    pointer-events:none;
    animation:fallText linear forwards;
}
@keyframes fallText{
    0%{ transform: translateY(-50px) rotate(-5deg); opacity:0; }
    20%{ opacity:1; }
    100%{ transform: translateY(110vh) rotate(5deg); opacity:0; }
}
.core{ cursor:pointer; }
`;
document.head.appendChild(css);

// ==========================================
// CONTROLE DA CAIXA DE POEMAS (CORRIGIDO)
// ==========================================
const btnPoemas = document.querySelector(".poemasBtn");
const caixa = document.querySelector(".poemaBox");
const fechar = document.querySelector(".fechar");
const texto = document.querySelector(".textoPoema");
const paginaPoema = document.querySelector(".poema");

const poemas = [
    `No meio do universo eu encontrei uma estrela ❤️<br><br>No meio de milhões de caminhos encontrei você.<br><br>Meu coração sempre gira em volta do seu.`,
    `Se eu pudesse guardar uma coisa no infinito,<br><br>eu guardaria o momento em que encontrei você ✨<br><br>Porque meu lugar favorito é perto de você.`,
    `O céu tem milhões de estrelas,<br><br>mas nenhuma brilha tanto quanto o sorriso que eu amo ❤️`,
    `Meu amor é como uma galáxia,<br><br>não tem fim,<br>só aumenta a cada dia 💖`
];

let atual = 0;

// Abrir e fechar a caixa
btnPoemas.onclick = () => {
    caixa.style.display = "flex";
    mostrarPoema(); // Garante que o primeiro poema apareça ao abrir
}

fechar.onclick = () => {
    caixa.style.display = "none";
}

// Função única e limpa para transição dos poemas
function mostrarPoema(direcao = "direita") {
    if (!paginaPoema) return;

    // Começa a animação de virar a página
    if (direcao === "direita") {
        paginaPoema.style.transform = "perspective(800px) rotateY(-90deg)";
    } else {
        paginaPoema.style.transform = "perspective(800px) rotateY(90deg)";
    }
    paginaPoema.style.opacity = "0";

    // Troca o texto no meio da animação e faz voltar
    setTimeout(() => {
        if (texto) {
            texto.innerHTML = poemas[atual];
        }
        paginaPoema.style.transform = "perspective(800px) rotateY(0deg)";
        paginaPoema.style.opacity = "1";
    }, 350);
}

// Botões de navegar
document.querySelector(".right").onclick = () => {
    atual++;
    if (atual >= poemas.length) {
        atual = 0;
    }
    mostrarPoema("direita");
};

document.querySelector(".left").onclick = () => {
    atual--;
    if (atual < 0) {
        atual = poemas.length - 1;
    }
    mostrarPoema("esquerda");
};

// Arrastar no celular (Swipe)
let inicioX = 0;

paginaPoema.addEventListener("touchstart", (e) => {
    inicioX = e.touches[0].clientX;
});

paginaPoema.addEventListener("touchend", (e) => {
    let fimX = e.changedTouches[0].clientX;

    if (inicioX - fimX > 50) {
        document.querySelector(".right").click();
    }
    if (fimX - inicioX > 50) {
        document.querySelector(".left").click();
    }
});
// BANCO DE DADOS DAS POSIÇÕES E DESCRIÇÕES PICANTES (ATUALIZADO!)
const posicoes = [
    { id: 1, nome: "Papai e Mamãe Intenso", emoji: "👩‍❤️‍👨", desc: "Corpo a corpo total. Excelente para penetração profunda, contato visual fixo, gemidos no ouvido e beijos molhados enquanto os quadris se chocam." },
    { id: 2, nome: "De Lado Preguiçosa", emoji: "🛌", desc: "Encaixe perfeito por trás em formato de conchinha. Uma delícia para penetrações lentas, mãos livres para acariciar o corpo dela inteirinho e sussurrar safadezas." },
    { id: 3, nome: "Cowgirl Dominante", emoji: "🤠", desc: "Ela senta por cima e assume o controle. Ela dita a velocidade, a profundidade e o ritmo da cavalgada, deixando ele louco olhando tudo de baixo." },
    { id: 4, nome: "De Quatro Selvagem", emoji: "🐾", desc: "Uma das posições mais intensas e carnais. Visão privilegiada para ele, profundidade máxima e espaço perfeito para uns tapinhas bem dados." },
    { id: 5, nome: "A Cadeirinha", emoji: "🪑", desc: "Ele senta e ela vem por cima virada de frente. Encaixe super íntimo para ficarem se abraçando, se esfregando e sentindo o calor direto do corpo um do outro." },
    { id: 6, nome: "O Banquete Real", emoji: "👅💦", desc: "Momento totalmente dedicado ao sexo oral nela. Ela deita confortavelmente enquanto ele se joga entre as pernas dela para dar atenção total, sem pressa, ao clitóris." },
    { id: 7, nome: "A Garganta Profunda", emoji: "🤤", desc: "Momento dedicado ao sexo oral focado nele, com intensidade, entrega, contato visual provocante e uso das mãos para caprichar." },
    { id: 8, nome: "69 Clássico", emoji: "🔄", desc: "Prazer duplo e simultâneo. Os dois se deliciando com sexo oral ao mesmo tempo, perdendo o fôlego e o controle." },
    { id: 9, nome: "Altar do Prazer", emoji: "🧘‍♀️", desc: "Ela deita na beirada da cama com as pernas apoiadas nos ombros dele. Ele fica em pé ou de joelhos, garantindo um ângulo de penetração absurdo e muito profundo." },
    { id: 10, nome: "Gato de Botas", emoji: "👢", desc: "Ela de joelhos e ele vem por trás, mas ela inclina o tronco quase colando o peito no colchão. O ângulo muda totalmente e o atrito fica super gostoso." },
    { id: 11, nome: "O Trancado", emoji: "🥨", desc: "Os dois sentados na cama, ela envolve as pernas na cintura dele. Os corpos ficam tão colados que dá para sentir o coração batendo e movimentar só no deslize." },
    { id: 12, nome: "Contra a Parede", emoji: "🧱", desc: "Pura adrenalina. Ele ergue ela contra a parede, e ela prende as pernas na cintura dele. Pegada firme, rápida e cheia de tesão selvagem." },
    { id: 13, nome: "Anjo Caído", emoji: "👼", desc: "Uma variação do papai e mamãe onde ela joga as duas pernas para o mesmo lado, cruzando o corpo. Apertado, viciante e com muito estímulo." },
    { id: 14, nome: "Espelho Meu", emoji: "🪞", desc: "Transar de frente para um espelho (ou imaginando um). O estímulo visual de ver a penetração acontecer ao vivo deixa o tesão lá no teto." },
    { id: 15, nome: "Cowgirl Invertida", emoji: "🔄🤠", desc: "Ela senta por cima, mas de costas para ele. Ele ganha a visão perfeita da bunda dela rebolando enquanto ela controla o prazer." },
    { id: 16, nome: "O Arqueado", emoji: "🏹", desc: "Ela deita de costas, mas coloca um travesseiro alto debaixo do quadril para empinar bem a pelve. Facilita o encaixe e estimula pontos estratégicos dela." }
];

let currentCardIndex = 0;
let likedPositions = [];
let startX = 0; 

// Gerencia a troca de telas
function changeScreen(hideId, showId) {
    document.getElementById(hideId).classList.add('hidden');
    document.getElementById(showId).classList.remove('hidden');
    if(showId === 'screen-game') { renderCard(); }
}

// Cria o card visual na tela
function renderCard() {
    const container = document.getElementById('card-container');
    container.innerHTML = '';

    if (currentCardIndex >= posicoes.length) {
        finishGame();
        return;
    }

    const item = posicoes[currentCardIndex];
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-image-placeholder">${item.emoji}</div>
        <h3>${item.nome}</h3>
        <p>${item.desc}</p>
    `;

    // Sistema de arrastar o card (Touch Mobile)
    card.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    card.addEventListener('touchmove', (e) => {
        let moveX = e.touches[0].clientX - startX;
        if (Math.abs(moveX) < 150) {
            card.style.transform = `translateX(${moveX}px) rotate(${moveX / 10}deg)`;
        }
    });

    card.addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].clientX;
        let diffX = endX - startX;

        if (diffX > 100) {
            card.style.transform = 'translateX(300px) rotate(20deg)';
            card.style.opacity = '0';
            setTimeout(() => handleSwipe(true), 200);
        } else if (diffX < -100) {
            card.style.transform = 'translateX(-300px) rotate(-20deg)';
            card.style.opacity = '0';
            setTimeout(() => handleSwipe(false), 200);
        } else {
            card.style.transform = 'translateX(0px) rotate(0deg)';
        }
    });

    container.appendChild(card);
}

// Processa a escolha (Curtiu ou Recusou)
function handleSwipe(liked) {
    if (liked) { likedPositions.push(posicoes[currentCardIndex].id); }
    currentCardIndex++;
    renderCard();
}

// Finaliza e gera o código criptografado
function finishGame() {
    changeScreen('screen-game', 'screen-result');
    const codeString = likedPositions.join(',');
    const encoded = btoa(codeString);
    document.getElementById('my-code').innerText = encoded;
}

// Compara o código de vocês dois para exibir os matches
function checkMatches() {
    const partnerInput = document.getElementById('partner-code').value.trim();
    if(!partnerInput) return alert("Cole o código gerado pelo celular dela!");

    try {
        const decodedPartner = atob(partnerInput).split(',').map(Number);
        const matches = posicoes.filter(pos => likedPositions.includes(pos.id) && decodedPartner.includes(pos.id));
        const listContainer = document.getElementById('matches-list');
        listContainer.innerHTML = '';

        if(matches.length === 0) {
            listContainer.innerHTML = '<p style="color: #ff4757; text-align:center; width:100%;">Nenhum match direto. Que tal conversarem sobre o que cada um gosta? 😉</p>';
        } else {
            matches.forEach(pos => {
                listContainer.innerHTML += `
                    <div style="background:#181824; padding:15px; border-radius:10px; margin-bottom:10px; border-left: 4px solid var(--secondary); text-align:left;">
                        <strong style="font-size:1.1rem; color:var(--primary);">${pos.emoji} ${pos.nome}</strong>
                    </div>`;
                });
        }
        changeScreen('screen-result', 'screen-matches');
    } catch (e) {
        alert("Código inválido! Peça para ela copiar novamente.");
    }
}

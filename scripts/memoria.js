

window.addEventListener('load', iniciar);
window.addEventListener('resize', updateSize);

var btn, back, namePlayer1, namePlayer2, scorePlayer1, scorePlayer2;
var flippedCards, flippedOneCard,flippedTwoCard, flippedOneFront, flippedTwoFront, pairs;
var actualPlayer, player1, player2, turn, pairsPlayer1, pairsPlayer2;
var grill, shuffled;


// TIMEOUT PARA QUE DE TIEMPO A QUE CARGUE LA PÁGINA ANTES DE CREAR ELEMENTOS
setTimeout(createElements, 1500);

function createElements() {

            
    grill = document.getElementById('grill');
    cards = document.getElementsByClassName('card');
    cardsBack = document.getElementsByClassName('backCard');
    cardsFront = document.getElementsByClassName('frontCard');
    
    for (let i = 0; i < cards.length; i++) {
        window['jsC' + i] = cards[i];
        window['jsB' + i] = cardsBack[i];
        window['jsF' + i] = cardsFront[i];
        
        window['jsC' + i].addEventListener('click', select);
        
    }
    
    shuffleCards();
}
    

function getPlayers() {
    try {

        do {
            player1 = prompt('Nombre jugador 1');
        } 
        while (!player1.length > 0);
    }
    catch(e) {
        noNames();
    }

    try {
        do {
            player2 = prompt('Nombre jugador 2');
        }
        while (player2.length < 1);
    }
    catch(e) {
        noNames();
    }

    if ( (isLetter(player1)) && (isLetter(player2)) ) {
        actualPlayer = player1;
        
        // TRUCO PARA QUE DE TIEMPO A QUE CARGUEN ELEMENTOS Y SE CREEN TODOS LOS OBJETOS js PARA LOS HTML
        alert(`
        Perfecto...iniciemos!!!
        
        El primer turno es de ${player1}
        `);
        
        namePlayer1 = document.getElementById('player1');
        scorePlayer1 = document.getElementById('player1Points');
        
        namePlayer2 = document.getElementById('player2');
        scorePlayer2 = document.getElementById('player2Points');
        
        setPlayersNames();
        setPlayersInitialScores();
    } else {
        noNames();
    }        
}


function isLetter(str) {
    return /^[a-zA-Z()]+$/.test(str);
}


function noNames() {
    alert('No se puede jugar sin nombres de jugadores');
    window.location.href = "./index.html";
}
    

function setPlayersNames() {
    namePlayer1.textContent = player1;    
    namePlayer2.textContent = player2;
}


function setPlayersInitialScores() {   
    scorePlayer1.textContent = '0';
    scorePlayer2.textContent = '0';
}


function iniciar(event) {
    // swal.fire({
    //     title: 'Bienvenido',
    //     text: 'Nombre de jugador',
    //     input: 'text',
    //     inputPlaceholder: 'nombre'
    // });

    updateSize();

    getPlayers();

    btn = document.getElementById('btn');
    btn.addEventListener('click', restart);

    back = document.getElementById('back');
    back.addEventListener('click', goBack);

    initialSettings();
}


function initialSettings() {
    flippedCards = 0;
    pairs = 0;
    pairsPlayer1 = 0;
    pairsPlayer2 = 0;
}


function updateSize() {
    let actualVw = window.innerWidth * 0.01;
    let actualVh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${actualVh}px`);
    document.documentElement.style.setProperty('--vw', `${actualVw}px`);
}


function restart() {
    let reset = confirm('Deseas iniciar un juego nuevo');
    if (reset) {
        createElements();
        initialSettings();
        setPlayersInitialScores();
        initialVisibility();

        let samePlayers = confirm('Continuan los mismos jugadores?');
        if (!samePlayers) {
            getPlayers();
        } 
    }
}


function initialVisibility() {
    for (let i = 0; i < cards.length; i++) {
        window['jsC' + i].style.pointerEvents = 'auto';
        
        window['jsB' + i].style.visibility = 'visible';
        window['jsB' + i].style.transform = 'perspective(600px) rotateY(0deg)';
        
        window['jsF' + i].style.visibility = 'visible';
        window['jsF' + i].style.transform = 'perspective(600px) rotateY(-180deg)';                
    }
}


function select(event) {
    if (flippedCards >= 2) {

        alert('No puedes seleccionar más de dos tarjetas');

    } else {

        let pos = event.target.getAttribute('id').toString();
        pos = pos.slice(1);
        flippedCards++;

        flip(pos);
        
        if (flippedCards == 1) {

            flippedOneCard = window['jsC' + pos];
            flippedOneFront  = window['jsF' + pos];
            flippedOneBack  = window['jsB' + pos];
            
            flippedOneCard.style.pointerEvents = 'none';
        
        } else {

            flippedTwoCard = window['jsC' + pos];
            flippedTwoFront = window['jsF' + pos];
            flippedTwoBack = window['jsB' + pos];

            flippedTwoCard.style.pointerEvents = 'none';

            if (flippedOneFront.getAttribute('src') == flippedTwoFront.getAttribute('src')) {

                if (actualPlayer == player1) {
                    pairsPlayer1++;
                    scorePlayer1.innerHTML = pairsPlayer1;
                } else {
                    pairsPlayer2++;
                    scorePlayer2.innerHTML = pairsPlayer2;
                }

                setTimeout(matched, 1000);
                flippedCards = 0;



                if ((pairsPlayer1 + pairsPlayer2) == 12) {

                    setTimeout(winner, 1200);
                
                    // AQUÍ ESTABA LA EVALUACIÓN DEL GANADOR
                }

            } else {
                
                setTimeout(flipOver, 1500);
    
            }
        }
    }
}


function flip(myPos) {
    window['jsB' + myPos].style.transform = 'perspective(600px) rotateY(180deg)';
    window['jsF' + myPos].style.transform = 'perspective(600px) rotateY(0deg)';
}


function flipOver() {
    flippedCards = 0;

    flippedOneBack.style.transform = 'perspective(600px) rotateY(0deg)';
    flippedTwoBack.style.transform = 'perspective(600px) rotateY(0deg)';
    
    flippedOneFront.style.transform = 'perspective(600px) rotateY(-180deg)';
    flippedTwoFront.style.transform = 'perspective(600px) rotateY(-180deg)';

    flippedOneCard.style.pointerEvents = 'auto';
    flippedTwoCard.style.pointerEvents = 'auto';

    setTimeout(assignTurn, 1000);
}


function assignTurn() {
    if (actualPlayer == player1) {
        actualPlayer = player2;
        alert(`
        ${player2},
         es tu turno`);
    } else {
        actualPlayer = player1;
        alert(`
        ${player1},
         es tu turno`);
    }
}

function matched() {
    flippedOneBack.style.visibility = 'hidden';
    flippedTwoBack.style.visibility = 'hidden';

    flippedOneFront.style.transform = 'perspective(600px) rotateY(90deg)';
    flippedTwoFront.style.transform = 'perspective(600px) rotateY(90deg)';

    pairs++;
    console.log(pairs);
}


function winner() {
    if (pairsPlayer1 == pairsPlayer2) {
        alert(`
        Hubo un empate!!!
        tendrán que jugar el desempate`)
    } else if (pairsPlayer1 > pairsPlayer2) {
        alert(`Felicidades ${player1} has ganado`);
    } else {
        alert(`Felicidades ${player2} has ganado`);
    }
}

function shuffleCards() {
    shuffled = [];
    qtyCards = cards.length;
    qtyPairs = qtyCards / 2;
    
    do {
        myRadom = Math.round(Math.random() * ((qtyCards - 1) + 0));
        // console.log('🚀 ~ shuffleCards ~ myRadom', myRadom);
        
        if (shuffled.includes(myRadom)) {
            continue;
        } else {
            shuffled.push(myRadom);
            // console.log('🚀 ~ shuffleCards ~ shuffled', shuffled);
        }
    
    } while (shuffled.length < 24);
    
    for (let i = 0; i < shuffled.length; i+=2) {
        path = `./img/Frozen/fzn${i/2+1}.jpeg`;
        // console.log('🚀 ~ shuffleCards ~ path', path);

        pos1 = shuffled[i];
        // console.log('🚀 ~ shuffleCards ~ pos1', pos1);
        pos2 = shuffled[i+1];
        // console.log('🚀 ~ shuffleCards ~ pos2', pos2);

        cardsFront[pos1].setAttribute('src', path);
        cardsFront[pos2].setAttribute('src', path);
    }
}

function goBack() {
    quiting = confirm(`
    Deseas abandonar la página?
    (se perderá toda la información)`);

    if (quiting) {
        window.location.href = "./index.html";
    }
}

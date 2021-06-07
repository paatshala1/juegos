window.addEventListener('load', iniciar);
window.addEventListener('resize', updateSize);

var btn, back, infoPlayer1, infoPlayer2;
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
    
    shuffled = [];
    shuffleCards();
}


letsBegin = confirm(`Iniciamos?`);

if (letsBegin) {
    
    player1 = prompt('Nombre de jugador 1:');
    player2 = prompt('Nombre de jugador 2:');
    
    // TRUCO PARA QUE DE TIEMPO A QUE CARGUEN ELEMENTOS Y SE CREEN TODOS LOS OBJETOS js PARA LOS HTML
    alert(`
    Perfecto...iniciemos!!!
    El primer turno es de ${player1}
    `);

    // infoPlayer1.style.innerHTML = player1;
    // infoPlayer2.style.innerHTML = player2;

}


function iniciar(event) {
    updateSize();

    // createElements();

    btn = document.getElementById('btn');
    btn.addEventListener('click', restart);

    back = document.getElementById('back');
    back.addEventListener('click', goBack);

    infoPlayer1 = document.getElementById('player1');
    infoPlayer2 = document.getElementById('player2');


    flippedCards = 0;
    pairs = 0;
    pairsPlayer1 = 0;
    pairsPlayer2 = 0;
    actualPlayer = player1;

}


function updateSize() {
    let actualVw = window.innerWidth * 0.01;
    let actualVh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${actualVh}px`);
    document.documentElement.style.setProperty('--vw', `${actualVw}px`);
}


function restart() {
    confirm('Deseas iniciar un juego nuevo');
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
                } else {
                    pairsPlayer2++;
                }

                setTimeout(matched, 1000);
                flippedCards = 0;



                if ((pairsPlayer1 + pairsPlayer2) == 12) {

                    setTimeout(winner, 1200);
                
                    // AQUÍ ESTABA LA EVALUACIÓN DEL GANADOR
                }

            } else {
                
                setTimeout(flipOver, 1500);

                
                // if (actualPlayer == player1) {
                //     actualPlayer = player2;
                //     alert(`${player2} es tu turno`);
                // } else {
                //     actualPlayer = player1;
                //     alert(`${player1} es tu turno`);
                // }
    
            }
        }
        
        
    }
}


function flip(myPos) {

    window['jsB' + myPos].style.transform = 'perspective(600px) rotateY(180deg)';
    // window['jsB' + myPos].style.MozUserSelect = 'none';

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
        alert(`${player2} es tu turno`);
    } else {
        actualPlayer = player1;
        alert(`${player1} es tu turno`);
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

import { goBack, goMainPage } from '../modules/modules.js';

window.addEventListener('load', iniciar);
window.addEventListener('resize', updateSize);

var btn, back;
var namePlayer1, namePlayer2, scorePlayer1, scorePlayer2, namePlayer1Acum, namePlayer2Acum, scorePlayer1Acum, scorePlayer2Acum, p1Acum, p2Acum;
var flippedCards, flippedOneCard,flippedTwoCard, flippedOneFront, flippedOneBack, flippedTwoFront, flippedTwoBack, pairs;
var dismiss, actualPlayer, player1, player2, turn, pairsPlayer1, pairsPlayer2;
var grill, shuffled, cards, cardsBack, cardsFront, myRadom;

var swalTurns;



// TIMEOUT PARA QUE DE TIEMPO A QUE CARGUE LA PÁGINA ANTES DE CREAR ELEMENTOS
setTimeout(createElements, 2000);

function createElements() {
    
    swalTurns = Swal.mixin({
        showConfirmButton: false,
        timer: 800,
        // position: 'bottom',
        toast: true,
        // allowOutsideClick: true /* Los toast no aceptan esta propiedad */
        // timerProgressBar: true
    });
            
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
    
/* LA OBTENCIÓN DE LOS NOMBRES DE LOS JUGADORES SON DIFERENTES, PARA VER AMBAS FORMAS DE OBTENER EL VALOR DE LA PROMESA */
async function getPlayers() {
    try {
        await Swal.fire({
            title: 'Este es el primer jugador(a)',
            text: 'Ingresa tu nombre (solo letras, sin tildes)',
            input: 'text',
            inputPlaceholder: 'Nombre',
            backdrop: true,
            showCancelButton: true,
            // cancelButtonColor: '#a30000',
            cancelButtonText: 'Salir, no jugaré',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: '#255891',
            confirmButtonText: 'Ingresar',
            inputValidator: (value) => {
            // console.log('🚀 ~ getPlayers ~ value', value);
                if (!value) {
                    return 'Debes ingresar tu nombre para poder jugar';
                }
            }
        })

        .then( (result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                dismiss = true;
                noNames();
            } else {
                player1 = result.value;
            }
        });

    }

    catch(e) {
        goMainPage();
    }

    try {
        if (dismiss) {
            noNames();
        } else {
            await Swal.fire({
                title: 'Este es el segundo jugador(a)',
                text: 'Ingresa tu nombre (solo letras, sin tildes)',
                input: 'text',
                inputPlaceholder: 'Nombre',
                backdrop: true,
                showCancelButton: true,
                // cancelButtonColor: '#a30000',
                cancelButtonText: 'Salir, no jugaré',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#255891',
                confirmButtonText: 'Ingresar',
                inputValidator: (value) => {
                    // console.log('🚀 ~ getPlayers ~ value', value);
                    if (!value) {
                        return 'Debes ingresar tu nombre para poder jugar';
                    }
                }
            })
            
            .then( (result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    dismiss = true;
                    noNames();
                } else {
                    player2 = result.value;
                }
            });
        }

    }
    catch(e) {
        goMainPage();
    }

    if (dismiss) {
        noNames();
    } else {

        if ( (isLetter(player1)) && (isLetter(player2)) ) {
            actualPlayer = player1;
            
            // TRUCO PARA QUE DE TIEMPO A QUE CARGUEN ELEMENTOS Y SE CREEN TODOS LOS OBJETOS js PARA LOS HTML
            Swal.fire({
                title: `Listos...iniciemos!
                El primer turno es de ${player1}`,
                showConfirmButton: false,
                customClass: {
                    title: 'swalTitle',
                },
                timer: 1500
            });
                   
            namePlayer1 = document.getElementById('player1');
            scorePlayer1 = document.getElementById('player1Points');
            namePlayer1Acum = document.getElementById('player1Acum');
            scorePlayer1Acum = document.getElementById('player1PointsAcum');

            
            namePlayer2 = document.getElementById('player2');
            scorePlayer2 = document.getElementById('player2Points');
            namePlayer2Acum = document.getElementById('player2Acum');
            scorePlayer2Acum = document.getElementById('player2PointsAcum');

            setPlayersNames();
            setPlayersInitialScores();
            setPlayersInitialAcumScores();
        } else {
            noNames();
        }        
    }
}


/* EXPRESIÓN REGULAR (falta estudiarlas, esto lo saqué de StackOverflow) */
function isLetter(str) {
    return /^[a-zA-Z]+$/.test(str);/* Le quité los paréntesis luego de Z pero dentro de [], era así [a-zA-Z()] */
}


async function noNames() {

    try {
        await Swal.fire({
            title: 'No se puede jugar sin nombres de jugadores válidos',
            text: 'Deseas ingresar de nuevo los nombres (recuerda que solo pueden contener letras',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'No, prefiero salir',
            confirmButtonText: 'Sí, los reingresaré'
        })

        .then((res) => {
            if(res.isConfirmed) {
                dismiss = false;
                getPlayers();
            } else {
                // alert('auto');
                goMainPage();
            }

        })
    }
    catch(e) {
        console.log(e);
    }
}
    

function setPlayersNames() {
    namePlayer1.textContent = player1;
    namePlayer1Acum.textContent = `Acum ${player1}`;

    namePlayer2.textContent = player2;
    namePlayer2Acum.textContent = `Acum ${player2}`;
}


function setPlayersInitialScores() { 
    scorePlayer1.textContent = '0';
    scorePlayer2.textContent = '0';
}


function setPlayersInitialAcumScores() {
    p1Acum = 0;
    p2Acum = 0;
    scorePlayer1Acum.textContent = '0';
    scorePlayer2Acum.textContent = '0';
}


function iniciar(event) {

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
    dismiss = false;
    // p1Acum = 0;
    // p2Acum = 0;
}


function updateSize() {
    let actualVw = window.innerWidth * 0.01;
    let actualVh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${actualVh}px`);
    document.documentElement.style.setProperty('--vw', `${actualVw}px`);
}


async function restart() {
    
    let reset = await Swal.fire({
        icon: 'question',
        title: 'Deseas iniciar un juego nuevo?',
        showCancelButton: true,
        cancelButtonText: 'No, fue un error',
        confirmButtonText: 'Sí, quiero uno nuevo'
    });

    if (reset.isConfirmed) {
        await initialVisibility();
        createElements();
        initialSettings();
        setPlayersInitialScores();
        
        let samePlayers = await Swal.fire({
            icon: 'question',
            title: 'Serán los mismos jugadores?',
            showCancelButton: true,
            cancelButtonText: 'No, seremos otros',
            confirmButtonText: 'Sí, seremos los mismos'
        })

        if (samePlayers.dismiss === Swal.DismissReason.cancel) {
            setPlayersInitialAcumScores();
            getPlayers();
        }
    }
}


function initialVisibility() {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < cards.length; i++) {
            window['jsC' + i].style.pointerEvents = 'auto';
            
            window['jsB' + i].style.transform = 'perspective(600px) rotateY(0deg)';
            window['jsB' + i].style.visibility = 'visible';
            
            window['jsF' + i].style.transform = 'perspective(600px) rotateY(-180deg)';                
            window['jsF' + i].style.visibility = 'visible';
            window['jsF' + i].style.transitionDuration = '0s';
        }
        resolve();
    })
}


async function newGame() {
    let aNewGame = await Swal.fire({
        title: 'Desean jugar una vez más?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'No...creo que no',
        confirmButtonText: 'Sí, jugaremos otro'
    });

    if (aNewGame.isConfirmed) {
        await Swal.fire({
            title: 'Iniciemos',
            text: `El primer turno será de ${actualPlayer}`
        });
        createElements();
        initialSettings();
        setPlayersInitialScores();
        initialVisibility();
    }
}


function select(event) {
    if (flippedCards >= 2) {
        Swal.fire({
            icon: 'info',
            title: 'Error de selección',
            text: 'No se pueden seleccionar más de cartas por turno',
            showConfirmButton: false,
            timer: 1400,
        })

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
                setTimeout(flipOver, 1600);    
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

    setTimeout(assignTurn, 300);
}


function assignTurn() {
    if (actualPlayer == player1) {
        actualPlayer = player2;
        swalTurns.fire({
            title: `${player2}... es tu turno`,
            // showConfirmButton: false,
            // timer: 1000,
            // position: 'bottom',
            // toast: true,
            // allowOutsideClick: true
            // timerProgressBar: true
        });

    } else {    
        actualPlayer = player1;
        swalTurns.fire({
            title: `${player1}... es tu turno`,
            // showConfirmButton: false,
            // timer: 1000,
            // position: 'bottom',
            // toast: true,
            // allowOutsideClick: true
            // timerProgressBar: true
        });
    }
}


function matched() {
    flippedOneBack.style.visibility = 'hidden';
    flippedTwoBack.style.visibility = 'hidden';

    flippedOneFront.style.transform = 'perspective(600px) rotateY(90deg)';
    flippedTwoFront.style.transform = 'perspective(600px) rotateY(90deg)';

    pairs++;
    // console.log('🚀 ~ matched ~ pairs', pairs);
}


async function winner() {
    if (pairsPlayer1 == pairsPlayer2) {
        await Swal.fire({
            title: 'Empatados!!',
            text: 'Tendrán que jugar el desempate'
        });

    } else if (pairsPlayer1 > pairsPlayer2) {
        await Swal.fire({
            title: `Tenemos un ganador(a)!`,
            text: `${player1} has ganado, felicidades`
        })
        .then(r => {
            p1Acum++;
            scorePlayer1Acum.textContent = p1Acum;
        });

    } else {
        await Swal.fire({
            title: `Tenemos un ganador(a)!`,
            text: `${player2} has ganado, felicidades`
        })
        .then(r => {
            p2Acum++;
            scorePlayer2Acum.textContent = p2Acum;
        });

    }

    newGame();
}

function shuffleCards() {

    shuffled = [];
    let qtyCards = cards.length;
    let qtyPairs = qtyCards / 2;
    
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
    
    return new Promise((resolve, reject) => {
        for (let i = 0; i < shuffled.length; i+=2) {
            let path = `./img/Frozen/fzn${i/2+1}.jpeg`;
            // console.log('🚀 ~ shuffleCards ~ path', path);
    
            let pos1 = shuffled[i];
            // console.log('🚀 ~ shuffleCards ~ pos1', pos1);
            let pos2 = shuffled[i+1];
            // console.log('🚀 ~ shuffleCards ~ pos2', pos2);
            
            cardsFront[pos1].setAttribute('src', path);
            cardsFront[pos2].setAttribute('src', path);
        }
        resolve();
    })
    .then(_ =>{
        for (let x = 0; x < shuffled.length; x++) {
            cardsFront[x].style.transitionDuration = '0.5s';
            
        }
    })
    
}


// async function goBack() {

//     let quitting = await Swal.fire({
//         title: 'Deseas abandonar el juego?',
//         text: '(se perderá toda el avance)',
//         icon: 'question',
//         showCancelButton: true,
//         cancelButtonText: 'No, continuaré en el juego',
//         confirmButtonText: 'Sí, deseo salir'
//     })

//     if (quitting.isConfirmed){
//         goMainPage();
//     }
// }


// function goMainPage() {
//     window.location.href = "./index.html";
// }


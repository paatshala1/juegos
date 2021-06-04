window.addEventListener('load', iniciar);
window.addEventListener('resize', updateSize);

var btn;


// TIMEOUT PARA QUE DE TIEMPO A QUE CARGUE LA PÁGINA ANTES DE CREAR ELEMENTOS
setTimeout(createElements, 1500);

function createElements() {
    cardBack = document.getElementsByClassName('backCard');
    cardFront = document.getElementsByClassName('frontCard');
    
    for (let i = 0; i < cardBack.length; i++) {
        window['jsCardBack' + i] = cardBack[i];
        window['jsCardFront' + i] = cardFront[i];        
    }
}

// setTimeout(info, 1600);

// function info() {
//     alert(`
//     ID Primer elemento: ${jsCardBack0.getAttribute('id')}
//     ID Segundo element: ${jsCardBack1.getAttribute('id')}
//     `);
// }


// TRUCO PARA QUE DE TIEMPO A QUE CARGUEN ELEMENTOS Y SE CREEN TODOS LOS OBJETOS js PARA LOS HTML
alert('Que inicie la partida!!');



function iniciar(event) {
    updateSize();

    // createElements();

    btn = document.getElementById('btn');
    btn.addEventListener('click', restart);

    c1 = document.getElementById('c1');
    c1.addEventListener('click', ()=> {alert('Seleccionada la primera tarjeta')});

    c2 = document.getElementById('c2');
    c2.addEventListener('click', ()=> {alert('Seleccionada la segunda tarjeta')});



    test = document.getElementById('fzn0');





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



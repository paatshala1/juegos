window.addEventListener('load', iniciar);


function iniciar(ev) {
    fragmentoOrigen = new DocumentFragment();
    fragmentoDestino = new DocumentFragment();
    
    imagen = document.createElement('img');
    imagen.setAttribute('id', 'imagen');
    imagen.setAttribute('src', '../img/Puzzle/olafPierdeCabeza.jpg');

    let piezas = [];
    
    do {
        let fila = Math.round((Math.random() * 4) + 1);
        let columna = Math.round((Math.random() * 7) + 1);
        let pos = `${fila}-${columna}`;

        if (piezas.includes(pos)) continue;
        else piezas.push(pos);
        // console.log(piezas);
    } while (piezas.length < 40);


    piezas.map(x => {
        myImg = document.createElement('img');
        myImg.setAttribute('class', 'origen__img');
        myImg.setAttribute('src', `../img/Puzzle/${x}.png`);
        myImg.addEventListener('dragstart', (ev) => ev.dataTransfer.setData('myUrl', ev.target.src));
        myImg.addEventListener('dragend', quitar);
        fragmentoOrigen.appendChild(myImg);        
    })


    piezas.map(y => {
        myImg = document.createElement('img');
        myImg.setAttribute('class', 'destino__img');
        // myImg.setAttribute('src', './Puzzle/neutro.png');
        myImg.addEventListener('dragstart', (ev) => ev.dataTransfer.setData('myUrl', ev.target.src));
        myImg.addEventListener('dragover', sobre);
        myImg.addEventListener('drop', soltar);
        myImg.addEventListener('dragend', quitar);
        // myImg.addEventListener('dblclick', (ev) => ev.target.setAttribute('src', './Puzzle/neutro.png'));
        fragmentoDestino.appendChild(myImg);        
    })


    origen = document.createElement('div');
    origen.setAttribute('class', 'origen');
    origen.appendChild(fragmentoOrigen);

    destino = document.createElement('div');
    destino.setAttribute('class', 'destino');
    destino.appendChild(fragmentoDestino);

    root.appendChild(origen);
    root.appendChild(destino);
    root.appendChild(imagen);
}


const sobre = (ev) => {
    let actualSrc = ev.target.getAttribute('src');
    
    if (actualSrc == null || actualSrc.includes('neutro')) {
        ev.preventDefault();
    }
}

const soltar = (ev) => {
    let data = ev.dataTransfer.getData('myUrl');
    let actualSrc = ev.target.getAttribute('src');
    
    if (actualSrc == null || actualSrc.includes('neutro')) {
        ev.preventDefault();
        ev.target.setAttribute('src', data);
    }
    // ev.dataTransfer.clearData('myUrl');
}


const quitar = (ev) => {
    if (ev.dataTransfer.dropEffect != 'none') {
        ev.target.setAttribute('src', '../img/Puzzle/neutro.png');
        // console.log(ev.dataTransfer.dropEffect);
    }

}

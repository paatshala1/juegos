window.addEventListener('load', iniciar);

var wrongs, rights, counter, wrd, letters, writtenLetters, positions, imgNumber, imgNumberNext, coverNumber



function initialSetting() {
    wrongs = 0;
    rights = 0;
    counter = 0;
    wrd = null;
    letters = [];
    writtenLetters = [];
    positions = [];
    imgNumber = 0;
    imgNumberNext = 1;
    coverNumber = 1;


}



function iniciar(event) {

    initialSetting();

    divGuess = document.getElementById('guess');
    imgHang = document.getElementById('hangImg');
    imgHang2 = document.getElementById('hangImg2');
    imgHangCover = document.getElementById('hangImgCover');

    btnBegin = document.getElementById('begin');
    btnBegin.addEventListener('click', begin);

    btnGo = document.getElementById('go');
    btnGo.addEventListener('click', go);

    btnTry = document.getElementById('try');
    btnTry.addEventListener('click', trying);

    btnReset = document.getElementById('reset');
    btnReset.addEventListener('click', reset);

    inputWrd = document.getElementById('start__word');
    inputWrd.value = null;
    hang = document.getElementById('hangImg');
}



function begin() {
    btnBegin.setAttribute('hidden', 'true');
    inputWrd.placeholder = 'Ingresa tu palabra';
    inputWrd.focus();
    btnGo.removeAttribute('hidden');
    btnReset.removeAttribute('hidden');
    
    imgHang2.removeAttribute('hidden');
    imgHang2.style.opacity = 1;
    setTimeout(updateImg, 500);

    /* CONTROL LOGS */
    // console.log('🚀 ~ begin ~ imgHang', imgHang);
    // console.log('🚀 ~ begin ~ imgHang2', imgHang2);

    // console.log('🚀 ~ begin ~ imgNumber', imgNumber);
    // console.log('🚀 ~ begin ~ imgNumberNext', imgNumberNext);
}



function go() {

    if (inputWrd.value.length > 1) {

        
        changeImg();
        
        btnGo.setAttribute('hidden', 'true');
        btnTry.removeAttribute('hidden');
        btnReset.removeAttribute('hidden');
        wrd = inputWrd.value.toLowerCase();
        
        let fragment = document.createDocumentFragment();
        
        // console.log('🚀 ~ begin ~ imgHang', imgHang);
        
        for (let i = 0; i < wrd.length; i++) {
            let divLetter = document.createElement('DIV');
            divLetter.setAttribute('id', `letter-${i}`);
            divLetter.style.color = 'transparent';
            divLetter.innerHTML = wrd[i];
            divLetter.classList.add('allLetters');
            fragment.appendChild(divLetter);
        }
        
        divGuess.appendChild(fragment);
        
        inputWrd.value = null;
        inputWrd.placeholder = 'Ingresa una letra';
        inputWrd.focus();
        
        // console.log('🚀 ~ go ~ imgNumber', imgNumber);
        // console.log('🚀 ~ go ~ imgNumberNext', imgNumberNext);
    } else {
        inputWrd.value = null;
        inputWrd.focus();
        alert(`
        Valor incorrecto
        Tu palabra de tener un
        mínimo de dos letras`)
    }
}



function trying() {

    let letter = null;

    if (inputWrd.value.length != 1) {
        alert('No has ingresado un valor válido');
    } else {
        counter++;
        letter = inputWrd.value.toLowerCase();
        letters.push(letter);
        // console.log('🚀 ~ trying ~ letters', letters);
        
        
        if (wrd.includes(letter)) {

            if (writtenLetters.includes(letter)) {
                alert(`Letra "${letter}" acertada previamente`);
            } else {   
                writtenLetters.push(letter);
                rights++;
                for (i in wrd) {
                    if (wrd[i] == letter) {
                        positions.push(i);
                        // console.log('🚀  ~ trying ~ positions', positions);
                        // console.log('🚀 ~ trying ~ writtenLetters', writtenLetters);
                    } else {
                        continue;
                    }
                }
            }
            
        } else {
            wrongs++;
            
            changeImg();
        
            // console.log('🚀  ~ trying ~ imgNumber', imgNumber);
            // console.log('🚀  ~ trying ~ wrongs', wrongs);
        }

        for (i of positions) {
            let rightLetter = document.getElementById(`letter-${i}`);
            rightLetter.style.color = '#000000';
        }
    }
    
    inputWrd.value = null;
    inputWrd.focus();
    
    if (wrongs >= 10) {
        btnTry.setAttribute('hidden', 'true');
        inputWrd.removeAttribute('placeholder');
        btnReset.focus();

        // CORRER LA FUNCION hanging para "animación" (editar las imágenes para quitar pie)

        alert(`
        Lo lamento!! Perdiste
        Agotaste tus ${wrongs} fallos.
        
        Aciertos: ${rights}
        Errores: ${wrongs}`);
    }

    if (positions.length >= (wrd.length)) {
        alert(`
        Felicidades!!!
        Has adivinado: ${wrd}
        Juega de nuevo`);
        reset();
    }

}



function reset() {
    btnReset.setAttribute('hidden', 'true');
    btnTry.setAttribute('hidden', 'true');
    btnGo.setAttribute('hidden', 'true');
    btnBegin.removeAttribute('hidden');
    inputWrd.removeAttribute('placeholder');
    
    if (wrd != null) {        
        
        for (let i = 0; i < wrd.length; i++) {
            let divLetter = document.getElementById(`letter-${i}`);
            divGuess.removeChild(divLetter);
        }
    }

    imgHang.setAttribute('src', `/img/portada.png`);
    imgHang2.setAttribute('src', './img/1.jpg');
    imgHangCover.setAttribute('src', './img/1.jpg');
    inputWrd.value = null;

    initialSetting();

}



function updateImg() {
    imgHangCover.removeAttribute('hidden');
    imgNumber++;
    imgNumberNext++

    imgHang.setAttribute('src', `/img/${imgNumber}.jpg`);
    imgHang2.style.opacity = 0;
    imgHang2.setAttribute('hidden', 'true');
    imgHang2.setAttribute('src', `/img/${imgNumberNext}.jpg`);
    setTimeout(unhide, 500);
}



function unhide() {
    imgHang2.removeAttribute('hidden');
}



function changeImg() {
    imgHangCover.setAttribute('hidden', 'true');
    coverNumber++;
    imgHangCover.setAttribute('src', `/img/${coverNumber}.jpg`);

    imgHang2.style.opacity = 1;
    setTimeout(updateImg, 500);
}

function hanging() {
    for (let i = 11; i <= 16; i++) {
        changeImg();
    }
}

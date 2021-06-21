window.addEventListener('load', iniciar);
window.addEventListener('resize', updateSize);

var wrongs, rights, counter, wrd, letters, writtenLetters, positions, imgNumber, imgNumberNext, coverNumber;
var hangMoves, myInterval;
var back;


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
    hangMoves = 0;
    myInterval = null;
}


function iniciar(event) {

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    alert(`Ancho: ${vw} x Alto: ${vh}`);

    // let resolution = window.devicePixelRatio;
    // alert(resolution);
  
    
    updateSize();

    initialSetting();

    divGuess = document.getElementById('guess');
    imgHang = document.getElementById('hangImg');
    imgHang2 = document.getElementById('hangImg2');
    imgHangCover = document.getElementById('hangImgCover');
    divHanged = document.getElementById('hanged');

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

    back = document.getElementById('back');
    back.addEventListener('click', goBack);

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
        Swal.fire({
            title : 'Valor incorrecto',
            text: 'Tu palabra debe tener un mínimo de dos letras ',
            icon: 'error'
        })
    }
}


function trying() {

    let letter = null;

    if (inputWrd.value.length != 1) {
        inputWrd.focus();
        Swal.fire({
            title: 'Dato vacío',
            text: 'Debes ingresar un caracter (letra)',
            icon: 'error'
        });

    } else {
        counter++;
        letter = inputWrd.value.toLowerCase();
        letters.push(letter);
        // console.log('🚀 ~ trying ~ letters', letters);
        
        if (wrd.includes(letter)) {

            if (writtenLetters.includes(letter)) {
                inputWrd.focus();
                Swal.fire({
                    title: 'Letra repetida',
                    text: `la letra "${letter}" ya la acertastes antes...`,
                    icon: 'info'
                });

            } else {   
                writtenLetters.push(letter);
                rights++;
                for (i in wrd) {
                    if (wrd[i] == letter) {
                        positions.push(i);
                        // console.log('🚀  ~ trying ~ positions', positions);
                        // console.log('🚀 ~ trying ~ writtenLetters', writtenLetters);
                    }/*  else {
                        continue;
                    } */
                }
                
                for (i of positions) {
                let rightLetter = document.getElementById(`letter-${i}`);
                    rightLetter.style.color = '#000000';
                }
            }
            
        } else {
            wrongs++;
            
            changeImg();
        
            // console.log('🚀  ~ trying ~ imgNumber', imgNumber);
            // console.log('🚀  ~ trying ~ wrongs', wrongs);
        }

    }
    
    inputWrd.value = null;
    inputWrd.focus();
    
    if (wrongs >= 10) {
        finished();
        divHanged.removeAttribute('hidden');
        myInterval = setInterval(hanging, 210);

        
        // Aciertos: ${rights}
        // Errores: ${wrongs}`);
    } else if (positions.length >= (wrd.length)) {

        finished();
        Swal.fire({
            title: 'FELICIDADES',
            text: `Has adivinado la palabra "${wrd}"`,
            icon: 'success',
            position: 'bottom'
        });
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

    imgHang.setAttribute('src', `/img/Ahorcado/portada.png`);
    imgHang2.setAttribute('src', './img/Ahorcado/1.jpg');
    imgHangCover.setAttribute('src', './img/Ahorcado/1.jpg');
    inputWrd.value = null;
    
    hideHanged();
    divHanged.setAttribute('hidden', 'true');

    initialSetting();
    
    btnBegin.focus();
}


function updateImg() {
    imgHangCover.removeAttribute('hidden');
    imgNumber++;
    imgNumberNext++

    imgHang.setAttribute('src', `/img/Ahorcado/${imgNumber}.jpg`);
    imgHang2.style.opacity = 0;
    imgHang2.setAttribute('hidden', 'true');
    imgHang2.setAttribute('src', `/img/Ahorcado/${imgNumberNext}.jpg`);
    setTimeout(unhide, 500);
}


function unhide() {
    imgHang2.removeAttribute('hidden');
}


function changeImg() {
    imgHangCover.setAttribute('hidden', 'true');
    coverNumber++;
    imgHangCover.setAttribute('src', `/img/Ahorcado/${coverNumber}.jpg`);

    imgHang2.style.opacity = 1;
    setTimeout(updateImg, 500);
}


function hanging() {
    hangMoves++;
    activeHanging = document.getElementById(`hanged${hangMoves}`);
    activeHanging.style.opacity = 1;
    if (hangMoves == 7) {
        clearInterval(myInterval);
        setTimeout(_ => {
            Swal.fire({
                title: 'TE HAN AHORCADO',
                text: `Lamento que hayas fallecido, pero agotaste tus ${wrongs} intentos`,
                position: 'bottom'
            })
        }, 1000);

        // alert(`
        // Lo sentimos...
        // intenta de nuevo`);
    }
}


function hideHanged() {
    for (let i = 1; i <= 7; i++) {
        eachHanging = document.getElementById(`hanged${i}`);
        eachHanging.style.opacity = 0;
    }
}


function updateSize() {
    let actualVw = window.innerWidth * 0.01;
    let actualVh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${actualVh}px`);
    document.documentElement.style.setProperty('--vw', `${actualVw}px`);

    // alert(`
    // vw: ${actualVw}
    // vh: ${actualVh}`);
}


function finished() {
    btnTry.setAttribute('hidden', 'true');
    inputWrd.removeAttribute('placeholder');
    btnReset.focus();
}


async function goBack() {

    let quitting = await Swal.fire({
        title: 'Deseas abandonar el juego?',
        text: '(se perderá toda el avance)',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'No, continuaré en el juego',
        confirmButtonText: 'Sí, deseo salir'
    })

    if (quitting.isConfirmed){
        goMainPage();
    }
}


function goMainPage() {
    window.location.href = "./index.html";
}

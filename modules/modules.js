
export async function goBack() {

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


export function goMainPage() {
    window.location.href = "./index.html";
}


export function updateSize() {
    let actualVw = window.innerWidth * 0.01;
    let actualVh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${actualVh}px`);
    document.documentElement.style.setProperty('--vw', `${actualVw}px`);
}


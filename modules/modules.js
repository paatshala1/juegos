
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


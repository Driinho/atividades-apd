const btnMudarTema = document.getElementById('btnMudarTema');
const campoContadorUsuarios = document.getElementById('contadorDeUsuarios');
const body = document.body;

btnMudarTema.addEventListener('click', mudarTema);

window.onload = () => {
    if(!localStorage.getItem('contadorDeUsuarios')) {
        localStorage.setItem('contadorDeUsuarios', 1);
    } else {
        let contadorDeUsuarios = localStorage.getItem('contadorDeUsuarios');
        contadorDeUsuarios++;
        localStorage.setItem('contadorDeUsuarios', contadorDeUsuarios);
        campoContadorUsuarios.innerHTML = `<div>${contadorDeUsuarios}</div>`;
    }

    if(localStorage.getItem('tema') === 'light'){
        body.style.backgroundColor = 'white';
    } else {
        body.style.backgroundColor = 'gray';
    }
};

function mudarTema() {
    if(localStorage.getItem('tema') === 'light'){
        localStorage.setItem('tema', 'dark');
        console.log(localStorage);
        body.style.backgroundColor = 'gray';
    } else {
        localStorage.setItem('tema', 'light');
        console.log(localStorage);
        body.style.backgroundColor = 'white';
    }
}
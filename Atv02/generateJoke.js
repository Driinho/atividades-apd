const btn = document.getElementById('btn');
const joke = document.getElementById('joke');
const reaction = document.getElementById('reaction');
const img = document.createElement('img');
const btnResponse = document.createElement('button')

btn.addEventListener('click', createJoke);

let piada = '';
let resposta = '';

function createJoke() {
    fetch('https://v2.jokeapi.dev/joke/Any?lang=pt', {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.setup) {
            let piada = data.setup;
            let resposta = data.delivery;

            joke.innerHTML = piada + " ";

            btnResponse.innerHTML = 'Resposta';
            joke.appendChild(btnResponse)
            reaction.innerHTML = '';
            
            btnResponse.addEventListener('click', () => {
                joke.innerHTML = piada + "<br>" + resposta;
                generateReaction();
            })
        } else {
            joke.innerHTML = data.joke;
        }
    })
}

async function generateReaction() {
    await fetch('https://api.thecatapi.com/v1/images/search', {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        img.src = data[0].url;
        img.style.width = '300px';
        img.style.height = '300px';
        reaction.appendChild(img);
    })
}
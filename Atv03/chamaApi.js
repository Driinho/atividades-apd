// Obtém uma referência ao elemento da tabela onde os personagens serão exibidos.
const corpoTabelaPersonagens = document.getElementById('corpoTabelaPersonagens');

// Função que busca os dados da API e preenche a tabela com os usuarios.

function limparTabela() {
    // Remove todas as linhas existentes da tabela
    while (corpoTabelaPersonagens.firstChild) {
        corpoTabelaPersonagens.removeChild(corpoTabelaPersonagens.firstChild);
    }
}

function buscarDadosEPreencherTabela() {
    // Faz uma requisição GET para a API.
    axios.get('http://localhost:5000/listarTodosUsuarios')
        .then(response => {
            console.log(response.data)

            // Obtém a lista de usuários da resposta.
            const usuarios = response.data.usuarios;

            // Chama a função para preencher a tabela com os usuários.
            preencherTabela(usuarios);
        })
        .catch(error => {
            // Em caso de erro, exibe uma mensagem de erro no console.
            console.error('Error fetching character data:', error);
        });
}

// Função que preenche a tabela com os dados dos usuários.
function preencherTabela(usuarios) {
    limparTabela()
    // Para cada usuário na lista...
    usuarios.forEach(usuario => {
        // Cria uma nova linha na tabela.
        const linha = document.createElement('tr');

        // Cria células para cada dado do usuário e insere o texto.
        const idCelula = document.createElement('td');
        idCelula.textContent = usuario.id;
        linha.appendChild(idCelula);

        // Cria células para cada dado do usuário e insere o texto.
        const nomeCelula = document.createElement('td');
        nomeCelula.textContent = usuario.nome;
        linha.appendChild(nomeCelula);

        const emailCelula = document.createElement('td');
        emailCelula.textContent = usuario.email;
        linha.appendChild(emailCelula);

        const disciplinaCelula = document.createElement('td');
        disciplinaCelula.textContent = usuario.disciplina;
        linha.appendChild(disciplinaCelula);

        // Cria células para os botões de editar e excluir.
        const acoesCelula = document.createElement('td');
        const editarBotao = document.createElement('a');
        editarBotao.href = '#';
        editarBotao.className = 'btn btn-primary btn-edit';
        editarBotao.textContent = 'Editar';
        editarBotao.dataset.id = usuario.id;
        acoesCelula.appendChild(editarBotao);

        const excluirBotao = document.createElement('a');
        excluirBotao.href = '#';
        excluirBotao.className = 'btn btn-danger btn-delete';
        excluirBotao.textContent = 'Excluir';
        excluirBotao.dataset.id = usuario.id;
        acoesCelula.appendChild(excluirBotao);

        linha.appendChild(acoesCelula);

        // Adiciona a linha preenchida à tabela.
        corpoTabelaPersonagens.appendChild(linha);
    });
}


// Obtém uma referência ao botão que chama a API.
const botaoChamarAPI = document.getElementById('botaoChamarAPI');
// Adiciona um ouvinte de evento para o clique no botão.
botaoChamarAPI.addEventListener('click', () => {
    // Quando o botão é clicado, chama a função para buscar dados e preencher a tabela.
    buscarDadosEPreencherTabela();

});

function cadastrarUsuario(nome, email, disciplina, senha) {
    const novoUsuario = {
        nome: nome,
        email: email,
        disciplina: disciplina,
        senha: senha
    }

    axios.post('http://localhost:5000/cadastrarUsuario', novoUsuario, {
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {
        console.log('Usuário cadastrado com sucesso!', response.data);

        $('#cadastrarUsuario').modal('hide');

        alert('Usuario cadastrado com sucesso!');

        buscarDadosEPreencherTabela()
    })
    .catch(err => {
        alert('Erro ao cadastrar uauario: ', err);
    })
};

document.querySelector('#btnCadastrarUsuario').addEventListener('click', function () {

    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const disciplina = document.querySelector('#disciplina').value;
    const senha = document.querySelector('#senha').value;

    cadastrarUsuario(nome, email, disciplina, senha);
});

function deletarUsuario(id) {
    axios.delete(`http://localhost:5000/deletarUsuario/${id}`)
        .then(response => {
            buscarDadosEPreencherTabela()
        })
        .catch(err => {
            console.log(err)
        });
};

document.addEventListener('click', function (event) {
    if(event.target && event.target.classList.contains('btn-delete')) {
        const idUsuario = event.target.dataset.id;
        deletarUsuario(idUsuario);
    }
});

function editarUsuario(id, nome, email, disciplina) {
    const usuario = {
        "nome": nome,
        "email": email,
        "disciplina": disciplina
    }

    axios.put(`http://localhost:5000/atualizarUsuario/${id}`, usuario)
        .then(response => {
            buscarDadosEPreencherTabela()
        })
        .catch(err => {
            console.log(err)
        });
};

document.querySelector('#btnEditarUsuario').addEventListener('click', function (event) {

    const idUsuario = document.querySelector('#idUsuario').value;
    const nome = document.querySelector('#nomeEdit').value;
    const email = document.querySelector('#emailEdit').value;
    const disciplina = document.querySelector('#disciplinaEdit').value;

    $('#editarUsuario').modal('hide');

    editarUsuario(idUsuario, nome, email, disciplina);
})

document.addEventListener('click', async function (event) {
    if(event.target && event.target.classList.contains('btn-edit')) {
        const idUsuario = event.target.dataset.id;
        let usuario = {};

        await axios.get(`http://localhost:5000/pegarUsuarioPeloId/${idUsuario}`)
            .then(response => {
                usuario = response.data.usuario;
            })
            .catch(err => {
                console.log(err)
            })

        $('#editarUsuario').modal().show();

        document.querySelector("#idUsuario").value = usuario.id;
        document.querySelector('#nomeEdit').value = usuario.nome;
        document.querySelector('#emailEdit').value = usuario.email;
        document.querySelector('#disciplinaEdit').value = usuario.disciplina;
    }
})

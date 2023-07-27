// pegando elementos do html pelo atributo
const formulario = document.getElementById('form')
const todoInput = document.getElementById('todo')
const lista = document.getElementById('list')
const CHAVE_DADOS_OFFLINE = "TODOLIST";
const todoList = pegarDadosOffline();
renderizarLista()
// se inscrevendo no evento de submit do formulário
formulario.addEventListener('submit', function (event) {
    event.preventDefault() // impedindo o comportamento padrão
    const value = todoInput.value.trim()
    if (value === '') {
        alert('Campo em branco!')
        return;
    }

    //mapeando lista de dados e convertendo tudo pra maiúscula
    const todoListUppercase = todoList.map(function (item) {
        return item.toUpperCase();
    });

    //verificando se o dado já está incluso na list - caps sensitive
    const jaExisteNaPilha = todoListUppercase.includes(value.toUpperCase());
    if (jaExisteNaPilha) {
        alert("O valor já foi inserido!");
        return;
    }

    todoList.push(value)

    todoInput.value = '' // limpando o atributo pra botar mais dado depois etc
    renderizarLista()

})

function renderizarLista() {
    lista.innerHTML = ''

    for (let index = 0; index < todoList.length; index += 1) { //percorrendo a lista item a item (loop)
        const itemDaLista = todoList[index]
        //adicionando o elemento no html referente ao item atual - lá pro user
        lista.innerHTML += `
        <div class ="todo-item">
            <span>${itemDaLista}</span>
            <button type="button" onclick="removerTodoItem(${index})">x</button>
        </div>
    `;
    }
    salvarOffline()
}

function removerTodoItem(index) {
    const todoItem = todoList[index]
    const isDeletar = confirm(`Deseja realmente remover a tarefa "${todoItem}"?`)
    if (isDeletar) {
        todoList.splice(index, 1)
        console.log(todoList)
    }
    renderizarLista()
}

function salvarOffline() {
    //convertendo array pra string pra depois voltar o string pra array
    const todoListString = JSON.stringify(todoList)
    localStorage.setItem(CHAVE_DADOS_OFFLINE, todoListString)
}

function pegarDadosOffline() {
    const dadosOffline = localStorage.getItem(CHAVE_DADOS_OFFLINE)
    console.log('salvo no navegador', dadosOffline)

    if (dadosOffline === null) return []

    const array = JSON.parse(dadosOffline)
    console.log('depois de ser convertido de string para array', array)

    return array
}
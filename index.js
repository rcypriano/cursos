// pegando elementos do html pelo atributo
const formulario = document.getElementById('form')
const todoInput = document.getElementById('todo')
const todoList = []
const lista = document.getElementById('list')

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

console.log(value)
lista.innerHTML = ''

for (let index = 0; index <todoList.length; index += 1) { //percorrendo a lista item a item (loop)
    const itemDaLista = todoList[index]
    //adicionando o elemento no html referente ao item atual - lá pro user
    lista.innerHTML += `
        <div class ="todo-item">
            <span>${itemDaLista}</span>
            <button type="button" onclick="removerTodoItem(${index})">x</button>
        </div>
    `;
}

})
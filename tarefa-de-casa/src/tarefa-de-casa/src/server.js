const todolistJson = require('./models/todolist.json') // acessando o todolist.json
const express = require('express')
const app = express()

app.use(express.json())

app.listen(8080, () => {
    console.log ("servidor na porta 8080")
})

app.get ("/", (Request, response) => {
    response.status(200).json([
        {
            "mensagem": "deu certo :)"
        }
    ])
})

app.get("/lista", (request, response) => {
    response.status(200).send(todolistJson)
})

app.get("/lista/buscar/:id", (request, response) => {
    let idRequest = request.params.id

    let listaEncontrada = todolistJson(lista => lista.id == idRequest)

    response.status(200).send(listaEncontrada)
})

app.get("/lista/filtro", (request, response) => {

    let tituloRequest = request.query.titulo.toLocaleLowerCase()
    console.log(tituloRequest)

    let listaEncontrada = todolistJson.filter(
        filme => filme.title.toLocaleLowerCase().includes(tituloRequest)
    )

    response.status(200).send(listaEncontrada)

});

app.post("/lista", (request, response) => {

    let tituloRequest = request.body.title
    let descricaoRequest = request.body.content

    let novaLista = {
        id: (todolistJson.length) + 1,
        title: tituloRequest,
        content: descricaoRequest
    }

    todolistJson.push(novaLista)

    response.status(201).json(
        [{
            "mensagem": "Sua lista foi cadastrada ;)",
            novaLista
        }]

    )


})
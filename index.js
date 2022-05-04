//importando con common js
const http = require("http")

let notes = [
  {
    "id": 1,
    "content": "Me tengo que suscribir amidudeb.",
    "date": "2019-05-30T17:30:31.098Z",
    "importnant": true
  },
  {
    "id": 2,
    "content": "Tengo que estudiar para ser full stack.",
    "date": "2019-05-30T18:30:31.098Z",
    "importnant": false
  },
  {
    "id": 3,
    "content": "Resolver retos.",
    "date": "2019-05-30T19:30:31.098Z",
    "importnant": true
  },
]

//creando servidor
const app = http.createServer((request, response) => {
  //pasamos un callback
  response.writeHead(200, {"Content-Type" : "application/json"})
  //Exportamos el array de notes 
  response.end(JSON.stringify(notes))
})

//iniciando servidor en el puerto 3001
const PORT = 3001
app.listen(PORT)

console.log(`Server running on port ${PORT}`)
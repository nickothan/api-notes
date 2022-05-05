/* //importando con common js
const http = require("http")
//creando servidor
const app = http.createServer((request, response) => {
  //pasamos un callback
  response.writeHead(200, {"Content-Type" : "application/json"})
  //Exportamos el array de notes 
  response.end(JSON.stringify(notes))
}) */

const { request, response } = require("express");
const express = require("express");
const cors = require("cors");

const app = express();
const logger = require("./loggerMiddleware");

app.use(cors());
app.use(express.json());

app.use(logger);

let notes = [
	{
		id: 1,
		content: "Me tengo que suscribir amidudeb en youtube.",
		date: "2019-05-30T17:30:31.098Z",
		importnant: true,
	},
	{
		id: 2,
		content: "Tengo que estudiar para ser full stack.",
		date: "2019-05-30T18:30:31.098Z",
		importnant: false,
	},
	{
		id: 3,
		content: "Resolver retos.",
		date: "2019-05-30T19:30:31.098Z",
		importnant: true,
	},
];

// Peticion get
app.get("/", (request, response) => {
	response.send("<h1>Hello word</h1>");
});

app.get("/api/notes", (request, response) => {
	response.json(notes);
});
/*  maneras de usar app
.get
.post
.del
.put */

// Recuperar objeto por su id
app.get("/api/notes/:id", (request, response) => {
	const id = Number(request.params.id);
	const note = notes.find((note) => note.id === id);

	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}
});

//Eliminar objeto por su id
app.delete("/api/notes/:id", (request, response) => {
	const id = Number(request.params.id);
	notes = notes.filter((note) => note.id === id);
	// Estado de nada en el array
	response.status(204).end();
});

// Crear nota
app.post("/api/notes", (request, response) => {
	const note = request.body;

	if (!note || !note.content) {
		return response.status(404).json({
			error: "note.content is missing",
		});
	}

	//buscar id mas alto
	const ids = notes.map((note) => note.id);
	const maxId = Math.max(...ids);

	// Creando el objeto
	const newNote = {
		id: maxId + 1,
		content: note.content,
		importnant:
			typeof note.importnant === "undefined" ? note.importnant : false,
		date: new Date().toISOString(),
	};

	//Agregando el objeto en la ultima posicion
	//notes = notes.concat(newNote)
	notes = [...notes, newNote];

	response.status(201).json(newNote);
});

app.use((request, response) => {
	response.status(404).json({
		error: "Not found.",
	});
});

//iniciando servidor en el puerto 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(express.static("build"));
app.use(express.json());
morgan.token("req_post", function(req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :req_post"));
app.use(cors());

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  });
});

app.get("/api/info", (req, res) => {
  Person.find({}).then(persons => {
    res.send(`Phonebook has info for ${persons.length} people.\n${new Date()}`);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person.toJSON());
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "Name missing."
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "Number missing."
    });
  }

  //if (persons.some(person => person.name === body.name)) {
  //  return response.status(400).json({
  //    error: "Name must be unique."
  //  });
  //}

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON());
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

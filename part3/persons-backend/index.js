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

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

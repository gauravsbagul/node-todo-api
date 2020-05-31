/** @format */
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");

const app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text,
  });

  todo.save().then(
    (doc) => {
      console.log("TCL:: doc", doc);
      res.send(doc);
    },
    (err) => {
      res.status(400).send(err);
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    (todos) => {
      res.send({ todos });
    },
    (e) => {
      res.status(400).send(e);
    }
  );
});

app.get("/todo/:id", (req, res) => {
  console.log("TCL:: /todo/:id req", req);
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ error: "Not a valid id" });
  }

  Todo.findById({
    _id: id,
  }).then(
    (todo) => {
      if (!todo) {
        return res.status(404).send({ error: "Id does not match" });
      }
      res.send({ todo });
    },
    (err) => {
      console.log("TCL:: err", err);
      res.status(404).send(err);
    }
  );
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});

module.exports = { app };

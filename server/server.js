/** @format */

require("./config/config");

const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const _ = require("lodash");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");
const { authenticate } = require("./middleware/authenticate");
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text,
  });

  todo.save().then(
    (doc) => {
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
      res.status(404).send(err);
    }
  );
});

app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ error: "Not a valid id" });
  }

  Todo.findByIdAndRemove({
    _id: id,
  }).then(
    (todo) => {
      if (!todo) {
        return res
          .status(404)
          .send({ error: "findByIdAndRemove Id does not match" });
      }
      res.send({ todo, message: "findByIdAndRemove removed " });
    },
    (err) => {
      res.status(404).send(err);
    }
  );
});

app.patch("/todo/:id", (req, res) => {
  const { id } = req.params;

  var body = _.pick(req.body, ["text", "completed"]);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ error: "Not a valid id" });
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then(
    (todo) => {
      if (!todo) {
        return res.status(404).send({ message: "Todo not found" });
      }
      res.send({ todo });
    },
    (err) => {
      res.status(400).send();
    }
  );
});

//POST users
app.post("/users", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);

  var user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then((token) => {
      res.header("x-auth", token).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.post("/users/login", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);

  User.finByCredentials(body.email, body.password)
    .then((user) => {
      user.generateAuthToken().then((token) => {
        res.send({ user, token });
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });

  // res.send(body);
});

app.listen(port, () => {
  console.log(`Started up at ${port}`);
});

module.exports = { app };

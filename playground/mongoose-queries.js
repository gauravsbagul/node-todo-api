/** @format */

const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

const id = "5ed35ae63d49b56ed172c05b";

if (!ObjectID.isValid(id)) {
  console.log("Id is not valid");
}

Todo.find({
  _id: id,
}).then((todos) => {
  console.log("TCL:: todos", JSON.stringify(todos, undefined, 2));
});

Todo.findOne({
  completed: false,
}).then((todo) => {
  console.log("TCL:: todo", JSON.stringify(todo, undefined, 2));
});

Todo.findById(id)
  .then((todoById) => {
    if (!todoById) {
      return console.log("Id not found");
    }
    console.log("TCL:: todoById", JSON.stringify(todoById, undefined, 2));
  })
  .catch((err) => {
    console.log("TCL::todoById err", err);
  });

User.findById(id)
  .then((userById) => {
    if (!userById) {
      return console.log("Id not found");
    }
    console.log("TCL:: userById", JSON.stringify(userById, undefined, 2));
  })
  .catch((err) => {
    console.log("TCL::userById err", err);
  });

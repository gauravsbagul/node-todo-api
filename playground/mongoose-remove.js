/** @format */

const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");
const { User } = require("../server/models/user");

// Todo.remove({}).then((res) => {
//   console.log("TCL:: res", res);
// });

Todo.findOneAndRemove({ _id: "5ed39c29705100242089a441" }).then((todo) => {
  console.log("TCL:: findOneAndRemove removed", todo);
});
Todo.findByIdAndRemove("5ed39c29705100242089a441").then((todo) => {
  console.log("TCL:: findByIdAndRemove removed", todo);
});

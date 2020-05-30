/** @format */

const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("TCL:Unable to connect to MongoDB server err", err);
  }

  db.collection("Users").deleteMany({
    name: "Gaurav",
  });
  db.collection("Users")
    .findOneAndDelete({
      _id: new ObjectID("5eca4e4642aa7c12d9612044"),
    })
    .then((result) => {
      console.log("TCL:: result", JSON.stringify(result, undefined, 2));
    });

  //   db.collection("Todos")
  //     .findOneAndDelete({
  //       completed: false,
  //     })
  //     .then((res) => {
  //       console.log("TCL:: Todos res", res);
  //     });
  //   db.close();
});

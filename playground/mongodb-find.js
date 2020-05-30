/** @format */

const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("TCL:Unable to connect to MongoDB server err", err);
  }

  //   db.collection("Todos")
  //     .find({
  //       _id: new ObjectID("5eca4cd97e4421842cb33814"),
  //     })
  //     .toArray()
  //     .then(
  //       (docs) => {
  //         console.log("TCL:: doc", JSON.stringify(docs, undefined, 2));
  //       },
  //       (err) => {
  //         console.log("TCL:: Unable to fetch todos err", err);
  //       }
  //     );

  console.log("COnnected to MongoDB server");
  //   db.collection("Todos")
  //     .find()
  //     .count()
  //     .then(
  //       (count) => {
  //         console.log("TCL:: Todos  count", count);
  //       },
  //       (err) => {
  //         console.log("TCL:: Unable to fetch todos err", err);
  //       }
  //     );
  db.collection("Users")
    .find({ name: "Gaurav" })
    .toArray()
    .then(
      (docs) => {
        console.log("TCL:: Users  docs", JSON.stringify(docs, undefined, 2));
      },
      (err) => {
        console.log("TCL:: Unable to fetch todos err", err);
      }
    );
  //   db.close();
});

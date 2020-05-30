/** @format */

const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("TCL:Unable to connect to MongoDB server err", err);
  }

  console.log("COnnected to MongoDB server");

  db.collection("Todos").insertOne(
    {
      text: "Something to do",
      completed: false,
    },
    (err, result) => {
      if (err) {
        return console.log("Unable to insert", err);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
    }
  );
  db.collection("Users").insertOne(
    {
      name: "Gaurav",
      age: 26,
      location: "Nasik",
    },
    (err, result) => {
      if (err) {
        return console.log("Unable to insert", err);
      }
      console.log(
        JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2)
      );
    }
  );

  db.close();
});

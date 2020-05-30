/** @format */

const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("TCL:Unable to connect to MongoDB server err", err);
  }

  //   db.collection("Todos")
  //     .findOneAndUpdate(
  //       {
  //         _id: new ObjectID("5eca50ed920f0f99ce35b905"),
  //       },
  //       {
  //         $set: {
  //           completed: false,
  //         },
  //       },
  //       {
  //         returnOriginal: false,
  //       }
  //     )
  //     .then((res) => {
  //       console.log("TCL:: res", res);
  //     });

  db.collection("Users")
    .findOneAndUpdate(
      {
        _id: new ObjectID("5eca4d711bdc92fc2080710f"),
      },
      {
        $inc: {
          age: -30,
        },
      },
      {
        returnOriginal: false,
      }
    )
    .then((res) => {
      console.log("TCL:: res", res);
    });
  console.log("COnnected to MongoDB server");

  //   db.close();
});

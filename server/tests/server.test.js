/** @format */

const expect = require("expect");
const request = require("superTest");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");
const { User } = require("./../models/user");

const todos = [
  {
    text: "First test todo",
  },
  {
    text: "Second test todo",
  },
];

beforeEach((done) => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", (done) => {
    var text = "Test todo text";

    request(app)
      .post("/todos")
      .send({
        text,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          console.log("TCL::Error while saving todo err", err);
          return done(err);
        }

        Todo.find({ text })
          .then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch((err) => {
            console.log("TCL:: err", err);
            done(err);
          });
      });
  });

  it("should not create todo with invalid body data", (done) => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        console.log("TCL:: res", res);
        if (err) {
          console.log("TCL:: err", err);
          return done(err);
        }
        Todo.find()
          .then((todos) => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch((err) => done(err));
      });
  });
});

// describe("GET /todo", () => {
//   it("should get all todo", (done) => {
//     request(app)
//       .get("todos")
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todos.length).toBe(2);
//       })
//       .end(done);
//   });
// });
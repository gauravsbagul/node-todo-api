/** @format */

var SHA256 = require("crypto-js/sha256");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var password = "123abc";

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log("TCL:: hash", hash);
  });
});

var hashedPassword =
  "$2a$10$GLtX9qH3Z.YDfbJgi9dB8OZWiHgrRavgGaA5meJDPAcapeShUqj.a";

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log("TCL:: res", res);
});
// var data = {
//   id: 10,
// };

// var token = jwt.sign(data, "123abc");
// console.log("TCL:: token", token);

// var decoded = jwt.verify(token, "123abc");
// console.log("TCL:: decoded", decoded);
// var message = "I am user number 3";
// console.log("TCL:: message", message);

// var hash = SHA256(message).toString();
// console.log("TCL::SHA256(message) hash", hash);

// var data = {
//   id: 4,
// };

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "someSecret").toString(),
// };
// console.log("TCL:: token", token);

// var resultHash = SHA256(JSON.stringify(token.data) + "someSecret").toString();

// // token.data.id = 5;

// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// if (resultHash === token.hash) {
//   console.log("TCL:: data was not change");
// } else {
//   console.log("data was changed don't trust");
// }

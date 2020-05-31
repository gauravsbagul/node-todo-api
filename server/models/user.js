/** @format */
const jwt = require("jsonwebtoken");
const validator = require("validator");
const mongoose = require("mongoose");
const _ = require("lodash");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not valid",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ["_id", "email"]);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = "auth";
  var token = jwt
    .sign(
      {
        _id: user._id.toHexString(),
        access,
      },
      "abc123"
    )
    .toString();
  console.log("TCL:: UserSchema.methods.generateAuthToken -> token", token);
  user.tokens.push({ access, token });
  user.save().then((token) => {
    return token;
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };

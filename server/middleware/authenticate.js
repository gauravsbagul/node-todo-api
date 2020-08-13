/** @format */

var { User } = require("./../models/user");

var authenticate = (req, res, next) => {
  // console.log("TCL:: authenticate -> req", req);
  var token = req.header("x-auth");

  // console.log("TCL:: authenticate -> token", token);
  User.findByToken(token)
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch((e) => {
      // console.log("TCL:: authenticate -> e", e);
      res.status(401).send(e);
    });
};

module.exports = { authenticate };

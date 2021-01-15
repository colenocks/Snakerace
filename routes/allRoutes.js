const {
  signUpPlayer,
  loginPlayer,
  logoutPlayer,
} = require("../controllers/player");

const routes = function (app) {
  app.route("/signup").post(signUpPlayer);
  app.route("/login").post(loginPlayer);
  app.route("/logout").get(logoutPlayer);
};

module.exports = routes;

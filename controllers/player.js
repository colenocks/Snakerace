const mongoose = require("mongoose");
const { playerSchema } = require("../models/playerModel");
const { stringToLowerCase } = require("../utility/utility");

const Player = mongoose.model("Player", playerSchema);

exports.signUpPlayer = (req, res) => {
  const user = stringToLowerCase(req.body);
  let newPlayer = new Player(user);
  //check if player exists
  newPlayer.save((err, player) => {
    if (!player) {
      res.json({ errMessage: "-> Sign up error please try again!" });
      return;
    }
    res.json({ message: "You have signed up successfully!" });
  });
};

exports.loginPlayer = (req, res) => {
  const user = stringToLowerCase(req.body);
  const { username, password } = user;
  Player.findOne({ username: username, password: password }, (err, player) => {
    if (!player) {
      res.json({ errMessage: "Username or password incorrect" });
      return;
    }
    req.session.userId = player._id;
    res.json({
      user_session: player._id,
      username: player.username,
    });
  });
};

exports.logoutPlayer = (req, res) => {
  if (req.session.userId) {
    req.session.destroy();
  }
  res.json({ message: "You have logged out succesfully" });
};

// exports.getAllPlayers = (req, res) => {
//   Player.find({}, (err, player) => {
//     if (!player) {
//       res.json({ errMessage: "-> Could not fetch players!" });
//     }
//     res.json(player);
//   });
// };

// exports.getPlayerByUsername = (req, res) => {
//   let username = req.params.username;
//   1;
//   Player.findOne({ username: username }, (err, player) => {
//     if (!player) {
//       res.json({ errMessage: "-> Cannot find Player!" });
//     }
//     res.json(player);
//   });
// };

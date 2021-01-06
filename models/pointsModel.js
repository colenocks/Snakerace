const mongoose = require("mongoose");

const Schema = mongoose.Schema;

exports.pointsSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
});

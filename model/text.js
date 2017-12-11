var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var textSchema = new Schema({
  title: String,
  collumnsPerRow: Number,
  collumns: [{
    text: String
  }]
});

var model = mongoose.model('Text', textSchema);

module.exports = model;
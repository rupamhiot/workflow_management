// dataModel.js
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  id: String,
  name: String
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;

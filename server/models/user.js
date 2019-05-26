var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    joined: { type: Date, default: Date.now },
    posts: []
  });

var userModel = mongoose.model('User',userSchema);

module.exports = {
    User : userModel
};

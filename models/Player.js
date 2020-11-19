const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const playerSchema = mongoose.Schema({
    pseudo: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    idUser: {type: String, require: true},
    score: {type: Number, require: false},
    victory: {type: Number, require: true},
    defeat: {type: Number, require: true},
});


playerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Player', playerSchema);
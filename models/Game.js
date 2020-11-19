const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    player1: {type: String, require: true},
    player2: {type: String, require: false},
    turn: {type: Number, require: true},
    state: {type: Number, require: true}
});

module.exports = mongoose.model('Game', gameSchema);
const mongoose = require('mongoose');

const pawnSchema = mongoose.Schema({
    column: {type: Number, require: true},
    height: {type: Number, require: true},
    playerId: {type: Number, require: true},
    gameId: {type: Number, require: true},
});

module.exports = mongoose.model('Pawn', pawnSchema);
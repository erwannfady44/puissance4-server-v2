const Game = require('../models/Game');
const Player = require('../models/Player');
const Pawn = require('../models/Pawn');

exports.create = (req, res, next) => {
    let turn = Math.floor(Math.random() * 10) % 2;

    const game = new Game({
        player1: req.body.playerId,
        turn: turn,
        state: 0
    });

    game.save()
        .then(() => {
            Player.updateOne({_id: req.body.playerId}, {score: 0})
                .then(() => res.status(201).json({game}));
        })
        .catch(error => res.status(400).json({error}));
}

exports.join = (req, res, next) => {
    Game.findOne({_id: req.body.gameId})
        .then(game => {
            if (game) {
                if (game.state === 0) {
                    Game.updateOne({_id: game._id}, {player2: req.body.playerId, state: 1})
                        .then(() => {
                            Player.updateOne({_id: req.body.playerId}, {score: 0})
                                .then(() => res.status(200).json({game}));
                        }).catch(error => res.status(500).json({error}));
                } else {
                    res.status(401).json({error: 'The game is full'});
                }
            } else
                res.status(404).json({error: 'Cannot find game'});
        })
        .catch(error => res.status(500).json({error}))
}

exports.consult = (req, res, next) => {
    Game.findOne({_id: req.param.idGame})
        .then(game => {
            Player.findOne({
                $or: [
                    {_id: game.player1},
                    {_id: game.player2}
                ],
                $ne: {_id: req.body._id}
            }).then(player => {
                Pawn.find({gameId: game._id})
                    .then(pawns => {
                        res.status(200).json({game, player, pawns});
                    }).catch(error => res.status(500).json({error}));
            })
        }).catch(error => res.status(500).json({error}));
}

exports.waitingGames = (req, res, next) => {
    Game.find({state: 0})
        .then(games => {
            if (games)
                res.status(200).json({games});
            else
                res.status(200).json({error: 'No waiting games'});
        }).catch(error => res.status(500).json({error}));
}

exports.play = (req, res, next) => {
    Pawn.count({column: req.body.column})
        .then(height => {
            const pawn = new Pawn({
                column: req.body.column,
                height: height,
                gameId : req.body.gameId,
                playerId: req.body.playerId
            });

            pawn.save()
                .then(res.status(200))
                .catch(error => res.status(500).json({error}))
        })
}
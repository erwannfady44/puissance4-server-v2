const Player = require('../models/Player');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const keyToken = 'TOKEN';

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const player = new Player({
                pseudo: req.body.pseudo,
                password: hash,
                victory: 0,
                defeat: 0,
            });
            player.save()
                .then(() => res.status(201).json({message: 'Player created'}))
                .catch(error => res.status(400).json(error))
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    Player.findOne({pseudo: req.body.pseudo})
        .then(player => {
            if (!player) {
                return res.status(401).json({error: 'Cannot find player'});
            } else {
                bcrypt.compare(req.body.password, player.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({error: 'wrong password'});
                        }

                        res.status(200).json({
                            userId: player._id,
                            token: jwt.sign(
                                { playerId: player._id },
                                keyToken,
                                { expiresIn: '24h' }
                            )
                        });
                    })
            }
        })
        .catch(error => res.status(500).json(error));
};

exports.getAll = (req, res, next) => {
    Player.find({}, 'id pseudo victory defeat')
        .then(player => res.status(200).json(player))
        .catch(error => res.status(400).json({error}));
};

exports.getUser = (req, res, next) => {
    Player.findOne({_id: req.params.idPlayer}, "pseudo victory defeat")
        .then(function (player) {
            console.log(player);
            res.status(200).json(player)
        })
        .catch(error => res.status(404).json({error}))
};
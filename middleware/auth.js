const jwt = require('jsonwebtoken');
const keyToken = 'TOKEN';

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[0];
        const decodedToken = jwt.verify(token, keyToken);
        const playerId = decodedToken.playerId;

        if (req.body.playerId && req.body.playerId !== playerId)
            throw 'Wrong player ID';
        else
            next();
    } catch (error) {
        res.status(401).json({error: error | 'Not authenticated'});
    }
};
var express = require('express');
var router = express.Router();

const gameCtrl = require("../controllers/game");
const auth = require('../middleware/auth');

router.post('/join', auth, gameCtrl.join);
router.post('/create', auth, gameCtrl.create);
router.post('/:idGame', auth, gameCtrl.consult);
router.post('/:idGame/play', auth, gameCtrl.play);

module.exports = router;
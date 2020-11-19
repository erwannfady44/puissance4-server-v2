var express = require('express');
var router = express.Router();
const playerCtrl = require("../controllers/player");

/*User routes*/
router.post('/signup', playerCtrl.signup);
router.post('/login', playerCtrl.login);
router.get('/', playerCtrl.getAll);
router.get('/:idPlayer', playerCtrl.getUser);

module.exports = router;

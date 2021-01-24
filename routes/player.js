var express = require('express');
var router = express.Router();
const playerCtrl = require("../controllers/player");

/*User routes*/
router.post('/sign-up', playerCtrl.signup);
router.post('/sign-in', playerCtrl.login);
router.get('/', playerCtrl.getAll);
router.get('/:idPlayer', playerCtrl.getUser);

module.exports = router;

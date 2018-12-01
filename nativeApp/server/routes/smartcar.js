var express = require('express');
var router = express.Router();
const smartcar_controller = require('../controllers/smartcar.controller');

/* GET users listing. */
router.get('/', smartcar_controller.getUser);
router.get('/db', smartcar_controller.get);
router.get('/callback', smartcar_controller.add);
router.get('/getToken', smartcar_controller.getAccessToken);
router.get('/getLocation', smartcar_controller.getLocation);

module.exports = router;

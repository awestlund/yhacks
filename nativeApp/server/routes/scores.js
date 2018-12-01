var express = require('express');
var router = express.Router();
const score_controller = require('../controllers/score.controller');

/* GET users listing. */
router.get('/', score_controller.get);
router.post('/', score_controller.add);

module.exports = router;

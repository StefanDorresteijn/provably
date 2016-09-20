/**
 * Created by Stefan on 9/16/2016.
 */


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/onetouch', function(req, res, next) {
    res.render('verifiers/onetouch', { title: 'OneTouch.IO Validator', customClass: 'onetouch' });
});

module.exports = router;

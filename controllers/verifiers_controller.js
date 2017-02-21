/**
 * Created by Stefan on 9/16/2016.
 */


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/onetouch', function(req, res, next) {
    res.render('verifiers/onetouch', { title: 'OneTouch.IO Validator', customClass: 'onetouch' });
});

router.get('/betterbets', function(req, res, next) {
    res.render('verifiers/betterbets', {title: 'BetterBets Verifier'})
})

router.get('/bitdice', function(req, res, next) {
    res.render('verifiers/bitdice', {title: 'BitDice Verifier'})
})

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/index', { title: 'Provably' });
});

/* GET Lottery Explanation Page */
router.get('/lottery', function(req, res, next) {
    res.render('pages/lottery');
});

/* GET Dice Games Explanation Page */
router.get('/dice', function(req, res, next) {
    res.render('pages/dice');
});

/* GET Verifiers Explanation Page */
router.get('/verifiers', function(req, res, next) {
    res.render('pages/verifiers');
});

/* GET About Page */
router.get('/about', function(req, res, next) {
    res.render('pages/about');
});

module.exports = router;

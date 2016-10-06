var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {

    mongoose.model('LotteryDrawing').find({}).sort({endTime: -1}).limit(5).exec(function(err, _drawings)
    {
        if(err) console.log(err);
        //res.send(_drawings);
        res.render('pages/index', { title: 'Provfair.com', drawings: _drawings });
    });
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

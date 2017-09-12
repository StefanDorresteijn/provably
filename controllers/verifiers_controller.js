/**
 * Created by Stefan on 9/16/2016.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/onetouch', function(req, res, next) {
    mongoose.model('LotteryDrawing').find({}).sort({endTime: -1}).exec(function(err, _drawings) {
        res.render('verifiers/onetouch', { title: 'OneTouch.IO Validator', customClass: 'onetouch', drawings: _drawings });        
    })
});

router.get('/betterbets', function(req, res, next) {
    mongoose.model('LotteryDrawing').find({}).sort({endTime: -1}).exec(function(err, _drawings) {
        res.render('verifiers/betterbets', {title: 'BetterBets Verifier', drawings: _drawings })
    })
})

router.get('/bitdice', function(req, res, next) {
    mongoose.model('LotteryDrawing').find({}).sort({endTime: -1}).exec(function(err, _drawings) {
        res.render('verifiers/bitdice', {title: 'BitDice Verifier', drawings: _drawings})
    })
})

module.exports = router;

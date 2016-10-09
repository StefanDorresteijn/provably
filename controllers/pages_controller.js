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

module.exports = router;

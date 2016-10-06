var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var LotteryDrawing = require('../models/lottery_drawing');
var LotteryEntry = require('../models/lottery_entry');

router.get('/', function(req, res, next) {
    LotteryDrawing.getLotteries(req.query.page, req.query.limit, req.query.sortBy, req.query.dir, req.query.state, function(drawings) {
        res.render('lottery/index', {title: "Last Draws", drawings: drawings});
    });
});

router.get('/:id', function(req, res, next) {
    LotteryDrawing.findOne({_id: req.params.id}).populate('entries').exec(function(err, drawing) {
        res.render('lottery/show', {title: drawing.name, drawing: drawing});
        //res.send(drawing);
    });
});

module.exports = router;
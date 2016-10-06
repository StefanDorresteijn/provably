var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var LotteryDrawing = mongoose.model('LotteryDrawing');
var LotteryEntry = mongoose.model('LotteryEntry');

/* GET Lottery Explanation Page */
router.post('/', function(req, res, next) {
    var name = req.body.name,
        email = req.body.email,
        endTime = req.body.end_time,
        maxEntries = req.body.max_entries,
        amountOfWinners = req.body.amount_of_winners,
        secretKey = req.body.secret_key;

    var lotteryDrawing = new LotteryDrawing({name: name, email: email, endTime: endTime, maxEntries: maxEntries, amountOfWinners: amountOfWinners, secretKey: secretKey});

    lotteryDrawing.save(function(err) {
        if (err) console.log(err);
        console.log("Saved Lottery Drawing!");
    });

    console.log(lotteryDrawing);
    res.send(lotteryDrawing);
});

router.get('/', function(req, res, next) {
    LotteryDrawing.getLotteries(req.query.page, req.query.limit, req.query.sortBy, req.query.dir, req.query.state, function(drawings) {
        res.send(drawings);
    });
});

router.get('/:id', function(req, res, next) {
    LotteryDrawing.findOne({_id: req.params.id}).populate('entries').populate('winners').exec(function(err, drawing) {
        res.send(drawing);
    });
});

router.post('/:id/add_entry', function(req, res, next) {
    LotteryDrawing.findOne({_id: req.params.id, email: req.body.email, secretKey: req.body.secret_key}, function(err, drawing) {
        if(err) return err;
        if(drawing === null) return res.send({error: "Could not find lottery"});
        if(drawing.state != 'started') return res.send({error: 'This draw is closed or finished'});
        var entry = new LotteryEntry({ticketId: req.body.ticket_id, drawing: drawing});
        entry.save(function(err, entry) {
            if(err) console.log(err);
            drawing.entries.push(entry);
            drawing.save(function(err, draw) {
                res.send(entry);
            })
        });
    });
});

module.exports = router;
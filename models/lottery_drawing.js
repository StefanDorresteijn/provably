var Chance = require('chance');
var mongoose = require('mongoose');
var LotteryEntry = require('./lottery_entry');

var LotteryDrawingSchema = new mongoose.Schema({
    name: String,
    endTime: Date,
    maxEntries: Number,
    email: String,
    amountOfWinners: Number,
    entries: [{
        type: mongoose.Schema.ObjectId,
        ref: 'LotteryEntry'
    }],
    winners: [{
        type: mongoose.Schema.ObjectId,
        ref: 'LotteryEntry'
    }],
    state: {type: String, default: "started"},
    block: String,
    secretKey: String,
    block_number: Number, default: 0
});

LotteryDrawingSchema.methods.calculateWinners = function(block) {
    console.log("Calculating winners!");
    if(this.entries.length == 0) return false; //TODO: Keep the draw closed but stop calculating winners for this draw
    if(this.entries.length < this.amountOfWinners) return false; //TODO: Keep the draw closed but stop calculating winners for this draw
    var chance = new Chance(block);
    var self = this;
    chance.unique(chance.integer, this.amountOfWinners, {min: 0, max: this.entries.length-1}).forEach(function(chanceValue) {
        console.log("Pushing entry: " + chanceValue);
        self.winners.push(self.entries[chanceValue]);
    });
    this.state = "finished";
    this.block = block;
    this.save();
};

LotteryDrawingSchema.methods.safeJSON = function() {
    return {
        _id: this._id,
        name: this.name,
        endTime: this.endTime,
        maxEntries: this.maxEntries,
        amountOfWinners: this.amountOfWinners,
        entries: this.entries,
        winners: this.winners,
        state: this.state,
        block: this.block
    }
};

LotteryDrawingSchema.methods.addEntry = function(entry) {
    if(this.entries.length < this.maxEntries)
        this.entries.push(entry);
};

LotteryDrawingSchema.statics.getLotteries = function(page, limit, sortBy, direction, state, callback) {
    var lotteries = [],
        start = (page * limit);

    state = state == undefined ? 'started' : state;
    page = page == undefined ? 0 : page;
    limit = limit == undefined ? 10 : limit;
    sortBy = sortBy == undefined ? 'name' : sortBy;
    direction = direction == undefined ? 'asc' : direction;
    direction = direction == "asc" ? "" : "-";

    var sortByAndDirection = direction + sortBy;

    LotteryDrawing.find({state: state}, {email: 0, secretKey: 0}).sort(sortByAndDirection).skip(start).limit(limit).exec(function(err, docs) {
       if(!err) {
           return callback(docs);
       } else {
           console.log(err);
       }
    });
};

LotteryDrawingSchema.statics.states = function() {
    return [
        'started',
        'closed',
        'finished'
    ]
};

LotteryDrawingSchema.statics.getEnded = function(callback) {
    return LotteryDrawing
        .where("endTime").lt(new Date())
        .where('state').equals('started')
        .exec(callback);
};

LotteryDrawingSchema.statics.getClosed = function(callback) {
    return LotteryDrawing
        .where('state').equals('closed')
        .exec(callback);
};

var LotteryDrawing = mongoose.model('LotteryDrawing', LotteryDrawingSchema);

module.exports = LotteryDrawing;
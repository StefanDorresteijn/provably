var Chance = require('chance');
var LotteryDrawingSchema = new Schema({
    endTime: [Date],
    maxEntries: [Number],
    email: [String],
    amountOfWinners: [Number],
    entries: [{
        type: Schema.types.ObjectId,
        ref: LotteryEntry
    }],
    winners: [{
        type: Schema.types.ObjectId,
        ref: LotteryEntry
    }],
    state: {type: String, default: "started"}
});

LotteryDrawingSchema.methods.calculateWinners = function(block) {
    var chance = new Chance(block);
    var self = this;
    chance.unique(chance.integer, this.amountOfWinners, {min: 0, max: this.entries.length-1}).forEach(function(chanceValue) {
       self.winners.push(self.entries[chanceValue]);
    });
};

LotteryDrawingSchema.statics.states = function() {
    return [
        'started',
        'closed',
        'finished'
    ]
};

LotteryDrawingSchema.statics.getEnded = function() {
    return this.where("endTime").lt(new Date());
};



var LotteryDrawing = mongoose.model('LotteryDrawing', LotteryDrawingSchema);
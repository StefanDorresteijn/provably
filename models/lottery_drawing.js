var LotteryDrawingSchema = new Schema({
    endTime: [Date],
    maxEntries: [Number],
    email: [String],
    amountOfWinners: [Number],
    entries: [{
        type: Schema.types.ObjectId,
        ref: LotteryEntry
    }],
    winners: [],
    state: [String]
});

LotteryDrawingSchema.methods.calculateWinners = function(block) {
    calculatedWinners = [];
    while(calculatedWinners.length < this.amountOfWinners)
    {
        var amountofChars = calculatedWinners.length + 7;
        var blockHex = block.slice(-Math.abs(amountofChars), amountofChars);
        var blockInt = parseInt(blockHex, 16);
        var modulus = blockInt % (entries.length - 1);
        calculatedWinners.push(modulus);
    }

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
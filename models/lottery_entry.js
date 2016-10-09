var mongoose = require('mongoose');
var LotteryDrawing = require('./lottery_drawing');

var LotteryEntrySchema = new mongoose.Schema({
    drawing : {
        type: mongoose.Schema.ObjectId,
        ref: 'LotteryDrawing'
    },
    ticketId: String
});

LotteryEntrySchema.methods.safeJSON = function() {
    return {
        _id: this._id,
        ticketId: this.ticketId
    }
};


var LotteryEntry = mongoose.model('LotteryEntry', LotteryEntrySchema);

module.exports = LotteryEntry;
var LotteryEntrySchema = new Schema({
    drawing : {
        type: Schema.types.ObjectId,
        ref: LotteryDrawing
    }
});

var LotteryEntry = mongoose.model('LotteryEntry', LotteryEntrySchema);
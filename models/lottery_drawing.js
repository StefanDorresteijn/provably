var LotteryDrawingSchema = new Schema({
    entries: [{
        type: Schema.types.ObjectId,
        ref: LotteryEntry
    }]
});

var LotteryDrawing = mongoose.model('LotteryDrawing', LotteryDrawingSchema);
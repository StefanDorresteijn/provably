var LotteryDrawing = require("../models/lottery_drawing");

module.exports = function() {
    var CronJob = require('cron').CronJob;
    new CronJob('0 */1 * * * *', function () {
        console.log("Closing lotteries");
        LotteryDrawing.getEnded(function (err, drawings) {
            drawings.forEach(function (drawing, index) {
                drawing.state = "closed";
                drawing.save();
            });
        });
    }, null, true, 'America/Los_Angeles');
}
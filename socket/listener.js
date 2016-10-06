/**
 * Created by Stefan on 9/20/2016.
 */

var socket = require('socket.io-client')('https://blockexplorer.com/');
var LotteryDrawing = require('../models/lottery_drawing');

module.exports = function(app) {
    socket.on('connect', function(){
        socket.emit('subscribe', 'inv');
        console.log("Connected to BlockExplorer")
    });
    socket.on('block', function(data){
        console.log("New block: " + data);
        LotteryDrawing.getClosed(function(err, drawings) {
            drawings.forEach(function(drawing, index) {
                if(drawing.block_number == 2)
                    drawing.calculateWinners(data);
                else {
                    drawing.block_number++;
                    drawing.save();
                }
            });
        });
        // This is when we select all lotteries that ran out but haven't been finished yet
    });
    socket.on('disconnect', function(){
        console.log("Disconnected from BlockExplorer")
    });
}
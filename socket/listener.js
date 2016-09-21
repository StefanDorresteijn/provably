/**
 * Created by Stefan on 9/20/2016.
 */

var socket = require('socket.io-client')('https://blockexplorer.com/');

module.exports = function(app) {
    socket.on('connect', function(){
        socket.emit('subscribe', 'inv');
        console.log("Connected to BlockExplorer")
    });
    socket.on('block', function(data){
        console.log("New block: " + data);
        // This is when we select all lotteries that ran out but haven't been finished yet
    });
    socket.on('disconnect', function(){
        console.log("Disconnected from BlockExplorer")
    });
}
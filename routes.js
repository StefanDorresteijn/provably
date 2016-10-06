/**
 * Created by Stefan on 9/20/2016.
 */

var pages = require('./controllers/pages_controller');
var verifiers = require('./controllers/verifiers_controller');
var lottery_tools = require('./controllers/api/v1/lottery_controller');
var lottery_frontend = require('./controllers/lottery_controller');

module.exports = function(app) {
    app.use('/', pages);
    app.use('/verifiers/', verifiers);
    app.use('/lottery_tools/', lottery_frontend);
    app.use('/api/v1/lottery_tool/', lottery_tools);
}
/**
 * Created by Stefan on 9/20/2016.
 */

var pages = require('./controllers/pages_controller');
var verifiers = require('./controllers/verifiers_controller');

module.exports = function(app) {
    app.use('/', pages);
    app.use('/verifiers/', verifiers);
}
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntryList = function (_React$Component) {
    _inherits(EntryList, _React$Component);

    function EntryList(props) {
        _classCallCheck(this, EntryList);

        var _this = _possibleConstructorReturn(this, (EntryList.__proto__ || Object.getPrototypeOf(EntryList)).call(this, props));

        _this.state = {
            entries: [],
            ticket_id: '',
            secret_key: '',
            email: ''
        };
        _this.addEntry = _this.addEntry.bind(_this);
        return _this;
    }

    _createClass(EntryList, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.serverRequest = $.get("/api/v1/lottery_tool/" + this.props.drawing_id.replace(/['"]+/g, ''), function (result) {
                this.setState({
                    entries: result.entries,
                    timestamp: Date.now()
                });
            }.bind(this));
        }
    }, {
        key: 'addEntry',
        value: function addEntry(e) {
            e.preventDefault();
            var self = this;
            $.ajax({
                url: "/api/v1/lottery_tool/" + self.props.drawing_id.replace(/['"]+/g, '') + "/add_entry",
                dataType: 'json',
                type: 'POST',
                data: { ticket_id: self.state.ticket_id, secret_key: self.state.secret_key, email: self.state.email },
                cache: false,
                success: function (data) {
                    this.setState({ entries: self.state.entries.concat(data), timestamp: Date.now() });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                }.bind(this)
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.serverRequest.abort();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-md-8' },
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Entries',
                        _react2.default.createElement(
                            'small',
                            null,
                            ' (',
                            this.state.entries.length,
                            ')'
                        )
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'list-group' },
                        this.state.entries.map(function (entry) {
                            return _react2.default.createElement(
                                'li',
                                { className: 'list-group-item', key: entry._id },
                                entry.ticketId === undefined ? entry._id : entry.ticketId
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-md-4' },
                    _react2.default.createElement(
                        'p',
                        null,
                        'To add an entry, please fill in the secret key and email you used to create this lottery.'
                    ),
                    _react2.default.createElement(
                        'form',
                        { action: '', method: 'post', onSubmit: this.addEntry },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'ticket_id' },
                                'Ticket ID'
                            ),
                            _react2.default.createElement('input', { id: 'ticket_id', type: 'text', key: this.state.timestamp, name: 'ticket_id', className: 'form-control', onChange: function onChange(e) {
                                    return _this2.setState({ ticket_id: e.target.value });
                                } })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'secret_key' },
                                'Secret Key'
                            ),
                            _react2.default.createElement('input', { id: 'secret_key', type: 'text', name: 'secret_key', className: 'form-control', onChange: function onChange(e) {
                                    return _this2.setState({ secret_key: e.target.value });
                                } })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'secret_key' },
                                'Email'
                            ),
                            _react2.default.createElement('input', { id: 'email', type: 'email', name: 'email', className: 'form-control', onChange: function onChange(e) {
                                    return _this2.setState({ email: e.target.value });
                                } })
                        ),
                        _react2.default.createElement(
                            'button',
                            { type: 'submit', className: 'btn btn-default' },
                            'Add Entry'
                        )
                    )
                )
            );
        }
    }]);

    return EntryList;
}(_react2.default.Component);

exports.default = EntryList;

},{"react":"react","react-dom":"react-dom"}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _entry_list = require('./components/entry_list');

var _entry_list2 = _interopRequireDefault(_entry_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            items: []
        };
        return _this;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.serverRequest = $.get(this.props.url, function (result) {
                this.setState({
                    items: result
                });
            }.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.serverRequest.abort();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'ul',
                { className: 'list-group' },
                this.state.items.map(function (item) {
                    return _react2.default.createElement(
                        'a',
                        { className: 'list-group-item', href: "/lottery_tools/" + item._id, key: item._id },
                        _react2.default.createElement(
                            'span',
                            { className: 'badge' },
                            item.winners.length
                        ),
                        item.name
                    );
                })
            );
        }
    }]);

    return App;
}(_react2.default.Component);

if (document.getElementById('app')) (0, _reactDom.render)(_react2.default.createElement(App, { url: '/api/v1/lottery_tool?sortBy=endTime&limit=10&state=finished&dir=desc' }), document.getElementById('app'));

if (document.getElementById('entry_list')) {
    var id = $('#entry_list').data('id');
    (0, _reactDom.render)(_react2.default.createElement(_entry_list2.default, { drawing_id: id }), document.getElementById('entry_list'));
}

},{"./components/entry_list":1,"react":"react","react-dom":"react-dom"}]},{},[2,1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZWFjdC9jb21wb25lbnRzL2VudHJ5X2xpc3QuanMiLCJyZWFjdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQixTOzs7QUFFakIsdUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDBIQUNULEtBRFM7O0FBRWYsY0FBSyxLQUFMLEdBQWE7QUFDVCxxQkFBUyxFQURBO0FBRVQsdUJBQVcsRUFGRjtBQUdULHdCQUFZLEVBSEg7QUFJVCxtQkFBTztBQUpFLFNBQWI7QUFNQSxjQUFLLFFBQUwsR0FBZ0IsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFoQjtBQVJlO0FBU2xCOzs7OzZDQUVvQjtBQUNqQixpQkFBSyxhQUFMLEdBQXFCLEVBQUUsR0FBRixDQUFNLDBCQUF5QixLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE9BQXRCLENBQThCLFFBQTlCLEVBQXdDLEVBQXhDLENBQS9CLEVBQTRFLFVBQVMsTUFBVCxFQUFpQjtBQUM5RyxxQkFBSyxRQUFMLENBQWM7QUFDViw2QkFBUyxPQUFPLE9BRE47QUFFViwrQkFBVyxLQUFLLEdBQUw7QUFGRCxpQkFBZDtBQUlILGFBTGdHLENBSy9GLElBTCtGLENBSzFGLElBTDBGLENBQTVFLENBQXJCO0FBTUg7OztpQ0FFUSxDLEVBQUc7QUFDUixjQUFFLGNBQUY7QUFDQSxnQkFBSSxPQUFPLElBQVg7QUFDQSxjQUFFLElBQUYsQ0FBTztBQUNILHFCQUFLLDBCQUF5QixLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE9BQXRCLENBQThCLFFBQTlCLEVBQXdDLEVBQXhDLENBQXpCLEdBQXNFLFlBRHhFO0FBRUgsMEJBQVUsTUFGUDtBQUdILHNCQUFNLE1BSEg7QUFJSCxzQkFBTSxFQUFDLFdBQVcsS0FBSyxLQUFMLENBQVcsU0FBdkIsRUFBa0MsWUFBWSxLQUFLLEtBQUwsQ0FBVyxVQUF6RCxFQUFxRSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQXZGLEVBSkg7QUFLSCx1QkFBTyxLQUxKO0FBTUgseUJBQVMsVUFBUyxJQUFULEVBQWU7QUFDcEIseUJBQUssUUFBTCxDQUFjLEVBQUMsU0FBUyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLE1BQW5CLENBQTBCLElBQTFCLENBQVYsRUFBMkMsV0FBVyxLQUFLLEdBQUwsRUFBdEQsRUFBZDtBQUNILGlCQUZRLENBRVAsSUFGTyxDQUVGLElBRkUsQ0FOTjtBQVNILHVCQUFPLFVBQVMsR0FBVCxFQUFjLE1BQWQsRUFBc0IsR0FBdEIsRUFBMkI7QUFDOUIsNEJBQVEsS0FBUixDQUFjLE1BQWQsRUFBc0IsSUFBSSxRQUFKLEVBQXRCO0FBQ0gsaUJBRk0sQ0FFTCxJQUZLLENBRUEsSUFGQTtBQVRKLGFBQVA7QUFhSDs7OytDQUVzQjtBQUNuQixpQkFBSyxhQUFMLENBQW1CLEtBQW5CO0FBQ0g7OztpQ0FFUztBQUFBOztBQUNOLG1CQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLEtBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxVQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQUE7QUFBVztBQUFBO0FBQUE7QUFBQTtBQUFVLGlDQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLE1BQTdCO0FBQUE7QUFBQTtBQUFYLHFCQURKO0FBRUk7QUFBQTtBQUFBLDBCQUFJLFdBQVUsWUFBZDtBQUNLLDZCQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEdBQW5CLENBQXVCLFVBQVUsS0FBVixFQUFpQjtBQUNyQyxtQ0FBTztBQUFBO0FBQUEsa0NBQUksV0FBVSxpQkFBZCxFQUFnQyxLQUFLLE1BQU0sR0FBM0M7QUFBaUQsc0NBQU0sUUFBTixLQUFtQixTQUFuQixHQUErQixNQUFNLEdBQXJDLEdBQTJDLE1BQU07QUFBbEcsNkJBQVA7QUFDSCx5QkFGQTtBQURMO0FBRkosaUJBREo7QUFTSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxVQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFESjtBQUVJO0FBQUE7QUFBQSwwQkFBTSxRQUFPLEVBQWIsRUFBZ0IsUUFBTyxNQUF2QixFQUE4QixVQUFVLEtBQUssUUFBN0M7QUFDSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxZQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFPLFNBQVEsV0FBZjtBQUFBO0FBQUEsNkJBREo7QUFFSSxxRUFBTyxJQUFHLFdBQVYsRUFBc0IsTUFBSyxNQUEzQixFQUFrQyxLQUFLLEtBQUssS0FBTCxDQUFXLFNBQWxELEVBQTZELE1BQUssV0FBbEUsRUFBOEUsV0FBVSxjQUF4RixFQUF1RyxVQUFXLGtCQUFDLENBQUQ7QUFBQSwyQ0FBTyxPQUFLLFFBQUwsQ0FBYyxFQUFFLFdBQVcsRUFBRSxNQUFGLENBQVMsS0FBdEIsRUFBZCxDQUFQO0FBQUEsaUNBQWxIO0FBRkoseUJBREo7QUFLSTtBQUFBO0FBQUEsOEJBQUssV0FBVSxZQUFmO0FBQ0k7QUFBQTtBQUFBLGtDQUFPLFNBQVEsWUFBZjtBQUFBO0FBQUEsNkJBREo7QUFFSSxxRUFBTyxJQUFHLFlBQVYsRUFBdUIsTUFBSyxNQUE1QixFQUFtQyxNQUFLLFlBQXhDLEVBQXFELFdBQVUsY0FBL0QsRUFBOEUsVUFBVyxrQkFBQyxDQUFEO0FBQUEsMkNBQU8sT0FBSyxRQUFMLENBQWMsRUFBRSxZQUFZLEVBQUUsTUFBRixDQUFTLEtBQXZCLEVBQWQsQ0FBUDtBQUFBLGlDQUF6RjtBQUZKLHlCQUxKO0FBU0k7QUFBQTtBQUFBLDhCQUFLLFdBQVUsWUFBZjtBQUNJO0FBQUE7QUFBQSxrQ0FBTyxTQUFRLFlBQWY7QUFBQTtBQUFBLDZCQURKO0FBRUkscUVBQU8sSUFBRyxPQUFWLEVBQWtCLE1BQUssT0FBdkIsRUFBK0IsTUFBSyxPQUFwQyxFQUE0QyxXQUFVLGNBQXRELEVBQXFFLFVBQVcsa0JBQUMsQ0FBRDtBQUFBLDJDQUFPLE9BQUssUUFBTCxDQUFjLEVBQUUsT0FBTyxFQUFFLE1BQUYsQ0FBUyxLQUFsQixFQUFkLENBQVA7QUFBQSxpQ0FBaEY7QUFGSix5QkFUSjtBQWFJO0FBQUE7QUFBQSw4QkFBUSxNQUFLLFFBQWIsRUFBc0IsV0FBVSxpQkFBaEM7QUFBQTtBQUFBO0FBYko7QUFGSjtBQVRKLGFBREo7QUE4Qkg7Ozs7RUEzRWtDLGdCQUFNLFM7O2tCQUF4QixTOzs7Ozs7O0FDSHJCOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNLEc7OztBQUVGLGlCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw4R0FDVCxLQURTOztBQUVmLGNBQUssS0FBTCxHQUFhO0FBQ1QsbUJBQU87QUFERSxTQUFiO0FBRmU7QUFLbEI7Ozs7NENBRW1CO0FBQ2hCLGlCQUFLLGFBQUwsR0FBcUIsRUFBRSxHQUFGLENBQU0sS0FBSyxLQUFMLENBQVcsR0FBakIsRUFBc0IsVUFBUyxNQUFULEVBQWlCO0FBQ3hELHFCQUFLLFFBQUwsQ0FBYztBQUNWLDJCQUFPO0FBREcsaUJBQWQ7QUFHSCxhQUowQyxDQUl6QyxJQUp5QyxDQUlwQyxJQUpvQyxDQUF0QixDQUFyQjtBQUtIOzs7K0NBRXNCO0FBQ25CLGlCQUFLLGFBQUwsQ0FBbUIsS0FBbkI7QUFDSDs7O2lDQUVTO0FBQ04sbUJBQU87QUFBQTtBQUFBLGtCQUFJLFdBQVUsWUFBZDtBQUNGLHFCQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEdBQWpCLENBQXFCLFVBQVMsSUFBVCxFQUFlO0FBQ2pDLDJCQUFRO0FBQUE7QUFBQSwwQkFBRyxXQUFVLGlCQUFiLEVBQStCLE1BQU0sb0JBQW9CLEtBQUssR0FBOUQsRUFBbUUsS0FBSyxLQUFLLEdBQTdFO0FBQWtGO0FBQUE7QUFBQSw4QkFBTSxXQUFVLE9BQWhCO0FBQXlCLGlDQUFLLE9BQUwsQ0FBYTtBQUF0Qyx5QkFBbEY7QUFBdUksNkJBQUs7QUFBNUkscUJBQVI7QUFDSCxpQkFGQTtBQURFLGFBQVA7QUFLSDs7OztFQTNCYSxnQkFBTSxTOztBQThCeEIsSUFBRyxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBSCxFQUNJLHNCQUFPLDhCQUFDLEdBQUQsSUFBSyxLQUFJLHNFQUFULEdBQVAsRUFBMEYsU0FBUyxjQUFULENBQXdCLEtBQXhCLENBQTFGOztBQUVKLElBQUcsU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQUgsRUFDQTtBQUNJLFFBQUksS0FBSyxFQUFFLGFBQUYsRUFBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBVDtBQUNBLDBCQUFPLHNEQUFXLFlBQVksRUFBdkIsR0FBUCxFQUFzQyxTQUFTLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBdEM7QUFDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge3JlbmRlcn0gZnJvbSAncmVhY3QtZG9tJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudHJ5TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZW50cmllczogW10sXHJcbiAgICAgICAgICAgIHRpY2tldF9pZDogJycsXHJcbiAgICAgICAgICAgIHNlY3JldF9rZXk6ICcnLFxyXG4gICAgICAgICAgICBlbWFpbDogJydcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYWRkRW50cnkgPSB0aGlzLmFkZEVudHJ5LmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuc2VydmVyUmVxdWVzdCA9ICQuZ2V0KFwiL2FwaS92MS9sb3R0ZXJ5X3Rvb2wvXCIrIHRoaXMucHJvcHMuZHJhd2luZ19pZC5yZXBsYWNlKC9bJ1wiXSsvZywgJycpLCBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBlbnRyaWVzOiByZXN1bHQuZW50cmllcyxcclxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEVudHJ5KGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvYXBpL3YxL2xvdHRlcnlfdG9vbC9cIisgc2VsZi5wcm9wcy5kcmF3aW5nX2lkLnJlcGxhY2UoL1snXCJdKy9nLCAnJykgK1wiL2FkZF9lbnRyeVwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGRhdGE6IHt0aWNrZXRfaWQ6IHNlbGYuc3RhdGUudGlja2V0X2lkLCBzZWNyZXRfa2V5OiBzZWxmLnN0YXRlLnNlY3JldF9rZXksIGVtYWlsOiBzZWxmLnN0YXRlLmVtYWlsfSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlbnRyaWVzOiBzZWxmLnN0YXRlLmVudHJpZXMuY29uY2F0KGRhdGEpLCB0aW1lc3RhbXA6IERhdGUubm93KCl9KTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJSZXF1ZXN0LmFib3J0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyICgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMz5FbnRyaWVzPHNtYWxsPiAoe3RoaXMuc3RhdGUuZW50cmllcy5sZW5ndGh9KTwvc21hbGw+PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lbnRyaWVzLm1hcChmdW5jdGlvbiAoZW50cnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCIga2V5PXtlbnRyeS5faWR9PntlbnRyeS50aWNrZXRJZCA9PT0gdW5kZWZpbmVkID8gZW50cnkuX2lkIDogZW50cnkudGlja2V0SWR9PC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPlRvIGFkZCBhbiBlbnRyeSwgcGxlYXNlIGZpbGwgaW4gdGhlIHNlY3JldCBrZXkgYW5kIGVtYWlsIHlvdSB1c2VkIHRvIGNyZWF0ZSB0aGlzIGxvdHRlcnkuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIGFjdGlvbj1cIlwiIG1ldGhvZD1cInBvc3RcIiBvblN1Ym1pdD17dGhpcy5hZGRFbnRyeX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJ0aWNrZXRfaWRcIj5UaWNrZXQgSUQ8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwidGlja2V0X2lkXCIgdHlwZT1cInRleHRcIiBrZXk9e3RoaXMuc3RhdGUudGltZXN0YW1wfSBuYW1lPVwidGlja2V0X2lkXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgb25DaGFuZ2U9eyAoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7IHRpY2tldF9pZDogZS50YXJnZXQudmFsdWUgfSkgfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInNlY3JldF9rZXlcIj5TZWNyZXQgS2V5PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInNlY3JldF9rZXlcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJzZWNyZXRfa2V5XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgb25DaGFuZ2U9eyAoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7IHNlY3JldF9rZXk6IGUudGFyZ2V0LnZhbHVlIH0pIH0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJzZWNyZXRfa2V5XCI+RW1haWw8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiBuYW1lPVwiZW1haWxcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBvbkNoYW5nZT17IChlKSA9PiB0aGlzLnNldFN0YXRlKHsgZW1haWw6IGUudGFyZ2V0LnZhbHVlIH0pIH0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiPkFkZCBFbnRyeTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtyZW5kZXJ9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBFbnRyeUxpc3QgZnJvbSAnLi9jb21wb25lbnRzL2VudHJ5X2xpc3QnXHJcblxyXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnNlcnZlclJlcXVlc3QgPSAkLmdldCh0aGlzLnByb3BzLnVybCwgZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IHJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJSZXF1ZXN0LmFib3J0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyICgpIHtcclxuICAgICAgICByZXR1cm4gPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIj5cclxuICAgICAgICAgICAge3RoaXMuc3RhdGUuaXRlbXMubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoPGEgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCIgaHJlZj17XCIvbG90dGVyeV90b29scy9cIiArIGl0ZW0uX2lkfSBrZXk9e2l0ZW0uX2lkfT48c3BhbiBjbGFzc05hbWU9XCJiYWRnZVwiPntpdGVtLndpbm5lcnMubGVuZ3RofTwvc3Bhbj57aXRlbS5uYW1lfTwvYT4pXHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvdWw+O1xyXG4gICAgfVxyXG59XHJcblxyXG5pZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpXHJcbiAgICByZW5kZXIoPEFwcCB1cmw9XCIvYXBpL3YxL2xvdHRlcnlfdG9vbD9zb3J0Qnk9ZW5kVGltZSZsaW1pdD0xMCZzdGF0ZT1maW5pc2hlZCZkaXI9ZGVzY1wiLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XHJcblxyXG5pZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW50cnlfbGlzdCcpKVxyXG57XHJcbiAgICB2YXIgaWQgPSAkKCcjZW50cnlfbGlzdCcpLmRhdGEoJ2lkJyk7XHJcbiAgICByZW5kZXIoPEVudHJ5TGlzdCBkcmF3aW5nX2lkPXtpZH0gLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbnRyeV9saXN0JykpO1xyXG59XHJcbiJdfQ==

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
            console.log(this.props.drawing_id);
            console.log("Component Will Mount");
            this.serverRequest = $.get("/api/v1/lottery_tool/57ee6bd74fbe391702b31594", function (result) {
                this.setState({
                    entries: result.entries
                });
            }.bind(this));
        }
    }, {
        key: 'addEntry',
        value: function addEntry(e) {
            e.preventDefault();
            var self = this;
            $.ajax({
                url: "/api/v1/lottery_tool/" + self.props.drawing_id + "/add_entry",
                dataType: 'json',
                type: 'POST',
                data: { ticket_id: this.state.ticket_id, secret_key: this.state.secret_key, email: this.state.email },
                cache: false,
                success: function (data) {
                    this.setState({ entries: this.state.entries.concat(data) });
                    console.log("Data received");
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
                            _react2.default.createElement('input', { id: 'ticket_id', type: 'text', name: 'ticket_id', className: 'form-control', onChange: function onChange(e) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZWFjdC9jb21wb25lbnRzL2VudHJ5X2xpc3QuanMiLCJyZWFjdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQixTOzs7QUFFakIsdUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDBIQUNULEtBRFM7O0FBRWYsY0FBSyxLQUFMLEdBQWE7QUFDVCxxQkFBUyxFQURBO0FBRVQsdUJBQVcsRUFGRjtBQUdULHdCQUFZLEVBSEg7QUFJVCxtQkFBTztBQUpFLFNBQWI7QUFNQSxjQUFLLFFBQUwsR0FBZ0IsTUFBSyxRQUFMLENBQWMsSUFBZCxPQUFoQjtBQVJlO0FBU2xCOzs7OzZDQUVvQjtBQUNqQixvQkFBUSxHQUFSLENBQVksS0FBSyxLQUFMLENBQVcsVUFBdkI7QUFDQSxvQkFBUSxHQUFSLENBQVksc0JBQVo7QUFDQSxpQkFBSyxhQUFMLEdBQXFCLEVBQUUsR0FBRixDQUFNLCtDQUFOLEVBQXVELFVBQVMsTUFBVCxFQUFpQjtBQUN6RixxQkFBSyxRQUFMLENBQWM7QUFDViw2QkFBUyxPQUFPO0FBRE4saUJBQWQ7QUFHSCxhQUoyRSxDQUkxRSxJQUowRSxDQUlyRSxJQUpxRSxDQUF2RCxDQUFyQjtBQUtIOzs7aUNBRVEsQyxFQUFHO0FBQ1IsY0FBRSxjQUFGO0FBQ0EsZ0JBQUksT0FBTyxJQUFYO0FBQ0EsY0FBRSxJQUFGLENBQU87QUFDSCxxQkFBSywwQkFBeUIsS0FBSyxLQUFMLENBQVcsVUFBcEMsR0FBZ0QsWUFEbEQ7QUFFSCwwQkFBVSxNQUZQO0FBR0gsc0JBQU0sTUFISDtBQUlILHNCQUFNLEVBQUMsV0FBVyxLQUFLLEtBQUwsQ0FBVyxTQUF2QixFQUFrQyxZQUFZLEtBQUssS0FBTCxDQUFXLFVBQXpELEVBQXFFLE9BQU8sS0FBSyxLQUFMLENBQVcs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Q0FBSCxFQUNBO0FBQ0ksUUFBSSxLQUFLLEVBQUUsYUFBRixFQUFpQixJQUFqQixDQUFzQixJQUF0QixDQUFUO0FBQ0EsMEJBQU8sc0RBQVcsWUFBWSxFQUF2QixHQUFQLEVBQXNDLFNBQVMsY0FBVCxDQUF3QixZQUF4QixDQUF0QztBQUNIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7cmVuZGVyfSBmcm9tICdyZWFjdC1kb20nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50cnlMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBlbnRyaWVzOiBbXSxcclxuICAgICAgICAgICAgdGlja2V0X2lkOiAnJyxcclxuICAgICAgICAgICAgc2VjcmV0X2tleTogJycsXHJcbiAgICAgICAgICAgIGVtYWlsOiAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZEVudHJ5ID0gdGhpcy5hZGRFbnRyeS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLmRyYXdpbmdfaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcG9uZW50IFdpbGwgTW91bnRcIik7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJSZXF1ZXN0ID0gJC5nZXQoXCIvYXBpL3YxL2xvdHRlcnlfdG9vbC81N2VlNmJkNzRmYmUzOTE3MDJiMzE1OTRcIiwgZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW50cmllczogcmVzdWx0LmVudHJpZXNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFbnRyeShlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL2FwaS92MS9sb3R0ZXJ5X3Rvb2wvXCIrIHNlbGYucHJvcHMuZHJhd2luZ19pZCArXCIvYWRkX2VudHJ5XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgZGF0YToge3RpY2tldF9pZDogdGhpcy5zdGF0ZS50aWNrZXRfaWQsIHNlY3JldF9rZXk6IHRoaXMuc3RhdGUuc2VjcmV0X2tleSwgZW1haWw6IHRoaXMuc3RhdGUuZW1haWx9LFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VudHJpZXM6IHRoaXMuc3RhdGUuZW50cmllcy5jb25jYXQoZGF0YSl9KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0YSByZWNlaXZlZFwiKTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJSZXF1ZXN0LmFib3J0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyICgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMz5FbnRyaWVzPHNtYWxsPiAoe3RoaXMuc3RhdGUuZW50cmllcy5sZW5ndGh9KTwvc21hbGw+PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lbnRyaWVzLm1hcChmdW5jdGlvbiAoZW50cnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCIga2V5PXtlbnRyeS5faWR9PntlbnRyeS50aWNrZXRJZCA9PT0gdW5kZWZpbmVkID8gZW50cnkuX2lkIDogZW50cnkudGlja2V0SWR9PC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPlRvIGFkZCBhbiBlbnRyeSwgcGxlYXNlIGZpbGwgaW4gdGhlIHNlY3JldCBrZXkgYW5kIGVtYWlsIHlvdSB1c2VkIHRvIGNyZWF0ZSB0aGlzIGxvdHRlcnkuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIGFjdGlvbj1cIlwiIG1ldGhvZD1cInBvc3RcIiBvblN1Ym1pdD17dGhpcy5hZGRFbnRyeX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJ0aWNrZXRfaWRcIj5UaWNrZXQgSUQ8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwidGlja2V0X2lkXCIgdHlwZT1cInRleHRcIiBuYW1lPVwidGlja2V0X2lkXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgb25DaGFuZ2U9eyAoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7IHRpY2tldF9pZDogZS50YXJnZXQudmFsdWUgfSkgfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInNlY3JldF9rZXlcIj5TZWNyZXQgS2V5PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInNlY3JldF9rZXlcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJzZWNyZXRfa2V5XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgb25DaGFuZ2U9eyAoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7IHNlY3JldF9rZXk6IGUudGFyZ2V0LnZhbHVlIH0pIH0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJzZWNyZXRfa2V5XCI+RW1haWw8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiBuYW1lPVwiZW1haWxcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBvbkNoYW5nZT17IChlKSA9PiB0aGlzLnNldFN0YXRlKHsgZW1haWw6IGUudGFyZ2V0LnZhbHVlIH0pIH0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiPkFkZCBFbnRyeTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtyZW5kZXJ9IGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBFbnRyeUxpc3QgZnJvbSAnLi9jb21wb25lbnRzL2VudHJ5X2xpc3QnXHJcblxyXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnNlcnZlclJlcXVlc3QgPSAkLmdldCh0aGlzLnByb3BzLnVybCwgZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IHJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJSZXF1ZXN0LmFib3J0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyICgpIHtcclxuICAgICAgICByZXR1cm4gPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIj5cclxuICAgICAgICAgICAge3RoaXMuc3RhdGUuaXRlbXMubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoPGEgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCIgaHJlZj17XCIvbG90dGVyeV90b29scy9cIiArIGl0ZW0uX2lkfSBrZXk9e2l0ZW0uX2lkfT48c3BhbiBjbGFzc05hbWU9XCJiYWRnZVwiPntpdGVtLndpbm5lcnMubGVuZ3RofTwvc3Bhbj57aXRlbS5uYW1lfTwvYT4pXHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvdWw+O1xyXG4gICAgfVxyXG59XHJcblxyXG5pZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpXHJcbiAgICByZW5kZXIoPEFwcCB1cmw9XCIvYXBpL3YxL2xvdHRlcnlfdG9vbD9zb3J0Qnk9ZW5kVGltZSZsaW1pdD0xMCZzdGF0ZT1maW5pc2hlZCZkaXI9ZGVzY1wiLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XHJcblxyXG5pZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW50cnlfbGlzdCcpKVxyXG57XHJcbiAgICB2YXIgaWQgPSAkKCcjZW50cnlfbGlzdCcpLmRhdGEoJ2lkJyk7XHJcbiAgICByZW5kZXIoPEVudHJ5TGlzdCBkcmF3aW5nX2lkPXtpZH0gLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbnRyeV9saXN0JykpO1xyXG59XHJcbiJdfQ==

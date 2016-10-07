/**
 * Created by Stefan on 9/28/2016.
 */
var _react = require('react');
var _reactDom = require('react-dom');

$(function () {
    $('.datetimepicker').datetimepicker();

    $("#lottery_form").submit(function(e) {
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            type: "POST",
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function(data)
            {
                window.location.replace('/lottery_tools/' + data._id);
            }
        });
    });


});
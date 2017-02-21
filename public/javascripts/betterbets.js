$(function() {
    var url = queryString.parse(location.search);
    if (typeof url.ss !== 'undefined') $("#server_salt").val(url.ss);
    if (typeof url.ssh !== 'undefined') $("#server_seed_hash").val(url.ssh);
    if (typeof url.sr !== 'undefined') $("#server_roll").val(url.sr.replace(/ /g, "").replace(/,/g, ""));
    if (typeof url.cr !== 'undefined') $("#client_roll").val(url.cr.replace(/ /g, "").replace(/,/g, ""));
    verify();

    function verify() {
        var site = $("#site_alias").val();
        var server_salt = $("#server_salt").val().replace(/ /g, "");
        var server_seed_hash = $("#server_seed_hash").val().replace(/ /g, "").toUpperCase();
        var server_roll = parseInt($("#server_roll").val().replace(/ /g, "").replace(/,/g, ""));
        var client_roll = parseInt($("#client_roll").val().replace(/ /g, "").replace(/,/g, ""));
        if (isNaN(server_roll) == false) {
            $("#server_roll").val(server_roll);
            url.ss = server_salt;
            if (server_seed_hash !== '') url.ssh = server_seed_hash;
            if (isNaN(server_roll) == false) url.sr = server_roll;
            if (isNaN(client_roll) == false) url.cr = client_roll;
            window.history.pushState("", "", "?" + queryString.stringify(url));
            var server_seed_real_hash = CryptoJS.SHA256(server_roll + '|' + server_salt).toString().toUpperCase();
            if (server_seed_hash == server_seed_real_hash) {
                $("#verifier_message").html('<p class="alert alert-success">We generated the same server seed. Check if your roll is correct.</p>');
            } else {
                $("#verifier_message").html('<p class="alert alert-danger">We generated a different server seed hash:<br /><br />' + server_seed_real_hash + '<br /><br />This means the rolls generated below might be NOT correct. Check if the server seed and hash you provided are correct. If not, contact the site owner or ask others for help.</p>');
            }
            $("#verifier_rolls").html('');
            var roll = (Math.floor((100 / Math.pow(2, 32) * ((server_roll + client_roll) % Math.pow(2, 32))) * 100) / 100).toFixed(2);
            $("#verifier_rolls").append('Roll: ' + roll + ' <br />');
            $("#verifier_result").show();
        } else {
            if (server_seed_hash !== '' || (isNaN(client_roll) == false)) {
                $("#verifier_message").html('<p class="alert alert-danger">To verify the rolls we need the server secret.<br><br>You can get this by clicking the by clicking the "<em>MoneyPot.com verification link</em>" and getting the "<em>Secret</em>" number</p>');
                $("#verifier_result").show();
            }
        }
    }
    $("#verifier").submit(function() {
        verify();
        return false;
    });
});
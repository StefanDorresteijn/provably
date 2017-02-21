$(function() {
    var url = queryString.parse(location.search);
    if (typeof url.ss !== 'undefined') $("#server_seed").val(url.ss);
    if (typeof url.ssh !== 'undefined') $("#server_seed_hash").val(url.ssh);
    if (typeof url.cs !== 'undefined') $("#client_seed").val(url.cs);
    verify();

    function verify() {
        var site = $("#site_alias").val();
        var server_seed = $("#server_seed").val().replace(" ", "");
        var server_seed_hash = $("#server_seed_hash").val().replace(" ", "").toLowerCase();
        var client_seed = $("#client_seed").val();
        if (server_seed !== '') {
            url.ss = server_seed;
            if (client_seed !== '') url.cs = client_seed;
            if (server_seed_hash !== '') url.ssh = server_seed_hash;
            window.history.pushState("", "", "?" + queryString.stringify(url));
            var server_seed_real_hash = CryptoJS.SHA512(server_seed).toString().toLowerCase();
            if (server_seed_hash == server_seed_real_hash) {
                $("#verifier_message").html('<p class="bg-success">We generated the same server seed hash. Check if your roll is correct.</p>');
            } else {
                $("#verifier_message").html('<p class="bg-danger">We generated a different server seed hash:<br /><br />' + server_seed_real_hash + '<br /><br />This means the rolls generated below might be NOT correct. Check if the server seed and hash you provided are correct. If not, contact the site owner or ask others for help.</p>');
            }
            $("#verifier_rolls").html('');
            if (site == 'bitdiceme') var roll_hash = CryptoJS.HmacSHA512(client_seed, server_seed).toString();
            var roll = -1;
            for (i = 0; i < 25; i++) {
                calculated_roll = parseInt(roll_hash.substring(5 * i, 5 + 5 * i), 16);
                if (calculated_roll < 1000000) {
                    roll = (calculated_roll / 10000);
                    break;
                }
            }
            if (roll == -1) roll = parseInt(roll_hash.substring(125, 128), 16) / 10000;
            $("#verifier_rolls").append('Roll: ' + roll + ' <br />');
            $("#verifier_result").show();
        } else {
            if (server_seed_hash !== '' || client_seed !== '') {
                $("#verifier_message").html('<p class="bg-danger">To verify the rolls we need the server seed.</p>');
                $("#verifier_result").show();
            }
        }
    }
    $("#verifier").submit(function() {
        verify();
        return false;
    });
});
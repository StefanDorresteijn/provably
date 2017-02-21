/**
 * Created by stefandorresteijn on 17/02/2017.
 */

$(function() {
    var url = queryString.parse(location.search);
    if (typeof url.ss !== 'undefined') $("#server_seed").val(url.ss);
    if (typeof url.ssh !== 'undefined') $("#server_seed_hash").val(url.ssh);
    if (typeof url.cs !== 'undefined') $("#client_seed").val(url.cs);
    if (typeof url.ln !== 'undefined') $("#end_nonce").val(parseInt(url.ln));
    if (typeof url.n !== 'undefined') $("#nonce").val(parseInt(url.n));
    else if (typeof url.ln != 'undefined') {
        n = parseInt(url.ln) - 100;
        if (n >= 0) $("#nonce").val(n);
        else $("#nonce").val(0);
    }
    verify();

    function verify() {
        var site = $("#site_alias").val();
        var server_seed = $("#server_seed").val().trim();
        var server_seed_hash = $("#server_seed_hash").val().trim().toUpperCase();
        var client_seed = $("#client_seed").val().trim();
        var nonce = parseInt($("#nonce").val());
        var end_nonce = parseInt($("#end_nonce").val());
        if (server_seed !== '') {
            url.ss = server_seed;
            if (client_seed !== '') url.cs = client_seed;
            if (isNaN(end_nonce) == false) url.ln = end_nonce;
            if (isNaN(nonce) == false) url.n = nonce;
            if (server_seed_hash !== '') url.ssh = server_seed_hash;
            window.history.pushState("", "", "?" + queryString.stringify(url));
            if (site == 'betking' || site == 'safedice' || site == 'bitdiceme') {
                var server_seed_real_hash = CryptoJS.SHA512(server_seed).toString().toUpperCase();
            } else {
                var server_seed_real_hash = CryptoJS.SHA256(server_seed).toString().toUpperCase();
            }
            if (server_seed_hash == server_seed_real_hash) {
                $("#verifier_message").html('<p class="alert alert-success">We generated the same server seed hash. Check if your rolls are correct.</p>');
            } else {
                $("#verifier_message").html('<p class="alert alert-danger">We generated a different server seed hash:<br /><br />' + server_seed_real_hash + '<br /><br />This means the rolls generated below might be NOT correct. Check if the server seed and hash you provided are correct. If not, contact the site owner or ask others for help.</p>');
            }
            $("#verifier_rolls").html('');
            if (end_nonce >= nonce) {
                for (0; end_nonce >= nonce; end_nonce--) {
                    if (site == 'primedice' || site == 'nitrogendice' || site == 'magicaldice') var roll_hash = CryptoJS.HmacSHA512(client_seed + '-' + end_nonce, server_seed).toString();
                    if (site == 'betking') var roll_hash = CryptoJS.HmacSHA512(end_nonce + ':' + client_seed + ':' + end_nonce, end_nonce + ':' + server_seed + ':' + end_nonce).toString();
                    if (site == 'justdice' || site == 'dicenow' || site == 'bitdiceme') var roll_hash = CryptoJS.HmacSHA512(client_seed + ':' + end_nonce, server_seed).toString();
                    if (site == 'safedice') var roll_hash = CryptoJS.SHA512(CryptoJS.SHA512(end_nonce + ':' + client_seed + server_seed + ':' + end_nonce).toString()).toString();
                    if (site == 'coinroll') var roll_hash = CryptoJS.HmacSHA512(client_seed + ':' + end_nonce, server_seed).toString();
                    if (site == 'coinroll') {
                        roll = parseInt(roll_hash.substring(0, 4), 16);
                    } else {
                        var roll = -1;
                        for (i = 0; i < 25; i++) {
                            calculated_roll = parseInt(roll_hash.substring(5 * i, 5 + 5 * i), 16);
                            if (calculated_roll < 1000000) {
                                if (site == 'primedice' || site == 'nitrogendice' || site == 'magicaldice') roll = (calculated_roll % (10000) / 100);
                                else roll = (calculated_roll / 10000);
                                break;
                            }
                        }
                        if (roll == -1) {
                            if (site == 'primedice' || site == 'nitrogendice' || site == 'magicaldice') roll = 99.99;
                            else roll = parseInt(roll_hash.substring(125, 128), 16) / 10000;
                        }
                    }
                    $("#verifier_rolls").append('Nonce: ' + end_nonce + ' - roll: ' + roll + ' <br />');
                }
            }
            $("#verifier_result").show();
        } else {
            if (server_seed_hash !== '' || client_seed !== '') {
                $("#verifier_message").html('<p class="alert alert-danger">To verify the rolls we need the server seed.<br><br>After your session you have to click the button "Generate new seed" to get the last used server seed. You will notice the "Current Seed" values jump to "Previous Seed". After that fill in the above values (from the "Previous" values)</p>');
                $("#verifier_result").show();
            }
        }
    }
    $('#copy_paste').on('input', function() {
        var copy_paste = $("#copy_paste").val();
        var pattern = /"(.+?)" "(.+?)" "(.+?)" "(.+?)"/;
        if (pattern.test(copy_paste)) {
            var result = pattern.exec(copy_paste);
            $("#server_seed").val(result[1]);
            $("#server_seed_hash").val(result[2]);
            $("#client_seed").val(result[3]);
            $("#end_nonce").val(result[4]);
            $("#nonce").val(1);
            verify();
        }
    });
    $("#verifier").submit(function() {
        verify();
        return false;
    });
});
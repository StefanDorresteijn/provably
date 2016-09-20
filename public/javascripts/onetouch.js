/**
 * Created by Stefan on 9/16/2016.
 */

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function Run() {

    var clientSeed = document.getElementById("pf_test_client_seed").value;
    var initialHash = document.getElementById("pf_test_initial_hash").value;
    var serverSeed = document.getElementById("pf_test_server_seed").value;
    var initialShuffle = document.getElementById("pf_test_initial_shuffle").value;
    var finalShuffle = document.getElementById("pf_test_final_shuffle").value;

    var result = provablyFair.verifyBlackjack(clientSeed, initialHash, serverSeed, initialShuffle, finalShuffle);



    if(result.SHA==true){
        document.getElementById("result_SHA").innerHTML = "<i class='glyphicon glyphicon-ok icon-success'></i>" ;

    }else{
        document.getElementById("result_SHA").innerHTML = "<i class='glyphicon glyphicon-remove icon-failure'></i>" ;

    }
    if(result.initData==true){
        document.getElementById("result_InitData").innerHTML = "<i class='glyphicon glyphicon-ok icon-success'></i>" ;

    }else{
        document.getElementById("result_InitData").innerHTML = "<i class='glyphicon glyphicon-remove icon-failure'></i>" ;

    }
    if(result.dealerSeed==true){
        document.getElementById("result_DealerSeed").innerHTML = "<i class='glyphicon glyphicon-ok icon-success'></i>" ;

    }else{
        document.getElementById("result_DealerSeed").innerHTML = "<i class='glyphicon glyphicon-remove icon-failure'></i>" ;

    }
    if(result.playerSeed==true){
        document.getElementById("result_PlayerSeed").innerHTML = "<i class='glyphicon glyphicon-ok icon-success'></i>" ;

    }else{
        document.getElementById("result_PlayerSeed").innerHTML = "<i class='glyphicon glyphicon-remove icon-failure'></i>" ;

    }
    if(result.finalData==true){
        document.getElementById("result_FinalData").innerHTML = "<i class='glyphicon glyphicon-ok icon-success'></i>" ;

    }else{
        document.getElementById("result_FinalData").innerHTML = "<i class='glyphicon glyphicon-remove icon-failure'></i>" ;

    }

}

function Init() {
    var clientSeed = getParameterByName('clientSeed');
    var initialHash = getParameterByName('initialHash');
    var serverSeed = getParameterByName('serverSeed');
    var initialShuffle = getParameterByName('initialShuffle');
    var finalShuffle = getParameterByName('finalShuffle');

    if (clientSeed && initialHash && serverSeed && initialShuffle && finalShuffle) {
        document.getElementById("pf_test_client_seed").value = clientSeed;
        document.getElementById("pf_test_initial_hash").value = initialHash;
        document.getElementById("pf_test_server_seed").value = serverSeed;
        document.getElementById("pf_test_initial_shuffle").value = initialShuffle;
        document.getElementById("pf_test_final_shuffle").value = finalShuffle;
    }
}

$(document).ready(function() {
   $(".btnVerify").click(function(e) {
       e.preventDefault();
       Run();
   })
});
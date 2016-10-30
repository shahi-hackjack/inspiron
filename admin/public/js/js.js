$(document).ready(function() {
    var h1 = $("#form1").height();
    var h2 = $("#form2").height();
    $("#form1,#form2").height(Math.max(h1, h2));
    $("#form1").hide();

    var h3=$(".main1").height();
    var h4=$(".main2").height();
    $(".main1,.main2").height(Math.max(h3,h4));
    


        var h5=$("#event1").height();
   
    $("#event1,#event2").height(h5);

        $('#event2').hide();
        $('#event3').hide();
        $('#event4').hide();
    


if(Cookies.get('name')=='shahi'||Cookies.get('name')=='admin')
    $(".main1").hide();
else
    $(".main2").hide();

    console.log($('#div1'),$('#div2'),"Here");

     
    
});

$(document).on('click','#Register', function() {
    console.log("Register");
   
    $("#form1").show();
    $("#form2").hide();
});

$(document).on('click','#Login', function() {
    console.log("link2");
 
    $("#form2").show();
 //   debugger;
    $("#form1").hide();
});

$(document).on('click','#formlink', function() {
    console.log("event1");
 
    
});

$(document).on('click','#datalink', function() {
    console.log("event2");
 
  //  $("#event2").show();
 //   debugger;
   // $("#event1").hide();
});



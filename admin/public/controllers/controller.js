
var myApp=angular.module('myApp',[]);


myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){

$scope.login=function(){
        console.log($scope.log);
   $http.post('/login',$scope.log).success(function(res){
    console.log("response was succesful ");
   console.log(res);
   $scope.log="";   



          
          $(".main2").slideUp().show(1000);
             $(".main1").hide();
          if(res._id=='admin'){Cookies.set('name', 'admin');

           console.log(Cookies.get('name'));}
         else{Cookies.set('name', 'shahi');

           console.log(Cookies.get('name'));
               }
  //document.getElementById("pic").;

   }).error(function(){
   	$scope.log="";
   	document.getElementById('green').innerHTML="";
   document.getElementById('red').innerHTML="";
   	document.getElementById('red').innerHTML="Login Failed!!";
   });

};




$scope.register=function(){
        //console.log($scope.user);
   $http.post('/register',$scope.user).success(function(res){
    console.log("response was succesful ");
   console.log(res);
   


   $scope.user="";
   $('#form1').hide(1000);
   $('#form2').show(2000);
   document.getElementById('green').innerHTML="";
   document.getElementById('red').innerHTML="";
   document.getElementById('green').innerHTML="Successfully Registred!!";
    
}).error(function(){
	$scope.user="";
	$('#form1').hide(1000);
   $('#form2').show(2000);
	document.getElementById('green').innerHTML="";
   document.getElementById('red').innerHTML="";
	document.getElementById('red').innerHTML="Unsuccessfull Attempt!!";
});

};







}]);




myApp.controller('Ctrl',['$scope','$http',function($scope,$http){




$scope.logout=function(){
        console.log("logout working");
        Cookies.remove('name');
        location.reload(); 
};


$scope.Pitch=function(){
      console.log("Pitching"+$scope.Event.EventOrganiser1);
$http.post('/pitch',$scope.Event).success(function(res){
    console.log("response was succesful ");

        
   console.log(res.EventDescription);
   console.log((res));
   
 $scope.Event="";
$("#event1").hide();
$("event3").hide();
$("event2").hide();
$("#event4").show();
$scope.ED=res;  
         
}).error(function(){
 console.log("YOU CAN PITCH ONLY ONCE");
});
};



$scope.Load=function(){
  

$http.post('/load').success(function(res){
 console.log(res.length);
 if(Cookies.get('name')=='admin') {
  $("#event2").show();
  $("#event4").hide();
   $("#event3").hide();
  
  console.log("m in admin");  $("#event1").hide();
  }
 else
    {
      $("#event4").show(); 
      $("#event2").hide();
   $("#event3").hide();
    $("#event1").hide();
  }
 //   debugger;
  

   //$scope.contact=res;
   $scope.ED=res;
   });
};



$scope.Edit=function(){

  console.log("event3");

$("#event3").show();
 //   debugger;
    $("#event1").hide();
    $("#event4").hide();
    $("#event2").hide();
 
$http.post('/load').success(function(res){
 console.log(res);
   //$scope.contact=res;
   $scope.Event=res;
   });

};

$scope.Update=function(){
console.log("updateangular");
/*location.reload();
 $("#event3").hide();
 $("#event2").show();
 //   debugger;
    $("#event1").hide();
  $('#event4').hide();
*/
$http.post('/update',$scope.Event).success(function(res){
  console.log(res);
  location.reload();
 
}).error(function(){
 console.log("ERROR IN UPDATE"); 
});
};

$scope.change=function(id){
console.log(id);




$('#event3').show();
$('#event2').hide();
$('#event1').hide();
$('#event4').hide();

$http.post('/get/'+id).success(function(res){
        console.log(res);
         $scope.Event=res;
}).error(function(){
 console.log("ERROR IN CHANGE");
});
};

$scope.delete=function(id){
console.log("remove");
$http.post('/del/'+id).success(function(res){
     console.log(res);
      location.reload();


}).error(function(){
 console.log("ERROR IN DELETE"); 
});


};

$scope.FORM=function(){
  $("#event1").show();
 //   debugger;
    $("#event2").hide();
    $("#event3").hide();
    $("#event4").hide();
}

}]);
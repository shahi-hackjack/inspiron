var express =require('express');
var router=express.Router();
var User=require('../lib/User');


router.get('/',function(req,res,next){
	


});


router.post('/register',function(req,res){
	
var name=req.body.name;
var email=req.body.email;
var phonenumber=req.body.phonenumber;

var newuser=new User();
  newuser.name=name;
  newuser.email=email;
  newuser.phonenumber=phonenumber;

   newuser.save(function(err,savedUser){

        if(err)
        {
           console.log(err);
           return res.status(500).send();

        }
       
          return res.status(200).send();


   })



})
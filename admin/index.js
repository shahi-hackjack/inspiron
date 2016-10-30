var express =require('express');
var app=express();

var bodyparser=require('body-parser');
var session = require('express-session');
var express = require('express');
var http = require('http');
var path = require('path');
//var ejs =require('ejs');
var mongoose = require('mongoose');
var bodyparser=require('body-parser');

app.use(express.static(__dirname+"/public"));//static file they do not chnge like imges
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost/INSPIRONPORTAL');


var Schema = new mongoose.Schema({
   Name: String,
  _id  : String,
Phoneno: Number,
Password: String
});
var user = mongoose.model('user', Schema);


var Data = new mongoose.Schema({
   EventName: String,
  _id  : String,
   TeamSize:Number,
   EventDescription:String,
   EventOrganiser1:String,
   EventContact1:Number,
   EventOrganiser2:String,
   EventContact2:Number,
   EventOrganiser3:String,
   EventContact3:Number

});
var eventd = mongoose.model('eventdata', Data);

var storename;


app.post('/register', function(req, res){
 
 console.log("I recieved a request");
console.log(req.body.Name); 

  new user({
     Name: req.body.Name,
    _id: req.body.Email,
    Phoneno: req.body.Phoneno,
   Password:req.body.Password

  }).save(function(err, doc){
    if(err){ console.log("error");
          
res.status(404).send("Oh uh, something went wrong");
          }
    else   { 
         //res.redirect('/');
         console.log(typeof(doc));
         res.json(doc);
      //res.render('fade',{title:"SUCCESFUL REGISTRATION"});
   }
  });
});

 app.post('/login', function(req, res){
  console.log("i recieved a req"+req.body.Email);

   user.findOne({_id:req.body.Email}, function(err, docs){
    if(err) { res.status(404).send("Oh uh, something went wrong");}
    else{ 
            //console.log(req.body.Password);
            //console.log(docs.Password);
            if(docs!=null)
             {if(req.body.Password==docs.Password)
               {

                 console.log("PASSWORD MATCHED"); 
                storename=docs._id;
                 res.json(docs);   
              

               }
                else {
              console.log("PASSWORD DID NOT MATCH");
             res.status(404).send("Oh uh, something went wrong");
             } 

}
             else {
              console.log("PASSWORD DID NOT MATCH");
             res.status(404).send("Oh uh, something went wrong");
             }  
       //res.render('fade', {users: docs});


    }   
  });
});





app.post('/pitch',function(req,res){



console.log("I recieved pitch request");
console.log("organsir1"+req.body.EventOrganiser1); 

  new eventd({
     EventName: req.body.EventName,
    _id:storename,
   TeamSize:req.body.TeamSize,
   EventDescription:req.body.EventDescription,
   EventOrganiser1:req.body.EventOrganiser1,
   EventContact1:req.body.EventContact1,
   EventOrganiser2:req.body.EventOrganiser2,
   EventContact2:req.body.EventContact2,
   EventOrganiser3:req.body.EventOrganiser3,
   EventContact3:req.body.EventContact3
  }).save(function(err, doc){
    if(err){ console.log("error");
          res.status(404).send("Oh uh, something went wrong");
          }
    else   { 
         //res.redirect('/');
         console.log((doc));
         res.json(doc);
      //res.render('fade',{title:"SUCCESFUL REGISTRATION"});
   }
  });

});//pitch ends here


app.post('/load',function(req,res){
if(storename!='admin')
 {eventd.findOne({_id:storename}, function(err, docs){
    if(err) { res.status(404).send("Oh uh, something went wrong");}
    else{ 
            if(docs!=null)
             {res.json(docs);  
             }
             else {
              console.log("COULDNOT LOAD EVENT DATA");
             res.status(404).send("Oh uh, something went wrong");
             }  
       //res.render('fade', {users: docs});


    }   
  });
}
else{
      eventd.find({},function(err,docs){
      if(err){
        res.status(404).send("Oh uh, something went wrong");
      }
      else{

            if(docs!=null)
            {
              res.json(docs);
            }
            else {console.log("COULDNOT LOAD admin all DATA");
             res.status(404).send("Oh uh, something went wrong");

            }

      }


      });



}


});//load ends here


app.post('/update',function(req,res){

console.log("IAMINUPDATESERVER"+req.body.EventName);
       console.log(req.body.EventOrganiser3);
          if(typeof(req.body.EventOrganiser3)=='undefined')
     {
      console.log("m inside");
      req.body.EventOrganiser3='';
      req.body.EventContact3='';
     }

eventd.update({ _id:req.body._id}, { $set: { EventName:req.body.EventName,
    _id:req.body._id,
   TeamSize:req.body.TeamSize,
   EventDescription:req.body.EventDescription,
   EventOrganiser1:req.body.EventOrganiser1,
   EventContact1:req.body.EventContact1,
   EventOrganiser2:req.body.EventOrganiser2,
   EventContact2:req.body.EventContact2,
   EventOrganiser3:req.body.EventOrganiser3,
   EventContact3:req.body.EventContact3}},function(err,docs){
            if(err)
            {res.status(404).send("Oh uh, something went wrong");

            }
           else {
            res.json(req.body);
                  console.log(docs);
              
           }

});

});

app.post('/get/:id',function(req,res){
  console.log(req.params.id);
eventd.findOne({_id:req.params.id}, function(err, docs){
    if(err) { res.status(404).send("Oh uh, something went wrong");}
    else{ console.log(docs);
            if(docs!=null)
             {res.json(docs);  
             }
             else {
              console.log("COULDNOtloadchangedatawithparam");
             res.status(404).send("Oh uh, something went wrong");
             }  
       //res.render('fade', {users: docs});


    }   
  });


});//get ends here


app.post('/del/:id',function(req,res){
  console.log(req.params.id);
     eventd.remove({_id:req.params.id},function(err,docs){
        if(err){res.status(404).send("Oh uh, something went wrong");}
else{ console.log(docs);
            if(docs!=null)
             {res.json(docs);  
             }
             else {
              console.log("COULDNOtloadchangedatawithparam");
             res.status(404).send("Oh uh, something went wrong");
             }  
       //res.render('fade', {users: docs});


    }   

     });

});//del ends here

app.listen(8080);
console.log("server runnig on 8080");

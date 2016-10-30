var mongoose =require('mongoose');

var userSchema=new mongoose.Schema({
	name:{type:String, unique:true},
	email:{type:String},
    phonenumber:{type:Number},

	});

var User=mongoose.model('myuser',userSchema);

module.exports=User;

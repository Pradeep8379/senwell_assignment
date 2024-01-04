const mongoose= require('mongoose');

let exployeeModel= new mongoose.Schema({
    first_name:{type:String,require:true,},
    last_name:{type:String,require:true,},
    department:{type:String,require:true,},
    address:{type:String,require:true,},
    dob:{type:Date,require:true,},
    salary:{type:Number,require:true},
},{timestamps:true})

module.exports=mongoose.model('employee',exployeeModel)
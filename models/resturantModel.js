const mongoose = require("mongoose");

//schema

const resturantSchema = new mongoose.Schema({
title:{
    type:String,
    required:[true,"Resturant title is required"]
},
imageUrl:{
    type:String
},
foods:{
    type:array
},
time:{
    type:String
},
pickup:{
    type:Boolean,
    default:true
},
delivery:{

    type:Boolean,
    default:true
},
logoUrl:{
type:String
},
rating:{
    type:number,
    default:1,
    min:1,
    max:5
}, 
ratingCount:{
    type:String
},
code:{
type:String
},
coords:{
    id:{type:String},
    latitude:{type:number},
    latitudeDelta:{type:String},
    longitude:{type:number},
    longitudeDelta:{type:Number},
    address:{type:Stirng},
    title:{type:String},
    
}

},
{timestamps:true}
);

module.exports = mongoose.model("Resturant", resturantSchema);

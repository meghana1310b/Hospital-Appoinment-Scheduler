let mongoose=require("mongoose")
let userSchema=new mongoose.Schema({
    "_id":String,
    "name":String,
    "phno":String,
    "password":String,
    "role":{
        type:String,
        default:"patient"
    },
    "uimage":String
})
let User=mongoose.model("User",userSchema)
module.exports=User
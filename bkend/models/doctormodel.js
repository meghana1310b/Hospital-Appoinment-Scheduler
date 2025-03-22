let mongoose=require("mongoose")
let dsch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "spc":String,
    "about":String,
    "appnmtfee":String,
    "experience":String,
    "slots":{
        type:[String],
        default:["MON 10", "TUE 11", "WED 12", "THU 13", "FRI 14", "SAT 15", "SUN 16"]
    },
    "time":{
        type:[String],
        default:["11:00 am","01:00 pm","01:30 pm","02:00 pm","02:30 pm","03:00 pm","03:30 pm","04:00 pm","04:30 pm","05:00 pm","05:30 pm","06:00 pm","06:30 pm","07:00pm","07:30 pm","08:00 pm"]
    },
    "phno":String,
    "image":String
})
let Doctor=mongoose.model("Doctor",dsch)
module.exports=Doctor

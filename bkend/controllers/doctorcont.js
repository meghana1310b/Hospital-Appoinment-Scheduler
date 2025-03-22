let multer=require("multer")
const Doctor = require("../models/doctormodel")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './prodimgs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })
  
const upload = multer({ storage: storage })
let adddoc=async(req,res)=>{
    try{
        let existingDoctor= await Doctor.findById(req.body._id)
        if(existingDoctor){
            res.json({"msg":"Doctor with this mail id already existed"})
        }
        else{
            let newDoctor=new Doctor({...req.body,"image":req.file.filename})
            await newDoctor.save()
            res.json({"msg":"doctor was added"})  
        }
    }
    catch(err)
    {
        console.log(err)
        res.json({"msg":"Error in adding doctor"})
    }
}
let getdoctors=async(req,res)=>{
    try
    {
        let doctors=await Doctor.find()
        res.json(doctors)
    }
    catch(err)
    {
        res.json({"msg":"Error in fetching doctors data"})
    }
}
let getDocBySpc=async(req,res)=>{
    try
    {
        let doctors=await Doctor.find({"spc":req.params.spc})
        res.json(doctors)
    }
    catch(err)
    {
        res.json({"msg":"error in getDocBySpc"})
    }
}
let getById=async(req,res)=>{
    try
    {
        let doctor=await Doctor.findById(req.params._id)
        res.json(doctor)
    }
    catch(err)
    {
        res.json({"msg":"error in getById"})
    }
}
module.exports={adddoc,getdoctors,upload,getDocBySpc,getById}
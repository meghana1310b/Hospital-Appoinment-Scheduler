let bcrypt=require("bcryptjs")
let jwt=require("jsonwebtoken")
const User = require("../models/usermodel")
const multer = require("multer")
const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './userimgs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })
  
const userUpload = multer({ storage: userStorage })
let reg=async(req,res)=>{
    try{
        let existingUser=await User.findById(req.body._id)
        if(existingUser)
        {
            res.json({"msg":"Account with this email already exists"})
        }
        else
        {
            let hashcode=await bcrypt.hash(req.body.password,10)
            let newUser=new User({...req.body,"uimage":req.file.filename,"password":hashcode})
            await newUser.save()
            res.json({"msg":"Registration Successful"})
        }
    }
    catch(err)
    {
        res.json({"msg":"Error in registration"})
    }
}

let login = async (req, res) => {
    try {
        let user = await User.findById(req.body._id)
        if (user) 
        {        
            let isPasswordValid = await bcrypt.compare(req.body.password,user.password)
            if (isPasswordValid) 
            {
                res.json({
                    "token": jwt.sign({ _id: req.body._id }, "ab12"), 
                    "name": user.name,"role":user.role,"_id":user._id,"uimage":user.uimage
                })
            } 
            else 
            {
                res.json({ "msg": "Check password" })
            }

        } 
        else {
            res.json({ "msg": "Check email" })
        }
    } 
    catch (err) {
        res.json({ "msg": "Error in login" })
    }
}
let getUser=async(req,res)=>{
    try
    {
        let user=await User.findById({"_id":req.params._id},{"password":0})
        res.json(user)
    }
    catch(err)
    {
        res.json({"msg":"error in getUser"})
    }
}
module.exports={reg,login,getUser,userUpload}
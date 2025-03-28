let express=require("express")
const { reg, login, getUser, userUpload } = require("../controllers/usercontrollers")
const { getdoctors, adddoc, getDocBySpc, upload, getById } = require("../controllers/doctorcont")
let route=new express.Router()
route.post("/reg",userUpload.single("uimage"),reg)
route.post("/login",login)
route.post("/adddoc",upload.single("image"),adddoc)
route.get("/availabledoctors",getdoctors)
route.get("/doctors/:spc",getDocBySpc)
route.get("/appointment/:_id",getById)
route.get("/user/:_id",getUser)
module.exports=route







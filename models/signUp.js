const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "name":{type:String,required:true},
        "emailid":{type:String,required:true},
        "phnno":{type:String,required:true},
        "gender":{type:String,required:true},
        "username":{type:String,required:true},
        "password":{type:String,required:true},
        "busname":String,
        "route":String,
        "busno":String,
        "drivername":String
    }
)
const busmodel=mongoose.model("buses",schema)
module.exports={busmodel}
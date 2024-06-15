const mongoose=require("mongoose")
const express=require("express")
const cors=require("cors")
const bcrypt=require("bcryptjs")

const{busmodel}=require("./models/signUp")
mongoose.connect("mongodb+srv://siva:6282615940@cluster0.lqoh3rx.mongodb.net/ksrtcdb?retryWrites=true&w=majority&appName=Cluster0")

const app=express()
app.use(cors())
app.use(express.json())

const generatehashedpassword=async(password)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}
//signUp
app.post("/signUp",async(req,res)=>{
    let input=req.body
    let hashedpasssword=await generatehashedpassword(input.password)
    console.log(hashedpasssword)
    input.password=hashedpasssword
    let signUp= new busmodel(input)
    console.log(signUp)
    signUp.save()
    res.json({"status":"success"})
})
app.listen(1011,()=>{console.log("server started")})

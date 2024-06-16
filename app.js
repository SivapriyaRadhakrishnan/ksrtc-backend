const mongoose=require("mongoose")
const express=require("express")
const cors=require("cors")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

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


//signIn
app.post("/signIn",(req,res)=>{
    let input=req.body
    busmodel.find({"username":req.body.username}).then(
        (response)=>{
            if (response.length>0) {
                let dbpassword=response[0].password
                console.log(dbpassword)
                bcrypt.compare(input.password,dbpassword,(error,isMatch)=>{
                    if (isMatch) {
                        jwt.sign({username:input.username},"ksrtc-app",{expiresIn:"1d"},
                            (error,token)=>{
                                if (error) {
                                    res.json({"status":"unable to create token"})
                                } else {
                                    res.json({"status":"success","userid":response[0]._id,"token":token})
                                }
                            }
                        )
                    } else {
                        res.json({"status":"incorrect password"})
                    }
                })
            } else {
                res.json({"status":"user doesn't exist"})
            }
        }
    )
})
app.listen(1011,()=>{console.log("server started")})
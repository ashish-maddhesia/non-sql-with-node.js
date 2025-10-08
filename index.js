
import express from "express"
import { connectMongo } from "./connection.js";
import { log } from "console";
import userRoute from "./routes/user.routes.js"


const app = express()

const port = process.env.port??8000
connectMongo(process.env.MONGO_URI
).then(()=>{
    console.log('mongodb connection is done')
})

app.use(express.json)

app.use('/user',userRoute)

app.listen(port,()=>console.log(`server is runing at ${port}`))
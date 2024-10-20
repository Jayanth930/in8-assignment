import express from "express"
import cors from "cors"
import "dotenv/config"
import crudRouter from "./controllers/crudRouter"

const app = express()
const port = process.env.PORT || 3501


app.use(express.json())
app.use(cors({
    origin : "*" ,
    methods : ["GET" , "PUT" , "POST" , "PATCH" , "DELETE"],
    allowedHeaders : ["Content-Type" , "Authorization"]
}))


app.use("/api/v1",crudRouter)



app.listen(port,()=>{
    console.log(`server started on port : ${port}`)
})
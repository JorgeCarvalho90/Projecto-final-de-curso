import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import loadRoutes from "./routes/index.js"

const app = express()
const port = 3000

app.get("/health", async(req,res) =>{
    res.status(200).json({status:"OK"})
})
 
loadRoutes(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

main().then(()=>{
        console.log("Mongo Database Connected")
    })
    .catch(err => console.log(err));

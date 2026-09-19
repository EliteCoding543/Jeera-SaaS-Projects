import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cookieParse from 'cookie-parser'
import UserRoutes from './Routes/User.routes.js'
import OwnerRoutes from './Routes/Owner.routes.js'
import AdminRoutes from './Routes/AdminOrg.routes.js'
// import { addUser } from './Utlis/AddOwner.js'


const app = express()


app.use(cookieParse())
app.use(express.json())
app.use("/api/auth", UserRoutes)
app.use("/api/owner", OwnerRoutes)
app.use("/api/owner", AdminRoutes)

const PORT = process.env.PORT || 8080
mongoose.connect(process.env.DB_TOKEN)
.then(() => {
    console.log("Data Base is connected ....")
    app.listen(PORT, () => {
        console.log(`Server Runnig at http://localhost:${PORT}`)
    })
})
.catch((error) => {
    console.log(`Server Connection Failed :  ${error.message}`)
})

app.use((err, req, res, next) => {
    // console.log(err)
    res.status(err.status || 400)
    .json({
       success : false, 
       message : err.message
    })
})
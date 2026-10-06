import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParse from 'cookie-parser'
import http from 'http'
import { Server } from 'socket.io'

// ================= ROUTES =================
import UserRoutes from './Routes/User.routes.js'
import OwnerRoutes from './Routes/Owner.routes.js'
import AdminRoutes from './Routes/AdminOrg.routes.js'
import AdminsRoutes from './Routes/Admin.routes.js'
import employeeRoutes from './Routes/Employee.routes.js'
import taskRoutes from './Routes/AdminTask.routes.js'
import employeeTaskRoutes from './Routes/employeeTask.routes.js'
import AnalyticsRouter from './Routes/analytics.routes.js'
import ChatsRouter from './Routes/Chats.routes.js'

// import { addUser } from './Utlis/AddOwner.js'


const app = express()
const server = http.createServer(app)

// Create Socket Io
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Connection create here

io.on("connection", () => {
    console.log("Socket is connected")
})

app.use(cookieParse())
app.use(express.json())
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

// ================= ROUTES =================
app.use("/api/auth", UserRoutes)
app.use("/api/owner", OwnerRoutes)
app.use("/api/owner", AdminRoutes)
app.use("/api/admin", AdminsRoutes)
app.use("/api/admin", employeeRoutes)
app.use("/api/admin", taskRoutes)
app.use("/api/employee", employeeTaskRoutes)
app.use("/api/analytics", AnalyticsRouter)
app.use("/api/chat", ChatsRouter)


// Attach Socket io  to the HTTP Server 



const PORT = process.env.PORT || 8080
mongoose.connect(process.env.DB_TOKEN)
.then(() => {
    console.log("Data Base is connected ....")
    server.listen(PORT, () => {
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
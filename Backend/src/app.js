import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser' // Fixed typo
import http from 'http'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import User from './Models/User.Schema.js'
import Message from './Models/Message.Schema.js'
import { findChatUser } from './Controller/Chats.js'

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

const app = express()
const server = http.createServer(app)

const allowedorigin = process.env.FRONTEND_URL || "https://naxora-frontend.onrender.com"

// ================= CORS & MIDDLEWARES =================
app.use(cookieParser())
app.use(express.json())

// ✅ FIXED CORS CONFIGURATION
app.use(cors({
    origin: [allowedorigin, "https://naxora-frontend.onrender.com"],
    credentials: true,
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"] // Headers whitelist kiye hain
}))

// ================= SOCKET.IO =================
const io = new Server(server, {
  cors: {
    origin: allowedorigin,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket auth middleware
io.use(async (socket, next) => {
    try {
        const cookieHeader = socket.handshake.headers.cookie || ""
        const tokenCookie = cookieHeader
            .split(";")
            .map((cookie) => cookie.trim())
            .find((cookie) => cookie.startsWith("token="))
        const token = tokenCookie && decodeURIComponent(tokenCookie.slice(6))

        if (!token) return next(new Error("Authentication required"))

        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
        const user = await User.findById(decodedToken._id).populate("organizationId")

        if (!user || !["employee", "admin"].includes(user.role) || !user.isActive) {
            return next(new Error("You are not authorized to use chat"))
        }
        if (user.organizationId && !user.organizationId.isActive) {
            return next(new Error("Organization is inactive"))
        }

        socket.data.user = user
        next()
    } catch (error) {
        next(new Error("Authentication failed"))
    }
})

const connectedUsers = new Map()

io.on("connection", (socket) => {
    const userId = String(socket.data.user._id)

    if (userId) {
        const userSockets = connectedUsers.get(userId) || new Set()
        userSockets.add(socket.id)
        connectedUsers.set(userId, userSockets)
    }

    socket.on("send-msg", async ({ receiverId, msg } = {}, acknowledge = () => {}) => {
        try {
            if (!receiverId || String(receiverId) === userId || typeof msg !== "string" || !msg.trim()) {
                return acknowledge({ success: false, message: "A receiver and message are required" })
            }

            const receiver = await findChatUser(receiverId, socket.data.user.organizationId._id)
            const savedMessage = await Message.create({
                sender: socket.data.user._id,
                receiver: receiver._id,
                message: msg.trim(),
            })
            await savedMessage.populate([
                { path: "sender", select: "name email role" },
                { path: "receiver", select: "name email role" },
            ])

            const messageData = savedMessage.toObject()
            const receiverSockets = connectedUsers.get(String(receiver._id))
            receiverSockets?.forEach((socketId) => {
                io.to(socketId).emit("rec-msg", messageData)
            })

            acknowledge({ success: true, message: messageData })
        } catch (error) {
            acknowledge({ success: false, message: error.message || "Unable to send message" })
        }
    })

    socket.on("disconnect", () => {
        if (!userId) return
        const userSockets = connectedUsers.get(userId)
        userSockets?.delete(socket.id)
        if (userSockets?.size === 0) connectedUsers.delete(userId)
    })
})

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

// ================= SERVER LISTEN =================
const PORT = process.env.PORT || 8080
mongoose.connect(process.env.DB_TOKEN)
.then(() => {
    console.log("Data Base is connected ....")
    server.listen(PORT, () => {
        console.log(`Server Running at http://localhost:${PORT}`)
    })
})
.catch((error) => {
    console.log(`Server Connection Failed : ${error.message}`)
})

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500)
    .json({
       success : false, 
       message : err.message
    })
})
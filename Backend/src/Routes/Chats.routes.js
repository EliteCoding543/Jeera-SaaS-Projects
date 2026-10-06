import express from 'express'
import { authorize, isLoggedIn, isOrganizationActive } from '../Middlewere/index.js';
import { getChat } from '../Controller/Chats.js';
const ChatsRouter = express.Router()

ChatsRouter.get("/",
    isLoggedIn,
    isOrganizationActive,
    authorize("employee", "admin"),
    getChat
)


export default ChatsRouter;
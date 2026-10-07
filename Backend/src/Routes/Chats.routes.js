import express from 'express'
import { authorize, isLoggedIn, isOrganizationActive } from '../Middlewere/index.js';
import { getChat, getConversation } from '../Controller/Chats.js';
const ChatsRouter = express.Router()

ChatsRouter.get("/",
    isLoggedIn,
    isOrganizationActive,
    authorize("employee", "admin"),
    getChat
)

ChatsRouter.get("/:userId/messages",
    isLoggedIn,
    isOrganizationActive,
    authorize("employee", "admin"),
    getConversation
)


export default ChatsRouter;

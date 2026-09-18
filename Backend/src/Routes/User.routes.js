import express from 'express'
import { LoginUser, LogoutUser, ownProfile } from '../Controller/UserAuth.js';
import { isLoggedIn } from '../Middlewere/isLoggedIn.js';

const UserRoutes = express.Router()

UserRoutes.post("/login", LoginUser)
UserRoutes.post("/logout", LogoutUser)
UserRoutes.get("/profile", isLoggedIn, ownProfile)

export default UserRoutes;
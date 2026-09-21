import express from 'express'
import { CreateTeamByAdmins } from "../Controller/AdminsTeam.js"
import { isLoggedIn } from '../Middlewere/isLoggedIn.js'
import { authorize } from '../Middlewere/Authorize.js'
const AdminsRoutes = express.Router()

AdminsRoutes.post("/teams", isLoggedIn, authorize("admin"), CreateTeamByAdmins)

export default AdminsRoutes
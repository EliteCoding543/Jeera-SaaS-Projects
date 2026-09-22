import express from 'express'
import { CreateTeamByAdmins, deleteTeams, getAllTeams, getTeamsById, updateTeams } from "../Controller/AdminsTeam.js"
import { isLoggedIn, authorize, isOrganizationActive } from '../Middlewere/index.js'
const AdminsRoutes = express.Router()

AdminsRoutes.post("/teams", 
    isLoggedIn, 
    isOrganizationActive,
    authorize("admin"), 
    CreateTeamByAdmins
)

AdminsRoutes.get("/teams", 
    isLoggedIn, 
    isOrganizationActive, 
    authorize("admin", "owner"), 
    getAllTeams
)

AdminsRoutes.get("/teams/:id", 
    isLoggedIn, 
    isOrganizationActive,
    authorize("admin"), 
    getTeamsById
)

AdminsRoutes.delete("/teams/:id", 
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    deleteTeams
)

AdminsRoutes.patch("/teams/:id", 
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    updateTeams
)

export default AdminsRoutes
import express from 'express'
import { isLoggedIn } from "../Middlewere/isLoggedIn.js";
import { authorize } from '../Middlewere/Authorize.js';
import { adminOrgCreate, activedAdmins, getAdminById, getAllAdmin, deactivateAdmins } from '../Controller/AdminAuth.js';
const AdminRoutes = express.Router()

// Create Admin By Organization
AdminRoutes.post("/organization/:id/admins", isLoggedIn, authorize("owner"), adminOrgCreate)
// Get All Admins By organization id
AdminRoutes.get("/organization/:id/admins", isLoggedIn, authorize("owner"), getAllAdmin)
// Get Admins By id Admins
AdminRoutes.get("/admins/:id", isLoggedIn, authorize("owner"), getAdminById)
// Activate admins details
AdminRoutes.patch("/admins/:id", isLoggedIn, authorize("owner"), activedAdmins)
// Deactivate Admins
AdminRoutes.delete("/admins/:id", isLoggedIn, authorize("owner"), deactivateAdmins)

export default AdminRoutes
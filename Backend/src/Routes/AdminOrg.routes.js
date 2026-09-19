import express from 'express'
import { isLoggedIn } from "../Middlewere/isLoggedIn.js";
import { authorize } from '../Middlewere/Authorize.js';
import { adminOrgCreate } from '../Controller/AdminAuth.js';
const AdminRoutes = express.Router()

// Create Admin By Organization
AdminRoutes.post("/organization/:id/admin", isLoggedIn, authorize("owner"), adminOrgCreate)



export default AdminRoutes
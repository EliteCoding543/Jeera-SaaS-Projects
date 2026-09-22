import express from 'express'
import { isLoggedIn, isOrganizationActive, authorize } from '../Middlewere/index.js'
import { createEmployee, deleteEmployee, getAllEmployee, updateEmployee } from '../Controller/Employee.js';
const employeeRoutes = express.Router()

/*
    - Admin's APIs for employees
*/

employeeRoutes.post("/teams/:teamId/employees", 
    isLoggedIn, 
    isOrganizationActive, 
    authorize("admin"), 
    createEmployee
)

employeeRoutes.get("/teams/teamId/employees",
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    getAllEmployee
)

employeeRoutes.get("/teams/teamId/employees",
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    deleteEmployee
)

employeeRoutes.get("/teams/teamId/employees",
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    updateEmployee
)



export default employeeRoutes;
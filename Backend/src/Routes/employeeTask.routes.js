import express from 'express'
import { authorize, isLoggedIn, isOrganizationActive } from '../Middlewere/index.js'
import { getAllEmployeeTask, getTaskEmployeeById, updateEmployeeTask } from'../Controller/employeeTask.js'
const employeeTaskRoutes = express.Router()


employeeTaskRoutes.get("/tasks",
    isLoggedIn,
    authorize("employee"),
    isOrganizationActive,
    getAllEmployeeTask
)

employeeTaskRoutes.get("/tasks/:tasksId", 
    isLoggedIn,
    authorize("employee"),
    isOrganizationActive,
    getTaskEmployeeById
)


employeeTaskRoutes.patch("/tasks/:tasksId", 
    isLoggedIn,
    authorize("employee"),
    isOrganizationActive,
    updateEmployeeTask
)




export default employeeTaskRoutes;
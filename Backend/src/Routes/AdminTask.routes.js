import express from 'express'
import { isLoggedIn, isOrganizationActive, authorize } from '../Middlewere/index.js'
import { createTask, deleteTask, getAllTask, getTaskById, updatedTask } from '../Controller/adminTask.js';
const taskRoutes = express.Router()


/*
    - Admin's Task APIs
*/


taskRoutes.post(
    "/tasks/employee/:employeeId",
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    createTask
)

taskRoutes.get(
    "/tasks",
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    getAllTask
)


taskRoutes.get(
    "/tasks/:taskId",
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    getTaskById
)



taskRoutes.delete(
    "/tasks/:taskId",
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    deleteTask
)

taskRoutes.patch(
    "/tasks/:taskId",
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    updatedTask
)

export default taskRoutes;
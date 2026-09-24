import express from "express";

import {
    isLoggedIn,
    isOrganizationActive,
    authorize
} from "../Middlewere/index.js";

import {
    createEmployee,
    deleteEmployee,
    getAllEmployee,
    getEmployeeById,
    updateEmployee
} from "../Controller/Employee.js";

const employeeRoutes = express.Router();

/*
    Admin's APIs for employees
*/

// Create Employee
employeeRoutes.post(
    "/teams/:teamId/employees",
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    createEmployee
);

// Get All Employees of Team
employeeRoutes.get(
    "/teams/:teamId/employees",
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    getAllEmployee
);

// Get Employee By ID
employeeRoutes.get(
    "/employees/:employeeId",
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    getEmployeeById
);

// Update Employee
employeeRoutes.patch(
    "/employees/:employeeId",
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    updateEmployee
);

// Delete Employee
employeeRoutes.delete(
    "/employees/:employeeId",
    isLoggedIn,
    isOrganizationActive,
    authorize("admin"),
    deleteEmployee
);

export default employeeRoutes;
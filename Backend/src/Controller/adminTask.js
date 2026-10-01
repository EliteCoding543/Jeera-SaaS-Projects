import User from "../Models/User.Schema.js";
import ErrorHandler from "../Utlis/ErrorHandler.js";
import ResponseHandler from "../Utlis/ResponseHandler.js";
import Task from "../Models/Task.schema.js";
import mongoose from "mongoose";

// ==========================================
// CREATE TASK FOR EMPLOYEE
// ==========================================

export const createTask = async (req, res, next) => {
    try {
        const { employeeId } = req.params;

        // Validate Employee ID
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return next(
                new ErrorHandler(400, "Invalid Employee ID")
            );
        }

        // Find employee inside same organization
        const foundEmployee = await User.findOne({
            _id: employeeId,
            organizationId: req.user.organizationId._id,
            role: "employee",
            isActive: true
        });

        if (!foundEmployee) {
            return next(
                new ErrorHandler(404, "Employee does not exist")
            );
        }

        const {
            title,
            description,
            status,
            priority
        } = req.body;

        // Validate title
        if (
            !title?.trim() ||
            title.trim().length > 100
        ) {
            return next(
                new ErrorHandler(400, "Invalid title")
            );
        }

        // Validate description
        if (
            !description?.trim() ||
            description.trim().length > 300
        ) {
            return next(
                new ErrorHandler(400, "Invalid description")
            );
        }

        // Validate status
        if (
            !status?.trim() ||
            !["todo", "in-progress", "completed"].includes(
                status.trim()
            )
        ) {
            return next(
                new ErrorHandler(400, "Invalid status")
            );
        }

        // Validate priority
        if (
            !priority?.trim() ||
            !["low", "medium", "high"].includes(
                priority.trim()
            )
        ) {
            return next(
                new ErrorHandler(400, "Invalid priority")
            );
        }

        // Create Task
        const createdTask = await Task.create({
            title: title.trim(),
            description: description.trim(),
            priority: priority.trim(),
            status: status.trim(),

            organizationId: req.user.organizationId._id,

            // Employee ke team se teamId
            teamId: foundEmployee.teamId,

            // Task kis employee ko assign hai
            assignedTo: employeeId,

            // Task kis admin ne create kiya
            createdBy: req.user._id
        });

        return res.status(201).json(
            new ResponseHandler(
                201,
                "Task created successfully",
                createdTask
            )
        );

    } catch (error) {
        next(error);
    }
};


// ==========================================
// GET ALL TASKS OF ORGANIZATION
// ==========================================

export const getAllTask = async (req, res, next) => {
    try {
        const organizationId =
            req.user.organizationId._id;

        const allTask = await Task.find({
            organizationId
        });

        return res.status(200).json(
            new ResponseHandler(
                200,
                "All tasks fetched successfully",
                {
                    totalTask: allTask.length,
                    allTask
                }
            )
        );

    } catch (error) {
        next(error);
    }
};


// ==========================================
// GET TASK BY ID
// ==========================================

export const getTaskById = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        // Validate Task ID
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return next(
                new ErrorHandler(400, "Invalid Task ID")
            );
        }

        const foundTask = await Task.findOne({
            _id: taskId,
            organizationId: req.user.organizationId._id
        });

        if (!foundTask) {
            return next(
                new ErrorHandler(404, "Task does not exist")
            );
        }

        return res.status(200).json(
            new ResponseHandler(
                200,
                "Task fetched successfully",
                foundTask
            )
        );

    } catch (error) {
        next(error);
    }
};


// ==========================================
// DELETE TASK
// ==========================================

export const deleteTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        // Validate Task ID
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return next(
                new ErrorHandler(400, "Invalid Task ID")
            );
        }

        const deletedTask = await Task.findOneAndDelete({
            _id: taskId,
            organizationId: req.user.organizationId._id
        });

        if (!deletedTask) {
            return next(
                new ErrorHandler(404, "Task does not exist")
            );
        }

        return res.status(200).json(
            new ResponseHandler(
                200,
                "Task deleted successfully",
                deletedTask
            )
        );

    } catch (error) {
        next(error);
    }
};


// ==========================================
// UPDATE TASK
// ==========================================

export const updatedTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        // Validate Task ID
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return next(
                new ErrorHandler(400, "Invalid Task ID")
            );
        }

        const {
            title,
            description,
            status,
            priority,
            assignedTo
        } = req.body;

        // Validate title
        if (
            !title?.trim() ||
            title.trim().length > 100
        ) {
            return next(
                new ErrorHandler(400, "Invalid title")
            );
        }

        // Validate description
        if (
            !description?.trim() ||
            description.trim().length > 300
        ) {
            return next(
                new ErrorHandler(400, "Invalid description")
            );
        }

        // Validate status
        if (
            !status?.trim() ||
            !["todo", "in-progress", "completed"].includes(
                status.trim()
            )
        ) {
            return next(
                new ErrorHandler(400, "Invalid status")
            );
        }

        // Validate priority
        if (
            !priority?.trim() ||
            !["low", "medium", "high"].includes(
                priority.trim()
            )
        ) {
            return next(
                new ErrorHandler(400, "Invalid priority")
            );
        }

        // Validate Employee ID
        if (
            !assignedTo ||
            !mongoose.Types.ObjectId.isValid(assignedTo)
        ) {
            return next(
                new ErrorHandler(400, "Invalid Employee ID")
            );
        }

        // Check employee belongs to same organization
        const foundEmployee = await User.findOne({
            _id: assignedTo,
            organizationId: req.user.organizationId._id,
            role: "employee",
            isActive: true
        });

        if (!foundEmployee) {
            return next(
                new ErrorHandler(
                    404,
                    "Employee does not exist"
                )
            );
        }

        // Update task
        const updateTask = await Task.findOneAndUpdate(
            {
                _id: taskId,
                organizationId: req.user.organizationId._id
            },
            {
                title: title.trim(),
                description: description.trim(),
                status: status.trim(),
                priority: priority.trim(),

                // Employee ka current team
                teamId: foundEmployee.teamId,

                // New employee
                assignedTo
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updateTask) {
            return next(
                new ErrorHandler(
                    404,
                    "Task does not exist"
                )
            );
        }

        return res.status(200).json(
            new ResponseHandler(
                200,
                "Task updated successfully",
                updateTask
            )
        );

    } catch (error) {
        next(error);
    }
};
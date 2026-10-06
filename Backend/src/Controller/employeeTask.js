import ErrorHandler from "../Utlis/ErrorHandler.js";
import Task from "../Models/Task.schema.js";
import ResponseHandler from "../Utlis/ResponseHandler.js";
import mongoose from "mongoose";

// Get all tasks assigned to logged-in employee
export const getAllEmployeeTask = async (req, res, next) => {
    try {
        const allEmployeeTask = await Task.find({
            assignedTo: req.user._id,
            organizationId: req.user.organizationId._id
        });

        if (allEmployeeTask.length === 0) {
            return next(
                new ErrorHandler(
                    404,
                    "No task found for this employee"
                )
            );
        }

        return res.status(200).json(
            new ResponseHandler(
                200,
                "All employee tasks successfully fetched",
                allEmployeeTask
            )
        );

    } catch (error) {
        next(error);
    }
};


// Get single task by ID
export const getTaskEmployeeById = async (req, res, next) => {
    try {
        const { tasksId } = req.params;

        // Validate task ID
        if (!mongoose.Types.ObjectId.isValid(tasksId)) {
            return next(
                new ErrorHandler(
                    400,
                    "Invalid task ID"
                )
            );
        }

        const data = await Task.findOne({
            _id: tasksId,
            assignedTo: req.user._id,
            organizationId: req.user.organizationId._id
        });

        if (!data) {
            return next(
                new ErrorHandler(
                    404,
                    "Task is not found"
                )
            );
        }

        return res.status(200).json(
            new ResponseHandler(
                200,
                "Task successfully fetched",
                data
            )
        );

    } catch (error) {
        next(error);
    }
};


// Update employee task status
export const updateEmployeeTask = async (req, res, next) => {
    try {
        const { tasksId } = req.params;
        const { status } = req.body;

        // Validate task ID
        if (!mongoose.Types.ObjectId.isValid(tasksId)) {
            return next(
                new ErrorHandler(
                    400,
                    "Invalid task ID"
                )
            );
        }

        // Validate status
        if (
            !status ||
            !["todo", "in-progress", "completed"].includes(status)
        ) {
            return next(
                new ErrorHandler(
                    400,
                    `Invalid ${status}, please select correct status`
                )
            );
        }

        const updateTask = await Task.findOneAndUpdate(
            {
                _id: tasksId,
                assignedTo: req.user._id,
                organizationId: req.user.organizationId._id
            },
            {
                status
            },
            {
                runValidators: true,
                returnDocument: "after"
            }
        );

        if (!updateTask) {
            return next(
                new ErrorHandler(
                    404,
                    "Task not found"
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
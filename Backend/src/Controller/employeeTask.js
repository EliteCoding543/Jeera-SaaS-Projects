import ErrorHandler from "../Utlis/ErrorHandler.js"
import Task  from '../Models/Task.schema.js'
import ResponseHandler from "../Utlis/ResponseHandler.js"
import mongoose from "mongoose";




export const getAllEmployeeTask = async (req, res, next) => {
    try {
        const id = req.user._id;

        const allEmployeeTask = await Task.find({
            assignedTo: id
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


export const getTaskEmployeeById = async(req, res, next) => {
    try {
        const { tasksId } = req.params
        if(!mongoose.Types.ObjectId.isValid(tasksId)){
            return next(new ErrorHandler(400, "Invalid tasks Id"))
        }

        const data = await Task.findOne({
            _id : tasksId,
            assignedTo : req.user._id,
            organizationId: req.user.organizationId._id
        })

        if(!data){
            return next(new ErrorHandler(404, `task is  not found`))
        }

        res.status(200)
        .json(
            new ResponseHandler(
                200,
                "Get Task successfully",
                data
            )
        )

    } catch (error) {
        next(error)
    }
}

export const updateEmployeeTask = async (req, res, next) => {
    try {
        const { tasksId } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(tasksId)) {
            return next(
                new ErrorHandler(400, "Invalid Task ID")
            );
        }

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
                new ErrorHandler(404, "Task not found")
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
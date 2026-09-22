import ErrorHandler from "../Utlis/ErrorHandler.js";
import ResponseHandler from "../Utlis/ResponseHandler.js";
import { Team } from "../Models/Teams.Schema.js";
import mongoose from "mongoose";

// Create Team
export const CreateTeamByAdmins = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name?.trim() || name.trim().length > 50) {
            return next(
                new ErrorHandler(400, `${name} is invalid`)
            );
        }

        const createTeam = await Team.create({
            name: name.trim(),
            adminId: req.user._id,
            organizationId: req.user.organizationId._id,
            isActive: true,
        });

        return res.status(201).json(
            new ResponseHandler(
                201,
                "Team created successfully",
                createTeam
            )
        );

    } catch (error) {
        next(error);
    }
};


// Get All Active Teams
export const getAllTeams = async (req, res, next) => {
    try {
        const organizationId = req.user.organizationId._id;

        const foundTeams = await Team.find({
            organizationId,
            isActive: true,
        });

        return res.status(200).json(
            new ResponseHandler(
                200,
                "Fetched all active teams successfully",
                {
                    teams: foundTeams,
                    totalTeams: foundTeams.length,
                }
            )
        );

    } catch (error) {
        next(error);
    }
};


// Get Team By ID
export const getTeamsById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(
                new ErrorHandler(400, "Invalid Team ID")
            );
        }

        const foundTeams = await Team.findOne({
            _id: id,
            organizationId: req.user.organizationId._id,
            isActive: true,
        });

        if (!foundTeams) {
            return next(
                new ErrorHandler(404, "Team does not exist")
            );
        }

        return res.status(200).json(
            new ResponseHandler(
                200,
                "Team fetched successfully",
                foundTeams
            )
        );

    } catch (error) {
        next(error);
    }
};


// Deactivate Team
export const deleteTeams = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(
                new ErrorHandler(400, "Invalid Team ID")
            );
        }

        const foundTeams = await Team.findOne({
            _id: id,
            organizationId: req.user.organizationId._id,
            isActive: true,
        });

        if (!foundTeams) {
            return next(
                new ErrorHandler(404, "Active team not found")
            );
        }

        foundTeams.isActive = false;

        await foundTeams.save();

        return res.status(200).json(
            new ResponseHandler(
                200,
                "Team deactivated successfully",
                foundTeams
            )
        );

    } catch (error) {
        next(error);
    }
};

// Activate Teams
export const updateTeams = async(req, res, next) => {
    try {
        const { name , isActive} = req.body;
        const { id } = req.params
        
        if(!name.trim() || name.trim().length > 50){
            return next(new ErrorHandler(400, `${name} is invalid`))
        }

        const foundTeams = await Team.findOne({
            _id : id,
            organizationId : req.user.organizationId._id,
        })
        if(!foundTeams){
            return next(new ErrorHandler(404, "Teams does not exist"))
        }

        foundTeams.isActive = true
        foundTeams.save()
        res.status(200)
        .json(
            new ResponseHandler(
                200,
                "Team is Updated successfully",
                foundTeams
            )
        )
    } catch (error) {
        next(error)
    }
}
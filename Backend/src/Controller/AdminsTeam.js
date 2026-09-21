import ErrorHandler from "../Utlis/ErrorHandler.js";
import ResponseHandler from "../Utlis/ResponseHandler.js";
import Organization from "../Models/Owner.Schema.js";
import validator from 'validator'
import { Team } from "../Models/Teams.Schema.js";

export const CreateTeamByAdmins = async(req, res, next) => {
    try {
        const { name } = req.body
        if(!name.trim() || name.trim().length > 50){
            return next(new ErrorHandler(400, `${name} is invalid`))
        }

        const createTeam = await Team.create({
            name,
            adminId : req.user._id,
            organizationId : req.organizationId,
        })
        return res.status(200)
        .json(
            new ResponseHandler(
                200, 
                "Team Create successfuly",
                createTeam
            )
        )
    } catch (error) {
        next(error)
    }
}
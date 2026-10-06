import User from "../Models/User.Schema.js";
import ResponseHandler from "../Utlis/ResponseHandler.js";

export const getChat = async (req, res, next) => {
    try {

        const AllEmployees = await User.find({
            organizationId: req.user.organizationId._id,
            role: "employee"
        });

        return res.status(200).json(
            new ResponseHandler(
                200,
                "Get employees for chat",
                {
                    AllEmployees,
                    totalEmploye : AllEmployees.length
                }
            )
        );

    } catch (error) {
        next(error);
    }
};
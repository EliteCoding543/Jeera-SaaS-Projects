import User from "../Models/User.Schema.js";
import Message from "../Models/Message.Schema.js";
import ResponseHandler from "../Utlis/ResponseHandler.js";
import ErrorHandler from "../Utlis/ErrorHandler.js";
import mongoose from "mongoose";

const findChatUser = async (userId, organizationId) => {
    if (!mongoose.isValidObjectId(userId)) {
        throw new ErrorHandler(400, "Invalid chat user ID");
    }

    const chatUser = await User.findOne({
        _id: userId,
        organizationId,
        role: { $in: ["employee", "admin"] }
    });

    if (!chatUser) {
        throw new ErrorHandler(404, "Chat user not found");
    }

    return chatUser;
};

export const getChat = async (req, res, next) => {
    try {

        const AllEmployees = await User.find({
            organizationId: req.user.organizationId._id,
            role: { $in: ["employee", "admin"] },
            _id: { $ne: req.user._id }
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

export const getConversation = async (req, res, next) => {
    try {
        const otherUser = await findChatUser(
            req.params.userId,
            req.user.organizationId._id
        );

        const messages = await Message.find({
            $or: [
                { sender: req.user._id, receiver: otherUser._id },
                { sender: otherUser._id, receiver: req.user._id }
            ]
        })
            .populate("sender", "name email role")
            .populate("receiver", "name email role")
            .sort({ createdAt: 1, _id: 1 });

        return res.status(200).json(
            new ResponseHandler(200, "Conversation fetched successfully", { messages })
        );
    } catch (error) {
        next(error);
    }
};

export { findChatUser };

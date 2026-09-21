import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
     name : {
        type : String,
        required : true,
        trim : true,
        minLength : 5,
        maxLength : 50
     },
     organizationId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Organization",
        required : true
     },
     adminId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
     },
}, {timestamps : true})

export const Team = mongoose.model("Team", teamSchema)
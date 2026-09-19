import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 100,
            unique: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            immutable: true,
            ref: "User"
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        bufferTimeoutMS: 10000
    }
);

export default mongoose.model("Organization", organizationSchema);
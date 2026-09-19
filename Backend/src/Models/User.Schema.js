import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 20,
      immutable: true,
    },

    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: "{VALUE} is not a valid email!",
      },
      required: true,
      trim: true,
      immutable: true,
    },

    role: {
      type: String,
      enum: {
        values: ["owner", "Admin", "employee"],
        message: "{VALUE} is not a valid role",
      },
      required: true,
      trim: true,
    },

    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    },

    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
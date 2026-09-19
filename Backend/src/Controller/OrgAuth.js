import ErrorHandler from "../Utlis/ErrorHandler.js";
import ResponseHandler from "../Utlis/ResponseHandler.js";
import Organization from "../Models/Owner.Schema.js";
import mongoose from "mongoose";

// Create Organization
export const orgCreate = async (req, res, next) => {
    try {
        const { name, isActive } = req.body;

        // Clean name
        const cleanName = name?.trim();

        // Validate name
        if (!cleanName || cleanName.length > 100) {
            return next(
                new ErrorHandler(400, "Invalid organization name")
            );
        }

        // Create organization
        const createOrg = await Organization.create({
            name: cleanName,
            createdBy: req.user._id,
            isActive: isActive ?? true
        });

        return res
            .status(201)
            .json(
                new ResponseHandler(
                    201,
                    "Organization created successfully",
                    createOrg
                )
            );

    } catch (error) {
        next(error);
    }
};

// Get All Organizations
export const getAllOrg = async(req, res, next) => {
    try {
        const { skipCount } = req.query;

        // Fetch organizations with pagination
        const data = await Organization
            .find()
            .limit(10)
            .skip(skipCount || 0);

        return res.status(201)
        .json(
            new ResponseHandler(
                201,
                "All Organization",
                data
            )
        );
    } catch (error) {
        next(error);
    }
};

// Get Organization By ID
export const GetOwnerById = async(req, res, next) => {
    try {
        const { id } = req.params;

        // Validate Organization ID
        if(!mongoose.Types.ObjectId.isValid(id)){
           return next(new ErrorHandler(400, "Invalid id"));
        }

        // Find organization by ID
        const data = await Organization.findById(id);

        // Check if organization exists
        if(!data){
           return next(new ErrorHandler(404,"Organization not found..."));
        }

        return res.status(201)
        .json(
            new ResponseHandler(
                200, 
                "organization successfully fetch", 
                data
            )
        );
    } catch (error) {
        next(error);
    }
};

// Delete Organization By ID
export const deleteOrg = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check ID
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return next(
                new ErrorHandler(400, "Invalid Id")
            );
        }

        // Soft delete
        const data = await Organization.findByIdAndUpdate(
            id,
            { isActive: false },
            { returnDocument: "after" }
        );

        // Check organization
        if (!data) {
            return next(
                new ErrorHandler(404, "Organization does not exists")
            );
        }

        return res
            .status(200)
            .json(
                new ResponseHandler(
                    200,
                    "Organization deleted successfully",
                    data
                )
            );

    } catch (error) {
        next(error);
    }
};

// Update Organization By ID
export const updateOrg = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { name, isActive} = req.body;

        // Validate Organization ID
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return next(
                new ErrorHandler(400, "Invalid Organization ID")
            );
        }

        // Validate Organization name
        if (!name.trim() || name.trim().length > 100) {
            return next(
                new ErrorHandler(400, "Invalid name")
            );
        }

        // Update organization data
        const data = await Organization.findByIdAndUpdate(
            id, 
            { name, isActive }, 
            {runValidators : true},
            {returnDocument : "after"}
        );

        // Check if organization exists
        if(!data){
            return next(
                new ErrorHandler("Organization not found no update")
            );
        }

        return res.status(200)
        .json(
            new ResponseHandler(
                200,
                "Organization Data Updated successfully",
                data
            )
        );
    } catch (error) {
        next(error);
    }
};
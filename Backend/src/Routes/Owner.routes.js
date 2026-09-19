import express from "express";
import { isLoggedIn } from "../Middlewere/isLoggedIn.js";

import {
    deleteOrg,
    getAllOrg,
    GetOwnerById,
    orgCreate,
    updateOrg
} from "../Controller/OrgAuth.js";

import { authorize } from "../Middlewere/Authorize.js";
const OwnerRoutes = express.Router();


// Create Organization
OwnerRoutes.post("/", isLoggedIn, authorize("owner"), orgCreate);

// Get All Organizations
OwnerRoutes.get("/", isLoggedIn, authorize("owner"), getAllOrg);

// Get Organization By ID
OwnerRoutes.get("/:id", isLoggedIn, authorize("owner"), GetOwnerById);

// Delete Organization
OwnerRoutes.delete("/:id", isLoggedIn, authorize("owner"), deleteOrg);

// Update Organization
OwnerRoutes.patch("/:id", isLoggedIn, authorize("owner"), updateOrg);


export default OwnerRoutes;
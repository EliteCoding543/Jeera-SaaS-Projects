import bcrypt from "bcrypt";
import User from "../Models/User.Schema.js";

export const addUser = async (name, email, password, role) => {

    if (!name || !email || !password || !role) {
        throw new Error("Please enter all Fields..");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    });

    return user;
};

// addUser( "Shubham", "shubham@gmail.com", "Shubham90@", "Admin" );
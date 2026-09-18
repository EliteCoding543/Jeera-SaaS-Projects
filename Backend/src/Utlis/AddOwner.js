import bcrypt from 'bcrypt'
import  User  from '../Models/User.Schema.js'

export const addOwner = (name , email, password) => {
    if(!name || !email || !password){
        throw new Error("Please enter all Filds..");
    }
    //  bcrypt password 
     bcrypt.hash(password, 10)
     .then((data) => {
        User.create({
            name: name,
            email: email,
            password: data,
            role: "Owner"
        })
     })
}
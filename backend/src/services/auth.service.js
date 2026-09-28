import { comparePassword } from "../utils/password.js";
import { NotFoundError, UnauthorizedError } from "../utils/error.js";
import { generateToken } from "../utils/jwt.js";
import { createUser } from "./user.service.js";
import { findUserByEmail, findUserById } from "../repositories/users.repository.js";

export async function login(email, password){

    const user = await findUserByEmail(email);
    if(!user){

        throw new UnauthorizedError("Incorrect credentials.");
    }

    if(!await comparePassword(password, user.password_hash)){

        throw new UnauthorizedError("Incorrect credentials.");
    }

    const token = generateToken(
        user.id,
        user.user_roles.name
    );

    return{
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.user_roles.name
        },

        token: token
    };
}

export async function register(user) {
    
    const newUser = await createUser(user);

    const token = generateToken(
        newUser.id,
        newUser.user_roles.name
    );

    return{
        user: newUser,
        token
    };
}

export async function getMe(userID) {
    
    const user = await findUserById(userID)
    if(!user){

        throw new NotFoundError("User not found.");
    }

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            dateOfBirth: user.date_of_birth,
            role: user.user_roles.name
        }
    }
}
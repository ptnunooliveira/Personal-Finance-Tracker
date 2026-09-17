import prisma from "../database.js";
import { comparePassword } from "../utils/password.js";
import { NotFoundError, UnauthorizedError } from "../utils/error.js";
import { generateToken } from "../utils/jwt.js";
import { createNewUser } from "./user.service.js";

export async function login(email, password){

    const userLogedIn = await prisma.users.findUnique({
        where: {
            email: email
        },
    });

    if(!userLogedIn){

        throw new UnauthorizedError("Incorrect credentials.");
    }

    if(!await comparePassword(password, userLogedIn.password_hash)){

        throw new UnauthorizedError("Incorrect credentials.");
    }

    const token = generateToken(userLogedIn.id);

    return{
        user: {
            id: userLogedIn.id,
            name: userLogedIn.name,
            email: userLogedIn.email   
        },

        token: token
    };
}

export async function register(name, email, password, dateOfBirth) {
    
    const newUser = {
        name,
        email,
        password,
        dateOfBirth
    };

    const user = await createNewUser(newUser);

    const token = generateToken(user.id);

    return{
        user,
        token
    };
}

export async function me(userID) {
    
    const user = await prisma.users.findUnique({
        where: {
            id: userID
        }
    });

    if(!user){

        throw new NotFoundError("User not found.");
    }

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            dateOfBirth: user.date_of_birth
        }
    }
}
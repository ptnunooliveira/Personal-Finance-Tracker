import prisma from "../database.js";
import { hashPassword } from "../utils/password.js";
import { BadRequestError, ConflictError, NotFoundError } from "../utils/error.js";


/**
 * This function allow us to get a list of all users
 * @returns list that contains all users
 */
export async function getAllUsers(){

    const users = await prisma.users.findMany({
        select: {
            id: true,
            name: true,
            date_of_birth: true,
            created_at: true,
        }
    });

    return users;
};


/**
 * This function allow us to get a unique user by his identifier
 * @param {*} userID 
 * @returns required user with his details
 */
export async function getUserByID(userID) {
    
    const user = await prisma.users.findUnique({ 
        where: {
            id: userID
        },

        select: {
            id: true,
            name: true,
            date_of_birth: true,
            email: true,
            created_at: true
        }
    });

    if(!user){

        throw new NotFoundError("User not found.");
    }

    return user;
}


/**
 * This function allows users to create an account
 * @param {*} user 
 * @returns new user with all of his properties (except the password hash)
 */
export async function createNewUser(user) {
    
    const existingUser = await prisma.users.findUnique({
        where: {
            email: user.email
        }
    });

    if(existingUser){

        throw new ConflictError("Email already exists.");        
    }

    const birthDate = new Date(user.dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const hadBirthday = (
        today.getMonth() > birthDate.getMonth() ||
        today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate()
    );

    if(!hadBirthday){
        
        age--;
    }

    if(age < 16){

        throw new BadRequestError("You aren't old enough to create an account.");
    }

    const passwordHash = await hashPassword(user.password);

    const newUser = await prisma.users.create({
        data: {
            name: user.name,
            email: user.email,
            date_of_birth: birthDate,
            password_hash: passwordHash
        },
        select: {
            id: true,
            name: true,
            email: true,
            date_of_birth: true,
            created_at: true
        }
    });

    return newUser;
}
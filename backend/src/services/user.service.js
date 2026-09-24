import prisma from "../database.js";
import { hashPassword } from "../utils/password.js";
import { BadRequestError, ConflictError, NotFoundError } from "../utils/error.js";


/**
 * This function allow us to get a list of all users
 * @returns list that contains all users
 */
export async function getAllUsers(){

    const users = await prisma.users.findMany({
        where: {
            deleted_at: null
        },
        select: {
            id: true,
            name: true,
            date_of_birth: true,
            created_at: true,
            user_roles: {
                select: {
                    name: true
                }
            }
        }
    });

    return users.map(user => ({
        id: user.id,
        name: user.name,
        dateOfBirth: user.date_of_birth,
        role: user.user_roles.name,
        createdAt: user.created_at
    }));
};


/**
 * This function allow us to get a unique user by his identifier
 * @param {*} userID 
 * @returns required user with his details
 */
export async function getUserById(userID) {
    
    const user = await prisma.users.findUnique({ 
        where: {
            id: userID,
            deleted_at: null
        },

        select: {
            id: true,
            name: true,
            date_of_birth: true,
            email: true,
            created_at: true,
            user_roles: {
                select: {
                    name: true
                }
            }
        }
    });

    if(!user){

        throw new NotFoundError("User not found.");
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        dateOfBirth: user.date_of_birth,
        role: user.user_roles.name,
        createdAt: user.created_at
    };
}


/**
 * This function allows users to create an account
 * @param {*} user 
 * @returns new user with all of his properties (except the password hash)
 */
export async function createUser(user) {
    
    const existingUser = await prisma.users.findUnique({
        where: {
            email: user.email,
            deleted_at: null
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
            created_at: true,
            user_roles: {
                select: {
                    name: true
                }
            }
        }
    });

    return newUser;
}
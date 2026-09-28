import prisma from "../database.js";

export async function findUserByEmail(email) {
    
    return await prisma.users.findUnique({
        where: {
            email: email,
            deleted_at: null
        },
        select: {
            name: true,
            email: true,
            password_hash: true,
            user_roles: {
                select: {
                    name: true
                }
            }            
        }
    });
}


export async function findUserById(userID) {
    
    return await prisma.users.findUnique({
        where: {
            id: userID
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
}


export async function createUser(user) {
    
    return await prisma.users.create({
        data: {
            name: user.name,
            email: user.email,
            date_of_birth: user.date_of_birth,
            password_hash: user.password_hash
        },
        select: {
            id: true,
            name: true,
            email: true,
            user_roles: {
                select: {
                    name: true
                }
            }
        }
    });
}
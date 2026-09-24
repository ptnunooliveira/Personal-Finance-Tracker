import prisma from "../database.js";

export async function findActivePersonalizedCategory(categoryId, userID) {
    
    return await prisma.categories.findFirst({
        where: {
            id: categoryId,
            user_id: userID,
            deleted_at: null
        }
    });
}


export async function findActiveDefaultCategory(categoryId) {
    
    return await prisma.categories.findFirst({
        where: {
            id: categoryId,
            user_id: null,
            deleted_at: null
        }
    });
}



export async function findConflictingCategory(categoryId, userId, name) {
    
    return await prisma.categories.findFirst({
        where: {
            name: name,            
            deleted_at: null,
            OR: [
                { user_id: null },
                { user_id: userId }
            ],
            NOT: {
                id: categoryId
            }
        }
    });
}

export async function updateCategory(categoryId, name, transactionTypeId) {
    
    return await prisma.categories.update({
        where: {
            id: categoryId
        },
        data: {
            name: name,
            transaction_type_id: transactionTypeId
        },
        select: {
            name: true,
            transaction_types: {
                select: {
                    name: true
                }
            }
        }
    });
}
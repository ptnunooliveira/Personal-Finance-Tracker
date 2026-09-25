import prisma from "../database.js";


export async function findActivePersonalizedCategory(category, userID) {
    
    return await prisma.categories.findFirst({
        where: {
            id: category.id,
            user_id: userID,
            deleted_at: null
        }
    });
}


export async function findActiveDefaultCategory(category) {
    
    return await prisma.categories.findFirst({
        where: {
            id: category.id,
            user_id: null,
            deleted_at: null
        }
    });
}



export async function findConflictingCategory(category, userId) {
    
    return await prisma.categories.findFirst({
        where: {
            name: category.name,            
            deleted_at: null,
            OR: [
                { user_id: null },
                { user_id: userId }
            ],
            NOT: {
                id: category.id
            }
        }
    });
}


export async function updateCategory(category) {
    
    return await prisma.categories.update({
        where: {
            id: category.id
        },
        data: {
            name: category.name,
            transaction_type_id: category.transactionTypeId
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


export async function createDefaultCategory(category) {
    
    const newCategory = await prisma.categories.create({
        data: {
            name: category.name,
            transaction_type_id: category.transactionTypeId
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

    return {
        name: newCategory.name,
        transactionType: newCategory.transaction_types.name
    }
}


export async function createPersonalizedCategory(category, userID) {
    
    return await prisma.categories.create({
        data: {
            name: category.name,
            transaction_type_id: category.transactionTypeId,
            user_id: userID
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


export async function findAllCategoriesByUser(userID) {
    
    return prisma.categories.findMany({
        where: {
            deleted_at: null,
            OR: [
                { user_id: userID },
                { user_id: null }
            ]
        },
        select: {
            id: true,
            name: true,
            transaction_types: {
                select: {
                    name: true
                }
            }
        }
    });
}
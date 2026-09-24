import { urlencoded } from "express";
import prisma from "../database.js";
import { ConflictError, NotFoundError } from "../utils/error.js";

// export async function getDefaultCategories(){

//     const categories = await prisma.categories.findMany({

//         where: {
//             user_id: null
//         },
//         select: {
//             id: true,
//             name: true,
//             transaction_types:{
//                 select: {
//                     name: true
//                 }
//             }
//         }
//     });

//     return categories.map(category =>({
//         id: category.id,
//         name: category.name,
//         transactionType: category.transaction_types.name
//     }));
// };


// #region GET

export async function getMyCategories(userID){

    const categories = await prisma.categories.findMany({
        where: {
            deleted_at: null,
            OR: [
                {
                    user_id: userID
                },
                {
                    user_id: null
                }
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

    return categories.map(category => ({
        id: category.id,
        name: category.name,
        transactionType: category.transaction_types.name
    }));
}

//#endregion


// #region POST

export async function createPersonalizedCategory(category, userID) {
    
    const existingCategory = await prisma.categories.findFirst({
        where: {
            name: category.name,
            deleted_at: null,
            OR:[
                { user_id: null },
                { user_id: userID }
            ]
        }
    });

    if(existingCategory){

        throw new ConflictError("A category with this name already exists.");
    }

    const newCategory = await prisma.categories.create({
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

    return {
        name: newCategory.name,
        transactionType: newCategory.transaction_types.name
    }
}


export async function createDefaultCategory(category) {
    
    const existingCategory = await prisma.categories.findFirst({
        where: {
            name: category.name,
            user_id: null,
            deleted_at: null
        }
    });

    if(existingCategory){

        throw new ConflictError("A category with this name already exists.");
    }

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
    };
}

// #endregion


// #region PATCH

export async function updatePersonalizedCategory(category, userID) {
    
    const existingCategory = await prisma.categories.findFirst({
        where: {
            id: category.id,
            user_id: userID,
            deleted_at: null
        }
    });

    if(!existingCategory){

        throw new NotFoundError("Category not found.");
    }

    const conflictingCategory = await prisma.categories.findFirst({
        where: {
            name: category.name,
            deleted_at: null,
            OR: [
                { user_id: null },
                { user_id: userID }
            ],
            NOT: {
                id: category.id
            }
        }
    });

    if(conflictingCategory){

        throw new ConflictError("A category with this name already exists.");
    }

    const updatedCategory = await prisma.categories.update({
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

    return {
        name: updatedCategory.name,
        transactionType: updatedCategory.transaction_types.name
    }
}


export async function updatedDefaultCategory(category) {

    const existingCategory = await prisma.categories.findFirst({
        where: {
            id: category.id,
            user_id: null
        }
    });
    
    if(!existingCategory){
        
        throw new NotFoundError("Category not found.");
    }

    const conflictingCategory = await prisma.categories.findFirst({
        where: {
            name: category.name,
            user_id: null,
            NOT: {
                id: category.id
            }
        }
    });

    if(conflictingCategory){

        throw new ConflictError("A category with this name already exists.");
    }

    const updatedCategory = await prisma.categories.update({
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

    return {
        name: updatedCategory.name,
        transactionType: updatedCategory.transaction_types.name
    }
}

// #endregion
import prisma from "../database.js";
import { ConflictError } from "../utils/error.js";

export async function getAllDefaultCategories(){

    const categories = await prisma.categories.findMany({

        where: {
            user_id: null
        },
        select: {
            id: true,
            name: true,
            transaction_types:{
                select: {
                    name: true
                }
            }
        }
    });

    return categories.map(category =>({
        id: category.id,
        name: category.name,
        transaction_type: category.transaction_types.name
    }));
};

export async function getMyCategories(userID){

    const categories = await prisma.categories.findMany({
        where: {
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
        transaction_type: category.transaction_types.name
    }));
}

export async function createPersonalizedCategory(category, userID) {
    
    const existingCategory = await prisma.categories.findFirst({
        where: {
            name: category.name,
            OR:[
                {
                    user_id: null
                },
                {
                    user_id: userID
                }
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
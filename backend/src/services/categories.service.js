import prisma from "../database.js";

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
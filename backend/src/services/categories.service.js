import { ConflictError, NotFoundError } from "../utils/error.js";
import { 
    findActivePersonalizedCategory,
    findConflictingCategory,
    updateCategory,
    findActiveDefaultCategory,
    createDefaultCategory as createDefaultCategoryRepository,
    createPersonalizedCategory as createPersonalizedCategoryRepository,
    findAllCategoriesByUser
 } from "../repositories/categories.repository.js";

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

    const categories = await findAllCategoriesByUser(userID)

    return categories.map(category => ({
        id: category.id,
        name: category.name,
        transactionType: category.transaction_types.name
    }));
}

//#endregion


// #region POST

export async function createPersonalizedCategory(category, userID) {
    
    const conflictingCategory = await findConflictingCategory(category, userID);
    if(conflictingCategory){

        throw new ConflictError("A category with this name already exists.");
    }

    const newCategory = await createPersonalizedCategoryRepository(category, userID)

    return {
        name: newCategory.name,
        transactionType: newCategory.transaction_types.name
    }
}


export async function createDefaultCategory(category) {
    
    const conflictingCategory = await findConflictingCategory(category, null);
    if(conflictingCategory){

        throw new ConflictError("A category with this name already exists.");
    }

    const newCategory = await createDefaultCategoryRepository(category);

    return {
        name: newCategory.name,
        transactionType: newCategory.transactionType
    };
}

// #endregion


// #region PATCH

export async function updatePersonalizedCategory(category, userID) {
    
    const existingCategory = await findActivePersonalizedCategory(category, userID);
    if(!existingCategory){

        throw new NotFoundError("Category not found.");
    }

    const conflictingCategory = await findConflictingCategory(category, userID);
    if(conflictingCategory){

        throw new ConflictError("A category with this name already exists.");
    }

    const updatedCategory = await updateCategory(category);

    return {
        name: updatedCategory.name,
        transactionType: updatedCategory.transaction_types.name
    }
}


export async function updateDefaultCategory(category) {

    const existingCategory = await findActiveDefaultCategory(category);
    if(!existingCategory){
        
        throw new NotFoundError("Category not found.");
    }

    const conflictingCategory = await findConflictingCategory(category, null);
    if(conflictingCategory){

        throw new ConflictError("A category with this name already exists.");
    }

    const updatedCategory = await updateCategory(category);

    return {
        name: updatedCategory.name,
        transactionType: updatedCategory.transaction_types.name
    }
}

// #endregion
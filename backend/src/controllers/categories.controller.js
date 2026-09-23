import { 
    getMyCategories as getMyCategoriesService,
    createPersonalizedCategory as createPersonalizedCategoryService,
    createDefaultCategory as createDefaultCategoryService,
    updatePersonalizedCategory as updatePersonalizedCategoryService,
    updatedDefaultCategory as updatedDefaultCategoryService
} from "../services/categories.service.js";


// export async function getDefaultCategories(req, res, next) {
    
//     try{

//         const categories = await getDefaultCategoriesService();

//         return res.status(200).json(categories);
//     }

//     catch(error){
        
//         next(error);
//     }
// };


// #region GET

export async function getMyCategories(req, res, next) {
    
    try{

        const categories = await getMyCategoriesService(req.user.userID);

        return res.status(200).json(categories);
    }
    
    catch(error){

        next(error);
    }
}

// #endregion


// #region POST

export async function createPersonalizedCategory(req, res, next){

    try{

        const userId = req.user.userID;
        const { name, transactionTypeId } = req.body;

        const category = {
            name,
            transactionTypeId
        };

        const newCategory = await createPersonalizedCategoryService(category, userId);

        return res.status(201).json(newCategory);
    }

    catch(error){
        
        next(error);
    }
}

export async function createDefaultCategory(req, res, next) {
    
    try {

        const { name, transactionTypeId } = req.body;

        const category = {
            name,
            transactionTypeId
        };

        const newCategory = await createDefaultCategoryService(category);

        return res.status(201).json(newCategory);
    }
    
    catch(error){

        next(error);
    }
}

// #endregion


// #region PATCH

export async function updatePersonalizedCategory(req, res, next) {
    
    try {

        const userId = req.user.userID;
        const categoryId = Number(req.params.id);
        const { name, transactionTypeId } = req.body;

        const category = {
            id: categoryId,
            name,
            transactionTypeId
        };

        const updatedCategory = await updatePersonalizedCategoryService(category, userId);
        
        return res.status(200).json(updatedCategory);
    }

    catch(error){

        next(error);
    }
}


export async function updateDefaultCategory(req, res, next) {
    
    try {

        const categoryId = Number(req.params.id);
        const { name, transactionTypeId } = req.body;
        
        const category = {
            id: categoryId,
            name,
            transactionTypeId
        }

        const updatedCategory = await updatedDefaultCategoryService(category);

        return res.status(200).json(updatedCategory);
    }

    catch(error){

        next(error);
    }
}

// #endregion
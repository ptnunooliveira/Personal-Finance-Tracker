import { 
    getMyCategories as getMyCategoriesService,
    createPersonalizedCategory as createPersonalizedCategoryService
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

export async function getMyCategories(req, res, next) {
    
    try{

        const categories = await getMyCategoriesService(req.user.userID);

        return res.status(200).json(categories);
    }
    
    catch(error){

        next(error);
    }
}

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
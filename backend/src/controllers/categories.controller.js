import { getAllDefaultCategories, getMyCategories } from "../services/categories.service.js";


export async function getDefaultCategories(req, res, next) {
    
    try{

        const categories = await getAllDefaultCategories();

        return res.status(200).json(categories);
    }

    catch(error){
        
        next(error);
    }
};

export async function myCategories(req, res, next) {
    
    try{

        const categories = await getMyCategories(req.user.userID);

        return res.status(200).json(categories);
    }
    
    catch(error){

        next(error);
    }
}
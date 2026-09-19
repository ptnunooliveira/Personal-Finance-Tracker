import { ForbiddenError } from "../utils/error";

export function authorize(req, res, next){

    try{

        const role = req.user.role;
        const authenticatedUserId = req.user.userID;
        const requiredUserId = req.params.id;

        if(!role || !authenticatedUserId || !requiredUserId){

            throw new ForbiddenError("Access Denied. You do not have the required permissions to view this page.");
        }

        if(role === 'USER' && authenticatedUserId !== requiredUserId){

            throw new ForbiddenError("Access Denied. You do not have the required permissions to view this page.");
        }

        next();

    }
    catch(error){
        
        next(error);
    }
}
import { ForbiddenError } from "../utils/error";

export function admin(req, res, next){

    try{

        const role = req.user.role;

        if(role !== 'ADMIN'){

            throw new ForbiddenError("Access Denied. You do not have the required permissions to view this page.");
        }

        next();
    }
    catch(error){

        next(error);
    }
}
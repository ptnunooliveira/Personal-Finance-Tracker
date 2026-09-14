import { verifyToken } from "../utils/jwt.js";
import { UnauthorizedError } from "../utils/error.js";

export function authenticate(req, res, next){

    try{

        const authHeader = req.headers.authorization;

        if(!authHeader){

            throw new UnauthorizedError("Authentication required.");
        }

        const token = authHeader.split(" ")[1];

        if(!token){

            throw new UnauthorizedError("Authentication required.");
        }

        const payload = verifyToken(token);

        req.user = payload;

        next();
    }
    catch(error){

        next(error);
    }
}
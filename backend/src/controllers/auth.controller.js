import { BadRequestError } from "../utils/error.js";
import { login as loginService,
    register as registerService,
    getMe as getMeService } from "../services/auth.service.js";

export async function login(req, res, next) {
    
    try{

        const { email, password } = req.body;

        if(!email || !password){

            throw new BadRequestError("Email and password are required.");
        }

        const result = await loginService(email, password);

        return res.status(200).json(result);
    }
    catch(error){

        next(error);
    }
}

export async function register(req, res, next) {
    
    try{

        const { name, email, password, passwordConfirmation, dateOfBirth } = req.body;

        if(password !== passwordConfirmation){

            throw new BadRequestError("Passwords must match.");
        }

        const user = await registerService ({
            name,
            email,
            password,
            dateOfBirth
        });

        return res.status(201).json(user);
        
    }
    catch(error){

        next(error);
    }
}

export async function getMe(req, res, next) {

    try {

        const id = req.user.userID;

        const user = await getMeService(id);

        return res.status(200).json(user);
    }
    catch(error){

        next(error);
    }
}
import { login, register, me } from "../services/auth.service.js";
import { BadRequestError } from "../utils/error.js";

export async function loginUser(req, res, next) {
    
    try{

        const { email, password } = req.body;

        if(!email || !password){

            throw new BadRequestError("Email and password are required.");
        }

        const result = await login(email, password);

        return res.status(200).json(result);
    }
    catch(error){

        next(error);
    }
}

export async function registerUser(req, res, next) {
    
    try{

        const { name, email, password, passwordConfirmation, dateOfBirth } = req.body;

        if(password !== passwordConfirmation){

            throw new BadRequestError("Passwords must match.");
        }

        const user = await register (
            name,
            email,
            password,
            dateOfBirth
        );

        return res.status(201).json(user);
        
    }
    catch(error){

        next(error);
    }
}

export async function getMe(req, res, next) {

    try {

        const id = req.user.userID;

        const user = await me(id);

        return res.status(200).json(user);
    }
    catch(error){

        next(error);
    }
}
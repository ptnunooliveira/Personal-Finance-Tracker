import { getAllUsers, getUserByID, createNewUser } from "../services/user.service.js";


export async function getUsers(req, res, next){

    try{

        const users = await getAllUsers();

        return res.status(200).json(users);
    }

    catch(error){

        next(error);
    }
};

export async function getUser(req, res, next) {

    try{

        const user = await getUserByID(req.params.id);

        return res.status(200).json(user);
    }
    catch(error){

        next(error);
    }
}

export async function createUser(req, res, next) {
    
    try{

        const user = req.body;
        const userCreated = await createNewUser(user);

        return res.status(201).json(userCreated);
    }
    catch(error){

        next(error);
    }
}
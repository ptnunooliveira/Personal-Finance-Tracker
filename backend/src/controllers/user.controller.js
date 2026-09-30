import { getAllUsers as getAllUsersService,
    getUserById as getUserByIdService,
    createUser as createUserService,
    softDeleteUser as softDeleteUserService
} from "../services/user.service.js";


export async function getAllUsers(req, res, next){

    try{

        const users = await getAllUsersService();

        return res.status(200).json(users);
    }

    catch(error){

        next(error);
    }
};

export async function getUserById(req, res, next) {

    try{

        const user = await getUserByIdService(req.params.id);

        return res.status(200).json(user);
    }
    catch(error){

        next(error);
    }
}

export async function createUser(req, res, next) {
    
    try{

        const user = req.body;
        const userCreated = await createUserService(user);

        return res.status(201).json(userCreated);
    }
    catch(error){

        next(error);
    }
}


export async function softDeleteUser(req, res, next) {
    
    try{

        const userId = req.user.userID;
        
        await softDeleteUserService(userId);

        return res.status(200).json({
            message: "User deleted successfully"
        });
    }
    catch(error){

        next(error);
    }
}
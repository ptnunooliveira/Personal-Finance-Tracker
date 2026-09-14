import jwt from "jsonwebtoken";

export function generateToken(userID){

    return jwt.sign(
        {

        userID: userID

        },
        process.env.JWT_SECRET,
        {

            expiresIn: "1h"

        }
    );
}

export function verifyToken(token){

    return jwt.verify(token, process.env.JWT_SECRET);
}
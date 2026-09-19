import jwt from "jsonwebtoken";

export function generateToken(userID, role){

    return jwt.sign(
        {

        userID: userID,
        role: role

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
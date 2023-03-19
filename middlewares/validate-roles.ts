import { NextFunction, Request, Response } from "express";
import { User } from "../models";

export const isAdminRole = (req:Request , res :Response, next:NextFunction) => {
    //Comprobamos que tenemos los datos del usuario
    if (!req.userAuth)
        return res
            .status(500)
            .json({ msg: "You want to verify the role without validating the token" });
    //Obtenemos los datos del usuario
    const { role, name } = req.userAuth;

    if (role != "ADMIN")
        return res.status(401).json({
            msg: `${name} is not administrator - You do not have permission to perform the action.`,
        });

    next();
};

/**
 * Comprueba que el usuario que tenemos previamente en req tiene uno de los roles que se enviaron por parametros
 * @param  {...String[]} roles 
 * @returns 
 */
export const hasRole = (...roles:String[]) => {
    return (req:Request , res:Response, next:NextFunction) => {

        //Comprobamos que tenemos los datos del usuario
        if (!req.userAuth)
            return res.status(500).json({
                msg: "You want to verify the role without validating the token",
            });
        //Obtenemos los datos del usuario
        const { role, name } = req.userAuth;

        //se comprueba que el usuario tiene uno de los roles requeridos
        if (!roles.includes(role))
            return res.status(401).json({
                msg: `User ${name} must have one of the following roles: ${roles}`,
            });

        next();
    };
};


import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { User } from "../models";

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    //Obtenemos el valor a validar
    const token = req.header("x-token");
    if (!token)
        return res.status(401).json({ msg: "There is no token in the request" });

    //Validamos el token, si no es valido se ejecuta el catch
    try {
        //TS se queja ya que id dentro del token lo pusimos al crearle
        const { id } = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;

        //Obtener los datos del usuario que corresponde con el uid
        const userAuth = await User.findByPk(id);

        //Comprobamos que el usuario existe
        if (!userAuth)
            return res.status(401).json({
                msg: "The token is not valid. - User does not exist",
            });

        //Se comprueba que el usuario esta activo
        if (!userAuth.dataValues.state)
            return res.status(401).json({
                msg: "The token is not valid. - User not active",
            });

        //Como los objetos se pasan por referencia, guardamos el usuario en el req
        //Si queremos obtener los datos del usuario auth desde el controlador
        req.userAuth = userAuth;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "The token is not valid",
        });
    }
};